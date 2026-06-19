import prisma from "../../config/prisma.js";

export const createConsultationRequest = async (data) => {
  return await prisma.consultationRequest.create({
    data: {
      name: data.name,
      phone: data.phone,
      email: data.email,
      subject: data.subject,
      message: data.message,
      source: data.source,
    },
  });
};

export const getAdminConsultations = async () => {
  return await prisma.consultationRequest.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const updateConsultationStatus = async (id, status) => {
  return await prisma.consultationRequest.update({
    where: { id: parseInt(id) },
    data: { status },
  });
};

export const deleteConsultationRequest = async (id) => {
  return await prisma.consultationRequest.delete({
    where: { id: parseInt(id) },
  });
};
