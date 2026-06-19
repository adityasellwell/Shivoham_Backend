import api from "../../api/api.js";


// export const searchController = async (req, res) => {
//   try {
//      const response = await axios.get(
//       "https://api.binbash.ai/api/v2/trademarks/",
//       {
//         params: {
//           word_mark: "Apple",
//           class_number: 42,
//           status: "Registered",
//           limit: 10,
//           offset: 0,
//           match_type: "SMART",
//         },
//         headers: {
//           Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4NDE4NDMzOCwiaWF0IjoxNzgxNzY1MTM4LCJqdGkiOiJlM2E3M2UzOGEyODk0ZDA3OWY5OTQzZjNmNTA3YzFmOSIsInVzZXJfaWQiOiIyMzgifQ.0thhhcs_BXM1iB2J6Bub20Mu1FPRM1Q1AuhX0Vzas4M",
//         },
//       }
//     );
//     return res.status(201).json({ success: true, data: response.data, message: "Data fetched successfully" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };



export const searchController = async (req, res) => {
  try {
    const { word_mark } = req.body;

    if (!word_mark) {
      return res.status(400).json({
        status: false,
        message: "word_mark is required",
      });
    }

    const result = await api.get("", {
      params: {
        word_mark,
      },
    });

    return res.status(200).json({
      status: true,
      data: result.data,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);

    return res.status(500).json({
      status: false,
      message: error.response?.data || error.message,
    });
  }
};