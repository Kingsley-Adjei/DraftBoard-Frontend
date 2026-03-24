// src/pages/auth/RegisterStep3.jsx
import { useState } from "react";
import { companyService } from "../../services/companyService";
import "./RegisterStep3.css";

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
                <path d="M4 10l4.5 4.5 7.5-7.5" stroke="#fff" strokeWidth="2" />
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

export default function RegisterStep3({
  onSubmit,
  onBack,
  defaultValues = {},
}) {
  const [invitations, setInvitations] = useState([]);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("EMPLOYEE");
  const [skip, setSkip] = useState(false);

  const handleAddInvitation = () => {
    if (email && !invitations.find((i) => i.email === email)) {
      setInvitations([...invitations, { email, role }]);
      setEmail("");
    }
  };

  const handleRemoveInvitation = (emailToRemove) => {
    setInvitations(invitations.filter((i) => i.email !== emailToRemove));
  };

  const handleSubmit = () => {
    onSubmit({ invitations, skip });
  };

  const handleSkip = () => {
    setSkip(true);
    onSubmit({ invitations: [], skip: true });
  };

  return (
    <div className="db-page">
      <div className="db-card-wrapper">
        {/* Left Panel */}
        <div className="db-left">
          <div className="db-left-overlay" />
          <div className="db-left-content">
            <p className="db-tagline">
              Build Your <strong>Dream Team</strong>
            </p>
            <p className="db-sub">
              Invite employees to join your tailoring business. They'll receive
              an email with instructions to create their account.
            </p>
            <div className="db-dots">
              <span className="db-dot" />
              <span className="db-dot" />
              <span className="db-dot active" />
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="db-right">
          <div className="db-card">
            <div className="db-header">
              <h1 className="db-logo">
                Invite <span className="db-logo-d">Team</span> Members
              </h1>
              <p className="db-sub-head">
                Add employees to help manage clients
              </p>
              <Steps current={3} />
            </div>

            <div className="db-form">
              <div className="db-invite-section">
                <div className="db-invite-input-group">
                  <input
                    type="email"
                    placeholder="employee@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="db-input"
                  />
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="db-select"
                  >
                    <option value="EMPLOYEE">Employee</option>
                    <option value="MANAGER">Manager</option>
                  </select>
                  <button
                    onClick={handleAddInvitation}
                    className="db-btn-small"
                  >
                    Add
                  </button>
                </div>

                {invitations.length > 0 && (
                  <div className="db-invite-list">
                    <h4>Invitations to send:</h4>
                    {invitations.map((inv) => (
                      <div key={inv.email} className="db-invite-item">
                        <span>{inv.email}</span>
                        <span className="db-invite-role">{inv.role}</span>
                        <button
                          onClick={() => handleRemoveInvitation(inv.email)}
                          className="db-remove-btn"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="db-buttons">
                <button className="db-btn db-btn-secondary" onClick={onBack}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      d="M19 12H5M12 19l-7-7 7-7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Back
                </button>
                <button
                  className="db-btn db-btn-secondary"
                  onClick={handleSkip}
                >
                  Skip for now
                </button>
                <button
                  className="db-btn"
                  onClick={handleSubmit}
                  disabled={invitations.length === 0}
                >
                  Send Invitations & Complete
                </button>
              </div>

              <p className="db-note">
                You can always invite team members later from your company
                settings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
