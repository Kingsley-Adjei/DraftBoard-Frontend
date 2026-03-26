// src/services/authService.js
import api from "./api";

export const authService = {
  register: (data) => api.post("/auth/register", data),
  login: (email, password) => api.post("/auth/login", { email, password }),
  logout: (refreshToken) => api.post("/auth/logout", { refreshToken }),
  refreshToken: (refreshToken) =>
    api.post("/auth/refresh-token", { refreshToken }),
  getCurrentUser: () => api.get("/auth/me"),
  updateProfile: (data) => api.put("/auth/me", data),
  forgotPassword: (email) => {
    console.log("Sending forgot password request with email:", email);
    console.log("Request body:", { email });
    return api.post("/auth/forgot-password", { email });
  },
  resetPassword: (token, newPassword) =>
    api.post("/auth/reset-password", { token, newPassword }),
  verifyEmail: (token) => api.post("/auth/verify-email", { token }),
  resendVerification: (email) =>
    api.post("/auth/resend-verification", { email }),
};
