import { Router } from "express";
import {
  getAdminCategoriesController, createCategoryController, updateCategoryController, deleteCategoryController,
  getAdminServicesController, createServiceController, updateServiceController, deleteServiceController,
  getAdminTurnoversController, createTurnoverController, updateTurnoverController, deleteTurnoverController
} from "./quoteConfig.controller.js";

const router = Router();

// Categories (Step 1)
router.get("/categories", getAdminCategoriesController);
router.post("/categories", createCategoryController);
router.put("/categories/:id", updateCategoryController);
router.delete("/categories/:id", deleteCategoryController);

// Services (Step 2)
router.get("/services", getAdminServicesController);
router.post("/services", createServiceController);
router.put("/services/:id", updateServiceController);
router.delete("/services/:id", deleteServiceController);

// Turnovers (Step 3)
router.get("/turnovers", getAdminTurnoversController);
router.post("/turnovers", createTurnoverController);
router.put("/turnovers/:id", updateTurnoverController);
router.delete("/turnovers/:id", deleteTurnoverController);

export default router;
