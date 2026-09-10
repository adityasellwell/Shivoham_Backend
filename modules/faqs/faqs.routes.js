import { Router } from "express";
import { getFaqs } from "./faqs.service.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const data = await getFaqs();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

export default router;
