import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiMail,
  FiPhone,
  FiSearch,
  FiFilter,
  FiCalendar,
  FiMapPin,
  FiMoreVertical,
} from "react-icons/fi";
import "./Clients.css";

const Clients = () => {
  const [clients, setClients] = useState([
    {
      id: 1,
      firstName: "Ama",
      lastName: "Mensah",
      email: "ama.mensah@email.com",
      phone: "+233 24 123 4567",
      gender: "FEMALE",
      city: "Accra",
      totalSessions: 8,
      lastSession: "2024-02-15",
      status: "active",
      preferredGarments: ["KABA", "SLIT", "DRESS"],
    },
    {
      id: 2,
      firstName: "Kwame",
      lastName: "Asante",
      email: "kwame.asante@email.com",
      phone: "+233 54 987 6543",
      gender: "MALE",
      city: "Kumasi",
      totalSessions: 5,
      lastSession: "2024-02-14",
      status: "active",
      preferredGarments: ["SHIRT", "TROUSER", "SUIT"],
    },
    {
      id: 3,
      firstName: "Esi",
      lastName: "Owusu",
      email: "esi.owusu@email.com",
      phone: "+233 20 456 7890",
      gender: "FEMALE",
      city: "Takoradi",
      totalSessions: 12,
      lastSession: "2024-02-10",
      status: "active",
      preferredGarments: ["KABA", "SLIT", "DRESS", "SKIRT"],
    },
    {
      id: 4,
      firstName: "Yaw",
      lastName: "Adjei",
      email: "yaw.adjei@email.com",
      phone: "+233 24 987 6543",
      gender: "MALE",
      city: "Accra",
      totalSessions: 3,
      lastSession: "2024-02-05",
      status: "inactive",
      preferredGarments: ["SHIRT", "TROUSER"],
    },
    {
      id: 5,
      firstName: "Abena",
      lastName: "Nyarko",
      email: "abena.nyarko@email.com",
      phone: "+233 55 123 4567",
      gender: "FEMALE",
      city: "Cape Coast",
      totalSessions: 15,
      lastSession: "2024-02-12",
      status: "active",
      preferredGarments: ["KABA", "SLIT", "DRESS"],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterGender, setFilterGender] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [showFilters, setShowFilters] = useState(false);

  const getGenderIcon = (gender) => {
    return gender === "FEMALE" ? "👩" : "👨";
  };

  const getStatusBadge = (status) => {
    return status === "active" ? "badge-success" : "badge-error";
  };

  const filteredClients = clients.filter((client) => {
    const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
    const matchesSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm);
    const matchesGender =
      filterGender === "all" || client.gender === filterGender;
    const matchesStatus =
      filterStatus === "all" || client.status === filterStatus;
    return matchesSearch && matchesGender && matchesStatus;
  });

  return (
    <div className="clients-page">
      <div className="page-header">
        <div>
          <h1>Clients</h1>
          <p className="text-secondary">
            Manage your client measurements and history
          </p>
        </div>
        <Link to="/clients/new" className="btn btn-primary">
          <FiPlus /> New Client
        </Link>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search clients by name, email or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-actions">
          <button
            className={`filter-toggle-btn ${showFilters ? "active" : ""}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter /> Filters
          </button>

          <div className="view-toggle">
            <button
              className={`toggle-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
              title="Grid view"
            >
              ⊞
            </button>
            <button
              className={`toggle-btn ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
              title="List view"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="advanced-filters">
          <div className="filter-group">
            <label>Gender:</label>
            <select
              value={filterGender}
              onChange={(e) => setFilterGender(e.target.value)}
            >
              <option value="all">All Genders</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Status:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <button
            className="clear-filters"
            onClick={() => {
              setFilterGender("all");
              setFilterStatus("all");
              setSearchTerm("");
            }}
          >
            Clear Filters
          </button>
        </div>
      )}

      {viewMode === "grid" ? (
        <div className="clients-grid">
          {filteredClients.map((client) => (
            <div key={client.id} className="client-card">
              <div className="client-card-header">
                <div className="client-avatar" data-gender={client.gender}>
                  {client.firstName[0]}
                  {client.lastName[0]}
                </div>
                <div className="client-status">
                  <span className={`status-badge ${client.status}`}>
                    {client.status}
                  </span>
                </div>
                <button className="card-menu-btn">
                  <FiMoreVertical />
                </button>
              </div>

              <div className="client-card-body">
                <h3>
                  {client.firstName} {client.lastName}
                </h3>
                <p className="client-gender">
                  {getGenderIcon(client.gender)} {client.gender}
                </p>

                <div className="client-contact">
                  <p>
                    <FiMail /> {client.email}
                  </p>
                  <p>
                    <FiPhone /> {client.phone}
                  </p>
                  <p>
                    <FiMapPin /> {client.city}
                  </p>
                </div>

                <div className="client-preferences">
                  {client.preferredGarments.map((garment, idx) => (
                    <span key={idx} className="garment-tag">
                      {garment}
                    </span>
                  ))}
                </div>

                <div className="client-stats">
                  <div className="stat">
                    <span className="stat-value">{client.totalSessions}</span>
                    <span className="stat-label">Sessions</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">
                      {new Date(client.lastSession).toLocaleDateString()}
                    </span>
                    <span className="stat-label">Last Session</span>
                  </div>
                </div>
              </div>

              <div className="client-card-footer">
                <Link to={`/clients/${client.id}`} className="view-details">
                  View Profile →
                </Link>
                <div className="client-actions">
                  <button className="icon-btn">
                    <FiEdit2 />
                  </button>
                  <button className="icon-btn">
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="clients-table-container">
          <table className="clients-table">
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
              {filteredClients.map((client) => (
                <tr key={client.id}>
                  <td>
                    <div className="client-info">
                      <div
                        className="client-avatar-small"
                        data-gender={client.gender}
                      >
                        {client.firstName[0]}
                        {client.lastName[0]}
                      </div>
                      <div>
                        <div className="client-name">
                          {client.firstName} {client.lastName}
                        </div>
                        <div className="client-gender-small">
                          {getGenderIcon(client.gender)} {client.gender}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="contact-info">
                      <div>{client.email}</div>
                      <div className="phone">{client.phone}</div>
                    </div>
                  </td>
                  <td>{client.city}</td>
                  <td>
                    <div className="garment-tags">
                      {client.preferredGarments.slice(0, 2).map((g, i) => (
                        <span key={i} className="garment-tag-small">
                          {g}
                        </span>
                      ))}
                      {client.preferredGarments.length > 2 && (
                        <span className="garment-tag-small">
                          +{client.preferredGarments.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className="session-count">
                      {client.totalSessions}
                    </span>
                  </td>
                  <td>
                    <div className="last-session">
                      <FiCalendar />
                      {new Date(client.lastSession).toLocaleDateString()}
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${client.status}`}>
                      {client.status}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <Link
                        to={`/clients/${client.id}`}
                        className="action-link"
                      >
                        View
                      </Link>
                      <button className="action-btn-icon">
                        <FiEdit2 />
                      </button>
                      <button className="action-btn-icon">
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredClients.length === 0 && (
        <div className="no-results">
          <p>No clients found matching your criteria</p>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setSearchTerm("");
              setFilterGender("all");
              setFilterStatus("all");
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Clients;
