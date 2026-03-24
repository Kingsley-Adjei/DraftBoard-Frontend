import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiPlus,
  FiCalendar,
  FiUser,
  FiClock,
  FiFilter,
  FiSearch,
  FiChevronRight,
} from "react-icons/fi";
import "./Sessions.css";

const Sessions = () => {
  const [sessions, setSessions] = useState([
    {
      id: 1,
      clientName: "Ama Mensah",
      clientId: 1,
      type: "INITIAL",
      garmentType: "KABA & SLIT",
      date: "2024-02-15T10:30:00",
      status: "completed",
      takenBy: "Kwame Asante",
    },
    {
      id: 2,
      clientName: "Kwame Asante",
      clientId: 2,
      type: "FITTING",
      garmentType: "SHIRT",
      date: "2024-02-14T14:00:00",
      status: "in-progress",
      takenBy: "Ama Mensah",
    },
    {
      id: 3,
      clientName: "Esi Owusu",
      clientId: 3,
      type: "UPDATE",
      garmentType: "DRESS",
      date: "2024-02-13T11:15:00",
      status: "scheduled",
      takenBy: "Kwame Asante",
    },
    {
      id: 4,
      clientName: "Yaw Adjei",
      clientId: 4,
      type: "FINAL",
      garmentType: "SUIT",
      date: "2024-02-12T09:00:00",
      status: "completed",
      takenBy: "Kwame Asante",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");

  const getStatusBadge = (status) => {
    const badges = {
      completed: "badge-success",
      "in-progress": "badge-warning",
      scheduled: "badge-info",
    };
    return badges[status] || "badge-info";
  };

  const getSessionTypeLabel = (type) => {
    const labels = {
      INITIAL: "Initial",
      UPDATE: "Update",
      FITTING: "Fitting",
      FINAL: "Final",
    };
    return labels[type] || type;
  };

  const filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      session.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.garmentType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || session.status === filterStatus;
    const matchesType = filterType === "all" || session.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="sessions-page">
      <div className="page-header">
        <div>
          <h1>Measurement Sessions</h1>
          <p className="text-secondary">
            Track and manage all measurement sessions
          </p>
        </div>
        <Link to="/sessions/new" className="btn btn-primary">
          <FiPlus /> New Session
        </Link>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search sessions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <div className="filter-dropdown">
            <FiFilter className="filter-icon" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="filter-dropdown">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="INITIAL">Initial</option>
              <option value="UPDATE">Update</option>
              <option value="FITTING">Fitting</option>
              <option value="FINAL">Final</option>
            </select>
          </div>
        </div>
      </div>

      <div className="sessions-timeline">
        {filteredSessions.map((session) => (
          <div key={session.id} className="session-timeline-item">
            <div className="timeline-marker">
              <div className="marker-dot"></div>
            </div>

            <div className="session-card">
              <div className="session-card-header">
                <div className="session-client">
                  <div className="client-avatar">
                    {session.clientName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h3>{session.clientName}</h3>
                    <p className="session-type">
                      {getSessionTypeLabel(session.type)}
                    </p>
                  </div>
                </div>
                <span className={`badge ${getStatusBadge(session.status)}`}>
                  {session.status}
                </span>
              </div>

              <div className="session-card-body">
                <div className="session-details">
                  <div className="detail-item">
                    <FiUser />
                    <span>{session.takenBy}</span>
                  </div>
                  <div className="detail-item">
                    <FiCalendar />
                    <span>{formatDate(session.date)}</span>
                  </div>
                  <div className="detail-item">
                    <FiClock />
                    <span>{session.garmentType}</span>
                  </div>
                </div>
              </div>

              <div className="session-card-footer">
                <Link to={`/sessions/${session.id}`} className="view-details">
                  View Session Details
                  <FiChevronRight />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sessions;
