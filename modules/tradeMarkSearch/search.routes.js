import { Router } from "express";
import { searchController } from "./search.controller.js";
import api from "../../api/api.js";
import axios from "axios";

const router = Router();

router.post("/", searchController);

router.get("/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const response = await api.get(`${id}`,
      {
        headers: {
          Authorization: `Api-Key ${process.env.BINBASH_API_KEY}`,
        },
      }
    );

    return res.status(200).json({
      status: true,
      message: response.data,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});

export default router;
