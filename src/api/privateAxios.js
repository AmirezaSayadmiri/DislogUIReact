import axios from "axios";
import myAxios from "./axios";
import useAuth from "../hooks/useAuth";
import { useDispatch } from "react-redux";


const privateAxios = axios.create({
  baseURL: "http://localhost:8000",
});

privateAxios.interceptors.request.use(
  (config) => {
    const access = localStorage.getItem("access");
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

privateAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest.__isRetry) {
      originalRequest.__isRetry = true;
      try {
        const refreshToken = localStorage.getItem("refresh");

        if (!refreshToken) {
          throw new Error("Refresh token not available");
        }

        const {
          data: { access },
        } = await myAxios.post("/refresh", { refresh: refreshToken });

        localStorage.setItem("access", access);

        originalRequest.headers.Authorization = `Bearer ${access}`;
        return privateAxios(originalRequest);
        
      } catch (err) {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("user");
        localStorage.removeItem("userId");
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        console.log("Error refreshing token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default privateAxios;
