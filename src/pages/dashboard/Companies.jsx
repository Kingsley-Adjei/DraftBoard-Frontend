import { useState, useMemo } from "react";
import { useToast } from "../../components/ui/Toast";
import "./Companies.css";

// ─── Dummy Data ───────────────────────────────────────────────────────────────
const INITIAL_COMPANIES = [
  {
    id: 1,
    code: "TAIL-2024-001",
    name: "Premium Tailors",
    email: "info@premiumtailors.com",
    phone: "+233 24 123 4567",
    city: "Accra",
    type: "Tailor Shop",
    members: 5,
    status: "Active",
    color: "#8C1A2E",
  },
  {
    id: 2,
    code: "FASH-2024-002",
    name: "Fashion Forward",
    email: "contact@fashionforward.com",
    phone: "+233 54 987 6543",
    city: "Kumasi",
    type: "Fashion Designer",
    members: 3,
    status: "Active",
    color: "#6B1222",
  },
  {
    id: 3,
    code: "KENT-2024-003",
    name: "Kente Creations",
    email: "info@kentecreations.com",
    phone: "+233 20 456 7890",
    city: "Takoradi",
    type: "Manufacturer",
    members: 8,
    status: "Active",
    color: "#8C1A2E",
  },
  {
    id: 4,
    code: "STIT-2024-004",
    name: "Stitch & Style",
    email: "hello@stitchandstyle.com",
    phone: "+233 27 654 3210",
    city: "Kumasi",
    type: "Boutique",
    members: 2,
    status: "Inactive",
    color: "#444",
  },
];

const BUSINESS_TYPES = [
  "Tailor Shop",
  "Fashion Designer",
  "Boutique",
  "Clothing Manufacturer",
  "Alteration Service",
  "Manufacturer",
  "Other",
];

const CITIES = [
  "Accra",
  "Kumasi",
  "Takoradi",
  "Cape Coast",
  "Tamale",
  "Sunyani",
  "Ho",
  "Other",
];

// Generate a company code from name + year
function generateCode(name, existingCodes) {
  const prefix = name.trim().slice(0, 4).toUpperCase().replace(/\s/g, "");
  const year = new Date().getFullYear();
  let n = existingCodes.length + 1;
  let code = `${prefix}-${year}-${String(n).padStart(3, "0")}`;
  // ensure uniqueness
  while (existingCodes.includes(code)) {
    n++;
    code = `${prefix}-${year}-${String(n).padStart(3, "0")}`;
  }
  return code;
}

const CARD_COLORS = ["#8C1A2E", "#6B1222", "#9B2335", "#7A1525", "#5C0F1B"];

// ─── Validators ───────────────────────────────────────────────────────────────
function validateCompany(form) {
  const errors = {};
  if (!form.name.trim() || form.name.trim().length < 2)
    errors.name = "Company name must be at least 2 characters";
  if (
    !form.email.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())
  )
    errors.email = "Enter a valid email address";
  if (
    !form.phone.trim() ||
    !/^\+?\d{7,15}$/.test(form.phone.replace(/\s/g, ""))
  )
    errors.phone = "Enter a valid phone number (e.g. +233 24 123 4567)";
  if (!form.city) errors.city = "Select a city";
  if (!form.type) errors.type = "Select a business type";
  return errors;
}

// ─── Company Card ─────────────────────────────────────────────────────────────
function CompanyCard({ company, onClick }) {
  return (
    <div className="co-card" onClick={() => onClick(company)}>
      {/* Card header */}
      <div className="co-card-header" style={{ background: company.color }}>
        <div className="co-card-initial">{company.name.charAt(0)}</div>
        <div className="co-card-dots">
          <span />
          <span />
          <span />
        </div>
      </div>

      {/* Card body */}
      <div className="co-card-body">
        <div className="co-card-title-row">
          <div>
            <h3 className="co-card-name">{company.name}</h3>
            <p className="co-card-code">{company.code}</p>
          </div>
        </div>

        <div className="co-card-details">
          <div className="co-detail-row">
            <span className="co-detail-key">Email:</span>
            <span className="co-detail-val">{company.email}</span>
          </div>
          <div className="co-detail-row">
            <span className="co-detail-key">Phone:</span>
            <span className="co-detail-val">{company.phone}</span>
          </div>
          <div className="co-detail-row">
            <span className="co-detail-key">City:</span>
            <span className="co-detail-val">{company.city}</span>
          </div>
          <div className="co-detail-row">
            <span className="co-detail-key">Type:</span>
            <span className="co-detail-val">{company.type}</span>
          </div>
        </div>

        <div className="co-card-footer">
          <span className="co-members">
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
            {company.members} Members
          </span>
          <span className={`co-status-badge ${company.status.toLowerCase()}`}>
            {company.status.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Field Component ──────────────────────────────────────────────────────────
function FormField({ label, error, children }) {
  return (
    <div className="co-form-group">
      <label>{label}</label>
      {children}
      {error && <p className="co-field-error">{error}</p>}
    </div>
  );
}

// ─── New Company Modal ────────────────────────────────────────────────────────
function NewCompanyModal({ onClose, onSave, existingCodes }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    type: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const set = (field, val) => setForm((p) => ({ ...p, [field]: val }));
  const touch = (field) => setTouched((p) => ({ ...p, [field]: true }));

  const ft = (f) => touched[f] || submitted;

  const liveErrors = validateCompany(form);

  const handleSave = () => {
    setSubmitted(true);
    const errs = validateCompany(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    onSave(form);
  };

  return (
    <div className="co-modal-overlay" onClick={onClose}>
      <div className="co-modal" onClick={(e) => e.stopPropagation()}>
        <div className="co-modal-header">
          <h3>New Company</h3>
          <button className="co-modal-close" onClick={onClose}>
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

        <div className="co-modal-body">
          <FormField label="Company Name" error={ft("name") && liveErrors.name}>
            <input
              placeholder="e.g. Premium Tailors"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              onBlur={() => touch("name")}
            />
          </FormField>

          <FormField label="Email" error={ft("email") && liveErrors.email}>
            <input
              type="email"
              placeholder="info@company.com"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              onBlur={() => touch("email")}
            />
          </FormField>

          <div className="co-form-row">
            <FormField label="Phone" error={ft("phone") && liveErrors.phone}>
              <input
                placeholder="+233 24 123 4567"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                onBlur={() => touch("phone")}
              />
            </FormField>

            <FormField label="City" error={ft("city") && liveErrors.city}>
              <select
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
                onBlur={() => touch("city")}
              >
                <option value="">Select city</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </FormField>
          </div>

          <FormField
            label="Business Type"
            error={ft("type") && liveErrors.type}
          >
            <select
              value={form.type}
              onChange={(e) => set("type", e.target.value)}
              onBlur={() => touch("type")}
            >
              <option value="">Select type</option>
              {BUSINESS_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </FormField>

          {/* Preview code */}
          {form.name.trim().length >= 2 && (
            <div className="co-code-preview">
              <span>Company Code:</span>
              <strong>{generateCode(form.name, existingCodes)}</strong>
            </div>
          )}
        </div>

        <div className="co-modal-footer">
          <button className="co-btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="co-btn-primary" onClick={handleSave}>
            Create Company
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Company Detail Modal ─────────────────────────────────────────────────────
function CompanyDetailModal({ company, onClose }) {
  return (
    <div className="co-modal-overlay" onClick={onClose}>
      <div className="co-modal" onClick={(e) => e.stopPropagation()}>
        <div className="co-modal-header">
          <h3>{company.name}</h3>
          <button className="co-modal-close" onClick={onClose}>
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
        <div className="co-modal-body">
          <div
            className="co-detail-banner"
            style={{ background: company.color }}
          >
            <span className="co-detail-initial">{company.name.charAt(0)}</span>
            <span className={`co-status-badge ${company.status.toLowerCase()}`}>
              {company.status.toUpperCase()}
            </span>
          </div>
          <p className="co-detail-code-lg">{company.code}</p>
          {[
            ["Email", company.email],
            ["Phone", company.phone],
            ["City", company.city],
            ["Type", company.type],
            ["Members", `${company.members} members`],
          ].map(([k, v]) => (
            <div key={k} className="co-detail-row-lg">
              <span className="co-dk">{k}</span>
              <span className="co-dv">{v}</span>
            </div>
          ))}
        </div>
        <div className="co-modal-footer">
          <button className="co-btn-secondary" onClick={onClose}>
            Close
          </button>
          <button className="co-btn-primary">Edit Company</button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Companies() {
  const [companies, setCompanies] = useState(INITIAL_COMPANIES);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [showNew, setShowNew] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const toast = useToast();

  const existingCodes = companies.map((c) => c.code);

  const filtered = useMemo(() => {
    return companies.filter((c) => {
      const matchSearch =
        !search ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.code.toLowerCase().includes(search.toLowerCase()) ||
        c.city.toLowerCase().includes(search.toLowerCase()) ||
        c.type.toLowerCase().includes(search.toLowerCase());
      const matchStatus =
        statusFilter === "All Status" || c.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [companies, search, statusFilter]);

  const handleCreate = (form) => {
    const code = generateCode(form.name, existingCodes);
    const colorIdx = companies.length % CARD_COLORS.length;
    const newCo = {
      id: Date.now(),
      code,
      status: "Active",
      members: 1,
      color: CARD_COLORS[colorIdx],
      ...form,
    };
    setCompanies((prev) => [newCo, ...prev]);
    setShowNew(false);
    toast({ message: `"${form.name}" created successfully`, type: "success" });
  };

  return (
    <div className="co-page">
      {/* Page Header */}
      <div className="co-page-header">
        <div>
          <h1 className="co-title">Companies</h1>
          <p className="co-subtitle">Manage your tailoring businesses</p>
        </div>
        <button
          className="co-btn-primary co-new-btn"
          onClick={() => setShowNew(true)}
        >
          + New Company
        </button>
      </div>

      {/* Search + Filter Bar */}
      <div className="co-toolbar">
        <div className="co-search-wrap">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            placeholder="Search companies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="co-search-clear" onClick={() => setSearch("")}>
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
          )}
        </div>

        <div className="co-filter-wrap">
          <button
            className="co-filter-btn"
            onClick={() => setFilterOpen((o) => !o)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            {statusFilter}
            <svg
              className={`co-chevron ${filterOpen ? "open" : ""}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {filterOpen && (
            <div className="co-filter-dropdown">
              {["All Status", "Active", "Inactive"].map((s) => (
                <button
                  key={s}
                  className={`co-filter-item ${statusFilter === s ? "selected" : ""}`}
                  onClick={() => {
                    setStatusFilter(s);
                    setFilterOpen(false);
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results count */}
      {search && (
        <p className="co-results-count">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "
          {search}"
        </p>
      )}

      {/* Cards Grid */}
      {filtered.length > 0 ? (
        <div className="co-grid">
          {filtered.map((c) => (
            <CompanyCard key={c.id} company={c} onClick={setSelected} />
          ))}
        </div>
      ) : (
        <div className="co-empty">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <p>No companies found</p>
          <span>
            {search
              ? "Try a different search term"
              : "Create your first company"}
          </span>
        </div>
      )}

      {/* Modals */}
      {showNew && (
        <NewCompanyModal
          onClose={() => setShowNew(false)}
          onSave={handleCreate}
          existingCodes={existingCodes}
        />
      )}
      {selected && (
        <CompanyDetailModal
          company={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
