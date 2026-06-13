import { Router, type IRouter } from "express";
import { db, pricingTable, zonesTable, vehiclesTable } from "@workspace/db";
import { ListPricingQueryParams, ListPricingResponse } from "@workspace/api-zod";
import { eq, and } from "drizzle-orm";

const router: IRouter = Router();

router.get("/pricing", async (req, res): Promise<void> => {
  const params = ListPricingQueryParams.safeParse(req.query);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const originZone = zonesTable;
  const destZone = { ...zonesTable } as typeof zonesTable;

  // Build query with joins
  const rows = await db
    .select({
      id: pricingTable.id,
      originZoneId: pricingTable.originZoneId,
      destinationZoneId: pricingTable.destinationZoneId,
      vehicleId: pricingTable.vehicleId,
      priceUsd: pricingTable.priceUsd,
      durationMinutes: pricingTable.durationMinutes,
    })
    .from(pricingTable)
    .orderBy(pricingTable.id);

  // Fetch zones and vehicles for enrichment
  const zones = await db.select().from(zonesTable);
  const vehicles = await db.select().from(vehiclesTable);

  const zoneMap = new Map(zones.map((z) => [z.id, z]));
  const vehicleMap = new Map(vehicles.map((v) => [v.id, v]));

  let enriched = rows.map((r) => ({
    ...r,
    priceUsd: Number(r.priceUsd),
    originZone: zoneMap.get(r.originZoneId),
    destinationZone: zoneMap.get(r.destinationZoneId),
    vehicle: vehicleMap.get(r.vehicleId)
      ? { ...vehicleMap.get(r.vehicleId)!, priceModifier: Number(vehicleMap.get(r.vehicleId)!.priceModifier) }
      : undefined,
  }));

  // Apply optional filters
  if (params.data.originZoneId != null) {
    enriched = enriched.filter((r) => r.originZoneId === params.data.originZoneId);
  }
  if (params.data.destinationZoneId != null) {
    enriched = enriched.filter((r) => r.destinationZoneId === params.data.destinationZoneId);
  }
  if (params.data.vehicleId != null) {
    enriched = enriched.filter((r) => r.vehicleId === params.data.vehicleId);
  }

  res.json(ListPricingResponse.parse(enriched));
});

export default router;
