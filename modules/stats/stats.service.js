import prisma from "../../config/prisma.js";

export const getStats = async () => {
  return await prisma.stat.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });
};

export const getAdminStats = async () => {
  return await prisma.stat.findMany({
    orderBy: { sortOrder: "asc" },
  });
};

export const createStat = async (data) => {
  return await prisma.stat.create({
    data: {
      label: data.label,
      value: parseInt(data.value),
      suffix: data.suffix || "",
      sortOrder: parseInt(data.sortOrder) || 0,
      isActive: data.isActive !== undefined ? data.isActive : true,
    },
  });
};

export const updateStat = async (id, data) => {
  return await prisma.stat.update({
    where: { id: parseInt(id) },
    data: {
      label: data.label,
      value: data.value ? parseInt(data.value) : undefined,
      suffix: data.suffix,
      sortOrder: data.sortOrder !== undefined ? parseInt(data.sortOrder) : undefined,
      isActive: data.isActive,
    },
  });
};

export const deleteStat = async (id) => {
  return await prisma.stat.delete({
    where: { id: parseInt(id) },
  });
};