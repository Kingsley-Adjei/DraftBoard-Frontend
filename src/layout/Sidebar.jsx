// src/components/layout/Sidebar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiClipboard,
  FiLayers,
  FiPieChart,
  FiSettings,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
  FiBriefcase,
  FiUser,
  FiShield,
  FiMenu,
} from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";
import { useCompany } from "../contexts/CompanyContext";
import Logo from "../assets/logo.png";
import "./Sidebar.css";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated, loading } = useAuth();
  const { currentCompany, companies, switchCompany } = useCompany();

  // Handle mobile sidebar toggle
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile sidebar when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const menuItems = [
    { path: "/dashboard", icon: FiHome, label: "Dashboard" },
    { path: "/companies", icon: FiBriefcase, label: "Companies" },
    { path: "/clients", icon: FiUsers, label: "Clients" },
    { path: "/sessions", icon: FiClipboard, label: "Sessions" },
    { path: "/templates", icon: FiLayers, label: "Templates" },
    { path: "/reports", icon: FiPieChart, label: "Reports" },
    { path: "/profile", icon: FiUser, label: "Profile" },
    { path: "/settings", icon: FiSettings, label: "Settings" },
  ];

  // Add admin menu item if user is admin
  if (user?.role === "ADMIN") {
    menuItems.push({
      path: "/admin/audit-logs",
      icon: FiShield,
      label: "Audit Logs",
    });
  }

  const isActive = (path) => {
    if (path === "/dashboard" && location.pathname === "/") return true;
    return location.pathname === path;
  };

  const handleLogout = async () => {
    await logout();
    navigate("/signin");
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false);
    handleLogout();
  };

  // Don't render sidebar if not authenticated
  if (!isAuthenticated && !loading) {
    return null;
  }

  const sidebarClasses = `sidebar ${collapsed ? "collapsed" : ""} ${
    mobileOpen ? "mobile-open" : ""
  }`;

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <FiMenu />
      </button>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />
      )}

      <div className={sidebarClasses}>
        <div className="sidebar-header">
          <div className="logo">
            <img src={Logo} alt="raftBoard Logo" className="logo-icon" />
            {!collapsed && <span className="logo-text">raftBoard</span>}
          </div>
          <button
            className="collapse-btn"
            onClick={() => {
              console.log("Collapse button clicked, current:", collapsed);
              setCollapsed(!collapsed);
            }}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
          </button>
        </div>

        {/* Company Switcher (if multiple companies) */}
        {!collapsed && companies && companies.length > 1 && (
          <div className="company-switcher">
            <select
              value={currentCompany?.id || ""}
              onChange={(e) => {
                const selected = companies.find((c) => c.id === e.target.value);
                if (selected) switchCompany(selected);
              }}
              className="company-select"
            >
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive(item.path) ? "active" : ""}`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="nav-icon" />
              {!collapsed && <span className="nav-label">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button
            className="logout-btn"
            onClick={handleLogoutClick}
            aria-label="Logout"
            title={collapsed ? "Logout" : undefined}
          >
            <FiLogOut className="nav-icon" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>

        {/* Logout Confirmation Modal */}
        {showLogoutConfirm && (
          <div className="logout-modal-overlay" onClick={handleCancelLogout}>
            <div className="logout-modal" onClick={(e) => e.stopPropagation()}>
              <h3>Confirm Logout</h3>
              <p>Are you sure you want to log out?</p>
              <div className="logout-modal-actions">
                <button
                  className="btn btn-secondary"
                  onClick={handleCancelLogout}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleConfirmLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
