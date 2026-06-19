import { Router } from "express";
import { getTestimonialsController } from "./testimonial.controller.js";

const router = Router();

router.get("/", getTestimonialsController);

export default router;