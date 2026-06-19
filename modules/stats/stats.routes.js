import { Router } from "express";
import { getStatsController } from "./stats.controller.js";

const router = Router();

router.get("/", getStatsController);

export default router;