// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { authService } from "../services/authService";
import toast from "react-hot-toast";

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
        const userData = response.data.data;

        // Check if companyId exists in user data or localStorage
        if (!userData.companyId) {
          userData.companyId = localStorage.getItem("companyId");
          userData.companyName = localStorage.getItem("companyName");
        }

        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("🔴 Auth check failed:", error);
        // Clear invalid tokens
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("companyId");
        localStorage.removeItem("companyName");
        setIsAuthenticated(false);
        setUser(null);
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

      if (companyId) {
        localStorage.setItem("companyId", companyId);
        localStorage.setItem("companyName", companyName || "");
      }

      setUser(user);
      setIsAuthenticated(true);

      toast.success(`Welcome back, ${user.firstName}!`);
      return { success: true, data: response.data.data };
    } catch (error) {
      console.error("🔴 Login error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Login failed. Please check your credentials.";
      toast.error(errorMessage);
      return {
        success: false,
        message: errorMessage,
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

      if (companyId) {
        localStorage.setItem("companyId", companyId);
        localStorage.setItem("companyName", companyName || "");
      }

      setUser(user);
      setIsAuthenticated(true);

      toast.success(
        `Welcome to FitFolio, ${user.firstName}! Please check your email to verify your account.`
      );
      return { success: true, data: response.data.data };
    } catch (error) {
      console.error("🔴 Register error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      toast.error(errorMessage);
      return {
        success: false,
        message: errorMessage,
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
    toast.success("Logged out successfully");
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    // Update localStorage if needed
    if (updatedUser.companyId) {
      localStorage.setItem("companyId", updatedUser.companyId);
      localStorage.setItem("companyName", updatedUser.companyName || "");
    }
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
    hasUser: !!user,
  });

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
