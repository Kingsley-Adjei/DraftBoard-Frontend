// src/contexts/CompanyContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { companyService } from "../services/companyService";
import { useAuth } from "./AuthContext";

const CompanyContext = createContext();

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("useCompany must be used within CompanyProvider");
  }
  return context;
};

export const CompanyProvider = ({ children }) => {
  const [currentCompany, setCurrentCompany] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, loading: authLoading } = useAuth();

  useEffect(() => {
    // Only load companies if authenticated
    if (isAuthenticated && !authLoading) {
      loadCompanies();
    } else if (!authLoading && !isAuthenticated) {
      // Not authenticated, don't load companies
      setLoading(false);
    }
  }, [isAuthenticated, authLoading]);

  const loadCompanies = async () => {
    try {
      setLoading(true);
      const response = await companyService.getMyCompanies();
      setCompanies(response.data.data);
      if (response.data.data.length > 0 && !currentCompany) {
        setCurrentCompany(response.data.data[0]);
      }
    } catch (error) {
      console.error("Failed to load companies:", error);
      // If unauthorized, just set empty companies
      if (error.response?.status === 401) {
        setCompanies([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const switchCompany = (company) => {
    setCurrentCompany(company);
    localStorage.setItem("companyId", company.id);
    localStorage.setItem("companyName", company.name);
  };

  const value = {
    currentCompany,
    companies,
    loading: loading || authLoading,
    switchCompany,
    loadCompanies,
  };

  return (
    <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>
  );
};
