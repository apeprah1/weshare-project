import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api";

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // you can add 401 handling here if you like
    return Promise.reject(error);
  }
);

// ---------- AUTH HELPERS ----------

export async function signup(username, password) {
  console.log("signup() called with", username);
  const res = await api.post("/register/", { username, password });
  console.log("signup() response:", res.data);
  return res.data;
}

export async function login(username, password) {
  console.log("login() called with", username);
  const res = await api.post("/token/", { username, password });
  const { access, refresh } = res.data;
  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);
  return res.data;
}