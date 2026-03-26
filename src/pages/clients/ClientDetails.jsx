import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
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
  FiArrowLeft,
  FiDownload,
} from "react-icons/fi";
import { clientService } from "../../services/clientService";
import { sessionService } from "../../services/sessionService";
import "./ClientDetails.css";

const ClientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [client, setClient] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [statistics, setStatistics] = useState({
    totalSessions: 0,
    totalMeasurements: 0,
    totalImages: 0,
  });

  useEffect(() => {
    fetchClientDetails();
    fetchClientSessions();
    fetchClientImages();
  }, [id]);

  const fetchClientDetails = async () => {
    try {
      const response = await clientService.getById(id);
      setClient(response.data.data);

      // Update statistics from response
      if (response.data.data.statistics) {
        setStatistics({
          totalSessions: response.data.data.statistics.totalSessions || 0,
          totalMeasurements:
            response.data.data.statistics.totalMeasurements || 0,
          totalImages: response.data.data.statistics.totalImages || 0,
        });
      }
    } catch (error) {
      console.error("Failed to fetch client details:", error);
      toast.error("Failed to load client details");
      navigate("/clients");
    } finally {
      setLoading(false);
    }
  };

  const fetchClientSessions = async () => {
    try {
      const response = await sessionService.getByClient(id, {
        page: 0,
        size: 10,
      });
      setSessions(response.data.data.content || []);

      // Update total sessions count
      setStatistics((prev) => ({
        ...prev,
        totalSessions: response.data.data.totalElements || 0,
      }));
    } catch (error) {
      console.error("Failed to fetch sessions:", error);
      // Don't show error toast for sessions, just set empty array
      setSessions([]);
    }
  };

  const fetchClientImages = async () => {
    try {
      const response = await clientService.getImages(id);
      setImages(response.data.data || []);

      setStatistics((prev) => ({
        ...prev,
        totalImages: response.data.data?.length || 0,
      }));
    } catch (error) {
      console.error("Failed to fetch images:", error);
      setImages([]);
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${client?.firstName} ${client?.lastName}? This action cannot be undone and will delete all associated sessions and measurements.`
      )
    ) {
      setDeleting(true);
      try {
        await clientService.delete(id);
        toast.success("Client deleted successfully");
        navigate("/clients");
      } catch (error) {
        console.error("Delete failed:", error);
        toast.error("Failed to delete client");
        setDeleting(false);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return null;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const getGenderIcon = (gender) => {
    if (gender === "FEMALE") return "👩";
    if (gender === "MALE") return "👨";
    return "👤";
  };

  const garmentTypeMap = {
    SHIRT: "Shirt",
    TROUSER: "Trouser",
    SUIT: "Suit",
    DRESS: "Dress",
    SKIRT: "Skirt",
    KABA: "Kaba",
    SLIT: "Slit",
  };

  if (loading) {
    return (
      <div className="client-details-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading client details...</p>
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="client-details-page">
        <div className="error-container">
          <p>Client not found</p>
          <Link to="/clients" className="btn btn-primary">
            Back to Clients
          </Link>
        </div>
      </div>
    );
  }

  const age = calculateAge(client.dateOfBirth);

  return (
    <div className="client-details-page">
      <div className="page-header">
        <div className="header-left">
          <Link to="/clients" className="back-link">
            <FiArrowLeft /> Back to Clients
          </Link>
          <h1>
            {client.firstName} {client.lastName}
          </h1>
        </div>
        <div className="header-actions">
          <Link to={`/clients/${id}/edit`} className="btn btn-secondary">
            <FiEdit2 /> Edit
          </Link>
          <button
            className="btn btn-danger"
            onClick={handleDelete}
            disabled={deleting}
          >
            <FiTrash2 /> {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>

      <div className="client-profile-header">
        <div className="client-avatar-large">
          {client.firstName?.[0]}
          {client.lastName?.[0]}
        </div>
        <div className="client-quick-info">
          <div className="info-item">
            <FiMail />
            <span>{client.email || "—"}</span>
          </div>
          <div className="info-item">
            <FiPhone />
            <span>{client.phoneNumber || "—"}</span>
          </div>
          <div className="info-item">
            <FiMapPin />
            <span>
              {[client.address, client.city, client.country]
                .filter(Boolean)
                .join(", ") || "—"}
            </span>
          </div>
          {client.dateOfBirth && (
            <div className="info-item">
              <FiCalendar />
              <span>
                DOB: {formatDate(client.dateOfBirth)}
                {age && ` (${age} years)`}
              </span>
            </div>
          )}
          <div className="info-item">
            <FiUser />
            <span>
              {getGenderIcon(client.gender)} {client.gender || "Not specified"}
            </span>
          </div>
          <div className="info-item">
            <FiClock />
            <span>Client since {formatDate(client.createdAt)}</span>
          </div>
        </div>
      </div>

      <div className="client-stats-grid">
        <div className="stat-card">
          <span className="stat-value">{statistics.totalSessions}</span>
          <span className="stat-label">Total Sessions</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">
            {client.lastSessionDate ? formatDate(client.lastSessionDate) : "—"}
          </span>
          <span className="stat-label">Last Session</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{statistics.totalMeasurements}</span>
          <span className="stat-label">Measurements</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{statistics.totalImages}</span>
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
                {sessions.length === 0 ? (
                  <p className="no-data">
                    No sessions yet. Start by creating a new session.
                  </p>
                ) : (
                  sessions.slice(0, 3).map((session) => (
                    <div key={session.id} className="session-row">
                      <div className="session-date">
                        {formatDate(session.sessionDate)}
                      </div>
                      <div className="session-info">
                        <span className="session-type">
                          {session.sessionType}
                        </span>
                        <span className="session-garments">
                          {session.garmentTypes?.join(" + ") || "No garments"}
                        </span>
                      </div>
                      <span
                        className={`badge ${session.status || "completed"}`}
                      >
                        {session.status || "completed"}
                      </span>
                      <Link
                        to={`/sessions/${session.id}`}
                        className="view-link"
                      >
                        View →
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="recent-measurements-card">
              <div className="card-header">
                <h3>Latest Measurements</h3>
                <Link to={`/clients/${id}/sessions/new`} className="btn-link">
                  <FiPlus /> Add
                </Link>
              </div>
              <div className="measurements-summary">
                {client.measurements?.length === 0 ? (
                  <p className="no-data">No measurements recorded yet.</p>
                ) : (
                  client.measurements?.slice(0, 2).map((m, index) => (
                    <div key={index} className="measurement-summary-item">
                      <h4>{garmentTypeMap[m.garmentType] || m.garmentType}</h4>
                      <div className="measurements-list">
                        {Object.entries(m.measurements || {})
                          .slice(0, 3)
                          .map(([key, value]) => (
                            <span key={key}>
                              {key}: {value}"
                            </span>
                          ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "sessions" && (
          <div className="sessions-tab">
            {sessions.length === 0 ? (
              <div className="empty-state-small">
                <p>No sessions recorded yet.</p>
                <Link
                  to={`/clients/${id}/sessions/new`}
                  className="btn btn-primary"
                >
                  <FiPlus /> Create First Session
                </Link>
              </div>
            ) : (
              <div className="sessions-timeline">
                {sessions.map((session) => (
                  <div key={session.id} className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <div className="session-header">
                        <h4>{formatDate(session.sessionDate)}</h4>
                        <span
                          className={`badge ${session.status || "completed"}`}
                        >
                          {session.status || "completed"}
                        </span>
                      </div>
                      <p>
                        <strong>Type:</strong> {session.sessionType}
                      </p>
                      {session.garmentTypes &&
                        session.garmentTypes.length > 0 && (
                          <p>
                            <strong>Garments:</strong>{" "}
                            {session.garmentTypes
                              .map((g) => garmentTypeMap[g] || g)
                              .join(", ")}
                          </p>
                        )}
                      {session.purpose && (
                        <p>
                          <strong>Purpose:</strong> {session.purpose}
                        </p>
                      )}
                      {session.notes && (
                        <p>
                          <strong>Notes:</strong> {session.notes}
                        </p>
                      )}
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
            )}
          </div>
        )}

        {activeTab === "measurements" && (
          <div className="measurements-tab">
            {client.measurements?.length === 0 ? (
              <div className="empty-state-small">
                <p>No measurements recorded yet.</p>
                <Link
                  to={`/clients/${id}/sessions/new`}
                  className="btn btn-primary"
                >
                  <FiPlus /> Add Measurements
                </Link>
              </div>
            ) : (
              <div className="measurements-grid">
                {client.measurements?.map((m, index) => (
                  <div key={index} className="measurement-card">
                    <h3>{garmentTypeMap[m.garmentType] || m.garmentType}</h3>
                    <p className="measurement-date">
                      Taken on {formatDate(m.createdAt)}
                    </p>
                    <div className="measurement-values">
                      {Object.entries(m.measurements || {}).map(
                        ([key, value]) => (
                          <div key={key} className="measurement-row">
                            <span className="measurement-label">
                              {key.replace(/([A-Z])/g, " $1").toLowerCase()}:
                            </span>
                            <span className="measurement-value">
                              {value}" {key.includes("Style") ? "" : ""}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                    {m.notes && (
                      <p className="measurement-notes">
                        <strong>Notes:</strong> {m.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "images" && (
          <div className="images-tab">
            <div className="image-upload-area">
              <label htmlFor="imageUpload" className="upload-btn">
                <FiCamera /> Upload New Image
              </label>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                style={{ display: "none" }}
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const formData = new FormData();
                    formData.append("file", file);
                    formData.append("imageType", "PROFILE");

                    try {
                      await clientService.uploadImage(id, formData);
                      toast.success("Image uploaded successfully");
                      fetchClientImages();
                    } catch (error) {
                      console.error("Upload failed:", error);
                      toast.error("Failed to upload image");
                    }
                  }
                }}
              />
            </div>
            {images.length === 0 ? (
              <div className="empty-state-small">
                <p>No images uploaded yet.</p>
              </div>
            ) : (
              <div className="image-gallery">
                {images.map((image) => (
                  <div key={image.id} className="image-item">
                    <img
                      src={
                        image.imageUrl ||
                        `http://localhost:8080${image.imageUrl}`
                      }
                      alt={image.imageType}
                    />
                    <div className="image-overlay">
                      <span className="image-type">{image.imageType}</span>
                      <span className="image-date">
                        {formatDate(image.createdAt)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "notes" && (
          <div className="notes-tab">
            <div className="notes-section">
              <h3>Client Notes</h3>
              <p>{client.notes || "No notes added yet."}</p>
              <Link to={`/clients/${id}/edit`} className="btn btn-secondary">
                Edit Notes
              </Link>
            </div>

            <div className="add-note">
              <h3>Add Note</h3>
              <textarea
                placeholder="Enter a new note..."
                rows="4"
                id="newNote"
              />
              <button
                className="btn btn-primary"
                onClick={async () => {
                  const noteText = document.getElementById("newNote").value;
                  if (!noteText.trim()) {
                    toast.error("Please enter a note");
                    return;
                  }

                  const updatedNotes = client.notes
                    ? `${
                        client.notes
                      }\n\n${new Date().toLocaleDateString()}: ${noteText}`
                    : `${new Date().toLocaleDateString()}: ${noteText}`;

                  try {
                    await clientService.update(id, { notes: updatedNotes });
                    toast.success("Note added successfully");
                    fetchClientDetails();
                    document.getElementById("newNote").value = "";
                  } catch (error) {
                    console.error("Failed to add note:", error);
                    toast.error("Failed to add note");
                  }
                }}
              >
                Save Note
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDetails;
