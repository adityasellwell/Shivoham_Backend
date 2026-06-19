import { Router } from "express";
import { submitConsultationController } from "./consultations.controller.js";

const router = Router();

router.post("/", submitConsultationController);

export default router;
