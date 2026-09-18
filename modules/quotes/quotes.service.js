import prisma from "../../config/prisma.js";

export const createQuoteRequest = async (data) => {
  const categoryStr = data.category != null ? String(data.category) : "General Inquiry";
  let servicesJson = [];
  if (Array.isArray(data.services)) {
    servicesJson = data.services.map(s => String(s));
  } else if (data.services != null) {
    servicesJson = [String(data.services)];
  }

  return await prisma.quoteRequest.create({
    data: {
      category: categoryStr,
      services: servicesJson,
      businessName: data.businessName != null ? String(data.businessName) : "N/A",
      businessDesc: data.businessDesc != null ? String(data.businessDesc) : null,
      turnover: data.turnover != null ? String(data.turnover) : null,
      contactName: data.contactName != null ? String(data.contactName) : "",
      contactPhone: data.contactPhone != null ? String(data.contactPhone) : "",
      contactEmail: data.contactEmail != null ? String(data.contactEmail) : "",
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
