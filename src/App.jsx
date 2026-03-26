// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { CompanyProvider } from "./contexts/CompanyContext";

// Layout Components
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";

// Auth Pages
import SignIn from "./pages/auth/SignIn";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
/*
import ResetPassword from "./pages/auth/ResetPassword";
import VerifyEmail from "./pages/auth/VerifyEmail";
import InvitationAccept from "./pages/auth/InvitationAccept";
import InvitationSuccess from "./pages/auth/InvitationSuccess"; */

// Main Pages
import Dashboard from "./pages/dashboard/Dashboard";
import Companies from "./pages/companies/Companies";
import CompanyDetails from "./pages/companies/CompanyDetails";
import Clients from "./pages/clients/Clients";
import ClientDetails from "./pages/clients/ClientDetails";
import NewClient from "./pages/clients/NewClient";
import Sessions from "./pages/sessions/Sessions";
import SessionDetails from "./pages/sessions/SessionDetails";
import NewSession from "./pages/sessions/NewSession";
import Templates from "./pages/templates/Templates";
import TemplateBuilder from "./pages/templates/TemplateBuilder";
import Reports from "./pages/reports/Reports";
import AuditLogs from "./pages/admin/AuditLogs";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

// Protected Route Component
import ProtectedRoute from "./components/auth/ProtectedRoute";

import "./App.css";

// Layout wrapper component
// Layout wrapper component - FIXED
const AppLayout = () => {
  const { isAuthenticated, loading } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={`main-content ${collapsed ? "sidebar-collapsed" : ""}`}>
        <Header />
        <div className="content-wrapper fade-in">
          {" "}
          {/* Add this wrapper */}
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Company Routes */}
            <Route path="/companies" element={<Companies />} />
            <Route path="/companies/:id" element={<CompanyDetails />} />

            {/* Client Routes */}
            <Route path="/clients" element={<Clients />} />
            <Route path="/clients/:id" element={<ClientDetails />} />
            <Route path="/clients/new" element={<NewClient />} />

            {/* Session Routes */}
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/sessions/new" element={<NewSession />} />
            <Route path="/sessions/:id" element={<SessionDetails />} />

            {/* Template Routes */}
            <Route path="/templates" element={<Templates />} />
            <Route path="/templates/new" element={<TemplateBuilder />} />
            <Route path="/templates/:id" element={<TemplateBuilder />} />

            {/* Report Routes */}
            <Route path="/reports" element={<Reports />} />

            {/* Admin Routes */}
            <Route path="/admin/audit-logs" element={<AuditLogs />} />

            {/* User Routes */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

function App() {
  console.log("🚀 App rendering");

  return (
    <BrowserRouter>
      <AuthProvider>
        <CompanyProvider>
          <div className="app">
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: "#fff",
                  color: "#36454F",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                },
                success: {
                  iconTheme: {
                    primary: "#8C1A2E",
                    secondary: "#fff",
                  },
                },
              }}
            />

            <Routes>
              {/* Public Routes */}
              <Route path="/signin" element={<SignIn />} />
              <Route
                path="/login"
                element={<Navigate to="/signin" replace />}
              />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              {/*  
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/invite/:token" element={<InvitationAccept />} />
              <Route
                path="/invitation-success"
                element={<InvitationSuccess />}
              /> */}

              {/* Protected Routes */}
              <Route path="/*" element={<AppLayout />} />
            </Routes>
          </div>
        </CompanyProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
