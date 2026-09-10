import { getAdminFaqs, createFaq, updateFaq, deleteFaq } from "../../faqs/faqs.service.js";

export const getAdminFaqsController = async (req, res) => {
  try {
    const data = await getAdminFaqs();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const createFaqController = async (req, res) => {
  try {
    const data = await createFaq(req.body);
    return res.status(201).json({ success: true, data, message: "FAQ created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const updateFaqController = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await updateFaq(id, req.body);
    return res.status(200).json({ success: true, data, message: "FAQ updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const deleteFaqController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteFaq(id);
    return res.status(200).json({ success: true, message: "FAQ deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
