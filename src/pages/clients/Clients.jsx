import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
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
  FiUsers,
  FiRefreshCw,
} from "react-icons/fi";
import { clientService } from "../../services/clientService";
import "./Clients.css";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGender, setFilterGender] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 12,
    totalPages: 0,
    totalElements: 0,
  });

  useEffect(() => {
    fetchClients();
  }, [pagination.page, filterGender, filterStatus]);

  const fetchClients = async (showRefreshAnimation = false) => {
    if (showRefreshAnimation) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const params = {
        page: pagination.page,
        size: pagination.size,
        sortBy: "lastName",
        sortDirection: "ASC",
        gender: filterGender !== "all" ? filterGender : undefined,
        status: filterStatus !== "all" ? filterStatus : undefined,
      };
      const response = await clientService.getAll(params);
      setClients(response.data.data.content);
      setPagination({
        ...pagination,
        totalPages: response.data.data.totalPages,
        totalElements: response.data.data.totalElements,
      });
      if (showRefreshAnimation) {
        toast.success("Data refreshed successfully");
      }
    } catch (error) {
      console.error("Failed to fetch clients:", error);
      toast.error("Failed to load clients");
    } finally {
      if (showRefreshAnimation) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  };

  const handleRefresh = () => {
    fetchClients(true);
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      fetchClients();
      return;
    }
    setLoading(true);
    try {
      const response = await clientService.search(searchTerm, {
        page: 0,
        size: 20,
      });
      setClients(response.data.data.content);
    } catch (error) {
      console.error("Search failed:", error);
      toast.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${name}? This action cannot be undone.`
      )
    ) {
      try {
        await clientService.delete(id);
        toast.success(`${name} deleted successfully`);
        fetchClients();
      } catch (error) {
        console.error("Delete failed:", error);
        toast.error("Failed to delete client");
      }
    }
  };

  const getGenderIcon = (gender) => {
    return gender === "FEMALE" ? "👩" : "👨";
  };

  const getStatusBadge = (status) => {
    return status === "active" ? "badge-success" : "badge-error";
  };

  // Filter clients for search term only (gender/status handled by API)
  const filteredClients = clients.filter((client) => {
    const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
    const matchesSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phoneNumber?.includes(searchTerm);
    return matchesSearch;
  });

  // Check if there are any clients at all (not just filtered results)
  const hasNoClients =
    !loading && !refreshing && pagination.totalElements === 0;
  const hasNoSearchResults =
    !loading &&
    !refreshing &&
    clients.length === 0 &&
    searchTerm &&
    !hasNoClients;
  const hasNoFilterResults =
    !loading &&
    !refreshing &&
    filteredClients.length === 0 &&
    !hasNoClients &&
    !hasNoSearchResults;

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
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>

        <div className="filter-actions">
          <button
            className={`refresh-btn ${refreshing ? "refreshing" : ""}`}
            onClick={handleRefresh}
            disabled={refreshing}
            title="Refresh data"
          >
            <FiRefreshCw className={refreshing ? "spin" : ""} />
          </button>

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
              fetchClients();
            }}
          >
            Clear Filters
          </button>
        </div>
      )}

      {loading || refreshing ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>{refreshing ? "Refreshing data..." : "Loading clients..."}</p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="clients-grid">
          {filteredClients.map((client) => (
            <div key={client.id} className="client-card">
              <div className="client-card-header">
                <div className="client-avatar" data-gender={client.gender}>
                  {client.firstName[0]}
                  {client.lastName[0]}
                </div>
                <div className="client-status">
                  <span className={`status-badge ${client.status || "active"}`}>
                    {client.status || "active"}
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
                    <FiMail /> {client.email || "—"}
                  </p>
                  <p>
                    <FiPhone /> {client.phoneNumber || "—"}
                  </p>
                  <p>
                    <FiMapPin /> {client.city || "—"}
                  </p>
                </div>

                <div className="client-preferences">
                  {client.preferredGarments?.map((garment, idx) => (
                    <span key={idx} className="garment-tag">
                      {garment}
                    </span>
                  ))}
                </div>

                <div className="client-stats">
                  <div className="stat">
                    <span className="stat-value">
                      {client.sessionCount || 0}
                    </span>
                    <span className="stat-label">Sessions</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">
                      {client.lastSessionDate
                        ? new Date(client.lastSessionDate).toLocaleDateString()
                        : "—"}
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
                  <Link to={`/clients/${client.id}/edit`} className="icon-btn">
                    <FiEdit2 />
                  </Link>
                  <button
                    className="icon-btn"
                    onClick={() =>
                      handleDelete(
                        client.id,
                        `${client.firstName} ${client.lastName}`
                      )
                    }
                  >
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
                      <div>{client.email || "—"}</div>
                      <div className="phone">{client.phoneNumber || "—"}</div>
                    </div>
                  </td>
                  <td>{client.city || "—"}</td>
                  <td>
                    <div className="garment-tags">
                      {client.preferredGarments?.slice(0, 2).map((g, i) => (
                        <span key={i} className="garment-tag-small">
                          {g}
                        </span>
                      ))}
                      {client.preferredGarments?.length > 2 && (
                        <span className="garment-tag-small">
                          +{client.preferredGarments.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className="session-count">
                      {client.sessionCount || 0}
                    </span>
                  </td>
                  <td>
                    <div className="last-session">
                      <FiCalendar />
                      {client.lastSessionDate
                        ? new Date(client.lastSessionDate).toLocaleDateString()
                        : "—"}
                    </div>
                  </td>
                  <td>
                    <span
                      className={`status-badge ${client.status || "active"}`}
                    >
                      {client.status || "active"}
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
                      <Link
                        to={`/clients/${client.id}/edit`}
                        className="action-btn-icon"
                      >
                        <FiEdit2 />
                      </Link>
                      <button
                        className="action-btn-icon"
                        onClick={() =>
                          handleDelete(
                            client.id,
                            `${client.firstName} ${client.lastName}`
                          )
                        }
                      >
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

      {/* Empty State - No Clients at All */}
      {!loading && !refreshing && hasNoClients && (
        <div className="empty-state">
          <FiUsers className="empty-state-icon" />
          <h3>No clients yet</h3>
          <p>
            Get started by adding your first client to track their measurements
            and sessions.
          </p>
          <Link to="/clients/new" className="btn btn-primary">
            <FiPlus /> Add Your First Client
          </Link>
        </div>
      )}

      {/* No Search Results */}
      {!loading && !refreshing && hasNoSearchResults && (
        <div className="no-results">
          <FiSearch className="no-results-icon" />
          <p>No clients found matching "{searchTerm}"</p>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setSearchTerm("");
              fetchClients();
            }}
          >
            Clear Search
          </button>
        </div>
      )}

      {/* No Filter Results */}
      {!loading && !refreshing && hasNoFilterResults && (
        <div className="no-results">
          <FiFilter className="no-results-icon" />
          <p>No clients match the selected filters</p>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setFilterGender("all");
              setFilterStatus("all");
              fetchClients();
            }}
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Pagination */}
      {!loading && !refreshing && pagination.totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() =>
              setPagination({ ...pagination, page: pagination.page - 1 })
            }
            disabled={pagination.page === 0}
            className="pagination-btn"
          >
            Previous
          </button>
          <span className="pagination-info">
            Page {pagination.page + 1} of {pagination.totalPages}
          </span>
          <button
            onClick={() =>
              setPagination({ ...pagination, page: pagination.page + 1 })
            }
            disabled={pagination.page === pagination.totalPages - 1}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Clients;
