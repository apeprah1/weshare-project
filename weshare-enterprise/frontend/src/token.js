// src/token.js

// Save token(s)
export function setTokens({ access, refresh }) {
  localStorage.setItem("accessToken", access);
  localStorage.setItem("refreshToken", refresh);
}

// Get the current access token
export function getToken() {
  return localStorage.getItem("accessToken");
}

// Clear all tokens (logout or expired)
export function clearTokens() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}