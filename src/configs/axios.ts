import axios from "axios";
import "dotenv/config";

export const evolutionApi = axios.create({
  baseURL: "http://localhost:8001",
  headers: {
    apikey: process.env.AUTHENTICATION_API_KEY,
  },
});
