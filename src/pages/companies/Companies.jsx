import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiUsers,
  FiMoreVertical,
  FiSearch,
  FiFilter,
} from "react-icons/fi";
import "./Companies.css";

const Companies = () => {
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "Premium Tailors",
      businessNumber: "TAIL-2024-001",
      email: "info@premiumtailors.com",
      phone: "+233 24 123 4567",
      city: "Accra",
      type: "TAILOR_SHOP",
      status: "ACTIVE",
      members: 5,
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Fashion Forward",
      businessNumber: "FASH-2024-002",
      email: "contact@fashionforward.com",
      phone: "+233 54 987 6543",
      city: "Kumasi",
      type: "FASHION_DESIGNER",
      status: "ACTIVE",
      members: 3,
      createdAt: "2024-02-01",
    },
    {
      id: 3,
      name: "Kente Creations",
      businessNumber: "KENT-2024-003",
      email: "info@kentecreations.com",
      phone: "+233 20 456 7890",
      city: "Takoradi",
      type: "MANUFACTURER",
      status: "INACTIVE",
      members: 8,
      createdAt: "2024-01-20",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const getStatusBadge = (status) => {
    return status === "ACTIVE" ? "badge-success" : "badge-error";
  };

  const getCompanyTypeLabel = (type) => {
    const types = {
      TAILOR_SHOP: "Tailor Shop",
      FASHION_DESIGNER: "Fashion Designer",
      MANUFACTURER: "Manufacturer",
      OTHER: "Other",
    };
    return types[type] || type;
  };

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || company.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="companies-page">
      <div className="page-header">
        <div>
          <h1>Companies</h1>
          <p className="text-secondary">Manage your tailoring businesses</p>
        </div>
        <Link to="/companies/new" className="btn btn-primary">
          <FiPlus /> New Company
        </Link>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-dropdown">
          <FiFilter className="filter-icon" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>
      </div>

      <div className="companies-grid">
        {filteredCompanies.map((company) => (
          <div key={company.id} className="company-card">
            <div className="company-card-header">
              <div className="company-avatar">{company.name.charAt(0)}</div>
              <div className="company-actions">
                <button className="action-btn">
                  <FiEdit2 />
                </button>
                <button className="action-btn">
                  <FiTrash2 />
                </button>
                <button className="action-btn">
                  <FiMoreVertical />
                </button>
              </div>
            </div>

            <div className="company-card-body">
              <h3>{company.name}</h3>
              <p className="business-number">{company.businessNumber}</p>

              <div className="company-details">
                <p>
                  <strong>Email:</strong> {company.email}
                </p>
                <p>
                  <strong>Phone:</strong> {company.phone}
                </p>
                <p>
                  <strong>City:</strong> {company.city}
                </p>
                <p>
                  <strong>Type:</strong> {getCompanyTypeLabel(company.type)}
                </p>
              </div>

              <div className="company-stats">
                <div className="stat">
                  <FiUsers />
                  <span>{company.members} Members</span>
                </div>
                <span className={`badge ${getStatusBadge(company.status)}`}>
                  {company.status}
                </span>
              </div>
            </div>

            <div className="company-card-footer">
              <Link to={`/companies/${company.id}`} className="view-details">
                View Details →
              </Link>
              <span className="created-date">Created: {company.createdAt}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Companies;
