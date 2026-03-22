import { useState } from "react";
import { BsSearch, BsFilter, BsChevronDown, BsChevronRight, BsCalendar3, BsBox, BsPerson } from "react-icons/bs";
import { FiPlus, FiList, FiGrid } from "react-icons/fi";
import "./Measurement-session.css";

// DESIGN TOKENS
const colors = {
  primary: "#8B0A2A",
  primaryDark: "#6B0820",
  primaryLight: "#A01535",
  accent: "#C41E3A",
  bg: "#F4F4F6",
  white: "#FFFFFF",
  cardBg: "#FAFAFA",
  border: "#E8E8EC",
  textDark: "#1A1A2E",
  textMid: "#4A4A6A",
  textLight: "#8A8AA0",
  completedBg: "#E8F5E9",
  completedText: "#2E7D32",
  pendingBg: "#FFF8E1",
  pendingText: "#F57F17",
  avatarBg: "#6B0820",
};

// REUSABLE BUTTON COMPONENTS

export const PrimaryButton = ({ children, onClick, style = {} }) => (
  <button
    onClick={onClick}
    className="primary-button"
    style={style}
  >
    {children}
  </button>
);

export const OutlineButton = ({ children, onClick, style = {} }) => (
  <button
    onClick={onClick}
    className="outline-button"
    style={style}
  >
    {children}
  </button>
);

export const LinkButton = ({ children, onClick, style = {} }) => (
  <button
    onClick={onClick}
    className="link-button"
    style={style}
  >
    {children}
  </button>
);

// STATUS BADGE

const StatusBadge = ({ status }) => {
  const statusClassMap = {
    Completed: "completed",
    Pending: "pending",
    "In Progress": "in-progress",
  };
  const statusClass = statusClassMap[status] || "pending";
  return (
    <span className={`status-badge ${statusClass}`}>
      {status}
    </span>
  );
};

// AVATAR

const Avatar = ({ initials }) => (
  <div className="avatar">
    {initials}
  </div>
);

// DROPDOWN FILTER

const FilterDropdown = ({ label, value, options, onChange, isOpen, onToggle, dropdownId }) => {
  return (
    <div className="filter-dropdown-wrapper">
      <OutlineButton onClick={() => onToggle(isOpen ? null : dropdownId)}>
        {value || label}
        <BsChevronDown size={12} />
      </OutlineButton>
      {isOpen && (
        <div className="filter-dropdown-menu">
          {options.map(opt => (
            <div
              key={opt}
              onClick={() => { onChange(opt); onToggle(null); }}
              className={`filter-dropdown-item ${value === opt ? 'selected' : ''}`}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// SESSION CARD

const SessionCard = ({ session, onViewDetails }) => (
  <div className="session-card">
    {/* Card Header */}
    <div className="session-card-header">
      <div className="session-card-header-content">
        <Avatar initials={session.initials} />
        <div className="session-card-header-text">
          <div className="session-card-header-name">
            {session.clientName}
          </div>
          <div className="session-card-header-type">
            {session.type}
          </div>
        </div>
      </div>
      <StatusBadge status={session.status} />
    </div>

    {/* Card Body */}
    <div className="session-card-body">
      <div className="session-card-field">
        <BsPerson size={14} color={colors.primary} />
        <span className="session-card-field-text">{session.tailor}</span>
      </div>
      <div className="session-card-field">
        <BsBox size={13} color={colors.primary} />
        <span className="session-card-field-text">{session.garment}</span>
      </div>
      <div className="session-card-field">
        <BsCalendar3 size={13} color={colors.primary} />
        <span className="session-card-field-text">{session.date}</span>
      </div>
    </div>

    {/* Card Footer */}
    <div className="session-card-footer">
      <LinkButton onClick={() => onViewDetails(session)}>
        View Session Details <BsChevronRight size={13} />
      </LinkButton>
    </div>
  </div>
);

// SESSION CARD - GRID VIEW

const GridSessionCard = ({ session, onViewDetails }) => (
  <div className="grid-session-card">
    <div className="grid-card-header">
      <Avatar initials={session.initials} />
      <StatusBadge status={session.status} />
    </div>
    <div className="grid-card-body">
      <div className="grid-card-title">{session.clientName}</div>
      <div className="grid-card-type">{session.type}</div>
      <div className="grid-card-field">
        <BsPerson size={12} color={colors.primary} />
        <span>{session.tailor}</span>
      </div>
      <div className="grid-card-field">
        <BsBox size={12} color={colors.primary} />
        <span>{session.garment}</span>
      </div>
      <div className="grid-card-field">
        <BsCalendar3 size={12} color={colors.primary} />
        <span>{session.date}</span>
      </div>
    </div>
    <div className="grid-card-footer">
      <LinkButton onClick={() => onViewDetails(session)}>
        View Details <BsChevronRight size={13} />
      </LinkButton>
    </div>
  </div>
);

// NEW SESSION MODAL

const NewSessionModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    clientName: "",
    tailor: "",
    garment: "",
    type: "Initial",
    status: "Pending",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.clientName && formData.tailor && formData.garment && formData.date) {
      onSubmit(formData);
      setFormData({
        clientName: "",
        tailor: "",
        garment: "",
        type: "Initial",
        status: "Pending",
        date: "",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Session</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Client Name *</label>
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              placeholder="Enter client name"
              required
            />
          </div>
          <div className="form-group">
            <label>Tailor Name *</label>
            <input
              type="text"
              name="tailor"
              value={formData.tailor}
              onChange={handleChange}
              placeholder="Enter tailor name"
              required
            />
          </div>
          <div className="form-group">
            <label>Garment *</label>
            <input
              type="text"
              name="garment"
              value={formData.garment}
              onChange={handleChange}
              placeholder="Enter garment type"
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Type</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option>Initial</option>
                <option>Follow-up</option>
                <option>Alteration</option>
              </select>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Date & Time *</label>
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="e.g., Mar 15, 2:00 PM"
              required
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="outline-button" onClick={onClose}>Cancel</button>
            <button type="submit" className="primary-button">Create Session</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// SESSION DETAILS MODAL

const SessionDetailsModal = ({ isOpen, onClose, session }) => {
  if (!isOpen || !session) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Session Details</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="session-details-body">
          {/* Client Info */}
          <div className="details-section">
            <h3 className="details-section-title">Client Information</h3>
            <div className="details-row">
              <div className="details-item">
                <span className="details-label">Client Name</span>
                <span className="details-value">{session.clientName}</span>
              </div>
              <div className="details-item">
                <span className="details-label">Initials</span>
                <span className="details-value">{session.initials}</span>
              </div>
            </div>
          </div>

          {/* Session Info */}
          <div className="details-section">
            <h3 className="details-section-title">Session Information</h3>
            <div className="details-row">
              <div className="details-item">
                <span className="details-label">Type</span>
                <span className="details-value">{session.type}</span>
              </div>
              <div className="details-item">
                <span className="details-label">Status</span>
                <span className="details-value"><StatusBadge status={session.status} /></span>
              </div>
            </div>
          </div>

          {/* Garment & Tailor */}
          <div className="details-section">
            <h3 className="details-section-title">Measurement Details</h3>
            <div className="details-row">
              <div className="details-item">
                <span className="details-label">Garment</span>
                <span className="details-value">{session.garment}</span>
              </div>
              <div className="details-item">
                <span className="details-label">Tailor</span>
                <span className="details-value">{session.tailor}</span>
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="details-section">
            <h3 className="details-section-title">Schedule</h3>
            <div className="details-row">
              <div className="details-item">
                <span className="details-label">Date & Time</span>
                <span className="details-value">{session.date}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <PrimaryButton onClick={onClose}>Close</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

// MAIN COMPONENT

const initialSessionsData = [
  { id: 1, initials: "AM", clientName: "Ama Mensah", type: "Initial", status: "Completed", tailor: "Kwame Asante", garment: "KABA & SLIT", date: "Feb 15, 10:30 AM" },
  { id: 2, initials: "AM", clientName: "Ama Mensah", type: "Initial", status: "Completed", tailor: "Kwame Asante", garment: "KABA & SLIT", date: "Feb 15, 10:30 AM" },
  { id: 3, initials: "KO", clientName: "Kofi Owusu", type: "Follow-up", status: "Pending", tailor: "Abena Darko", garment: "SUIT", date: "Mar 02, 2:00 PM" },
  { id: 4, initials: "EA", clientName: "Efua Agyei", type: "Initial", status: "In Progress", tailor: "Kwame Asante", garment: "DRESS", date: "Mar 10, 11:00 AM" },
];

const statusOptions = ["All Status", "Completed", "Pending", "In Progress"];
const typeOptions = ["All Types", "Initial", "Follow-up", "Alteration"];

export default function MeasurementSessions() {
  const [sessions, setSessions] = useState(initialSessionsData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [viewMode, setViewMode] = useState("list");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleViewDetails = (session) => {
    setSelectedSession(session);
    setDetailsModalOpen(true);
  };
  const handleCloseDetails = () => {
    setDetailsModalOpen(false);
    setSelectedSession(null);
  };
  const handleCreateSession = (formData) => {
    const initials = formData.clientName
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
    const newSession = {
      id: sessions.length + 1,
      initials: initials,
      clientName: formData.clientName,
      type: formData.type,
      status: formData.status,
      tailor: formData.tailor,
      garment: formData.garment,
      date: formData.date,
    };
    setSessions([...sessions, newSession]);
    handleCloseModal();
  };

  const filtered = sessions.filter(s => {
    const matchSearch =
      s.clientName.toLowerCase().includes(search.toLowerCase()) ||
      s.tailor.toLowerCase().includes(search.toLowerCase()) ||
      s.garment.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All Status" || s.status === statusFilter;
    const matchType = typeFilter === "All Types" || s.type === typeFilter;
    return matchSearch && matchStatus && matchType;
  });

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:wght@700&display=swap" rel="stylesheet" />
      <div className="page-container">
        {/* Page Header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">
              Measurement Sessions
            </h1>
            <p className="page-subtitle">
              Track and manage all measurement sessions
            </p>
          </div>
          <PrimaryButton onClick={handleOpenModal}>
            <FiPlus size={16} strokeWidth={2.5} />
            New Session
          </PrimaryButton>
        </div>

        {/* Search + Filters */}
        <div className="search-filters-container">
          {/* Search */}
          <div className="search-wrapper">
            <BsSearch
              size={14}
              color={colors.textLight}
              className="search-icon"
            />
            <input
              type="text"
              placeholder="Search sessions..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Filters */}
          <FilterDropdown
            label="All Status"
            value={statusFilter}
            options={statusOptions}
            onChange={setStatusFilter}
            isOpen={openDropdown === "status"}
            onToggle={setOpenDropdown}
            dropdownId="status"
          />
          <FilterDropdown
            label="All Types"
            value={typeFilter}
            options={typeOptions}
            onChange={setTypeFilter}
            isOpen={openDropdown === "type"}
            onToggle={setOpenDropdown}
            dropdownId="type"
          />

          {/* View Toggle */}
          <div className="view-toggle">
            <button
              className={`view-toggle-btn ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
              title="List view"
            >
              <FiList size={16} />
            </button>
            <button
              className={`view-toggle-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
              title="Grid view"
            >
              <FiGrid size={16} />
            </button>
          </div>
        </div>

        {/* Session Cards */}
        <div className={`session-cards-container ${viewMode}-view`}>
          {filtered.length > 0 ? (
            filtered.map(session => 
              viewMode === "list" ? (
                <SessionCard key={session.id} session={session} onViewDetails={handleViewDetails} />
              ) : (
                <GridSessionCard key={session.id} session={session} onViewDetails={handleViewDetails} />
              )
            )
          ) : (
            <div className="no-sessions-message">
              No sessions match your filters.
            </div>
          )}
        </div>
      </div>
      <NewSessionModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleCreateSession} />
      <SessionDetailsModal isOpen={detailsModalOpen} onClose={handleCloseDetails} session={selectedSession} />
    </>
  );
}