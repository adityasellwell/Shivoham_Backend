import express from "express";
import { fetchPartnerLogos } from "./partnerLogos.controller.js";

const router = express.Router();

router.get("/", fetchPartnerLogos);

export default router;
