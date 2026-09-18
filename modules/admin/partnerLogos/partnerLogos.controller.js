import {
  getAdminPartnerLogos,
  createPartnerLogo,
  updatePartnerLogo,
  deletePartnerLogo,
} from "../../partnerLogos/partnerLogos.service.js";

export const fetchAdminPartnerLogos = async (req, res) => {
  try {
    const logos = await getAdminPartnerLogos();
    res.status(200).json({ success: true, data: logos });
  } catch (error) {
    console.error("Error fetching admin partner logos:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to fetch partner logos" });
  }
};

export const addPartnerLogo = async (req, res) => {
  try {
    const logo = await createPartnerLogo(req.body);
    res.status(201).json({ success: true, data: logo });
  } catch (error) {
    console.error("Error creating partner logo:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to create partner logo" });
  }
};

export const editPartnerLogo = async (req, res) => {
  try {
    const logo = await updatePartnerLogo(req.params.id, req.body);
    res.status(200).json({ success: true, data: logo });
  } catch (error) {
    console.error("Error updating partner logo:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to update partner logo" });
  }
};

export const removePartnerLogo = async (req, res) => {
  try {
    await deletePartnerLogo(req.params.id);
    res.status(200).json({ success: true, message: "Partner logo deleted" });
  } catch (error) {
    console.error("Error deleting partner logo:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to delete partner logo" });
  }
};
