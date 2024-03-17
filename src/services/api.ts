import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    if (import.meta.env.VITE_FORCE_ORIGIN) {
      config.headers["force-origin"] = import.meta.env.VITE_FORCE_ORIGIN;
    }

    return config;
  },

  (error) => {
    console.error(error);
  }
);

export { api };
