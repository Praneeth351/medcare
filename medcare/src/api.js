import axios from "axios";

const axiosInstance = axios.create();

const serverUrl = process.env.REACT_APP_SERVER || "http://localhost:5000";
const baseUrl = `${serverUrl}/api`;

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["x-auth-token"] = accessToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const refresh = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (refreshToken) {
    try {
      const res = await axiosInstance.post(`${baseUrl}/auth/refresh`, {
        refreshToken,
      });
      if (res.status === 200) {
        localStorage.setItem("accessToken", res.data.accessToken);
        return res.data.accessToken;
      }
    } catch (err) {
      console.error(err);
    }
  }

  return null;
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const accessToken = await refresh();
      if (accessToken) {
        return axiosInstance(originalRequest);
      } else {
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
        window.location.href = "/signin";
      }
    }
    return Promise.reject(error);
  }
);

const api = {
  signup: (body) => axiosInstance.post(`${baseUrl}/auth/signup`, body),
  signin: (body) => axiosInstance.post(`${baseUrl}/auth/signin`, body),
  refreshToken: (body) => axiosInstance.post(`${baseUrl}/auth/refresh`, body),
  logout: (body) => axiosInstance.delete(`${baseUrl}/auth/logout`, { data: body }),

  unverified: () => axiosInstance.get(`${baseUrl}/users/unverified`),
  findUser: (body) => axiosInstance.post(`${baseUrl}/users/finduser`, body),
  verify: (body) => axiosInstance.post(`${baseUrl}/users/unverified/verify`, body),
  reject: (body) => axiosInstance.delete(`${baseUrl}/users/unverified/reject`, { data: body }),

  docList: () => axiosInstance.get(`${baseUrl}/users/doctors`),
  staffList: () => axiosInstance.get(`${baseUrl}/users/staffs`),
  getFeedbacks: () => axiosInstance.get(`${baseUrl}/users/feedbacks`),
  generateStats: () => axiosInstance.get(`${baseUrl}/generate/stats`),

  bookAppointment: (body) => axiosInstance.post(`${baseUrl}/appointment/book`, body),
  duePayment: (body) => axiosInstance.post(`${baseUrl}/appointment/duepayment`, body),
  makePayment: (body) => axiosInstance.post(`${baseUrl}/appointment/duepayment/makepayment`, body),
  myAppointments: (body) => axiosInstance.post(`${baseUrl}/patient/appointments`, body),
  cancelAppointment: (body) => axiosInstance.post(`${baseUrl}/appointment/cancel`, body),
  prescriptions: (body) => axiosInstance.post(`${baseUrl}/patient/prescriptions`, body),
  writeFeedback: (body) => axiosInstance.post(`${baseUrl}/patient/appointments/feedbacks/write`, body),
  deleteFeedback: (body) => axiosInstance.post(`${baseUrl}/patient/appointments/feedbacks/delete`, body),

  docAppointments: (body) => axiosInstance.post(`${baseUrl}/doctor/appointments`, body),
  uploadPrescription: (body) => axiosInstance.post(`${baseUrl}/doctor/prescription/upload`, body),
  docFeedbacks: (body) => axiosInstance.post(`${baseUrl}/doctor/appointments/feedbacks`, body),

  findPatient: (body) => axiosInstance.post(`${baseUrl}/staff/find/patient`, body),
};

export default api;
