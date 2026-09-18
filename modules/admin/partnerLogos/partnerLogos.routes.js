import express from "express";
import {
  fetchAdminPartnerLogos,
  addPartnerLogo,
  editPartnerLogo,
  removePartnerLogo,
} from "./partnerLogos.controller.js";

const router = express.Router();

router.get("/", fetchAdminPartnerLogos);
router.post("/", addPartnerLogo);
router.put("/:id", editPartnerLogo);
router.delete("/:id", removePartnerLogo);

export default router;
