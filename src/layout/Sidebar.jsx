// src/components/layout/Sidebar.jsx
import React, { useState } from "react";
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
} from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";
import "./Sidebar.css";
import Logo from "../assets/logo.png";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

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

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    navigate("/login");
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

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <div className="logo">
          <img src={Logo} alt="Logo" className="logo-icon" />
          {!collapsed && <span className="logo-text">raftBoard</span>}
        </div>
        <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${isActive(item.path) ? "active" : ""}`}
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
        >
          <FiLogOut className="nav-icon" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="logout-modal-overlay">
          <div className="logout-modal">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to log out?</p>
            <div className="logout-modal-actions">
              <button
                className="btn btn-secondary"
                onClick={handleCancelLogout}
              >
                Cancel
              </button>
              <button className="btn btn-danger" onClick={handleConfirmLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
