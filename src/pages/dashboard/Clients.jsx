import { useState, useMemo } from "react";
import { useToast } from "../../components/ui/Toast";
import "./Clients.css";

// ─── Dummy Data ───────────────────────────────────────────────────────────────
const GARMENT_OPTIONS = [
  "KABA",
  "SLIT",
  "DRESS",
  "SUIT",
  "KAFTAN",
  "AGBADA",
  "SHIRT",
  "TROUSER",
];
const GENDER_OPTIONS = ["Female", "Male", "Other"];
const CITY_OPTIONS = [
  "Accra",
  "Kumasi",
  "Takoradi",
  "Cape Coast",
  "Tamale",
  "Sunyani",
];

const INITIAL_CLIENTS = [
  {
    id: 1,
    firstName: "Ama",
    lastName: "Mensah",
    gender: "Female",
    email: "ama.mensah@email.com",
    phone: "+233 24 123 4567",
    city: "Accra",
    garments: ["KABA", "SLIT", "DRESS"],
    sessions: 8,
    lastSession: "02/15/2025",
    status: "Active",
  },
  {
    id: 2,
    firstName: "Ama",
    lastName: "Mensah",
    gender: "Female",
    email: "ama.mensah@email.com",
    phone: "+233 24 123 4567",
    city: "Accra",
    garments: ["KABA", "SLIT", "DRESS"],
    sessions: 8,
    lastSession: "02/15/2025",
    status: "Active",
  },
  {
    id: 3,
    firstName: "Ama",
    lastName: "Mensah",
    gender: "Female",
    email: "ama.mensah@email.com",
    phone: "+233 24 123 4567",
    city: "Accra",
    garments: ["KABA", "SLIT", "DRESS"],
    sessions: 8,
    lastSession: "02/15/2025",
    status: "Active",
  },
  {
    id: 4,
    firstName: "Kofi",
    lastName: "Asante",
    gender: "Male",
    email: "kofi.asante@email.com",
    phone: "+233 20 987 6543",
    city: "Kumasi",
    garments: ["SUIT", "KAFTAN"],
    sessions: 12,
    lastSession: "02/10/2025",
    status: "Active",
  },
  {
    id: 5,
    firstName: "Abena",
    lastName: "Owusu",
    gender: "Female",
    email: "abena.owusu@email.com",
    phone: "+233 27 456 7890",
    city: "Takoradi",
    garments: ["DRESS", "KABA"],
    sessions: 5,
    lastSession: "01/28/2025",
    status: "Inactive",
  },
  {
    id: 6,
    firstName: "Kwame",
    lastName: "Boateng",
    gender: "Male",
    email: "kwame.boateng@email.com",
    phone: "+233 54 321 0987",
    city: "Accra",
    garments: ["AGBADA", "SUIT"],
    sessions: 3,
    lastSession: "01/15/2025",
    status: "Active",
  },
];

// ─── Validators ───────────────────────────────────────────────────────────────
function validateClient(form) {
  const e = {};
  if (!form.firstName.trim() || form.firstName.trim().length < 2)
    e.firstName = "At least 2 characters";
  if (!form.lastName.trim() || form.lastName.trim().length < 2)
    e.lastName = "At least 2 characters";
  if (!form.gender) e.gender = "Select a gender";
  if (
    !form.email.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())
  )
    e.email = "Enter a valid email";
  if (
    !form.phone.trim() ||
    !/^\+?\d{7,15}$/.test(form.phone.replace(/\s/g, ""))
  )
    e.phone = "Enter a valid phone number";
  if (!form.city) e.city = "Select a city";
  if (!form.garments.length) e.garments = "Select at least one garment type";
  return e;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function initials(c) {
  return `${c.firstName.charAt(0)}${c.lastName.charAt(0)}`.toUpperCase();
}

function GarmentTags({ garments, max = 2 }) {
  const visible = garments.slice(0, max);
  const extra = garments.length - max;
  return (
    <div className="cl-garment-tags">
      {visible.map((g) => (
        <span key={g} className="cl-tag">
          {g}
        </span>
      ))}
      {extra > 0 && <span className="cl-tag extra">+{extra}</span>}
    </div>
  );
}

// ─── New / Edit Client Modal ──────────────────────────────────────────────────
function ClientModal({ initial, onClose, onSave, title }) {
  const EMPTY = {
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    phone: "",
    city: "",
    garments: [],
  };
  const [form, setForm] = useState(initial || EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const touch = (k) => setTouched((p) => ({ ...p, [k]: true }));
  const ft = (k) => touched[k] || submitted;
  const live = validateClient(form);

  const toggleGarment = (g) => {
    set(
      "garments",
      form.garments.includes(g)
        ? form.garments.filter((x) => x !== g)
        : [...form.garments, g],
    );
    touch("garments");
  };

  const handleSave = () => {
    setSubmitted(true);
    const errs = validateClient(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    onSave(form);
  };

  return (
    <div className="cl-overlay" onClick={onClose}>
      <div className="cl-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cl-modal-hd">
          <h3>{title}</h3>
          <button className="cl-modal-x" onClick={onClose}>
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

        <div className="cl-modal-body">
          <div className="cl-form-row">
            <div className="cl-fg">
              <label>First Name</label>
              <input
                placeholder="e.g. Ama"
                value={form.firstName}
                onChange={(e) => set("firstName", e.target.value)}
                onBlur={() => touch("firstName")}
              />
              {ft("firstName") && live.firstName && (
                <p className="cl-err">{live.firstName}</p>
              )}
            </div>
            <div className="cl-fg">
              <label>Last Name</label>
              <input
                placeholder="e.g. Mensah"
                value={form.lastName}
                onChange={(e) => set("lastName", e.target.value)}
                onBlur={() => touch("lastName")}
              />
              {ft("lastName") && live.lastName && (
                <p className="cl-err">{live.lastName}</p>
              )}
            </div>
          </div>

          <div className="cl-fg">
            <label>Gender</label>
            <select
              value={form.gender}
              onChange={(e) => set("gender", e.target.value)}
              onBlur={() => touch("gender")}
            >
              <option value="">Select gender</option>
              {GENDER_OPTIONS.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
            {ft("gender") && live.gender && (
              <p className="cl-err">{live.gender}</p>
            )}
          </div>

          <div className="cl-fg">
            <label>Email</label>
            <input
              type="email"
              placeholder="client@email.com"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              onBlur={() => touch("email")}
            />
            {ft("email") && live.email && (
              <p className="cl-err">{live.email}</p>
            )}
          </div>

          <div className="cl-form-row">
            <div className="cl-fg">
              <label>Phone</label>
              <input
                placeholder="+233 24 123 4567"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                onBlur={() => touch("phone")}
              />
              {ft("phone") && live.phone && (
                <p className="cl-err">{live.phone}</p>
              )}
            </div>
            <div className="cl-fg">
              <label>City</label>
              <select
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
                onBlur={() => touch("city")}
              >
                <option value="">Select city</option>
                {CITY_OPTIONS.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              {ft("city") && live.city && <p className="cl-err">{live.city}</p>}
            </div>
          </div>

          <div className="cl-fg">
            <label>Preferred Garments</label>
            <div className="cl-garment-picker">
              {GARMENT_OPTIONS.map((g) => (
                <button
                  key={g}
                  type="button"
                  className={`cl-garment-opt ${form.garments.includes(g) ? "selected" : ""}`}
                  onClick={() => toggleGarment(g)}
                >
                  {g}
                </button>
              ))}
            </div>
            {ft("garments") && live.garments && (
              <p className="cl-err">{live.garments}</p>
            )}
          </div>
        </div>

        <div className="cl-modal-ft">
          <button className="cl-btn-sec" onClick={onClose}>
            Cancel
          </button>
          <button className="cl-btn-pri" onClick={handleSave}>
            {initial ? "Save Changes" : "Add Client"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────
function DeleteModal({ client, onClose, onConfirm }) {
  return (
    <div className="cl-overlay" onClick={onClose}>
      <div
        className="cl-modal cl-modal-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cl-modal-hd">
          <h3>Delete Client</h3>
          <button className="cl-modal-x" onClick={onClose}>
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
        <div className="cl-modal-body">
          <p className="cl-del-text">
            Are you sure you want to delete{" "}
            <strong>
              {client.firstName} {client.lastName}
            </strong>
            ? This action cannot be undone.
          </p>
        </div>
        <div className="cl-modal-ft">
          <button className="cl-btn-sec" onClick={onClose}>
            Cancel
          </button>
          <button className="cl-btn-danger" onClick={onConfirm}>
            Delete Client
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Filter Panel ─────────────────────────────────────────────────────────────
function FilterPanel({ filters, setFilters, onClose }) {
  const [local, setLocal] = useState(filters);
  return (
    <div className="cl-filter-panel">
      <div className="cl-filter-hd">
        <span>Filters</span>
        <button className="cl-modal-x" onClick={onClose}>
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

      <div className="cl-filter-body">
        <div className="cl-fg">
          <label>Status</label>
          <select
            value={local.status}
            onChange={(e) =>
              setLocal((p) => ({ ...p, status: e.target.value }))
            }
          >
            <option value="">All</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
        <div className="cl-fg">
          <label>Gender</label>
          <select
            value={local.gender}
            onChange={(e) =>
              setLocal((p) => ({ ...p, gender: e.target.value }))
            }
          >
            <option value="">All</option>
            {GENDER_OPTIONS.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </div>
        <div className="cl-fg">
          <label>City</label>
          <select
            value={local.city}
            onChange={(e) => setLocal((p) => ({ ...p, city: e.target.value }))}
          >
            <option value="">All</option>
            {CITY_OPTIONS.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="cl-fg">
          <label>Garment</label>
          <select
            value={local.garment}
            onChange={(e) =>
              setLocal((p) => ({ ...p, garment: e.target.value }))
            }
          >
            <option value="">All</option>
            {GARMENT_OPTIONS.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="cl-filter-ft">
        <button
          className="cl-btn-sec"
          onClick={() => {
            setFilters({ status: "", gender: "", city: "", garment: "" });
            onClose();
          }}
        >
          Clear All
        </button>
        <button
          className="cl-btn-pri"
          onClick={() => {
            setFilters(local);
            onClose();
          }}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}

// ─── Card View ────────────────────────────────────────────────────────────────
function ClientCard({ client, onEdit, onDelete, onView }) {
  return (
    <div className="cl-card">
      <div className="cl-card-top">
        <div className="cl-avatar">{initials(client)}</div>
        <span className={`cl-status-dot ${client.status.toLowerCase()}`}>
          {client.status.toLowerCase()}
        </span>
      </div>
      <div className="cl-card-name">
        {client.firstName} {client.lastName}
      </div>
      <div className="cl-card-gender">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        {client.gender.toUpperCase()}
      </div>

      <div className="cl-card-contacts">
        <div className="cl-contact-row">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          {client.email}
        </div>
        <div className="cl-contact-row">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.72 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.63 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.16 6.16l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          {client.phone}
        </div>
        <div className="cl-contact-row">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {client.city}
        </div>
      </div>

      <GarmentTags garments={client.garments} max={3} />

      <div className="cl-card-stats">
        <div className="cl-stat-col">
          <span className="cl-stat-num">{client.sessions}</span>
          <span className="cl-stat-lbl">Sessions</span>
        </div>
        <div className="cl-stat-col">
          <span className="cl-stat-num">{client.lastSession}</span>
          <span className="cl-stat-lbl">Last Session</span>
        </div>
      </div>

      <div className="cl-card-actions">
        <button className="cl-view-btn" onClick={() => onView(client)}>
          View Profile
        </button>
        <button
          className="cl-icon-btn"
          onClick={() => onEdit(client)}
          title="Edit"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
        <button
          className="cl-icon-btn danger"
          onClick={() => onDelete(client)}
          title="Delete"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M9 6V4h6v2" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Table View ───────────────────────────────────────────────────────────────
function ClientTable({ clients, onEdit, onDelete, onView }) {
  return (
    <div className="cl-table-wrap">
      <table className="cl-table">
        <thead>
          <tr>
            <th>Client</th>
            <th>Contact</th>
            <th>Location</th>
            <th>Preferred Garments</th>
            <th>Sessions</th>
            <th>Last Session</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((c) => (
            <tr key={c.id}>
              <td>
                <div className="cl-table-client">
                  <div className="cl-avatar sm">{initials(c)}</div>
                  <div>
                    <span className="cl-tc-name">
                      {c.firstName} {c.lastName}
                    </span>
                    <span className="cl-tc-gender">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      {c.gender.toUpperCase()}
                    </span>
                  </div>
                </div>
              </td>
              <td>
                <div className="cl-tc-contact">
                  <span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    {c.email}
                  </span>
                  <span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.72 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.63 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.16 6.16l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    {c.phone}
                  </span>
                </div>
              </td>
              <td>
                <span className="cl-tc-loc">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {c.city}
                </span>
              </td>
              <td>
                <GarmentTags garments={c.garments} max={2} />
              </td>
              <td>
                <span className="cl-tc-sessions">{c.sessions}</span>
              </td>
              <td>
                <span className="cl-tc-date">
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
                  {c.lastSession}
                </span>
              </td>
              <td>
                <span className={`cl-status-pill ${c.status.toLowerCase()}`}>
                  {c.status}
                </span>
              </td>
              <td>
                <div className="cl-tbl-actions">
                  <button className="cl-tbl-view" onClick={() => onView(c)}>
                    View
                  </button>
                  <button
                    className="cl-icon-btn sm"
                    onClick={() => onEdit(c)}
                    title="Edit"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                  <button
                    className="cl-icon-btn sm danger"
                    onClick={() => onDelete(c)}
                    title="Delete"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      <path d="M10 11v6" />
                      <path d="M14 11v6" />
                      <path d="M9 6V4h6v2" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Clients() {
  const [clients, setClients] = useState(INITIAL_CLIENTS);
  const [view, setView] = useState("grid"); // "grid" | "list"
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    gender: "",
    city: "",
    garment: "",
  });
  const [showFilter, setShowFilter] = useState(false);
  const [modal, setModal] = useState(null); // null | "new" | "edit" | "delete" | "view"
  const [selected, setSelected] = useState(null);
  const toast = useToast();

  // ── Active filter count badge
  const activeFilters = Object.values(filters).filter(Boolean).length;

  // ── Filtered list
  const filtered = useMemo(() => {
    return clients.filter((c) => {
      const q = search.toLowerCase();
      const matchSearch =
        !search ||
        `${c.firstName} ${c.lastName}`.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.replace(/\s/g, "").includes(q.replace(/\s/g, ""));
      const matchStatus = !filters.status || c.status === filters.status;
      const matchGender = !filters.gender || c.gender === filters.gender;
      const matchCity = !filters.city || c.city === filters.city;
      const matchGarment =
        !filters.garment || c.garments.includes(filters.garment);
      return (
        matchSearch && matchStatus && matchGender && matchCity && matchGarment
      );
    });
  }, [clients, search, filters]);

  const openEdit = (c) => {
    setSelected(c);
    setModal("edit");
  };
  const openDelete = (c) => {
    setSelected(c);
    setModal("delete");
  };
  const openView = (c) => {
    setSelected(c);
    setModal("view");
  };
  const closeModal = () => {
    setModal(null);
    setSelected(null);
  };

  const handleCreate = (form) => {
    const newC = {
      id: Date.now(),
      sessions: 0,
      lastSession: "—",
      status: "Active",
      ...form,
    };
    setClients((p) => [newC, ...p]);
    closeModal();
    toast({
      message: `${form.firstName} ${form.lastName} added`,
      type: "success",
    });
  };

  const handleEdit = (form) => {
    setClients((p) =>
      p.map((c) => (c.id === selected.id ? { ...c, ...form } : c)),
    );
    closeModal();
    toast({
      message: `${form.firstName} ${form.lastName} updated`,
      type: "success",
    });
  };

  const handleDelete = () => {
    const name = `${selected.firstName} ${selected.lastName}`;
    setClients((p) => p.filter((c) => c.id !== selected.id));
    closeModal();
    toast({ message: `${name} removed`, type: "warning" });
  };

  return (
    <div className="cl-page">
      {/* Header */}
      <div className="cl-page-header">
        <div>
          <h1 className="cl-title">Clients</h1>
          <p className="cl-subtitle">
            Manage your client measurements and history
          </p>
        </div>
        <button className="cl-btn-pri" onClick={() => setModal("new")}>
          + New Client
        </button>
      </div>

      {/* Toolbar */}
      <div className="cl-toolbar">
        <div className="cl-search-wrap">
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
            placeholder="Search clients by name, email or phone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="cl-search-clear" onClick={() => setSearch("")}>
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

        <div className="cl-toolbar-right">
          <button
            className="cl-filter-btn"
            onClick={() => setShowFilter((o) => !o)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            Filters
            {activeFilters > 0 && (
              <span className="cl-filter-count">{activeFilters}</span>
            )}
          </button>

          <div className="cl-view-toggle">
            <button
              className={`cl-toggle-btn ${view === "grid" ? "active" : ""}`}
              onClick={() => setView("grid")}
              title="Card view"
            >
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
            </button>
            <button
              className={`cl-toggle-btn ${view === "list" ? "active" : ""}`}
              onClick={() => setView("list")}
              title="List view"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Filter panel (inline dropdown) */}
      {showFilter && (
        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          onClose={() => setShowFilter(false)}
        />
      )}

      {/* Results */}
      {search && (
        <p className="cl-results-count">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "
          {search}"
        </p>
      )}

      {/* Content */}
      {filtered.length === 0 ? (
        <div className="cl-empty">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <p>No clients found</p>
          <span>
            {search || activeFilters
              ? "Try adjusting your search or filters"
              : "Add your first client"}
          </span>
        </div>
      ) : view === "grid" ? (
        <div className="cl-grid">
          {filtered.map((c) => (
            <ClientCard
              key={c.id}
              client={c}
              onEdit={openEdit}
              onDelete={openDelete}
              onView={openView}
            />
          ))}
        </div>
      ) : (
        <ClientTable
          clients={filtered}
          onEdit={openEdit}
          onDelete={openDelete}
          onView={openView}
        />
      )}

      {/* Modals */}
      {modal === "new" && (
        <ClientModal
          title="New Client"
          onClose={closeModal}
          onSave={handleCreate}
        />
      )}
      {modal === "edit" && (
        <ClientModal
          title="Edit Client"
          onClose={closeModal}
          onSave={handleEdit}
          initial={selected}
        />
      )}
      {modal === "delete" && (
        <DeleteModal
          client={selected}
          onClose={closeModal}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
