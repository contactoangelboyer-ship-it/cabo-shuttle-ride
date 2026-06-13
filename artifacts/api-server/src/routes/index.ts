import { Router, type IRouter } from "express";
import healthRouter from "./health";
import zonesRouter from "./zones";
import vehiclesRouter from "./vehicles";
import pricingRouter from "./pricing";
import reservationsRouter from "./reservations";

const router: IRouter = Router();

router.use(healthRouter);
router.use(zonesRouter);
router.use(vehiclesRouter);
router.use(pricingRouter);
router.use(reservationsRouter);

export default router;
