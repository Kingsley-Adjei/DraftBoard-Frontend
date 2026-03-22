import { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import { useToast } from "../../components/ui/Toast";
import Companies from "./Companies";
import Clients from "./Clients";
import MeasurementSessions from "../measurement-sessions/Measurement-sessions";
import "./Dashboard.css";

const DUMMY_SESSIONS = [
  {
    id: 1,
    client: "Ama Mansah",
    type: "Kaba & Slit",
    date: "2024-02-05",
    status: "Completed",
  },
  {
    id: 2,
    client: "Ama Mansah",
    type: "Kaba & Slit",
    date: "2024-02-05",
    status: "Pending",
  },
  {
    id: 3,
    client: "Ama Mansah",
    type: "Kaba & Slit",
    date: "2024-02-05",
    status: "In-progress",
  },
  {
    id: 4,
    client: "Ama Mansah",
    type: "Kaba & Slit",
    date: "2024-02-05",
    status: "Completed",
  },
  {
    id: 5,
    client: "Kofi Asante",
    type: "Suit",
    date: "2024-02-03",
    status: "Pending",
  },
];
const DUMMY_CLIENTS = [
  "Ama Mensah",
  "Kofi Asante",
  "Abena Owusu",
  "Kwame Boateng",
];
const DUMMY_TEMPLATES = [
  "Kaba & Slit",
  "Suit (3-piece)",
  "Evening Gown",
  "Kaftan",
];
const STATUS_COLORS = {
  Completed: { bg: "#dcfce7", color: "#16a34a" },
  Pending: { bg: "#fef9c3", color: "#a16207" },
  "In-progress": { bg: "#dbeafe", color: "#1d4ed8" },
};

function StatCard({ icon, value, label, change }) {
  return (
    <div className="db-stat-card">
      <div className="db-stat-icon">{icon}</div>
      <div className="db-stat-body">
        <div className="db-stat-top">
          <span className="db-stat-value">{value}</span>
          {change && <span className="db-stat-change">{change}</span>}
        </div>
        <span className="db-stat-label">{label}</span>
      </div>
    </div>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div className="db-modal-overlay" onClick={onClose}>
      <div className="db-modal" onClick={(e) => e.stopPropagation()}>
        <div className="db-modal-header">
          <h3>{title}</h3>
          <button className="db-modal-close" onClick={onClose}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="db-modal-body">{children}</div>
      </div>
    </div>
  );
}

function NewSessionModal({ onClose, onSave }) {
  const [form, setForm] = useState({ client: "", template: "", notes: "" });
  const [errors, setErrors] = useState({});
  const handleSave = () => {
    const e = {};
    if (!form.client) e.client = "Select a client";
    if (!form.template) e.template = "Select a template";
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    onSave(form);
  };
  return (
    <Modal title="New Session" onClose={onClose}>
      <div className="db-form-group">
        <label>Client</label>
        <select
          value={form.client}
          onChange={(e) => setForm((p) => ({ ...p, client: e.target.value }))}
        >
          <option value="">Select client</option>
          {DUMMY_CLIENTS.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        {errors.client && <p className="db-field-error">{errors.client}</p>}
      </div>
      <div className="db-form-group">
        <label>Template</label>
        <select
          value={form.template}
          onChange={(e) => setForm((p) => ({ ...p, template: e.target.value }))}
        >
          <option value="">Select template</option>
          {DUMMY_TEMPLATES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        {errors.template && <p className="db-field-error">{errors.template}</p>}
      </div>
      <div className="db-form-group">
        <label>Notes</label>
        <textarea
          placeholder="Any special instructions..."
          value={form.notes}
          onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
          rows={3}
        />
      </div>
      <div className="db-modal-actions">
        <button className="db-btn-secondary" onClick={onClose}>
          Cancel
        </button>
        <button className="db-btn-primary" onClick={handleSave}>
          Create Session
        </button>
      </div>
    </Modal>
  );
}

function NewClientModal({ onClose, onSave }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [errors, setErrors] = useState({});
  const handleSave = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      e.name = "Enter a valid full name";
    if (form.phone && !/^\+?\d{7,15}$/.test(form.phone.replace(/\s/g, "")))
      e.phone = "Enter a valid phone number";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      e.email = "Enter a valid email";
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    onSave(form);
  };
  return (
    <Modal title="New Client" onClose={onClose}>
      <div className="db-form-group">
        <label>Full Name</label>
        <input
          placeholder="e.g. Ama Mensah"
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
        />
        {errors.name && <p className="db-field-error">{errors.name}</p>}
      </div>
      <div className="db-form-group">
        <label>Phone (optional)</label>
        <input
          placeholder="+233 501234567"
          value={form.phone}
          onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
        />
        {errors.phone && <p className="db-field-error">{errors.phone}</p>}
      </div>
      <div className="db-form-group">
        <label>Email (optional)</label>
        <input
          placeholder="client@email.com"
          value={form.email}
          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
        />
        {errors.email && <p className="db-field-error">{errors.email}</p>}
      </div>
      <div className="db-modal-actions">
        <button className="db-btn-secondary" onClick={onClose}>
          Cancel
        </button>
        <button className="db-btn-primary" onClick={handleSave}>
          Add Client
        </button>
      </div>
    </Modal>
  );
}

function NewTemplateModal({ onClose, onSave }) {
  const [form, setForm] = useState({ name: "", description: "" });
  const [errors, setErrors] = useState({});
  const handleSave = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Template name is required";
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    onSave(form);
  };
  return (
    <Modal title="New Template" onClose={onClose}>
      <div className="db-form-group">
        <label>Template Name</label>
        <input
          placeholder="e.g. Kaba & Slit"
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
        />
        {errors.name && <p className="db-field-error">{errors.name}</p>}
      </div>
      <div className="db-form-group">
        <label>Description (optional)</label>
        <textarea
          placeholder="Describe this template..."
          value={form.description}
          onChange={(e) =>
            setForm((p) => ({ ...p, description: e.target.value }))
          }
          rows={3}
        />
      </div>
      <div className="db-modal-actions">
        <button className="db-btn-secondary" onClick={onClose}>
          Cancel
        </button>
        <button className="db-btn-primary" onClick={handleSave}>
          Create Template
        </button>
      </div>
    </Modal>
  );
}

function SwitchCompanyModal({ onClose, onSwitch }) {
  const companies = [
    { id: 1, name: "Lorm Ltd", status: "Active" },
    { id: 2, name: "Fashion House GH", status: "Inactive" },
    { id: 3, name: "Stitch & Style", status: "Inactive" },
  ];
  return (
    <Modal title="Switch Company" onClose={onClose}>
      <div className="db-company-list">
        {companies.map((c) => (
          <button
            key={c.id}
            className={`db-company-item ${c.status === "Active" ? "active" : ""}`}
            onClick={() => onSwitch(c)}
          >
            <div className="db-company-icon">{c.name.charAt(0)}</div>
            <div>
              <span className="db-company-name">{c.name}</span>
              <span className={`db-company-badge ${c.status.toLowerCase()}`}>
                {c.status}
              </span>
            </div>
          </button>
        ))}
      </div>
      <div className="db-modal-actions" style={{ marginTop: "0.5rem" }}>
        <button className="db-btn-secondary" onClick={onClose}>
          Cancel
        </button>
      </div>
    </Modal>
  );
}

function DashboardHome({ setActivePage }) {
  const [sessions, setSessions] = useState(DUMMY_SESSIONS);
  const [modal, setModal] = useState(null);
  const toast = useToast();
  const close = () => setModal(null);

  return (
    <>
      <div className="db-welcome-row">
        <div>
          <h2 className="db-welcome-title">Welcome back, Joel! 👋</h2>
          <p className="db-welcome-sub">
            Here's what's happening with your tailoring business today
          </p>
        </div>
        <div className="db-welcome-actions">
          <button
            className="db-action-btn outline"
            onClick={() =>
              toast({ message: "Opening profile editor...", type: "info" })
            }
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Edit Profile
          </button>
          <button
            className="db-action-btn filled"
            onClick={() => setModal("new-session")}
          >
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
            New Session
          </button>
        </div>
      </div>

      <div className="db-stats-row">
        <div className="db-stat-card highlight">
          <div className="db-stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </div>
          <div className="db-stat-body">
            <span className="db-stat-value" style={{ color: "#fff" }}>
              Lorm Ltd
            </span>
            <span
              className="db-stat-label"
              style={{ color: "rgba(255,255,255,0.78)" }}
            >
              Active Company
            </span>
          </div>
          <span className="db-active-badge">Active</span>
        </div>
        <StatCard
          icon={
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
          }
          value="156"
          label="Total Clients"
          change="+12%"
        />
        <StatCard
          icon={
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
          }
          value="342"
          label="Total Sessions"
          change="+23%"
        />
        <StatCard
          icon={
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
          }
          value="28"
          label="Templates"
          change="+5%"
        />
        <StatCard
          icon={
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
          }
          value="GH₵ 12.4K"
          label="Revenue"
          change="+23%"
        />
      </div>

      <div className="db-lower-grid">
        <div className="db-section-card">
          <div className="db-section-header">
            <span className="db-section-title">Recent Sessions</span>
            <button
              className="db-view-all"
              onClick={() => setActivePage("sessions")}
            >
              View All
            </button>
          </div>
          <div className="db-session-list">
            {sessions.slice(0, 5).map((s) => (
              <div key={s.id} className="db-session-item">
                <div className="db-session-info">
                  <span className="db-session-client">{s.client}</span>
                  <span className="db-session-meta">
                    {s.type} • {s.date}
                  </span>
                </div>
                <span
                  className="db-status-badge"
                  style={{
                    background: STATUS_COLORS[s.status]?.bg,
                    color: STATUS_COLORS[s.status]?.color,
                  }}
                >
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="db-section-card">
          <div className="db-section-header">
            <span className="db-section-title">Quick Actions</span>
          </div>
          <div className="db-quick-grid">
            <button
              className="db-quick-btn primary"
              onClick={() => setModal("switch-company")}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M7 16V4m0 0L3 8m4-4l4 4" />
                <path d="M17 8v12m0 0l4-4m-4 4l-4-4" />
              </svg>
              Switch Company
            </button>
            <button
              className="db-quick-btn ghost"
              onClick={() => setModal("new-client")}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
                <line x1="12" y1="14" x2="12" y2="20" />
                <line x1="9" y1="17" x2="15" y2="17" />
              </svg>
              New Client
            </button>
            <button
              className="db-quick-btn ghost"
              onClick={() => setModal("new-session")}
            >
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
              New Session
            </button>
            <button
              className="db-quick-btn ghost"
              onClick={() => setModal("new-template")}
            >
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
              New Template
            </button>
          </div>
        </div>
      </div>

      {modal === "new-session" && (
        <NewSessionModal
          onClose={close}
          onSave={(d) => {
            setSessions((p) => [
              {
                id: Date.now(),
                client: d.client,
                type: d.template,
                date: new Date().toISOString().split("T")[0],
                status: "Pending",
              },
              ...p,
            ]);
            close();
            toast({
              message: `Session created for ${d.client}`,
              type: "success",
            });
          }}
        />
      )}
      {modal === "new-client" && (
        <NewClientModal
          onClose={close}
          onSave={(d) => {
            close();
            toast({ message: `Client "${d.name}" added`, type: "success" });
          }}
        />
      )}
      {modal === "new-template" && (
        <NewTemplateModal
          onClose={close}
          onSave={(d) => {
            close();
            toast({ message: `Template "${d.name}" created`, type: "success" });
          }}
        />
      )}
      {modal === "switch-company" && (
        <SwitchCompanyModal
          onClose={close}
          onSwitch={(c) => {
            close();
            toast({ message: `Switched to ${c.name}`, type: "info" });
          }}
        />
      )}
    </>
  );
}

function PlaceholderPage({ title, subtitle }) {
  return (
    <div>
      <h1
        style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.2rem" }}
      >
        {title}
      </h1>
      <p
        style={{
          fontSize: "0.78rem",
          color: "var(--text-muted)",
          marginBottom: "2rem",
        }}
      >
        {subtitle}
      </p>
      <div
        style={{
          padding: "3rem",
          textAlign: "center",
          background: "#fff",
          borderRadius: "10px",
          border: "1px solid var(--border)",
          color: "var(--text-muted)",
          fontSize: "0.85rem",
        }}
      >
        🚧 This page is coming soon
      </div>
    </div>
  );
}

function PageContent({ activePage, setActivePage }) {
  switch (activePage) {
    case "dashboard":
      return <DashboardHome setActivePage={setActivePage} />;
    case "companies":
      return <Companies />;
    case "clients":
      return <Clients />;
    case "sessions":
      return <MeasurementSessions />;
    case "templates":
      return (
        <PlaceholderPage
          title="Templates"
          subtitle="Your measurement templates"
        />
      );
    case "reports":
      return (
        <PlaceholderPage title="Reports" subtitle="Analytics and insights" />
      );
    case "profile":
      return (
        <PlaceholderPage title="Profile" subtitle="Your account settings" />
      );
    case "settings":
      return <PlaceholderPage title="Settings" subtitle="App configuration" />;
    default:
      return <DashboardHome setActivePage={setActivePage} />;
  }
}

export default function Dashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  return (
    <DashboardLayout activePage={activePage} setActivePage={setActivePage}>
      <PageContent activePage={activePage} setActivePage={setActivePage} />
    </DashboardLayout>
  );
}
