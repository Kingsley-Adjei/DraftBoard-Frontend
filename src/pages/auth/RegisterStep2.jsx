import { useState } from "react";
import "./RegisterStep2.css";

// ─── Step Indicator ───────────────────────────────────────────────────────────
function Steps({ current }) {
  return (
    <div className="db-steps">
      {[1, 2, 3].map((n, i) => (
        <div key={n} className="db-step-group">
          <div
            className={`db-step ${n === current ? "active" : ""} ${
              n < current ? "done" : ""
            }`}
          >
            {n < current ? (
              <svg viewBox="0 0 20 20" fill="none">
                <path
                  d="M4 10l4.5 4.5 7.5-7.5"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              n
            )}
          </div>
          {i < 2 && (
            <div className={`db-step-line ${n < current ? "filled" : ""}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Role Card ────────────────────────────────────────────────────────────────
function RoleCard({ id, icon, title, description, selected, onSelect }) {
  return (
    <button
      type="button"
      className={`db-role-card ${selected ? "selected" : ""}`}
      onClick={() => onSelect(id)}
    >
      <div className="db-role-icon">{icon}</div>
      <div className="db-role-text">
        <span className="db-role-title">{title}</span>
        <span className="db-role-desc">{description}</span>
      </div>
      <div className={`db-role-radio ${selected ? "checked" : ""}`}>
        {selected && <div className="db-role-radio-dot" />}
      </div>
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function RegisterStep2({ onNext, onBack }) {
  const [role, setRole] = useState(null); // null | "business_owner" | "employee"
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const handleNext = () => {
    setSubmitAttempted(true);
    if (!role) return;
    // Pass role up or navigate
    if (onNext) onNext({ role });
    else alert(`Proceeding as: ${role}`);
  };

  return (
    <div className="db-page">
      {/* ── Left Panel ── */}
      <div className="db-left">
        <div className="db-left-overlay" />
        <div className="db-left-content">
          <p className="db-tagline">
            Measure <strong>Once</strong>, Create <strong>Forever</strong>
          </p>
          <p className="db-sub">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <div className="db-dots">
            <span className="db-dot" />
            <span className="db-dot active" />
            <span className="db-dot" />
          </div>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="db-right">
        <div className="db-card">
          {/* Header */}
          <div className="db-header">
            <h1 className="db-logo">
              Join us on <span className="db-logo-d">D</span>raftBoard
            </h1>
            <p className="db-sub-head">Create an account to use DraftBoard</p>
            <Steps current={2} />
          </div>

          {/* Body */}
          <div className="db-form">
            <p className="db-question">How will you use our platform?</p>

            <RoleCard
              id="business_owner"
              selected={role === "business_owner"}
              onSelect={setRole}
              icon={
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              }
              title="I am a Business Owner"
              description="Use workspace with employees for your business"
            />

            <RoleCard
              id="employee"
              selected={role === "employee"}
              onSelect={setRole}
              icon={
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              }
              title="I am an employee"
              description="Use workspace with other employees for a business"
            />

            {submitAttempted && !role && (
              <p className="db-role-error">
                Please select how you'll use the platform
              </p>
            )}

            <button className="db-btn" onClick={handleNext}>
              Next Step
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <p className="db-signin">
              Already have an account? <a href="/login">Sign in</a>
            </p>

            <div className="db-footer-links">
              <a href="#">Privacy</a>
              <span>•</span>
              <a href="#">Terms</a>
              <span>•</span>
              <a href="#">Help</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
