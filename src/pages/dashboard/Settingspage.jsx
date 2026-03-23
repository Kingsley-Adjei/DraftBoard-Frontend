import { useState } from "react";
import "./SettingsPage.css";

// ── Toggle ────────────────────────────────────────────────────────────────────
function Toggle({ checked, onChange }) {
  return (
    <label className="sp-toggle">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="sp-slider" />
    </label>
  );
}

// ── Sub-nav ───────────────────────────────────────────────────────────────────
const TABS = ["General", "Notifications", "Privacy", "Security", "Appearance"];

function SettingsNav({ active, onSelect }) {
  return (
    <div className="sp-sidenav">
      {TABS.map((tab) => (
        <button
          key={tab}
          className={`sp-sidenav-item ${active === tab ? "active" : ""}`}
          onClick={() => onSelect(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

// ── Row helper ────────────────────────────────────────────────────────────────
function Row({ title, desc, children }) {
  return (
    <div className="sp-row">
      <div className="sp-row-info">
        <div className="sp-row-title">{title}</div>
        <div className="sp-row-desc">{desc}</div>
      </div>
      <div className="sp-row-control">{children}</div>
    </div>
  );
}

// ── General ───────────────────────────────────────────────────────────────────
function GeneralTab() {
  const [form, setForm] = useState({
    companyName: "Premium Tailors",
    businessEmail: "info@premiumtailors.com",
    businessPhone: "+233 50 955 9015",
    address: "J.O. Anoo Gotfried road, AK 185-664",
  });
  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  return (
    <div className="sp-form">
      <div className="sp-form-group">
        <label className="sp-label">Company Name</label>
        <input
          className="sp-input"
          value={form.companyName}
          onChange={set("companyName")}
        />
      </div>
      <div className="sp-form-group">
        <label className="sp-label">Business Email</label>
        <input
          className="sp-input"
          type="email"
          value={form.businessEmail}
          onChange={set("businessEmail")}
        />
      </div>
      <div className="sp-form-group">
        <label className="sp-label">Business Phone</label>
        <input
          className="sp-input"
          type="tel"
          value={form.businessPhone}
          onChange={set("businessPhone")}
        />
      </div>
      <div className="sp-form-group">
        <label className="sp-label">Address</label>
        <input
          className="sp-input"
          value={form.address}
          onChange={set("address")}
        />
      </div>
    </div>
  );
}

// ── Notifications ─────────────────────────────────────────────────────────────
function NotificationsTab() {
  const [prefs, setPrefs] = useState({
    newSession: false,
    clientUpdates: false,
    teamInvitations: true,
    weeklyReports: false,
  });
  const toggle = (k) => setPrefs((p) => ({ ...p, [k]: !p[k] }));

  const items = [
    {
      key: "newSession",
      title: "New Session Created",
      desc: "Get notified when a new measurement session is created",
    },
    {
      key: "clientUpdates",
      title: "Clients Updates",
      desc: "Receive notifications when client information is updated",
    },
    {
      key: "teamInvitations",
      title: "Team Invitations",
      desc: "Get notified when team members join or are invited",
    },
    {
      key: "weeklyReports",
      title: "Weekly Reports",
      desc: "Receive weekly analytics and performance reports",
    },
  ];

  return items.map(({ key, title, desc }) => (
    <Row key={key} title={title} desc={desc}>
      <Toggle checked={prefs[key]} onChange={() => toggle(key)} />
    </Row>
  ));
}

// ── Privacy ───────────────────────────────────────────────────────────────────
function PrivacyTab() {
  const [s, setS] = useState({
    visibility: false,
    measurement: "30 minutes",
    retention: true,
    anonymous: false,
    collection: false,
  });
  const toggle = (k) => setS((p) => ({ ...p, [k]: !p[k] }));

  return (
    <>
      <Row
        title="Privacy Visibility"
        desc="Control who can see your profile information"
      >
        <Toggle checked={s.visibility} onChange={() => toggle("visibility")} />
      </Row>
      <Row
        title="Measurement Visibility"
        desc="Who can view your clients measurements"
      >
        <select
          className="sp-select"
          value={s.measurement}
          onChange={(e) => setS((p) => ({ ...p, measurement: e.target.value }))}
        >
          <option>30 minutes</option>
          <option>1 hour</option>
          <option>3 hours</option>
          <option>24 hours</option>
          <option>Always</option>
        </select>
      </Row>
      <Row title="Data Retention" desc="How long to keep client data">
        <Toggle checked={s.retention} onChange={() => toggle("retention")} />
      </Row>
      <Row
        title="Share Anonymous Analytics"
        desc="Help us improve by sharing anonymous data usage"
      >
        <Toggle checked={s.anonymous} onChange={() => toggle("anonymous")} />
      </Row>
      <Row
        title="Allow Data Collection"
        desc="Allow collection of usage data for analytics"
      >
        <Toggle checked={s.collection} onChange={() => toggle("collection")} />
      </Row>
      <div className="sp-info-section">
        <h3>Privacy Information</h3>
        <p>
          Your privacy is important to us. All data collected is stored securely
          and will never be shared with third parties without your explicit
          consent.
        </p>
      </div>
    </>
  );
}

// ── Security ──────────────────────────────────────────────────────────────────
function SecurityTab() {
  const [s, setS] = useState({
    twoFactor: false,
    timeout: "30 minutes",
    loginAlerts: true,
  });
  const toggle = (k) => setS((p) => ({ ...p, [k]: !p[k] }));

  const handleDelete = () => {
    if (window.confirm("Are you sure? This action cannot be undone.")) {
      console.log("Account deletion requested");
    }
  };

  return (
    <>
      <Row
        title="Two factor Authentication"
        desc="Add an extra layer of security to your account"
      >
        <Toggle checked={s.twoFactor} onChange={() => toggle("twoFactor")} />
      </Row>
      <Row
        title="Session Timeout (minutes)"
        desc="Automatically log out after inactivity"
      >
        <select
          className="sp-select"
          value={s.timeout}
          onChange={(e) => setS((p) => ({ ...p, timeout: e.target.value }))}
        >
          <option>15 minutes</option>
          <option>30 minutes</option>
          <option>1 hour</option>
          <option>2 hours</option>
          <option>Never</option>
        </select>
      </Row>
      <Row
        title="Login Alerts"
        desc="Get email alerts from new logins into your account"
      >
        <Toggle
          checked={s.loginAlerts}
          onChange={() => toggle("loginAlerts")}
        />
      </Row>
      <div className="sp-danger-zone">
        <div className="sp-danger-title">Danger Zone</div>
        <div className="sp-danger-box">
          <button className="sp-delete-btn" onClick={handleDelete}>
            🗑 Delete Account
          </button>
          <p className="sp-danger-warning">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
        </div>
      </div>
    </>
  );
}

// ── Appearance ────────────────────────────────────────────────────────────────
function AppearanceTab() {
  const [s, setS] = useState({
    theme: "Light",
    fontSize: "Medium",
    sidebarCollapsed: true,
  });

  return (
    <>
      <Row title="Theme" desc="Choose your preferred theme">
        <div className="sp-theme-group">
          {["Light", "Dark", "System"].map((t) => (
            <button
              key={t}
              className={`sp-theme-btn ${s.theme === t ? "active" : ""}`}
              onClick={() => setS((p) => ({ ...p, theme: t }))}
            >
              {t}
            </button>
          ))}
        </div>
      </Row>
      <Row title="Font Size" desc="Adjust the text throughout the app">
        <select
          className="sp-select"
          value={s.fontSize}
          onChange={(e) => setS((p) => ({ ...p, fontSize: e.target.value }))}
        >
          <option>Small</option>
          <option>Medium</option>
          <option>Large</option>
          <option>Extra Large</option>
        </select>
      </Row>
      <Row
        title="Sidebar Collapsed"
        desc="Start with sidebar collapsed by default"
      >
        <Toggle
          checked={s.sidebarCollapsed}
          onChange={() =>
            setS((p) => ({ ...p, sidebarCollapsed: !p.sidebarCollapsed }))
          }
        />
      </Row>
    </>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("General");

  const handleSave = () => {
    console.log("Settings saved");
  };

  const renderTab = () => {
    switch (activeTab) {
      case "General":
        return <GeneralTab />;
      case "Notifications":
        return <NotificationsTab />;
      case "Privacy":
        return <PrivacyTab />;
      case "Security":
        return <SecurityTab />;
      case "Appearance":
        return <AppearanceTab />;
      default:
        return <GeneralTab />;
    }
  };

  return (
    <div className="sp-wrapper">
      {/* Page header */}
      <div className="sp-page-header">
        <div>
          <h1 className="sp-page-title">Settings</h1>
          <p className="sp-page-sub">
            Manage your application preferences and configurations
          </p>
        </div>
        <button className="sp-save-btn" onClick={handleSave}>
          ✓ Save Changes
        </button>
      </div>

      {/* Body */}
      <div className="sp-body">
        <SettingsNav active={activeTab} onSelect={setActiveTab} />
        <div className="sp-card">
          <h2 className="sp-card-title">{activeTab} Settings</h2>
          {renderTab()}
        </div>
      </div>
    </div>
  );
}
