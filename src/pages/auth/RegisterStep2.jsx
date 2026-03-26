import { useState } from "react";
import Logo from "../../assets/logo_black.png";
import "./RegisterStep2.css";

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

const BUSINESS_TYPES = [
  "Tailor Shop",
  "Fashion Designer",
  "Boutique",
  "Clothing Manufacturer",
  "Alteration Service",
  "Other",
];

export default function RegisterStep2({
  onSubmit,
  onBack,
  defaultValues = {},
}) {
  const [form, setForm] = useState({
    // Required fields
    companyName: defaultValues.companyName || "",
    phoneNumber: defaultValues.phoneNumber || "+233 ",
    businessType: defaultValues.businessType || "",

    // Optional fields
    businessNumber: defaultValues.businessNumber || "",
    address: defaultValues.address || "",
    city: defaultValues.city || "",
    state: defaultValues.state || "",
    country: defaultValues.country || "",
    postalCode: defaultValues.postalCode || "",
    email: defaultValues.email || "",
    website: defaultValues.website || "",
    measurementUnit: defaultValues.measurementUnit || "inches",
  });

  const [touched, setTouched] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const validators = {
    companyName: (v) => v.trim().length >= 2,
    phoneNumber: (v) => /^\+\d{7,15}$/.test(v.replace(/\s/g, "")),
    businessType: (v) => v !== "",
    measurementUnit: (v) => v !== "",
    email: (v) => v === "" || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
    businessNumber: (v) => v === "" || v.trim().length >= 3,
    postalCode: (v) => v === "" || v.trim().length >= 3,
  };

  const errorMessages = {
    companyName: "Enter your company name",
    phoneNumber: "Enter a valid phone number (e.g. +233 501234567)",
    businessType: "Select a business type",
    measurementUnit: "Select a measurement unit",
    email: "Enter a valid email address",
    businessNumber: "Enter a valid business number",
    postalCode: "Enter a valid postal code",
  };

  const requiredFields = [
    "companyName",
    "phoneNumber",
    "businessType",
    "measurementUnit",
  ];
  const optionalFields = [
    "businessNumber",
    "address",
    "city",
    "state",
    "country",
    "postalCode",
    "email",
    "website",
  ];

  const validity = {
    companyName: validators.companyName(form.companyName),
    phoneNumber: validators.phoneNumber(form.phoneNumber),
    businessType: validators.businessType(form.businessType),
    measurementUnit: validators.measurementUnit(form.measurementUnit),
    email: validators.email(form.email),
    businessNumber: validators.businessNumber(form.businessNumber),
    postalCode: validators.postalCode(form.postalCode),
  };

  const allValid = requiredFields.every((f) => validity[f]);
  const ft = (name) => touched[name] || submitAttempted;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) =>
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));

  const handleSubmit = () => {
    const allTouched = [...requiredFields, ...optionalFields].reduce(
      (acc, f) => ({ ...acc, [f]: true }),
      {}
    );
    setTouched(allTouched);
    setSubmitAttempted(true);
    if (allValid && onSubmit) {
      onSubmit({
        // Required fields
        name: form.companyName,
        phoneNumber: form.phoneNumber,
        companyType: mapBusinessType(form.businessType),

        // Optional fields
        businessNumber: form.businessNumber || null,
        address: form.address || null,
        city: form.city || null,
        state: form.state || null,
        country: form.country || null,
        postalCode: form.postalCode || null,
        email: form.email || null,
        website: form.website || null,
        measurementUnit: form.measurementUnit,
      });
    }
  };

  const mapBusinessType = (type) => {
    const typeMap = {
      "Tailor Shop": "TAILOR_SHOP",
      "Fashion Designer": "FASHION_DESIGNER",
      Boutique: "OTHER",
      "Clothing Manufacturer": "MANUFACTURER",
      "Alteration Service": "OTHER",
      Other: "OTHER",
    };
    return typeMap[type] || "OTHER";
  };

  return (
    <div className="db-page">
      <div className="db-card-wrapper">
        {/* Left Panel */}
        <div className="db-left">
          <div className="db-left-overlay" />
          <div className="db-left-content">
            <p className="db-tagline">
              Build Your <strong>Tailoring Empire</strong>
            </p>
            <p className="db-sub">
              Set up your business details to start managing clients and
              measurements.
            </p>
            <div className="db-dots">
              <span className="db-dot" />
              <span className="db-dot active" />
              <span className="db-dot" />
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="db-right">
          <div
            className="db-card"
            style={{
              marginTop: "35rem",
            }}
          >
            <div className="db-header">
              <div className="welcome-header">
                <h1 className="db-logo">Create Your </h1>
                <div className="img-container">
                  <img src={Logo} alt="DraftBoard Logo" className="logo" />
                  <h1 className="db-logo">raftBoard Company</h1>
                </div>
              </div>
              <p className="db-sub-head">Set up your tailoring business</p>
              <Steps current={2} />
            </div>

            <div className="db-form">
              {/* Company Name - Required */}
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
                  Company Name *
                </label>
                <div
                  className={`db-input-wrap ${
                    ft("companyName") && !validity.companyName ? "error" : ""
                  }`}
                >
                  <input
                    name="companyName"
                    placeholder="Mensah Tailoring & Designs"
                    value={form.companyName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {ft("companyName") && !validity.companyName && (
                  <p className="db-error">{errorMessages.companyName}</p>
                )}
              </div>

              {/* Business Number - Optional */}
              <div className="db-field">
                <label className="db-label">
                  <span className="db-label-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                      <line x1="12" y1="8" x2="12" y2="16" />
                    </svg>
                  </span>
                  Business Number (Optional)
                </label>
                <div
                  className={`db-input-wrap ${
                    ft("businessNumber") && !validity.businessNumber
                      ? "error"
                      : ""
                  }`}
                >
                  <input
                    name="businessNumber"
                    placeholder="TAIL-2024-001"
                    value={form.businessNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {ft("businessNumber") && !validity.businessNumber && (
                  <p className="db-error">{errorMessages.businessNumber}</p>
                )}
              </div>

              {/* Phone Number - Required */}
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
                  Business Phone *
                </label>
                <div
                  className={`db-input-wrap ${
                    ft("phoneNumber") && !validity.phoneNumber ? "error" : ""
                  }`}
                >
                  <input
                    name="phoneNumber"
                    type="tel"
                    placeholder="+233 501234567"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {ft("phoneNumber") && !validity.phoneNumber && (
                  <p className="db-error">{errorMessages.phoneNumber}</p>
                )}
              </div>

              {/* Email - Optional */}
              <div className="db-field">
                <label className="db-label">
                  <span className="db-label-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                  Business Email (Optional)
                </label>
                <div
                  className={`db-input-wrap ${
                    ft("email") && !validity.email ? "error" : ""
                  }`}
                >
                  <input
                    name="email"
                    type="email"
                    placeholder="info@mensah-tailoring.com"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {ft("email") && !validity.email && (
                  <p className="db-error">{errorMessages.email}</p>
                )}
              </div>

              {/* Website - Optional */}
              <div className="db-field">
                <label className="db-label">
                  <span className="db-label-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </span>
                  Website (Optional)
                </label>
                <div className="db-input-wrap">
                  <input
                    name="website"
                    placeholder="https://mensah-tailoring.com"
                    value={form.website}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Business Type Dropdown - Required */}
              <div className="db-field">
                <label className="db-label">Business Type *</label>
                <div
                  className={`db-select-wrap ${dropdownOpen ? "open" : ""} ${
                    ft("businessType") && !validity.businessType ? "error" : ""
                  }`}
                  onClick={() => setDropdownOpen((o) => !o)}
                >
                  <span
                    className={
                      form.businessType
                        ? "db-select-value"
                        : "db-select-placeholder"
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
                          className={`db-dropdown-item ${
                            form.businessType === t ? "selected" : ""
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setForm((prev) => ({ ...prev, businessType: t }));
                            setTouched((prev) => ({
                              ...prev,
                              businessType: true,
                            }));
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

              {/* Address - Optional */}
              <div className="db-field">
                <label className="db-label">Street Address (Optional)</label>
                <input
                  name="address"
                  placeholder="123 Liberation Road"
                  value={form.address}
                  onChange={handleChange}
                  className="db-input"
                />
              </div>

              {/* City, State, Postal Code Row */}
              <div className="db-row">
                <div className="db-field">
                  <label className="db-label">City (Optional)</label>
                  <input
                    name="city"
                    placeholder="Accra"
                    value={form.city}
                    onChange={handleChange}
                    className="db-input"
                  />
                </div>
                <div className="db-field">
                  <label className="db-label">State/Region (Optional)</label>
                  <input
                    name="state"
                    placeholder="Greater Accra"
                    value={form.state}
                    onChange={handleChange}
                    className="db-input"
                  />
                </div>
              </div>

              <div className="db-row">
                <div className="db-field">
                  <label className="db-label">Country (Optional)</label>
                  <input
                    name="country"
                    placeholder="Ghana"
                    value={form.country}
                    onChange={handleChange}
                    className="db-input"
                  />
                </div>
                <div className="db-field">
                  <label className="db-label">Postal Code (Optional)</label>
                  <input
                    name="postalCode"
                    placeholder="GA-123"
                    value={form.postalCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="db-input"
                  />
                  {ft("postalCode") && !validity.postalCode && (
                    <p className="db-error">{errorMessages.postalCode}</p>
                  )}
                </div>
              </div>

              {/* Measurement Unit Preference - Required */}
              <div className="db-field">
                <label className="db-label">
                  Measurement Unit Preference *
                </label>
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
                {ft("measurementUnit") && !validity.measurementUnit && (
                  <p className="db-error">{errorMessages.measurementUnit}</p>
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
                <button className="db-btn" onClick={handleSubmit}>
                  Next: Invite Team
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
