import { createQuoteRequest } from "./quotes.service.js";

export const submitQuoteController = async (req, res) => {
  try {
    const quote = await createQuoteRequest(req.body);
    return res.status(201).json({ success: true, data: quote, message: "Quote request submitted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
