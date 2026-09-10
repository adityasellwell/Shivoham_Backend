import { Router } from "express";
import { getAdminFaqsController, createFaqController, updateFaqController, deleteFaqController } from "./faqs.controller.js";

const router = Router();

router.get("/", getAdminFaqsController);
router.post("/", createFaqController);
router.put("/:id", updateFaqController);
router.delete("/:id", deleteFaqController);

export default router;
