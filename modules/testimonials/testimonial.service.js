import prisma from "../../config/prisma.js";

export const getTestimonials = async () => {
  return await prisma.testimonial.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });
};

export const getAdminTestimonials = async () => {
  return await prisma.testimonial.findMany({
    orderBy: { sortOrder: "asc" },
  });
};

export const createTestimonial = async (data) => {
  return await prisma.testimonial.create({
    data: {
      name: data.name,
      designation: data.designation,
      company: data.company,
      image: data.image,
      rating: parseInt(data.rating) || 5,
      content: data.content,
      sortOrder: parseInt(data.sortOrder) || 0,
      isActive: data.isActive !== undefined ? data.isActive : true,
    },
  });
};

export const updateTestimonial = async (id, data) => {
  return await prisma.testimonial.update({
    where: { id: parseInt(id) },
    data: {
      name: data.name,
      designation: data.designation,
      company: data.company,
      image: data.image,
      rating: data.rating ? parseInt(data.rating) : undefined,
      content: data.content,
      sortOrder: data.sortOrder !== undefined ? parseInt(data.sortOrder) : undefined,
      isActive: data.isActive,
    },
  });
};

export const deleteTestimonial = async (id) => {
  return await prisma.testimonial.delete({
    where: { id: parseInt(id) },
  });
};