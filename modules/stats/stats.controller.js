import { getStats } from "./stats.service.js";

export const getStatsController = async (req, res) => {
  try {
    const data = await getStats();

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};