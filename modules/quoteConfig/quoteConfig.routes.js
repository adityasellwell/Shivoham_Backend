import { Router } from "express";
import { getQuoteCategories, getQuoteServices, getTurnoverOptions } from "./quoteConfig.service.js";

const router = Router();

router.get("/categories", async (req, res) => {
  try {
    const data = await getQuoteCategories();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

router.get("/services", async (req, res) => {
  try {
    const { categoryId } = req.query;
    const data = await getQuoteServices(categoryId);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

router.get("/turnovers", async (req, res) => {
  try {
    const data = await getTurnoverOptions();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

export default router;
