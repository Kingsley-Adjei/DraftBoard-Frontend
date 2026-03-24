// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { authService } from "../services/authService";

// Create context with a default value
const AuthContext = createContext(null);

// Custom hook with better error message
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

// Provider component
export const AuthProvider = ({ children }) => {
  console.log("🔴 AuthProvider INITIALIZING");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log("🔴 AuthProvider mounted - checking auth");
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem("accessToken");
    console.log("🔴 Checking auth - token exists:", !!token);

    if (token) {
      try {
        const response = await authService.getCurrentUser();
        console.log("🔴 Auth check response:", response);
        setUser(response.data.data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("🔴 Auth check failed:", error);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsAuthenticated(false);
      }
    }
    setLoading(false);
    console.log("🔴 AuthProvider loading complete");
  };

  const login = async (email, password) => {
    console.log("🔴 Login attempt:", email);
    try {
      const response = await authService.login(email, password);
      console.log("🔴 Login response:", response);

      const { token, refreshToken, user, companyId, companyName } =
        response.data.data;

      localStorage.setItem("accessToken", token);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("companyId", companyId || "");
      localStorage.setItem("companyName", companyName || "");

      setUser(user);
      setIsAuthenticated(true);

      return { success: true, data: response.data.data };
    } catch (error) {
      console.error("🔴 Login error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  const register = async (userData) => {
    console.log("🔴 Register attempt:", userData.email);
    try {
      const response = await authService.register(userData);
      console.log("🔴 Register response:", response);

      const { token, refreshToken, user, companyId, companyName } =
        response.data.data;

      localStorage.setItem("accessToken", token);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("companyId", companyId || "");
      localStorage.setItem("companyName", companyName || "");

      setUser(user);
      setIsAuthenticated(true);

      return { success: true, data: response.data.data };
    } catch (error) {
      console.error("🔴 Register error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      try {
        await authService.logout(refreshToken);
      } catch (error) {
        console.error("🔴 Logout error:", error);
      }
    }

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("companyId");
    localStorage.removeItem("companyName");

    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
  };

  console.log("🔴 AuthProvider rendering with value:", {
    loading,
    isAuthenticated,
  });

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
