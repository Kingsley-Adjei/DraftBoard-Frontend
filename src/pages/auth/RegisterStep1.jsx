// src/pages/auth/RegisterStep1.jsx
import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "../../assets/logo_black.png";
import "./RegisterStep1.css";

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

// ─── Field Component ─────────────────────────────────────────────────────────
function Field({
  label,
  icon,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  touched,
  valid,
  error,
  rightSlot,
}) {
  const showError = touched && !valid;
  const showCheck = touched && valid;

  return (
    <div className="db-field">
      <label className="db-label">
        <span className="db-label-icon">{icon}</span>
        {label}
      </label>
      <div
        className={`db-input-wrap ${showError ? "error" : ""} ${
          showCheck ? "valid" : ""
        }`}
      >
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete="off"
        />
        {showCheck && (
          <span className="db-check">
            <svg viewBox="0 0 20 20" fill="none">
              <circle
                cx="10"
                cy="10"
                r="9"
                stroke="#22c55e"
                strokeWidth="1.5"
              />
              <path
                d="M6 10.5l3 3 5-5"
                stroke="#22c55e"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}
        {rightSlot && <span className="db-right-slot">{rightSlot}</span>}
      </div>
      {showError && <p className="db-error">{error}</p>}
    </div>
  );
}

function EyeIcon({ visible, onClick }) {
  return (
    <button type="button" className="db-eye" onClick={onClick} tabIndex={-1}>
      {visible ? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )}
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function RegisterStep1({
  onNext,
  defaultValues = {},
  isUpdating = false,
}) {
  const [form, setForm] = useState({
    firstName: defaultValues.firstName || "",
    lastName: defaultValues.lastName || "",
    email: defaultValues.email || "",
    password: defaultValues.password || "",
    confirmPassword: defaultValues.confirmPassword || "",
    phone: defaultValues.phone || "+233 ",
  });

  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const validators = {
    firstName: (v) => v.trim().length >= 2,
    lastName: (v) => v.trim().length >= 2,
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
    password: (v) => /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(v),
    confirmPassword: (v) => v === form.password && v.length > 0,
    phone: (v) => /^\+\d{7,15}$/.test(v.replace(/\s/g, "")),
  };

  const errorMessages = {
    firstName: "At least 2 characters",
    lastName: "At least 2 characters",
    email: "Enter a valid email address",
    password: "Min 8 chars, include a letter and a number",
    confirmPassword: "Passwords do not match",
    phone: "Enter a valid phone number (e.g. +233 501234567)",
  };

  const fields = [
    "firstName",
    "lastName",
    "email",
    "password",
    "confirmPassword",
    "phone",
  ];

  const validity = {
    firstName: validators.firstName(form.firstName),
    lastName: validators.lastName(form.lastName),
    email: validators.email(form.email),
    password: validators.password(form.password),
    confirmPassword: validators.confirmPassword(form.confirmPassword),
    phone: validators.phone(form.phone),
  };

  const allValid = fields.every((f) => validity[f]);
  const ft = (name) => touched[name] || submitAttempted;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleNext = () => {
    const allTouched = fields.reduce((acc, f) => ({ ...acc, [f]: true }), {});
    setTouched(allTouched);
    setSubmitAttempted(true);
    if (allValid && onNext) {
      const userData = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        phone: form.phone,
      };

      // Pass the isUpdating flag to parent so it knows whether to POST or PUT
      onNext(userData, isUpdating);
    }
  };

  return (
    <div className="db-page">
      <div className="db-card-wrapper">
        {/* Left Panel */}
        <div className="db-left">
          <div className="db-left-overlay" />
          <div className="db-left-content">
            <p className="db-tagline">
              Welcome To <strong>FitFolio</strong>, Where{" "}
              <strong>Tradition</strong>
              <br />
              Meets <strong>Precision</strong> In Every <strong>Stitch</strong>
            </p>
            <p className="db-sub">
              Digitize your tailoring business, manage client measurements, and
              create perfect fits every time.
            </p>
            <div className="db-dots">
              <span className="db-dot active" />
              <span className="db-dot" />
              <span className="db-dot" />
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="db-right">
          <div
            className="db-card"
            style={{
              marginTop: "7rem",
            }}
          >
            <div className="db-header">
              <div className="welcome-header">
                <h1 className="db-logo">Join us on </h1>
                <div className="img-container">
                  <img src={Logo} alt="DraftBoard Logo" className="logo" />
                  <h1 className="db-logo">raftBoard</h1>
                </div>
              </div>
              <p className="db-sub-head">Create an account to use FitFolio</p>
              <Steps current={1} />
            </div>

            <div className="db-form">
              <div className="db-row">
                <Field
                  label="First Name"
                  icon={
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  }
                  name="firstName"
                  placeholder="Joel Anokye"
                  value={form.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={ft("firstName")}
                  valid={validity.firstName}
                  error={errorMessages.firstName}
                />
                <Field
                  label="Last Name"
                  icon={
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  }
                  name="lastName"
                  placeholder="Adu"
                  value={form.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={ft("lastName")}
                  valid={validity.lastName}
                  error={errorMessages.lastName}
                />
              </div>

              <Field
                label="Email"
                icon={
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                }
                name="email"
                type="email"
                placeholder="aduj33@gmail.com"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                touched={ft("email")}
                valid={validity.email}
                error={errorMessages.email}
              />

              <div className="db-row">
                <Field
                  label="Password"
                  icon={
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  }
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="passw0Rd"
                  value={form.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={ft("password")}
                  valid={validity.password}
                  error={errorMessages.password}
                  rightSlot={
                    <EyeIcon
                      visible={showPassword}
                      onClick={() => setShowPassword((p) => !p)}
                    />
                  }
                />
                <Field
                  label="Confirm"
                  icon={
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  }
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={ft("confirmPassword")}
                  valid={validity.confirmPassword}
                  error={errorMessages.confirmPassword}
                  rightSlot={
                    <EyeIcon
                      visible={showConfirm}
                      onClick={() => setShowConfirm((p) => !p)}
                    />
                  }
                />
              </div>

              <Field
                label="Phone Number"
                icon={
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.72 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.63 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.16 6.16l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                }
                name="phone"
                type="tel"
                placeholder="+233 501234567"
                value={form.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                touched={ft("phone")}
                valid={validity.phone}
                error={errorMessages.phone}
              />

              <button className="db-btn" onClick={handleNext}>
                {isUpdating ? "Update & Continue" : "Next Step"}
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
                Already have an account? <Link to="/login">Sign in</Link>
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
    </div>
  );
}
