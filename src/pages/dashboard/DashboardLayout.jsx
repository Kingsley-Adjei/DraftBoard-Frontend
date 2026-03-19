import { useState, useRef, useEffect } from "react";
import { useToast } from "../../components/ui/Toast";
import "./DashboardLayout.css";

const NAV_ITEMS = [
  { id: "dashboard", label: "DashBoard", icon: "grid" },
  { id: "companies", label: "Companies", icon: "building" },
  { id: "clients", label: "Clients", icon: "users" },
  { id: "sessions", label: "Sessions", icon: "calendar" },
  { id: "templates", label: "Templates", icon: "layers" },
  { id: "reports", label: "Reports", icon: "bar-chart" },
  { id: "profile", label: "Profile", icon: "user" },
  { id: "settings", label: "Settings", icon: "settings" },
];

function Icon({ name }) {
  const icons = {
    grid: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    building: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    users: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    calendar: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    layers: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    "bar-chart": (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    user: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    settings: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    logout: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
    ),
    bell: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
    chevron_down: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    ),
    chevron_right: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    ),
    chevron_left: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>
    ),
    search: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
  };
  return <span className="db-icon">{icons[name]}</span>;
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({
  collapsed,
  setCollapsed,
  activePage,
  setActivePage,
  onLogout,
}) {
  return (
    <aside className={`db-sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="db-sidebar-top">
        {/* Brand */}
        <div className="db-brand">
          <span className="db-brand-d">D</span>
          {!collapsed && <span className="db-brand-rest">raftBoard</span>}
          <button
            className="db-collapse-btn"
            onClick={() => setCollapsed((c) => !c)}
            title={collapsed ? "Expand" : "Collapse"}
          >
            <Icon name={collapsed ? "chevron_right" : "chevron_left"} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="db-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`db-nav-item ${activePage === item.id ? "active" : ""}`}
              onClick={() => setActivePage(item.id)}
              title={collapsed ? item.label : undefined}
            >
              <Icon name={item.icon} />
              {!collapsed && <span className="db-nav-label">{item.label}</span>}
              {activePage === item.id && <span className="db-active-bar" />}
            </button>
          ))}
        </nav>
      </div>

      {/* Logout pinned to bottom */}
      <div className="db-sidebar-bottom">
        <button
          className="db-nav-item db-logout-btn"
          onClick={onLogout}
          title={collapsed ? "Logout" : undefined}
        >
          <Icon name="logout" />
          {!collapsed && <span className="db-nav-label">Logout</span>}
        </button>
      </div>
    </aside>
  );
}

// ─── Topbar ───────────────────────────────────────────────────────────────────
function Topbar({ user, onNotifications }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const toast = useToast();

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="db-topbar">
      <div className="db-search-wrap">
        <Icon name="search" />
        <input
          className="db-search-input"
          placeholder="Search clients, sessions, templates..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.target.value.trim()) {
              toast({
                message: `Searching for "${e.target.value}"…`,
                type: "info",
              });
            }
          }}
        />
      </div>

      <div className="db-topbar-right">
        <button className="db-notif-btn" onClick={onNotifications}>
          <Icon name="bell" />
          <span className="db-notif-dot" />
        </button>

        <div className="db-user-menu-wrap" ref={menuRef}>
          <button
            className="db-user-btn"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <div className="db-avatar">{user.initials}</div>
            <div className="db-user-text">
              <span className="db-user-name">{user.name}</span>
              <span className="db-user-role">{user.role}</span>
            </div>
            <span className={`db-chevron-wrap ${menuOpen ? "open" : ""}`}>
              <Icon name="chevron_down" />
            </span>
          </button>

          {menuOpen && (
            <div className="db-user-dropdown">
              <button
                className="db-dd-item"
                onClick={() => {
                  setMenuOpen(false);
                  toast({ message: "Opening your profile...", type: "info" });
                }}
              >
                <Icon name="user" /> View Profile
              </button>
              <button
                className="db-dd-item"
                onClick={() => {
                  setMenuOpen(false);
                  toast({ message: "Opening settings...", type: "info" });
                }}
              >
                <Icon name="settings" /> Settings
              </button>
              <div className="db-dd-divider" />
              <button
                className="db-dd-item danger"
                onClick={() => {
                  setMenuOpen(false);
                  toast({ message: "Signing you out...", type: "warning" });
                }}
              >
                <Icon name="logout" /> Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// ─── Layout Shell ─────────────────────────────────────────────────────────────
export default function DashboardLayout({
  children,
  activePage,
  setActivePage,
}) {
  const [collapsed, setCollapsed] = useState(true);
  const toast = useToast();

  const user = { name: "Adu Joel", role: "Owner", initials: "AJ" };

  return (
    <div
      className={`db-layout ${collapsed ? "sidebar-collapsed" : "sidebar-expanded"}`}
    >
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activePage={activePage}
        setActivePage={setActivePage}
        onLogout={() =>
          toast({ message: "Signing you out...", type: "warning" })
        }
      />
      <div className="db-main">
        <Topbar
          user={user}
          onNotifications={() =>
            toast({ message: "No new notifications", type: "info" })
          }
        />
        <main className="db-page-content">{children}</main>
      </div>
    </div>
  );
}
