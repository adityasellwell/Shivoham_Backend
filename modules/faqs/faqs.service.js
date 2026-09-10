import prisma from "../../config/prisma.js";

export const getFaqs = async () => {
  return await prisma.faq.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
};

export const getAdminFaqs = async () => {
  return await prisma.faq.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
};

export const createFaq = async (data) => {
  return await prisma.faq.create({
    data: {
      category: data.category,
      question: data.question,
      answer: data.answer,
      sortOrder: parseInt(data.sortOrder) || 0,
      isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
    },
  });
};

export const updateFaq = async (id, data) => {
  return await prisma.faq.update({
    where: { id: parseInt(id) },
    data: {
      category: data.category,
      question: data.question,
      answer: data.answer,
      sortOrder: data.sortOrder !== undefined ? parseInt(data.sortOrder) : undefined,
      isActive: data.isActive !== undefined ? Boolean(data.isActive) : undefined,
    },
  });
};

export const deleteFaq = async (id) => {
  return await prisma.faq.delete({
    where: { id: parseInt(id) },
  });
};
