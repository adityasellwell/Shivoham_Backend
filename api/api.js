import axios from "axios";

const api = axios.create({
  baseURL: "https://api.binbash.ai/api/v2/trademarks/",
  headers: {
    Authorization: `Api-Key ${process.env.BINBASH_API_KEY}`,
  },
});

export default api;