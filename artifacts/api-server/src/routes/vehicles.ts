import { Router, type IRouter } from "express";
import { db, vehiclesTable } from "@workspace/db";
import { ListVehiclesResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/vehicles", async (req, res): Promise<void> => {
  const vehicles = await db.select().from(vehiclesTable).orderBy(vehiclesTable.id);
  const coerced = vehicles.map((v) => ({ ...v, priceModifier: Number(v.priceModifier) }));
  res.json(ListVehiclesResponse.parse(coerced));
});

export default router;
