import { Router, type IRouter } from "express";
import { db, zonesTable } from "@workspace/db";
import { ListZonesResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/zones", async (req, res): Promise<void> => {
  const zones = await db.select().from(zonesTable).orderBy(zonesTable.id);
  res.json(ListZonesResponse.parse(zones));
});

export default router;
