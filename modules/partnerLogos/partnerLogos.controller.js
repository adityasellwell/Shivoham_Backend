import { getPartnerLogos } from "./partnerLogos.service.js";

export const fetchPartnerLogos = async (req, res) => {
  try {
    const logos = await getPartnerLogos();
    res.status(200).json({ success: true, data: logos });
  } catch (error) {
    console.error("Error fetching partner logos:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
