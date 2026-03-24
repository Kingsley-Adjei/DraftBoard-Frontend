import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FiEdit2,
  FiTrash2,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiUser,
  FiCamera,
  FiClock,
  FiPlus,
} from "react-icons/fi";
import "./ClientDetails.css";

const ClientDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock client data
  const client = {
    id: 1,
    firstName: "Ama",
    lastName: "Mensah",
    email: "ama.mensah@email.com",
    phone: "+233 24 123 4567",
    gender: "FEMALE",
    dateOfBirth: "1985-06-15",
    address: "45 Independence Avenue, Accra, Ghana",
    notes: "Prefers natural fabrics. Allergic to polyester.",
    createdAt: "2024-01-15",
    totalSessions: 8,
    lastSession: "2024-02-15",
  };

  const sessions = [
    {
      id: 1,
      date: "2024-02-15",
      type: "FITTING",
      garments: ["KABA", "SLIT"],
      status: "completed",
      notes: "First fitting - minor adjustments needed",
    },
    {
      id: 2,
      date: "2024-02-01",
      type: "INITIAL",
      garments: ["KABA", "SLIT"],
      status: "completed",
      notes: "Initial measurements taken for traditional set",
    },
    {
      id: 3,
      date: "2024-01-20",
      type: "INITIAL",
      garments: ["DRESS"],
      status: "completed",
      notes: "Wedding guest dress measurements",
    },
  ];

  const measurements = [
    {
      garment: "KABA",
      date: "2024-02-01",
      bust: 36,
      waist: 28,
      hip: 38,
      notes: "Traditional fit",
    },
    {
      garment: "SLIT",
      date: "2024-02-01",
      length: 42,
      waist: 28,
      hip: 38,
      notes: "Matching set",
    },
    {
      garment: "DRESS",
      date: "2024-01-20",
      bust: 36,
      waist: 28,
      hip: 38,
      length: 56,
      notes: "A-line silhouette",
    },
  ];

  const images = [
    {
      id: 1,
      url: "https://via.placeholder.com/300",
      type: "FRONT",
      date: "2024-02-01",
    },
    {
      id: 2,
      url: "https://via.placeholder.com/300",
      type: "SIDE",
      date: "2024-02-01",
    },
    {
      id: 3,
      url: "https://via.placeholder.com/300",
      type: "BACK",
      date: "2024-02-01",
    },
  ];

  return (
    <div className="client-details-page">
      <div className="page-header">
        <div className="header-left">
          <Link to="/clients" className="back-link">
            ← Back to Clients
          </Link>
          <h1>
            {client.firstName} {client.lastName}
          </h1>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary">
            <FiEdit2 /> Edit
          </button>
          <button className="btn btn-danger">
            <FiTrash2 /> Delete
          </button>
        </div>
      </div>

      <div className="client-profile-header">
        <div className="client-avatar-large">
          {client.firstName[0]}
          {client.lastName[0]}
        </div>
        <div className="client-quick-info">
          <div className="info-item">
            <FiMail />
            <span>{client.email}</span>
          </div>
          <div className="info-item">
            <FiPhone />
            <span>{client.phone}</span>
          </div>
          <div className="info-item">
            <FiMapPin />
            <span>{client.address}</span>
          </div>
          <div className="info-item">
            <FiCalendar />
            <span>DOB: {client.dateOfBirth}</span>
          </div>
          <div className="info-item">
            <FiUser />
            <span>{client.gender}</span>
          </div>
          <div className="info-item">
            <FiClock />
            <span>
              Client since {new Date(client.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <div className="client-stats-grid">
        <div className="stat-card">
          <span className="stat-value">{client.totalSessions}</span>
          <span className="stat-label">Total Sessions</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">
            {new Date(client.lastSession).toLocaleDateString()}
          </span>
          <span className="stat-label">Last Session</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">3</span>
          <span className="stat-label">Garment Types</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{images.length}</span>
          <span className="stat-label">Photos</span>
        </div>
      </div>

      <div className="client-tabs">
        <button
          className={`tab ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`tab ${activeTab === "sessions" ? "active" : ""}`}
          onClick={() => setActiveTab("sessions")}
        >
          Sessions
        </button>
        <button
          className={`tab ${activeTab === "measurements" ? "active" : ""}`}
          onClick={() => setActiveTab("measurements")}
        >
          Measurements
        </button>
        <button
          className={`tab ${activeTab === "images" ? "active" : ""}`}
          onClick={() => setActiveTab("images")}
        >
          Images
        </button>
        <button
          className={`tab ${activeTab === "notes" ? "active" : ""}`}
          onClick={() => setActiveTab("notes")}
        >
          Notes
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "overview" && (
          <div className="overview-tab">
            <div className="recent-sessions-card">
              <div className="card-header">
                <h3>Recent Sessions</h3>
                <Link to={`/clients/${id}/sessions/new`} className="btn-link">
                  <FiPlus /> New Session
                </Link>
              </div>
              <div className="sessions-list">
                {sessions.slice(0, 3).map((session) => (
                  <div key={session.id} className="session-row">
                    <div className="session-date">
                      {new Date(session.date).toLocaleDateString()}
                    </div>
                    <div className="session-info">
                      <span className="session-type">{session.type}</span>
                      <span className="session-garments">
                        {session.garments.join(" + ")}
                      </span>
                    </div>
                    <span className={`badge ${session.status}`}>
                      {session.status}
                    </span>
                    <Link to={`/sessions/${session.id}`} className="view-link">
                      View →
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="recent-measurements-card">
              <h3>Latest Measurements</h3>
              <div className="measurements-summary">
                {measurements.slice(0, 2).map((m, index) => (
                  <div key={index} className="measurement-summary-item">
                    <h4>{m.garment}</h4>
                    <div className="measurements-list">
                      <span>Bust: {m.bust}"</span>
                      <span>Waist: {m.waist}"</span>
                      <span>Hip: {m.hip}"</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "sessions" && (
          <div className="sessions-tab">
            <div className="sessions-timeline">
              {sessions.map((session) => (
                <div key={session.id} className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <div className="session-header">
                      <h4>{new Date(session.date).toLocaleDateString()}</h4>
                      <span className={`badge ${session.status}`}>
                        {session.status}
                      </span>
                    </div>
                    <p>
                      <strong>Type:</strong> {session.type}
                    </p>
                    <p>
                      <strong>Garments:</strong> {session.garments.join(", ")}
                    </p>
                    <p>
                      <strong>Notes:</strong> {session.notes}
                    </p>
                    <Link
                      to={`/sessions/${session.id}`}
                      className="view-session"
                    >
                      View Session Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "measurements" && (
          <div className="measurements-tab">
            <div className="measurements-grid">
              {measurements.map((m, index) => (
                <div key={index} className="measurement-card">
                  <h3>{m.garment}</h3>
                  <p className="measurement-date">{m.date}</p>
                  <div className="measurement-values">
                    {Object.entries(m).map(([key, value]) => {
                      if (
                        key !== "garment" &&
                        key !== "date" &&
                        key !== "notes"
                      ) {
                        return (
                          <div key={key} className="measurement-row">
                            <span className="measurement-label">{key}:</span>
                            <span className="measurement-value">{value}"</span>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                  <p className="measurement-notes">{m.notes}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "images" && (
          <div className="images-tab">
            <div className="image-upload-area">
              <button className="upload-btn">
                <FiCamera /> Upload New Image
              </button>
            </div>
            <div className="image-gallery">
              {images.map((image) => (
                <div key={image.id} className="image-item">
                  <img src={image.url} alt={image.type} />
                  <div className="image-overlay">
                    <span className="image-type">{image.type}</span>
                    <span className="image-date">{image.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "notes" && (
          <div className="notes-tab">
            <div className="notes-section">
              <h3>Client Notes</h3>
              <p>{client.notes}</p>
              <button className="btn btn-secondary">Edit Notes</button>
            </div>

            <div className="add-note">
              <h3>Add Note</h3>
              <textarea placeholder="Enter a new note..." rows="4"></textarea>
              <button className="btn btn-primary">Save Note</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDetails;
