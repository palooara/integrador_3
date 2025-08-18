
import axios from "axios";

const api = axios.create({
  baseURL: "https://integrador-3-spod.onrender.com", // 🔗 tu backend en Render
  withCredentials: true, // 🔑 importante para enviar la cookie de sesión
});

export default api;
