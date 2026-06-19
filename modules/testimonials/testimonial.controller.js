import { getTestimonials } from "./testimonial.service.js";

export const getTestimonialsController = async (req, res) => {
  try {
    const data = await getTestimonials();

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};