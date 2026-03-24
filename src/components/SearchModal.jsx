// src/components/SearchModal.jsx (temporary mock version)
import React, { useState, useEffect, useRef } from "react";
import { FiX, FiUser, FiCalendar, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./SearchModal.css";

// Mock data for testing
const mockClients = [
  {
    id: "1",
    fullName: "Ama Mensah",
    email: "ama@example.com",
    phoneNumber: "+233241234567",
  },
  {
    id: "2",
    fullName: "Kwame Asante",
    email: "kwame@example.com",
    phoneNumber: "+233244567890",
  },
  {
    id: "3",
    fullName: "Adwoa Boateng",
    email: "adwoa@example.com",
    phoneNumber: "+233255678901",
  },
];

const mockSessions = [
  {
    id: "1",
    clientName: "Ama Mensah",
    sessionType: "INITIAL",
    sessionDate: new Date().toISOString(),
    purpose: "Wedding outfit",
  },
  {
    id: "2",
    clientName: "Kwame Asante",
    sessionType: "UPDATE",
    sessionDate: new Date().toISOString(),
    purpose: "Suit fitting",
  },
  {
    id: "3",
    clientName: "Adwoa Boateng",
    sessionType: "FITTING",
    sessionDate: new Date().toISOString(),
    purpose: "Dress adjustment",
  },
];

const SearchModal = ({ isOpen, onClose, searchQuery }) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({
    clients: [],
    sessions: [],
  });
  const [activeTab, setActiveTab] = useState("all");
  const modalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && searchQuery.trim()) {
      performSearch();
    }
  }, [isOpen, searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const performSearch = async () => {
    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      // Filter mock data based on search query
      const filteredClients = mockClients.filter(
        (client) =>
          client.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          client.email.toLowerCase().includes(searchQuery.toLowerCase())
      );

      const filteredSessions = mockSessions.filter(
        (session) =>
          session.clientName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          session.purpose.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setResults({
        clients: filteredClients,
        sessions: filteredSessions,
      });
      setLoading(false);
    }, 500);
  };

  const getTotalResults = () => {
    return results.clients.length + results.sessions.length;
  };

  const handleResultClick = (type, id) => {
    onClose();
    switch (type) {
      case "client":
        navigate(`/clients/${id}`);
        break;
      case "session":
        navigate(`/sessions/${id}`);
        break;
      default:
        break;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="search-modal-overlay">
      <div className="search-modal" ref={modalRef}>
        <div className="search-modal-header">
          <div className="search-modal-title">
            <FiSearch />
            <span>Search Results for "{searchQuery}"</span>
          </div>
          <button className="search-modal-close" onClick={onClose}>
            <FiX />
          </button>
        </div>

        {loading ? (
          <div className="search-loading">
            <div className="spinner"></div>
            <p>Searching...</p>
          </div>
        ) : getTotalResults() === 0 ? (
          <div className="search-no-results">
            <FiSearch className="no-results-icon" />
            <p>No results found for "{searchQuery}"</p>
            <span>Try searching with different keywords</span>
          </div>
        ) : (
          <>
            <div className="search-tabs">
              <button
                className={`search-tab ${activeTab === "all" ? "active" : ""}`}
                onClick={() => setActiveTab("all")}
              >
                All ({getTotalResults()})
              </button>
              <button
                className={`search-tab ${
                  activeTab === "clients" ? "active" : ""
                }`}
                onClick={() => setActiveTab("clients")}
              >
                Clients ({results.clients.length})
              </button>
              <button
                className={`search-tab ${
                  activeTab === "sessions" ? "active" : ""
                }`}
                onClick={() => setActiveTab("sessions")}
              >
                Sessions ({results.sessions.length})
              </button>
            </div>

            <div className="search-results">
              {(activeTab === "all" || activeTab === "clients") &&
                results.clients.length > 0 && (
                  <div className="search-section">
                    <h4>Clients</h4>
                    {results.clients.map((client) => (
                      <div
                        key={client.id}
                        className="search-result-item"
                        onClick={() => handleResultClick("client", client.id)}
                      >
                        <FiUser className="result-icon" />
                        <div className="result-info">
                          <div className="result-title">{client.fullName}</div>
                          <div className="result-subtitle">
                            {client.email || client.phoneNumber}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              {(activeTab === "all" || activeTab === "sessions") &&
                results.sessions.length > 0 && (
                  <div className="search-section">
                    <h4>Sessions</h4>
                    {results.sessions.map((session) => (
                      <div
                        key={session.id}
                        className="search-result-item"
                        onClick={() => handleResultClick("session", session.id)}
                      >
                        <FiCalendar className="result-icon" />
                        <div className="result-info">
                          <div className="result-title">
                            {session.clientName} - {session.sessionType}
                          </div>
                          <div className="result-subtitle">
                            {new Date(session.sessionDate).toLocaleDateString()}{" "}
                            • {session.purpose}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
