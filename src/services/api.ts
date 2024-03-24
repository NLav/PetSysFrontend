import axios, { AxiosError } from "axios";
import { LocalStorageService } from "./LocalStorageService";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    if (import.meta.env.VITE_FORCE_ORIGIN) {
      config.headers["force-origin"] = import.meta.env.VITE_FORCE_ORIGIN;
    }

    config.headers["Authorization"] =
      `Bearer ${LocalStorageService.getAccessToken()}`;

    return config;
  },

  (error) => {
    console.error(error);
  }
);

api.interceptors.response.use(
  (config) => {
    return config;
  },
  (error: AxiosError) => {
    console.error(error);

    if (
      error.response?.status === 401 &&
      LocalStorageService.getAccessToken()
    ) {
      LocalStorageService.deleteAccessToken();
      window.location.href = "/login";
    }
  }
);

export { api };
