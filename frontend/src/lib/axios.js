import axios from "axios";

// const Base_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "https://syncly-backend-tan.vercel.app/api"

const Base_URL = import.meta.env.VITE_API_BASE_URL

 export const axiosInstance = axios.create({
    baseURL: Base_URL,
    withCredentials: true, // send the token with the request 
  });
  