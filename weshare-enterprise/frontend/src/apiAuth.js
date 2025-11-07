import { api } from "./api";
import { setTokens } from "./auth";

// Register new user
export async function signup(username, password) {
  const res = await api.post("/register/", { username, password });
  return res.data; // { message, username } or { error }
}

// Login, get JWT, store in localStorage
export async function login(username, password) {
  const res = await api.post("/token/", { username, password });
  const { access, refresh } = res.data;
  setTokens(access, refresh);
  return res.data;
}