import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Security.css";

// ── Icons ─────────────────────────────────────────────────────────────────────
const DashboardIcon = () => (
  <svg
    width={17}
    height={17}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const CompanyIcon = () => (
  <svg
    width={17}
    height={17}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
  </svg>
);

const UserIcon = ({ size = 17 }) => (
  <svg
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" />
  </svg>
);

const CalendarIcon = () => (
  <svg
    width={17}
    height={17}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

const TemplateIcon = () => (
  <svg
    width={17}
    height={17}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </svg>
);

const ReportIcon = () => (
  <svg
    width={17}
    height={17}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const SettingsIcon = ({ size = 17 }) => (
  <svg
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const BellIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const SearchIcon = () => (
  <svg
    width={15}
    height={15}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const LogoutIcon = () => (
  <svg
    width={17}
    height={17}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const SaveIcon = () => (
  <svg
    width={15}
    height={15}
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    viewBox="0 0 24 24"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const LockIcon = ({ size = 15 }) => (
  <svg
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const ShieldIcon = ({ size = 15 }) => (
  <svg
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const SunIcon = ({ size = 15 }) => (
  <svg
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const TrashIcon = () => (
  <svg
    width={15}
    height={15}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

// ── Toggle Component ──────────────────────────────────────────────────────────
function Toggle({ checked, onChange }) {
  return (
    <label className="toggle-wrap">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="toggle-slider" />
    </label>
  );
}

// ── Settings Sub-Nav Item ─────────────────────────────────────────────────────
function SettingsNavItem({ icon, label, active, onClick }) {
  return (
    <div className={`snav-item ${active ? "active" : ""}`} onClick={onClick}>
      {icon}
      {label}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Security() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("Security");
  const [settings, setSettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: "30 minutes",
    loginAlerts: true,
  });

  const toggle = (key) =>
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleSelect = (key) => (e) =>
    setSettings((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSave = () => {
    console.log("Saving security settings:", settings);
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone.",
    );
    if (confirmed) {
      console.log("Account deletion requested");
    }
  };

  const settingsTabs = [
    { label: "General", icon: <SettingsIcon size={15} /> },
    { label: "Notifications", icon: <BellIcon size={15} /> },
    { label: "Privacy", icon: <LockIcon size={15} /> },
    { label: "Security", icon: <ShieldIcon size={15} /> },
    { label: "Appearance", icon: <SunIcon size={15} /> },
  ];

  const navLinks = [
    { to: "/dashboard", icon: <DashboardIcon />, label: "Dashboard" },
    { to: "/companies", icon: <CompanyIcon />, label: "Companies" },
    { to: "/clients", icon: <UserIcon />, label: "Clients" },
    { to: "/sessions", icon: <CalendarIcon />, label: "Sessions" },
    { to: "/templates", icon: <TemplateIcon />, label: "Templates" },
    { to: "/reports", icon: <ReportIcon />, label: "Reports" },
    { to: "/profile", icon: <UserIcon />, label: "Profile" },
    { to: "/settings", icon: <SettingsIcon />, label: "Settings" },
  ];

  return (
    <div className="db-wrapper">
      {/* ── Sidebar ── */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">D</div>
          <span className="sidebar-logo-text">raftBoard</span>
        </div>

        <nav className="sidebar-nav">
          {navLinks.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={() => navigate("/login")}>
            <LogoutIcon />
            Logout
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="db-main">
        {/* Topbar */}
        <header className="topbar">
          <div className="search-wrap">
            <SearchIcon />
            <input
              className="search-input"
              type="text"
              placeholder="Search clients, sessions, templates…"
            />
          </div>

          <div className="topbar-right">
            <div className="notif-btn">
              <BellIcon />
              <div className="notif-dot" />
            </div>
            <div className="avatar">AJ</div>
            <div className="user-info">
              <span className="user-name">Adu Joel</span>
              <span className="user-role">Owner</span>
            </div>
            <span className="user-caret">▾</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="content">
          <div className="page-header">
            <div>
              <h1 className="page-title">Settings</h1>
              <p className="page-sub">
                Manage your application preferences and configurations
              </p>
            </div>
            <button className="save-btn" onClick={handleSave}>
              <SaveIcon />
              Save Changes
            </button>
          </div>

          <div className="settings-wrap">
            {/* Settings sub-nav */}
            <div className="settings-nav">
              {settingsTabs.map(({ label, icon }) => (
                <SettingsNavItem
                  key={label}
                  icon={icon}
                  label={label}
                  active={activeTab === label}
                  onClick={() => setActiveTab(label)}
                />
              ))}
            </div>

            {/* Security card */}
            <div className="settings-card">
              <h2>Security Settings</h2>

              {/* Two Factor Authentication */}
              <div className="security-row">
                <div className="security-info">
                  <div className="security-title">
                    Two factor Authentication
                  </div>
                  <div className="security-desc">
                    Add an extra layer of security to your account
                  </div>
                </div>
                <Toggle
                  checked={settings.twoFactorAuth}
                  onChange={() => toggle("twoFactorAuth")}
                />
              </div>

              {/* Session Timeout */}
              <div className="security-row">
                <div className="security-info">
                  <div className="security-title">
                    Session Timeout (minutes)
                  </div>
                  <div className="security-desc">
                    Automatically log out after inactivity
                  </div>
                </div>
                <select
                  className="security-select"
                  value={settings.sessionTimeout}
                  onChange={handleSelect("sessionTimeout")}
                >
                  <option value="15 minutes">15 minutes</option>
                  <option value="30 minutes">30 minutes</option>
                  <option value="1 hour">1 hour</option>
                  <option value="2 hours">2 hours</option>
                  <option value="Never">Never</option>
                </select>
              </div>

              {/* Login Alerts */}
              <div className="security-row">
                <div className="security-info">
                  <div className="security-title">Login Alerts</div>
                  <div className="security-desc">
                    Get email alerts from new logins into your account
                  </div>
                </div>
                <Toggle
                  checked={settings.loginAlerts}
                  onChange={() => toggle("loginAlerts")}
                />
              </div>

              {/* Danger Zone */}
              <div className="danger-zone">
                <div className="danger-zone-title">Danger Zone</div>
                <div className="danger-zone-box">
                  <button className="delete-btn" onClick={handleDeleteAccount}>
                    <TrashIcon />
                    Delete Account
                  </button>
                  <p className="danger-zone-warning">
                    Once you delete your account, there is no going back. Please
                    be certain.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
