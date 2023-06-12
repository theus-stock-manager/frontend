import axios from "axios";

const localConection = true;

const api = axios.create({
  baseURL: localConection
    ? "http://localhost:3001" /* "http://192.168.1.10:3001" */ // ip da conexão local para que funcione também no celular
    : "https://stock-manager-api-1-1-0.onrender.com",
  timeout: 8000,
});

export default api;
