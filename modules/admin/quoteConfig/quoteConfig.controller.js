import {
  getAdminQuoteCategories, createQuoteCategory, updateQuoteCategory, deleteQuoteCategory,
  getAdminQuoteServices, createQuoteService, updateQuoteService, deleteQuoteService,
  getAdminTurnoverOptions, createTurnoverOption, updateTurnoverOption, deleteTurnoverOption
} from "../../quoteConfig/quoteConfig.service.js";

/* ======= CATEGORIES ======= */
export const getAdminCategoriesController = async (req, res) => {
  try {
    const data = await getAdminQuoteCategories();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message || "Something went wrong" });
  }
};

export const createCategoryController = async (req, res) => {
  try {
    const data = await createQuoteCategory(req.body);
    return res.status(201).json({ success: true, data, message: "Category created" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message || "Something went wrong" });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const data = await updateQuoteCategory(req.params.id, req.body);
    return res.status(200).json({ success: true, data, message: "Category updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message || "Something went wrong" });
  }
};

export const deleteCategoryController = async (req, res) => {
  try {
    await deleteQuoteCategory(req.params.id);
    return res.status(200).json({ success: true, message: "Category deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message || "Something went wrong" });
  }
};

/* ======= SERVICES ======= */
export const getAdminServicesController = async (req, res) => {
  try {
    const data = await getAdminQuoteServices();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message || "Something went wrong" });
  }
};

export const createServiceController = async (req, res) => {
  try {
    const data = await createQuoteService(req.body);
    return res.status(201).json({ success: true, data, message: "Service created" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message || "Something went wrong" });
  }
};

export const updateServiceController = async (req, res) => {
  try {
    const data = await updateQuoteService(req.params.id, req.body);
    return res.status(200).json({ success: true, data, message: "Service updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message || "Something went wrong" });
  }
};

export const deleteServiceController = async (req, res) => {
  try {
    await deleteQuoteService(req.params.id);
    return res.status(200).json({ success: true, message: "Service deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message || "Something went wrong" });
  }
};

/* ======= TURNOVER OPTIONS ======= */
export const getAdminTurnoversController = async (req, res) => {
  try {
    const data = await getAdminTurnoverOptions();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message || "Something went wrong" });
  }
};

export const createTurnoverController = async (req, res) => {
  try {
    const data = await createTurnoverOption(req.body);
    return res.status(201).json({ success: true, data, message: "Turnover option created" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message || "Something went wrong" });
  }
};

export const updateTurnoverController = async (req, res) => {
  try {
    const data = await updateTurnoverOption(req.params.id, req.body);
    return res.status(200).json({ success: true, data, message: "Turnover option updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message || "Something went wrong" });
  }
};

export const deleteTurnoverController = async (req, res) => {
  try {
    await deleteTurnoverOption(req.params.id);
    return res.status(200).json({ success: true, message: "Turnover option deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message || "Something went wrong" });
  }
};
