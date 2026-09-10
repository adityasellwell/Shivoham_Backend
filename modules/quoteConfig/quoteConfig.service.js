import prisma from "../../config/prisma.js";

/* ============ CATEGORIES ============ */

export const getQuoteCategories = async () => {
  return await prisma.quoteCategory.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    include: {
      services: {
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
      },
    },
  });
};

export const getAdminQuoteCategories = async () => {
  return await prisma.quoteCategory.findMany({
    orderBy: { sortOrder: "asc" },
    include: { services: { orderBy: { sortOrder: "asc" } } },
  });
};

export const createQuoteCategory = async (data) => {
  // Normalize keyId: lowercase, no spaces, fallback to slugified title if missing
  const keyId = (data.keyId || data.title || "").trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  return await prisma.quoteCategory.create({
    data: {
      keyId,
      title: data.title,
      description: data.description || "",
      icon: data.icon || "FiShoppingCart",
      sortOrder: parseInt(data.sortOrder) || 0,
      isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
    },
  });
};

export const updateQuoteCategory = async (id, data) => {
  const updateData = {};
  if (data.keyId !== undefined) {
    updateData.keyId = data.keyId.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  }
  if (data.title !== undefined) updateData.title = data.title;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.icon !== undefined) updateData.icon = data.icon;
  if (data.sortOrder !== undefined) updateData.sortOrder = parseInt(data.sortOrder);
  if (data.isActive !== undefined) updateData.isActive = Boolean(data.isActive);

  return await prisma.quoteCategory.update({
    where: { id: parseInt(id) },
    data: updateData,
  });
};

export const deleteQuoteCategory = async (id) => {
  await prisma.quoteService.deleteMany({ where: { quoteCategoryId: parseInt(id) } });
  return await prisma.quoteCategory.delete({ where: { id: parseInt(id) } });
};

/* ============ SERVICES ============ */

export const getQuoteServices = async (categoryId) => {
  const where = { isActive: true };
  if (categoryId) where.quoteCategoryId = parseInt(categoryId);
  return await prisma.quoteService.findMany({
    where,
    orderBy: { sortOrder: "asc" },
    include: { category: { select: { id: true, keyId: true, title: true } } },
  });
};

export const getAdminQuoteServices = async () => {
  return await prisma.quoteService.findMany({
    orderBy: { sortOrder: "asc" },
    include: { category: { select: { id: true, keyId: true, title: true } } },
  });
};

export const createQuoteService = async (data) => {
  return await prisma.quoteService.create({
    data: {
      quoteCategoryId: parseInt(data.quoteCategoryId),
      title: data.title,
      sortOrder: parseInt(data.sortOrder) || 0,
      isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
    },
  });
};

export const updateQuoteService = async (id, data) => {
  const updateData = {};
  if (data.quoteCategoryId !== undefined) updateData.quoteCategoryId = parseInt(data.quoteCategoryId);
  if (data.title !== undefined) updateData.title = data.title;
  if (data.sortOrder !== undefined) updateData.sortOrder = parseInt(data.sortOrder);
  if (data.isActive !== undefined) updateData.isActive = Boolean(data.isActive);

  return await prisma.quoteService.update({
    where: { id: parseInt(id) },
    data: updateData,
  });
};

export const deleteQuoteService = async (id) => {
  return await prisma.quoteService.delete({ where: { id: parseInt(id) } });
};

/* ============ TURNOVER OPTIONS ============ */

export const getTurnoverOptions = async () => {
  return await prisma.turnoverOption.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });
};

export const getAdminTurnoverOptions = async () => {
  return await prisma.turnoverOption.findMany({
    orderBy: { sortOrder: "asc" },
  });
};

export const createTurnoverOption = async (data) => {
  return await prisma.turnoverOption.create({
    data: {
      label: data.label,
      sortOrder: parseInt(data.sortOrder) || 0,
      isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
    },
  });
};

export const updateTurnoverOption = async (id, data) => {
  const updateData = {};
  if (data.label !== undefined) updateData.label = data.label;
  if (data.sortOrder !== undefined) updateData.sortOrder = parseInt(data.sortOrder);
  if (data.isActive !== undefined) updateData.isActive = Boolean(data.isActive);

  return await prisma.turnoverOption.update({
    where: { id: parseInt(id) },
    data: updateData,
  });
};

export const deleteTurnoverOption = async (id) => {
  return await prisma.turnoverOption.delete({ where: { id: parseInt(id) } });
};
