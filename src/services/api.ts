import axios from "axios";

const localConection = true;

const api = axios.create({
  baseURL: localConection
    ? "http://localhost:3001"
    : "https://stock-manager-api-lrb6.onrender.com",
  timeout: 8000,
});

export default api;
