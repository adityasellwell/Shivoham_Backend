import prisma from "../../config/prisma.js";

export const createQuoteRequest = async (data) => {
  return await prisma.quoteRequest.create({
    data: {
      category: data.category,
      services: data.services,
      businessName: data.businessName,
      businessDesc: data.businessDesc,
      turnover: data.turnover,
      contactName: data.contactName,
      contactPhone: data.contactPhone,
      contactEmail: data.contactEmail,
    },
  });
};

export const getAdminQuotes = async () => {
  return await prisma.quoteRequest.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const updateQuoteStatus = async (id, status) => {
  return await prisma.quoteRequest.update({
    where: { id: parseInt(id) },
    data: { status },
  });
};

export const deleteQuoteRequest = async (id) => {
  return await prisma.quoteRequest.delete({
    where: { id: parseInt(id) },
  });
};
