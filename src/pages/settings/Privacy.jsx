import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Privacy.css";

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
export default function Privacy() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("Privacy");
  const [settings, setSettings] = useState({
    privacyVisibility: false,
    measurementVisibility: "30 minutes",
    dataRetention: true,
    shareAnonymous: false,
    allowDataCollection: false,
  });

  const toggle = (key) =>
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleSelect = (key) => (e) =>
    setSettings((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSave = () => {
    console.log("Saving privacy settings:", settings);
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

            {/* Privacy card */}
            <div className="settings-card">
              <h2>Privacy Settings</h2>

              {/* Privacy Visibility */}
              <div className="privacy-row">
                <div className="privacy-info">
                  <div className="privacy-title">Privacy Visibility</div>
                  <div className="privacy-desc">
                    Control who can see your profile information
                  </div>
                </div>
                <Toggle
                  checked={settings.privacyVisibility}
                  onChange={() => toggle("privacyVisibility")}
                />
              </div>

              {/* Measurement Visibility — dropdown */}
              <div className="privacy-row">
                <div className="privacy-info">
                  <div className="privacy-title">Measurement Visibility</div>
                  <div className="privacy-desc">
                    Who can view your clients measurements
                  </div>
                </div>
                <select
                  className="privacy-select"
                  value={settings.measurementVisibility}
                  onChange={handleSelect("measurementVisibility")}
                >
                  <option value="30 minutes">30 minutes</option>
                  <option value="1 hour">1 hour</option>
                  <option value="3 hours">3 hours</option>
                  <option value="24 hours">24 hours</option>
                  <option value="Always">Always</option>
                </select>
              </div>

              {/* Data Retention */}
              <div className="privacy-row">
                <div className="privacy-info">
                  <div className="privacy-title">Data Retention</div>
                  <div className="privacy-desc">
                    How long to keep client data
                  </div>
                </div>
                <Toggle
                  checked={settings.dataRetention}
                  onChange={() => toggle("dataRetention")}
                />
              </div>

              {/* Share Anonymous Analytics */}
              <div className="privacy-row">
                <div className="privacy-info">
                  <div className="privacy-title">Share Anonymous Analytics</div>
                  <div className="privacy-desc">
                    Help us improve by sharing anonymous data usage
                  </div>
                </div>
                <Toggle
                  checked={settings.shareAnonymous}
                  onChange={() => toggle("shareAnonymous")}
                />
              </div>

              {/* Allow Data Collection */}
              <div className="privacy-row">
                <div className="privacy-info">
                  <div className="privacy-title">Allow Data Collection</div>
                  <div className="privacy-desc">
                    Allow collection of usage data for analytics
                  </div>
                </div>
                <Toggle
                  checked={settings.allowDataCollection}
                  onChange={() => toggle("allowDataCollection")}
                />
              </div>

              {/* Privacy Information */}
              <div className="privacy-info-section">
                <h3>Privacy Information</h3>
                <p>
                  Your privacy is important to us. All data collected is stored
                  securely and will never be shared with third parties without
                  your explicit consent. You can update your privacy preferences
                  at any time.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
