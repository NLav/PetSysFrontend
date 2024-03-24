import axios, { AxiosError } from "axios";
import { LocalStorageService } from "./LocalStorageService";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((request) => {
  if (LocalStorageService.getLoginInformation()) {
    request.headers.Authorization = `Bearer ${LocalStorageService.getLoginInformation()?.access_token}`;
  }

  return request;
});

api.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error: AxiosError) => {
    if (
      error.response?.status === 401 &&
      LocalStorageService.getLoginInformation()
    ) {
      LocalStorageService.deleteLoginInformation();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export { api };
