// src/layout/Header.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  FiSearch,
  FiBell,
  FiChevronDown,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import SearchModal from "../components/SearchModal";
import "./Header.css";

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const menuRef = useRef(null);
  const notificationRef = useRef(null);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      console.log("Search triggered for:", searchQuery);
      setShowSearchModal(true);
    }
  };

  const handleSearchIconClick = () => {
    if (searchQuery.trim()) {
      setShowSearchModal(true);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/signin");
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    return "U";
  };

  return (
    <>
      <header className="header">
        <div className="header-left">
          <div className="search-bar">
            <FiSearch
              className="search-icon"
              onClick={handleSearchIconClick}
              style={{ cursor: "pointer" }}
            />
            <input
              type="text"
              placeholder="Search clients, sessions, templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearch}
              ref={searchInputRef}
            />
          </div>
        </div>

        <div className="header-right">
          {/* Notifications */}
          <div className="notifications" ref={notificationRef}>
            <button
              className="notification-btn"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <FiBell />
              <span className="notification-badge">3</span>
            </button>

            {showNotifications && (
              <div className="notifications-dropdown">
                <div className="dropdown-header">
                  <h4>Notifications</h4>
                  <button>Mark all as read</button>
                </div>
                <div className="notifications-list">
                  <div className="notification-item unread">
                    <div className="notification-content">
                      <p className="notification-text">
                        New client added: Ama Mensah
                      </p>
                      <span className="notification-time">2 minutes ago</span>
                    </div>
                  </div>
                  <div className="notification-item unread">
                    <div className="notification-content">
                      <p className="notification-text">
                        Measurement session completed for Kwame Asante
                      </p>
                      <span className="notification-time">1 hour ago</span>
                    </div>
                  </div>
                  <div className="notification-item">
                    <div className="notification-content">
                      <p className="notification-text">
                        New template shared: Standard Kaba Set
                      </p>
                      <span className="notification-time">3 hours ago</span>
                    </div>
                  </div>
                </div>
                <div className="dropdown-footer">
                  <button>View all notifications</button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div className="profile-menu" ref={menuRef}>
            <button
              className="profile-btn"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <div className="profile-avatar">{getUserInitials()}</div>
              <div className="profile-info">
                <span className="profile-name">
                  {user?.firstName} {user?.lastName}
                </span>
                <span className="profile-role">{user?.role || "User"}</span>
              </div>
              <FiChevronDown
                className={`chevron-icon ${showProfileMenu ? "open" : ""}`}
              />
            </button>

            {showProfileMenu && (
              <div className="profile-dropdown">
                <div className="dropdown-header">
                  <div className="dropdown-user-info">
                    <div className="dropdown-avatar">{getUserInitials()}</div>
                    <div>
                      <p className="dropdown-name">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="dropdown-email">{user?.email}</p>
                    </div>
                  </div>
                </div>
                <div className="dropdown-divider" />
                <button
                  className="dropdown-item"
                  onClick={() => navigate("/profile")}
                >
                  <FiUser /> Profile
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => navigate("/settings")}
                >
                  <FiSettings /> Settings
                </button>
                <div className="dropdown-divider" />
                <button className="dropdown-item danger" onClick={handleLogout}>
                  <FiLogOut /> Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        searchQuery={searchQuery}
      />
    </>
  );
};

export default Header;
