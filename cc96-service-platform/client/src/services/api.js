import axios from "axios";

const API = axios.create({
  baseURL: "https://cc96-service-platform.onrender.com/api",
});

export default API;