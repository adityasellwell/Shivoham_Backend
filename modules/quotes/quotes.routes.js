import { Router } from "express";
import { submitQuoteController } from "./quotes.controller.js";

const router = Router();

router.post("/", submitQuoteController);

export default router;
