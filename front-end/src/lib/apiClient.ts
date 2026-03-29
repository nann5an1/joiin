import axios from "axios";

//api client base that will be used for all requests
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api/v0.1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});


export default apiClient;
