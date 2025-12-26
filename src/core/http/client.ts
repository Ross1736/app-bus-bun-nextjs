import axios from "axios";
import { envApp } from "../config/env";

export const http = axios.create({
  baseURL: `${envApp.baseURL}${envApp.path}`,
  withCredentials: true,
  timeout: 10000,
});

http.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
