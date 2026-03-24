import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiEdit2,
  FiMail,
  FiPhone,
  FiMapPin,
  FiGlobe,
  FiUsers,
  FiUserPlus,
  FiMoreVertical,
  FiCheck,
  FiX,
} from "react-icons/fi";
import "./CompanyDetails.css";

const CompanyDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data - in real app, fetch based on id
  const company = {
    id: 1,
    name: "Premium Tailors",
    businessNumber: "TAIL-2024-001",
    email: "info@premiumtailors.com",
    phone: "+233 24 123 4567",
    website: "https://premiumtailors.com",
    address: "123 Fashion Street",
    city: "Accra",
    state: "Greater Accra",
    country: "Ghana",
    postalCode: "GA-123",
    type: "TAILOR_SHOP",
    status: "ACTIVE",
    createdAt: "2024-01-15",
    members: [
      {
        id: 1,
        name: "Kwame Asante",
        role: "OWNER",
        email: "kwame@premiumtailors.com",
        status: "ACTIVE",
      },
      {
        id: 2,
        name: "Ama Mensah",
        role: "MANAGER",
        email: "ama@premiumtailors.com",
        status: "ACTIVE",
      },
      {
        id: 3,
        name: "Esi Owusu",
        role: "EMPLOYEE",
        email: "esi@premiumtailors.com",
        status: "PENDING",
      },
    ],
    recentSessions: [
      {
        id: 1,
        client: "John Doe",
        type: "SHIRT",
        date: "2024-02-15",
        status: "completed",
      },
      {
        id: 2,
        client: "Jane Smith",
        type: "KABA & SLIT",
        date: "2024-02-14",
        status: "in-progress",
      },
    ],
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "members", label: "Team Members" },
    { id: "sessions", label: "Sessions" },
    { id: "settings", label: "Settings" },
  ];

  const getStatusBadge = (status) => {
    const badges = {
      ACTIVE: "badge-success",
      PENDING: "badge-warning",
      INACTIVE: "badge-error",
      completed: "badge-success",
      "in-progress": "badge-info",
    };
    return badges[status] || "badge-info";
  };

  return (
    <div className="company-details-page">
      <div className="page-header">
        <Link to="/companies" className="back-link">
          <FiArrowLeft /> Back to Companies
        </Link>
        <div className="header-actions">
          <button className="btn btn-secondary">
            <FiEdit2 /> Edit Company
          </button>
        </div>
      </div>

      <div className="company-header">
        <div className="company-title">
          <div className="company-icon-large">{company.name.charAt(0)}</div>
          <div>
            <h1>{company.name}</h1>
            <p className="business-number">{company.businessNumber}</p>
          </div>
          <span className={`badge ${getStatusBadge(company.status)}`}>
            {company.status}
          </span>
        </div>

        <div className="company-quick-info">
          <div className="info-item">
            <FiMail />
            <span>{company.email}</span>
          </div>
          <div className="info-item">
            <FiPhone />
            <span>{company.phone}</span>
          </div>
          <div className="info-item">
            <FiMapPin />
            <span>
              {company.city}, {company.country}
            </span>
          </div>
          {company.website && (
            <div className="info-item">
              <FiGlobe />
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {company.website}
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === "overview" && (
          <div className="overview-tab">
            <div className="info-grid">
              <div className="info-card">
                <h3>Company Information</h3>
                <div className="info-row">
                  <span className="label">Business Number:</span>
                  <span className="value">{company.businessNumber}</span>
                </div>
                <div className="info-row">
                  <span className="label">Type:</span>
                  <span className="value">
                    {company.type.replace("_", " ")}
                  </span>
                </div>
                <div className="info-row">
                  <span className="label">Created:</span>
                  <span className="value">
                    {new Date(company.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="info-card">
                <h3>Address</h3>
                <div className="info-row">
                  <span className="label">Street:</span>
                  <span className="value">{company.address}</span>
                </div>
                <div className="info-row">
                  <span className="label">City:</span>
                  <span className="value">{company.city}</span>
                </div>
                <div className="info-row">
                  <span className="label">State:</span>
                  <span className="value">{company.state}</span>
                </div>
                <div className="info-row">
                  <span className="label">Postal Code:</span>
                  <span className="value">{company.postalCode}</span>
                </div>
                <div className="info-row">
                  <span className="label">Country:</span>
                  <span className="value">{company.country}</span>
                </div>
              </div>

              <div className="info-card">
                <h3>Statistics</h3>
                <div className="stat-item">
                  <FiUsers />
                  <div>
                    <span className="stat-value">{company.members.length}</span>
                    <span className="stat-label">Team Members</span>
                  </div>
                </div>
                <div className="stat-item">
                  <FiUsers />
                  <div>
                    <span className="stat-value">156</span>
                    <span className="stat-label">Total Clients</span>
                  </div>
                </div>
                <div className="stat-item">
                  <FiUsers />
                  <div>
                    <span className="stat-value">342</span>
                    <span className="stat-label">Total Sessions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "members" && (
          <div className="members-tab">
            <div className="tab-header">
              <h3>Team Members</h3>
              <button className="btn btn-primary">
                <FiUserPlus /> Invite Member
              </button>
            </div>

            <div className="members-list">
              {company.members.map((member) => (
                <div key={member.id} className="member-item">
                  <div className="member-avatar">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="member-info">
                    <h4>{member.name}</h4>
                    <p>{member.email}</p>
                  </div>
                  <div className="member-role">
                    <span className="role-badge">{member.role}</span>
                  </div>
                  <div className="member-status">
                    <span className={`badge ${getStatusBadge(member.status)}`}>
                      {member.status}
                    </span>
                  </div>
                  <button className="more-btn">
                    <FiMoreVertical />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "sessions" && (
          <div className="sessions-tab">
            <h3>Recent Sessions</h3>
            <table className="sessions-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Garment Type</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {company.recentSessions.map((session) => (
                  <tr key={session.id}>
                    <td>{session.client}</td>
                    <td>{session.type}</td>
                    <td>{session.date}</td>
                    <td>
                      <span
                        className={`badge ${getStatusBadge(session.status)}`}
                      >
                        {session.status}
                      </span>
                    </td>
                    <td>
                      <Link
                        to={`/sessions/${session.id}`}
                        className="view-link"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="settings-tab">
            <div className="settings-section">
              <h3>Danger Zone</h3>
              <div className="danger-zone">
                <div className="danger-item">
                  <div>
                    <h4>Deactivate Company</h4>
                    <p>
                      This will temporarily disable the company and all
                      associated data.
                    </p>
                  </div>
                  <button className="btn btn-warning">Deactivate</button>
                </div>
                <div className="danger-item">
                  <div>
                    <h4>Delete Company</h4>
                    <p>
                      Permanently delete this company and all associated data.
                      This action cannot be undone.
                    </p>
                  </div>
                  <button className="btn btn-danger">Delete Company</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDetails;
