import axios from "axios";

const normalize = (base, path) => `${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;

const serverUrl = process.env.REACT_APP_SERVER || "http://localhost:5000";
const baseUrl = normalize(serverUrl, "/api");

const axiosInstance = axios.create();

axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["x-auth-token"] = accessToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
