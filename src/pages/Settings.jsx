import React, { useState } from "react";
import {
  FiBell,
  FiGlobe,
  FiLock,
  FiEye,
  FiMail,
  FiShield,
  FiSave,
  FiTrash2,
  FiToggleLeft,
  FiToggleRight,
  FiSun,
  FiMoon,
  FiMonitor,
  FiDroplet,
  FiUsers,
  FiUserCheck,
} from "react-icons/fi";
import "./Settings.css";

const Settings = () => {
  const [activeSection, setActiveSection] = useState("general");
  const [settings, setSettings] = useState({
    // General Settings
    companyName: "Premium Tailors",
    businessEmail: "info@premiumtailors.com",
    businessPhone: "+233 24 123 4567",
    address: "123 Fashion Street, Accra, Ghana",
    timezone: "Africa/Accra",
    dateFormat: "DD/MM/YYYY",
    currency: "GHS",

    // Notification Settings
    emailNotifications: {
      newSession: true,
      clientUpdates: true,
      teamInvites: true,
      weeklyReports: false,
      marketingEmails: false,
      sessionReminders: true,
      paymentAlerts: true,
    },

    // Privacy Settings
    profileVisibility: "public",
    showMeasurements: "team_only",
    dataRetention: "12months",
    shareAnalytics: false,
    allowDataCollection: true,
    showOnlineStatus: true,

    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: "30",
    loginAlerts: true,
    deviceHistory: true,
    ipWhitelisting: false,

    // Appearance
    theme: "light",
    compactView: false,
    fontSize: "medium",
    colorScheme: "default",
    sidebarCollapsed: false,
    animations: true,

    // Backup Settings
    autoBackup: true,
    backupFrequency: "weekly",
    backupLocation: "cloud",
    lastBackup: "2024-03-01",
  });

  const handleToggle = (section, key) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: !prev[section][key],
      },
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNestedChange = (section, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const handleSave = () => {
    // Save settings logic
    console.log("Settings saved:", settings);
    // Show success message
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <div>
          <h1>Settings</h1>
          <p className="text-secondary">
            Manage your application preferences and configurations
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleSave}>
          <FiSave /> Save Changes
        </button>
      </div>

      <div className="settings-container">
        <div className="settings-sidebar">
          <button
            className={`settings-nav-item ${
              activeSection === "general" ? "active" : ""
            }`}
            onClick={() => setActiveSection("general")}
          >
            <FiGlobe /> General
          </button>
          <button
            className={`settings-nav-item ${
              activeSection === "notifications" ? "active" : ""
            }`}
            onClick={() => setActiveSection("notifications")}
          >
            <FiBell /> Notifications
          </button>
          <button
            className={`settings-nav-item ${
              activeSection === "privacy" ? "active" : ""
            }`}
            onClick={() => setActiveSection("privacy")}
          >
            <FiEye /> Privacy
          </button>
          <button
            className={`settings-nav-item ${
              activeSection === "security" ? "active" : ""
            }`}
            onClick={() => setActiveSection("security")}
          >
            <FiShield /> Security
          </button>
          <button
            className={`settings-nav-item ${
              activeSection === "appearance" ? "active" : ""
            }`}
            onClick={() => setActiveSection("appearance")}
          >
            <FiToggleLeft /> Appearance
          </button>
          <button
            className={`settings-nav-item ${
              activeSection === "backup" ? "active" : ""
            }`}
            onClick={() => setActiveSection("backup")}
          >
            <FiMail /> Backup
          </button>
        </div>

        <div className="settings-content">
          {activeSection === "general" && (
            <div className="settings-section">
              <h2>General Settings</h2>

              <div className="settings-form">
                <div className="form-group">
                  <label>Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={settings.companyName}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Business Email</label>
                    <input
                      type="email"
                      name="businessEmail"
                      value={settings.businessEmail}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Business Phone</label>
                    <input
                      type="tel"
                      name="businessPhone"
                      value={settings.businessPhone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <textarea
                    name="address"
                    value={settings.address}
                    onChange={handleChange}
                    rows="3"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Timezone</label>
                    <select
                      name="timezone"
                      value={settings.timezone}
                      onChange={handleChange}
                    >
                      <option value="Africa/Accra">Accra (GMT)</option>
                      <option value="Africa/Lagos">Lagos (WAT)</option>
                      <option value="Africa/Nairobi">Nairobi (EAT)</option>
                      <option value="Europe/London">London (GMT)</option>
                      <option value="America/New_York">New York (EST)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Date Format</label>
                    <select
                      name="dateFormat"
                      value={settings.dateFormat}
                      onChange={handleChange}
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Currency</label>
                    <select
                      name="currency"
                      value={settings.currency}
                      onChange={handleChange}
                    >
                      <option value="GHS">GHS (₵)</option>
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "notifications" && (
            <div className="settings-section">
              <h2>Notification Preferences</h2>

              <div className="settings-list">
                <div className="settings-item">
                  <div className="item-info">
                    <h3>New Session Created</h3>
                    <p>
                      Get notified when a new measurement session is created
                    </p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications.newSession}
                      onChange={() =>
                        handleToggle("emailNotifications", "newSession")
                      }
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="settings-item">
                  <div className="item-info">
                    <h3>Client Updates</h3>
                    <p>
                      Receive notifications when client information is updated
                    </p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications.clientUpdates}
                      onChange={() =>
                        handleToggle("emailNotifications", "clientUpdates")
                      }
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="settings-item">
                  <div className="item-info">
                    <h3>Team Invitations</h3>
                    <p>Get notified when team members join or are invited</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications.teamInvites}
                      onChange={() =>
                        handleToggle("emailNotifications", "teamInvites")
                      }
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="settings-item">
                  <div className="item-info">
                    <h3>Session Reminders</h3>
                    <p>Receive reminders for upcoming sessions</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications.sessionReminders}
                      onChange={() =>
                        handleToggle("emailNotifications", "sessionReminders")
                      }
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="settings-item">
                  <div className="item-info">
                    <h3>Payment Alerts</h3>
                    <p>Get notified about payments and invoices</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications.paymentAlerts}
                      onChange={() =>
                        handleToggle("emailNotifications", "paymentAlerts")
                      }
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="settings-item">
                  <div className="item-info">
                    <h3>Weekly Reports</h3>
                    <p>Receive weekly analytics and performance reports</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications.weeklyReports}
                      onChange={() =>
                        handleToggle("emailNotifications", "weeklyReports")
                      }
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="settings-item">
                  <div className="item-info">
                    <h3>Marketing Emails</h3>
                    <p>Receive updates about new features and promotions</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications.marketingEmails}
                      onChange={() =>
                        handleToggle("emailNotifications", "marketingEmails")
                      }
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeSection === "privacy" && (
            <div className="settings-section">
              <h2>Privacy Settings</h2>

              <div className="settings-list">
                <div className="settings-item">
                  <div className="item-info">
                    <h3>Profile Visibility</h3>
                    <p>Control who can see your profile information</p>
                  </div>
                  <select
                    value={settings.profileVisibility}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        profileVisibility: e.target.value,
                      })
                    }
                  >
                    <option value="public">Public</option>
                    <option value="team_only">Team Only</option>
                    <option value="private">Private</option>
                  </select>
                </div>

                <div className="settings-item">
                  <div className="item-info">
                    <h3>Measurement Visibility</h3>
                    <p>Who can view client measurements</p>
                  </div>
                  <select
                    value={settings.showMeasurements}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        showMeasurements: e.target.value,
                      })
                    }
                  >
                    <option value="all">All Users</option>
                    <option value="team_only">Team Only</option>
                    <option value="admins_only">Admins Only</option>
                    <option value="owner_only">Owner Only</option>
                  </select>
                </div>

                <div className="settings-item">
                  <div className="item-info">
                    <h3>Data Retention</h3>
                    <p>How long to keep client data</p>
                  </div>
                  <select
                    value={settings.dataRetention}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        dataRetention: e.target.value,
                      })
                    }
                  >
                    <option value="6months">6 Months</option>
                    <option value="12months">12 Months</option>
                    <option value="24months">24 Months</option>
                    <option value="permanent">Permanent</option>
                  </select>
                </div>

                <div className="settings-item">
                  <div className="item-info">
                    <h3>Share Anonymous Analytics</h3>
                    <p>Help us improve by sharing anonymous usage data</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.shareAnalytics}
                      onChange={() =>
                        setSettings({
                          ...settings,
                          shareAnalytics: !settings.shareAnalytics,
                        })
                      }
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="settings-item">
                  <div className="item-info">
                    <h3>Allow Data Collection</h3>
                    <p>Allow collection of usage data for analytics</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.allowDataCollection}
                      onChange={() =>
                        setSettings({
                          ...settings,
                          allowDataCollection: !settings.allowDataCollection,
                        })
                      }
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="settings-item">
                  <div className="item-info">
                    <h3>Show Online Status</h3>
                    <p>Let others see when you're online</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.showOnlineStatus}
                      onChange={() =>
                        setSettings({
                          ...settings,
                          showOnlineStatus: !settings.showOnlineStatus,
                        })
                      }
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="privacy-info">
                <h3>Privacy Information</h3>
                <p>
                  Your data is encrypted and secure. We never share your
                  personal information with third parties without your consent.
                </p>
                <div className="privacy-links">
                  <a href="/privacy-policy">Privacy Policy</a>
                  <a href="/data-processing">Data Processing Agreement</a>
                  <a href="/gdpr">GDPR Compliance</a>
                </div>
              </div>
            </div>
          )}

          {activeSection === "security" && (
            <div className="settings-section">
              <h2>Security Settings</h2>

              <div className="settings-list">
                <div className="settings-item">
                  <div className="item-info">
                    <h3>Two-Factor Authentication</h3>
                    <p>Add an extra layer of security to your account</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.twoFactorAuth}
                      onChange={() =>
                        setSettings({
                          ...settings,
                          twoFactorAuth: !settings.twoFactorAuth,
                        })
                      }
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="settings-item">
                  <div className="item-info">
                    <h3>Session Timeout (minutes)</h3>
                    <p>Automatically log out after inactivity</p>
                  </div>
                  <select
                    value={settings.sessionTimeout}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        sessionTimeout: e.target.value,
                      })
                    }
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                    <option value="240">4 hours</option>
                  </select>
                </div>

                <div className="settings-item">
                  <div className="item-info">
                    <h3>Login Alerts</h3>
                    <p>Get email alerts for new logins to your account</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.loginAlerts}
                      onChange={() =>
                        setSettings({
                          ...settings,
                          loginAlerts: !settings.loginAlerts,
                        })
                      }
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="settings-item">
                  <div className="item-info">
                    <h3>Device History</h3>
                    <p>Track devices that have accessed your account</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.deviceHistory}
                      onChange={() =>
                        setSettings({
                          ...settings,
                          deviceHistory: !settings.deviceHistory,
                        })
                      }
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="settings-item">
                  <div className="item-info">
                    <h3>IP Whitelisting</h3>
                    <p>Only allow access from specific IP addresses</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.ipWhitelisting}
                      onChange={() =>
                        setSettings({
                          ...settings,
                          ipWhitelisting: !settings.ipWhitelisting,
                        })
                      }
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="danger-zone">
                <h3>Danger Zone</h3>
                <div className="danger-actions">
                  <button className="btn btn-danger">
                    <FiTrash2 /> Delete Account
                  </button>
                  <p>
                    Once you delete your account, there is no going back. Please
                    be certain.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === "appearance" && (
            <div className="settings-section">
              <h2>Appearance Settings</h2>

              <div className="settings-list">
                <div className="settings-item">
                  <div className="item-info">
                    <h3>Theme</h3>
                    <p>Choose your preferred theme</p>
                  </div>
                  <div className="theme-selector">
                    <button
                      className={`theme-option ${
                        settings.theme === "light" ? "active" : ""
                      }`}
                      onClick={() =>
                        setSettings({ ...settings, theme: "light" })
                      }
                    >
                      <FiSun /> Light
                    </button>
                    <button
                      className={`theme-option ${
                        settings.theme === "dark" ? "active" : ""
                      }`}
                      onClick={() =>
                        setSettings({ ...settings, theme: "dark" })
                      }
                    >
                      <FiMoon /> Dark
                    </button>
                    <button
                      className={`theme-option ${
                        settings.theme === "system" ? "active" : ""
                      }`}
                      onClick={() =>
                        setSettings({ ...settings, theme: "system" })
                      }
                    >
                      <FiMonitor /> System
                    </button>
                  </div>
                </div>

                <div className="settings-item">
                  <div className="item-info">
                    <h3>Color Scheme</h3>
                    <p>Choose your accent color</p>
                  </div>
                  <div className="color-scheme-selector">
                    <button
                      className={`color-option default ${
                        settings.colorScheme === "default" ? "active" : ""
                      }`}
                      onClick={() =>
                        setSettings({ ...settings, colorScheme: "default" })
                      }
                      style={{ background: "#A63A5F" }}
                      title="Default"
                    />
                    <button
                      className={`color-option blue ${
                        settings.colorScheme === "blue" ? "active" : ""
                      }`}
                      onClick={() =>
                        setSettings({ ...settings, colorScheme: "blue" })
                      }
                      style={{ background: "#3b82f6" }}
                      title="Blue"
                    />
                    <button
                      className={`color-option green ${
                        settings.colorScheme === "green" ? "active" : ""
                      }`}
                      onClick={() =>
                        setSettings({ ...settings, colorScheme: "green" })
                      }
                      style={{ background: "#10b981" }}
                      title="Green"
                    />
                    <button
                      className={`color-option purple ${
                        settings.colorScheme === "purple" ? "active" : ""
                      }`}
                      onClick={() =>
                        setSettings({ ...settings, colorScheme: "purple" })
                      }
                      style={{ background: "#8b5cf6" }}
                      title="Purple"
                    />
                    <button
                      className={`color-option orange ${
                        settings.colorScheme === "orange" ? "active" : ""
                      }`}
                      onClick={() =>
                        setSettings({ ...settings, colorScheme: "orange" })
                      }
                      style={{ background: "#f97316" }}
                      title="Orange"
                    />
                  </div>
                </div>

                <div className="settings-item">
                  <div className="item-info">
                    <h3>Font Size</h3>
                    <p>Adjust the text size throughout the app</p>
                  </div>
                  <select
                    value={settings.fontSize}
                    onChange={(e) =>
                      setSettings({ ...settings, fontSize: e.target.value })
                    }
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>

                <div className="settings-item">
                  <div className="item-info">
                    <h3>Compact View</h3>
                    <p>Show more content with reduced spacing</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.compactView}
                      onChange={() =>
                        setSettings({
                          ...settings,
                          compactView: !settings.compactView,
                        })
                      }
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="settings-item">
                  <div className="item-info">
                    <h3>Sidebar Collapsed</h3>
                    <p>Start with sidebar collapsed by default</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.sidebarCollapsed}
                      onChange={() =>
                        setSettings({
                          ...settings,
                          sidebarCollapsed: !settings.sidebarCollapsed,
                        })
                      }
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="settings-item">
                  <div className="item-info">
                    <h3>Animations</h3>
                    <p>Enable smooth animations throughout the app</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.animations}
                      onChange={() =>
                        setSettings({
                          ...settings,
                          animations: !settings.animations,
                        })
                      }
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeSection === "backup" && (
            <div className="settings-section">
              <h2>Backup Settings</h2>

              <div className="settings-list">
                <div className="settings-item">
                  <div className="item-info">
                    <h3>Automatic Backup</h3>
                    <p>Automatically backup your data</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.autoBackup}
                      onChange={() =>
                        setSettings({
                          ...settings,
                          autoBackup: !settings.autoBackup,
                        })
                      }
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="settings-item">
                  <div className="item-info">
                    <h3>Backup Frequency</h3>
                    <p>How often to backup your data</p>
                  </div>
                  <select
                    value={settings.backupFrequency}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        backupFrequency: e.target.value,
                      })
                    }
                    disabled={!settings.autoBackup}
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div className="settings-item">
                  <div className="item-info">
                    <h3>Backup Location</h3>
                    <p>Where to store your backups</p>
                  </div>
                  <select
                    value={settings.backupLocation}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        backupLocation: e.target.value,
                      })
                    }
                  >
                    <option value="cloud">Cloud Storage</option>
                    <option value="local">Local Download</option>
                    <option value="both">Both</option>
                  </select>
                </div>

                <div className="settings-item">
                  <div className="item-info">
                    <h3>Last Backup</h3>
                    <p>Most recent backup</p>
                  </div>
                  <div className="backup-info">
                    <span>{settings.lastBackup}</span>
                    <button className="btn btn-secondary btn-small">
                      Backup Now
                    </button>
                  </div>
                </div>
              </div>

              <div className="backup-history">
                <h3>Backup History</h3>
                <div className="history-list">
                  <div className="history-item">
                    <span>2024-03-01 10:30 AM</span>
                    <span className="badge badge-success">Successful</span>
                    <button className="btn-link">Download</button>
                  </div>
                  <div className="history-item">
                    <span>2024-02-23 10:30 AM</span>
                    <span className="badge badge-success">Successful</span>
                    <button className="btn-link">Download</button>
                  </div>
                  <div className="history-item">
                    <span>2024-02-16 10:30 AM</span>
                    <span className="badge badge-success">Successful</span>
                    <button className="btn-link">Download</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
