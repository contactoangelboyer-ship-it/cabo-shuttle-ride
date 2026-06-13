import { Router, type IRouter } from "express";
import { db, reservationsTable, zonesTable, vehiclesTable, pricingTable } from "@workspace/db";
import {
  CreateReservationBody,
  GetReservationParams,
  CancelReservationParams,
  ListReservationsQueryParams,
  ListReservationsResponse,
  GetReservationResponse,
  GetReservationStatsResponse,
  CancelReservationResponse,
} from "@workspace/api-zod";
import { eq, and, sql } from "drizzle-orm";

const router: IRouter = Router();

function generateConfirmationCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "CSR-";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

async function enrichReservation(r: typeof reservationsTable.$inferSelect) {
  const zones = await db.select().from(zonesTable);
  const vehicles = await db.select().from(vehiclesTable);
  const zoneMap = new Map(zones.map((z) => [z.id, z]));
  const vehicleMap = new Map(vehicles.map((v) => [v.id, { ...v, priceModifier: Number(v.priceModifier) }]));

  return {
    ...r,
    totalPriceUsd: Number(r.totalPriceUsd),
    createdAt: r.createdAt.toISOString(),
    originZone: zoneMap.get(r.originZoneId),
    destinationZone: zoneMap.get(r.destinationZoneId),
    vehicle: vehicleMap.get(r.vehicleId),
  };
}

// GET /reservations/stats — must be before /:confirmationCode
router.get("/reservations/stats", async (req, res): Promise<void> => {
  const all = await db.select().from(reservationsTable);
  const today = new Date().toDateString();

  const total = all.length;
  const confirmed = all.filter((r) => r.status === "confirmed").length;
  const cancelled = all.filter((r) => r.status === "cancelled").length;
  const pending = all.filter((r) => r.status === "pending").length;
  const totalRevenue = all
    .filter((r) => r.status !== "cancelled")
    .reduce((sum, r) => sum + Number(r.totalPriceUsd), 0);
  const todayBookings = all.filter(
    (r) => new Date(r.createdAt).toDateString() === today
  ).length;

  // Find popular route
  const routeCounts = new Map<string, number>();
  const zones = await db.select().from(zonesTable);
  const zoneMap = new Map(zones.map((z) => [z.id, z.name]));

  for (const r of all) {
    const key = `${zoneMap.get(r.originZoneId) ?? r.originZoneId} → ${zoneMap.get(r.destinationZoneId) ?? r.destinationZoneId}`;
    routeCounts.set(key, (routeCounts.get(key) ?? 0) + 1);
  }

  let popularRoute: string | null = null;
  let maxCount = 0;
  for (const [route, count] of routeCounts) {
    if (count > maxCount) {
      maxCount = count;
      popularRoute = route;
    }
  }

  res.json(
    GetReservationStatsResponse.parse({
      total,
      confirmed,
      cancelled,
      pending,
      totalRevenue,
      todayBookings,
      popularRoute,
    })
  );
});

// GET /reservations
router.get("/reservations", async (req, res): Promise<void> => {
  const params = ListReservationsQueryParams.safeParse(req.query);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  let query = db.select().from(reservationsTable).orderBy(reservationsTable.createdAt);
  const rows = await query;

  let filtered = rows;
  if (params.data.status) {
    filtered = filtered.filter((r) => r.status === params.data.status);
  }
  if (params.data.limit) {
    filtered = filtered.slice(0, params.data.limit);
  }

  const zones = await db.select().from(zonesTable);
  const vehicles = await db.select().from(vehiclesTable);
  const zoneMap = new Map(zones.map((z) => [z.id, z]));
  const vehicleMap = new Map(vehicles.map((v) => [v.id, v]));

  const enriched = filtered.map((r) => ({
    ...r,
    totalPriceUsd: Number(r.totalPriceUsd),
    createdAt: r.createdAt.toISOString(),
    originZone: zoneMap.get(r.originZoneId),
    destinationZone: zoneMap.get(r.destinationZoneId),
    vehicle: vehicleMap.get(r.vehicleId),
  }));

  res.json(ListReservationsResponse.parse(enriched));
});

// POST /reservations
router.post("/reservations", async (req, res): Promise<void> => {
  const parsed = CreateReservationBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { originZoneId, destinationZoneId, vehicleId, ...rest } = parsed.data;

  // Find pricing
  const [pricing] = await db
    .select()
    .from(pricingTable)
    .where(
      and(
        eq(pricingTable.originZoneId, originZoneId),
        eq(pricingTable.destinationZoneId, destinationZoneId),
        eq(pricingTable.vehicleId, vehicleId)
      )
    );

  if (!pricing) {
    res.status(400).json({ error: "No pricing found for the selected route and vehicle" });
    return;
  }

  const confirmationCode = generateConfirmationCode();

  const [reservation] = await db
    .insert(reservationsTable)
    .values({
      confirmationCode,
      originZoneId,
      destinationZoneId,
      vehicleId,
      totalPriceUsd: pricing.priceUsd,
      status: "confirmed",
      ...rest,
    })
    .returning();

  const enriched = await enrichReservation(reservation);
  res.status(201).json(GetReservationResponse.parse(enriched));
});

// GET /reservations/:confirmationCode
router.get("/reservations/:confirmationCode", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.confirmationCode)
    ? req.params.confirmationCode[0]
    : req.params.confirmationCode;

  const [reservation] = await db
    .select()
    .from(reservationsTable)
    .where(eq(reservationsTable.confirmationCode, raw));

  if (!reservation) {
    res.status(404).json({ error: "Reservation not found" });
    return;
  }

  const enriched = await enrichReservation(reservation);
  res.json(GetReservationResponse.parse(enriched));
});

// PATCH /reservations/:confirmationCode/cancel
router.patch("/reservations/:confirmationCode/cancel", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.confirmationCode)
    ? req.params.confirmationCode[0]
    : req.params.confirmationCode;

  const [existing] = await db
    .select()
    .from(reservationsTable)
    .where(eq(reservationsTable.confirmationCode, raw));

  if (!existing) {
    res.status(404).json({ error: "Reservation not found" });
    return;
  }

  const [updated] = await db
    .update(reservationsTable)
    .set({ status: "cancelled" })
    .where(eq(reservationsTable.confirmationCode, raw))
    .returning();

  const enriched = await enrichReservation(updated);
  res.json(CancelReservationResponse.parse(enriched));
});

export default router;
