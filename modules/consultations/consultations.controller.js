import { createConsultationRequest } from "./consultations.service.js";

export const submitConsultationController = async (req, res) => {
  try {
    const consultation = await createConsultationRequest(req.body);
    return res.status(201).json({ success: true, data: consultation, message: "Consultation request submitted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
