import { useState } from "react";
import "./RegisterStep3.css";

// ─── Validators ───────────────────────────────────────────────────────────────
const validators = {
  companyName: (v) => v.trim().length >= 2,
  businessContact: (v) => /^\+\d{7,15}$/.test(v.replace(/\s/g, "")),
  businessType: (v) => v !== "",
  invitationToken: (v) =>
    /^[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[0-9]{4}$/.test(v.trim()),
  measurementUnit: (v) => v !== "",
  termsAccepted: (v) => v === true,
  privacyAccepted: (v) => v === true,
};

const errorMessages = {
  companyName: "Enter your company name",
  businessContact: "Enter a valid phone number (e.g. +233 501234567)",
  businessType: "Select a business type",
  invitationToken: "Token format: XXXX-XXXX-0000",
  measurementUnit: "Select a measurement unit",
  termsAccepted: "You must agree to the terms & conditions",
  privacyAccepted: "You must agree to the privacy policies",
};

const BUSINESS_TYPES = [
  "Tailor Shop",
  "Fashion Designer",
  "Boutique",
  "Clothing Manufacturer",
  "Alteration Service",
  "Other",
];

// ─── Steps Indicator ──────────────────────────────────────────────────────────
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

// ─── Business Owner Form ──────────────────────────────────────────────────────
function BusinessOwnerForm({ onSubmit, defaultValues = {} }) {
  const [form, setForm] = useState({
    companyName: defaultValues.companyName || "",
    businessContact: defaultValues.businessContact || "+233 ",
    businessType: defaultValues.businessType || "",
    measurementUnit: defaultValues.measurementUnit || "inches",
    termsAccepted: false,
    privacyAccepted: false,
  });
  const [touched, setTouched] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const fields = [
    "companyName",
    "businessContact",
    "businessType",
    "measurementUnit",
    "termsAccepted",
    "privacyAccepted",
  ];

  const validity = {
    companyName: validators.companyName(form.companyName),
    businessContact: validators.businessContact(form.businessContact),
    businessType: validators.businessType(form.businessType),
    measurementUnit: validators.measurementUnit(form.measurementUnit),
    termsAccepted: validators.termsAccepted(form.termsAccepted),
    privacyAccepted: validators.privacyAccepted(form.privacyAccepted),
  };

  const allValid = fields.every((f) => validity[f]);

  const ft = (name) => touched[name] || submitAttempted;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBlur = (e) =>
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));

  const handleSubmit = () => {
    const allTouched = fields.reduce((acc, f) => ({ ...acc, [f]: true }), {});
    setTouched(allTouched);
    setSubmitAttempted(true);
    if (allValid && onSubmit) onSubmit(form);
  };

  return (
    <div className="db-form">
      {/* Company Name */}
      <div className="db-field">
        <label className="db-label">
          <span className="db-label-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </span>
          Company Name
        </label>
        <div
          className={`db-input-wrap ${ft("companyName") && !validity.companyName ? "error" : ""} ${ft("companyName") && validity.companyName ? "valid" : ""}`}
        >
          <input
            name="companyName"
            placeholder="Group 13 FashionLine"
            value={form.companyName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {ft("companyName") && validity.companyName && (
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
        </div>
        {ft("companyName") && !validity.companyName && (
          <p className="db-error">{errorMessages.companyName}</p>
        )}
      </div>

      {/* Business Contact */}
      <div className="db-field">
        <label className="db-label">
          <span className="db-label-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.72 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.63 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.16 6.16l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </span>
          Business Contact
        </label>
        <div
          className={`db-input-wrap ${ft("businessContact") && !validity.businessContact ? "error" : ""} ${ft("businessContact") && validity.businessContact ? "valid" : ""}`}
        >
          <input
            name="businessContact"
            type="tel"
            placeholder="+233 501234567"
            value={form.businessContact}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {ft("businessContact") && validity.businessContact && (
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
        </div>
        {ft("businessContact") && !validity.businessContact && (
          <p className="db-error">{errorMessages.businessContact}</p>
        )}
      </div>

      {/* Business Type Dropdown */}
      <div className="db-field">
        <label className="db-label">Business Type</label>
        <div
          className={`db-select-wrap ${dropdownOpen ? "open" : ""} ${ft("businessType") && !validity.businessType ? "error" : ""}`}
          onClick={() => setDropdownOpen((o) => !o)}
        >
          <span
            className={
              form.businessType ? "db-select-value" : "db-select-placeholder"
            }
          >
            {form.businessType || "Select business type"}
          </span>
          <svg
            className="db-chevron"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
          {dropdownOpen && (
            <div className="db-dropdown">
              {BUSINESS_TYPES.map((t) => (
                <div
                  key={t}
                  className={`db-dropdown-item ${form.businessType === t ? "selected" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setForm((prev) => ({ ...prev, businessType: t }));
                    setTouched((prev) => ({ ...prev, businessType: true }));
                    setDropdownOpen(false);
                  }}
                >
                  {t}
                </div>
              ))}
            </div>
          )}
        </div>
        {ft("businessType") && !validity.businessType && (
          <p className="db-error">{errorMessages.businessType}</p>
        )}
      </div>

      {/* Measurement Unit */}
      <div className="db-field">
        <label className="db-label">Measurement Unit Preference</label>
        <div className="db-radio-group">
          {["inches", "centimeters"].map((unit) => (
            <label key={unit} className="db-radio-label">
              <input
                type="radio"
                name="measurementUnit"
                value={unit}
                checked={form.measurementUnit === unit}
                onChange={handleChange}
              />
              <span className="db-radio-custom" />
              {unit.charAt(0).toUpperCase() + unit.slice(1)}
            </label>
          ))}
        </div>
      </div>

      {/* Terms + Privacy */}
      <div className="db-checkbox-group">
        <label className="db-checkbox-label">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={form.termsAccepted}
            onChange={handleChange}
          />
          <span className="db-checkbox-custom" />
          <span>
            I agree to <a href="#">terms & conditions</a>
          </span>
        </label>
        {ft("termsAccepted") && !validity.termsAccepted && (
          <p className="db-error db-error-indent">
            {errorMessages.termsAccepted}
          </p>
        )}
        <label className="db-checkbox-label">
          <input
            type="checkbox"
            name="privacyAccepted"
            checked={form.privacyAccepted}
            onChange={handleChange}
          />
          <span className="db-checkbox-custom" />
          <span>
            I agree to <a href="#">privacy policies</a>
          </span>
        </label>
        {ft("privacyAccepted") && !validity.privacyAccepted && (
          <p className="db-error db-error-indent">
            {errorMessages.privacyAccepted}
          </p>
        )}
      </div>

      <button className="db-btn" onClick={handleSubmit}>
        Create account
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
  );
}

// ─── Employee Form ────────────────────────────────────────────────────────────
function EmployeeForm({ onSubmit, defaultValues = {} }) {
  const [form, setForm] = useState({
    invitationToken: defaultValues.invitationToken || "",
    measurementUnit: defaultValues.measurementUnit || "inches",
    termsAccepted: false,
    privacyAccepted: false,
  });
  const [touched, setTouched] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const fields = [
    "invitationToken",
    "measurementUnit",
    "termsAccepted",
    "privacyAccepted",
  ];

  const validity = {
    invitationToken: validators.invitationToken(form.invitationToken),
    measurementUnit: validators.measurementUnit(form.measurementUnit),
    termsAccepted: validators.termsAccepted(form.termsAccepted),
    privacyAccepted: validators.privacyAccepted(form.privacyAccepted),
  };

  const allValid = fields.every((f) => validity[f]);
  const ft = (name) => touched[name] || submitAttempted;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBlur = (e) =>
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));

  const handleSubmit = () => {
    const allTouched = fields.reduce((acc, f) => ({ ...acc, [f]: true }), {});
    setTouched(allTouched);
    setSubmitAttempted(true);
    if (allValid && onSubmit) onSubmit(form);
  };

  // Auto-format token as user types: insert dashes at positions 4 and 9
  const handleTokenChange = (e) => {
    let raw = e.target.value.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
    let formatted = raw;
    if (raw.length > 4) formatted = raw.slice(0, 4) + "-" + raw.slice(4);
    if (raw.length > 8)
      formatted =
        raw.slice(0, 4) + "-" + raw.slice(4, 8) + "-" + raw.slice(8, 12);
    setForm((prev) => ({ ...prev, invitationToken: formatted }));
  };

  return (
    <div className="db-form">
      {/* Invitation Token */}
      <div className="db-field">
        <label className="db-label">Invitation Token</label>
        <div
          className={`db-input-wrap token-input ${ft("invitationToken") && !validity.invitationToken ? "error" : ""} ${ft("invitationToken") && validity.invitationToken ? "valid" : ""}`}
        >
          <input
            name="invitationToken"
            placeholder="2ae3-5T07-1959"
            value={form.invitationToken}
            onChange={handleTokenChange}
            onBlur={handleBlur}
            maxLength={14}
            style={{
              fontFamily: "'Courier New', monospace",
              letterSpacing: "0.1em",
            }}
          />
          {ft("invitationToken") && validity.invitationToken && (
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
        </div>
        {ft("invitationToken") && !validity.invitationToken && (
          <p className="db-error">{errorMessages.invitationToken}</p>
        )}
      </div>

      {/* Measurement Unit */}
      <div className="db-field">
        <label className="db-label">Measurement Unit Preference</label>
        <div className="db-radio-group">
          {["inches", "centimeters"].map((unit) => (
            <label key={unit} className="db-radio-label">
              <input
                type="radio"
                name="measurementUnit"
                value={unit}
                checked={form.measurementUnit === unit}
                onChange={handleChange}
              />
              <span className="db-radio-custom" />
              {unit.charAt(0).toUpperCase() + unit.slice(1)}
            </label>
          ))}
        </div>
      </div>

      {/* Terms box */}
      <div className="db-terms-box">
        <label className="db-checkbox-label">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={form.termsAccepted}
            onChange={handleChange}
          />
          <span className="db-checkbox-custom" />
          <span>
            I agree to <a href="#">terms & conditions</a>
          </span>
        </label>
        {ft("termsAccepted") && !validity.termsAccepted && (
          <p className="db-error db-error-indent">
            {errorMessages.termsAccepted}
          </p>
        )}
        <label className="db-checkbox-label">
          <input
            type="checkbox"
            name="privacyAccepted"
            checked={form.privacyAccepted}
            onChange={handleChange}
          />
          <span className="db-checkbox-custom" />
          <span>
            I agree to <a href="#">privacy policies</a>
          </span>
        </label>
        {ft("privacyAccepted") && !validity.privacyAccepted && (
          <p className="db-error db-error-indent">
            {errorMessages.privacyAccepted}
          </p>
        )}
      </div>

      <button className="db-btn" onClick={handleSubmit}>
        Create account
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
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function RegisterStep3({
  onSubmit,
  onBack,
  defaultValues = {},
}) {
  const role = defaultValues.role; // "business_owner" | "employee"

  const handleSubmit = (stepData) => {
    if (onSubmit) onSubmit({ ...defaultValues, ...stepData });
    else console.log("Final payload:", { ...defaultValues, ...stepData });
  };

  return (
    <div className="db-page">
      {/* ── Left Panel ── */}
      <div className="db-left">
        <div className="db-left-overlay" />
        <div className="db-left-content">
          <p className="db-tagline">
            Digitizing <strong>Ghanaian Fashion</strong>,{" "}
            <strong>One Measurement</strong> at a Time
          </p>
          <p className="db-sub">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <div className="db-dots">
            <span className="db-dot" />
            <span className="db-dot" />
            <span className="db-dot active" />
          </div>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="db-right">
        <div className="db-card">
          <div className="db-header">
            <h1 className="db-logo">
              Join us on <span className="db-logo-d">D</span>raftBoard
            </h1>
            <p className="db-sub-head">Create an account to use DraftBoard</p>
            <Steps current={3} />
          </div>

          {role === "business_owner" ? (
            <BusinessOwnerForm
              onSubmit={handleSubmit}
              defaultValues={defaultValues}
            />
          ) : (
            <EmployeeForm
              onSubmit={handleSubmit}
              defaultValues={defaultValues}
            />
          )}
        </div>
      </div>
    </div>
  );
}
