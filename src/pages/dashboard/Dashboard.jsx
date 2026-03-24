import React from "react";
import {
  FiUsers,
  FiClipboard,
  FiLayers,
  FiTrendingUp,
  FiUserPlus,
  FiCalendar,
} from "react-icons/fi";
import "./Dashboard.css";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Clients",
      value: "156",
      icon: FiUsers,
      color: "#5A001F",
      change: "+12%",
    },
    {
      title: "Total Sessions",
      value: "342",
      icon: FiClipboard,
      color: "#7A0F33",
      change: "+23%",
    },
    {
      title: "Templates",
      value: "28",
      icon: FiLayers,
      color: "#A63A5F",
      change: "+5%",
    },
    {
      title: "Revenue",
      value: "GH¢12.4k",
      icon: FiTrendingUp,
      color: "#D97A9A",
      change: "+18%",
    },
  ];

  const recentSessions = [
    {
      client: "Ama Mensah",
      type: "KABA & SLIT",
      date: "2024-02-15",
      status: "completed",
    },
    {
      client: "Kwame Asante",
      type: "SHIRT",
      date: "2024-02-14",
      status: "pending",
    },
    {
      client: "Esi Owusu",
      type: "DRESS",
      date: "2024-02-14",
      status: "in-progress",
    },
    {
      client: "Yaw Adjei",
      type: "SUIT",
      date: "2024-02-13",
      status: "completed",
    },
  ];

  const getStatusClass = (status) => {
    const classes = {
      completed: "badge-success",
      pending: "badge-warning",
      "in-progress": "badge-info",
    };
    return classes[status] || "badge-info";
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, Kwame! 👋</h1>
          <p className="text-secondary">
            Here's what's happening with your tailoring business today.
          </p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary">
            <FiUserPlus /> New Client
          </button>
          <button className="btn btn-secondary">
            <FiClipboard /> New Session
          </button>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div
              className="stat-icon"
              style={{ background: `${stat.color}20`, color: stat.color }}
            >
              <stat.icon />
            </div>
            <div className="stat-content">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
            <div className="stat-change">
              <span className="change-badge">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-bottom">
        <div className="recent-sessions card">
          <div className="card-header">
            <h3>Recent Sessions</h3>
            <button className="view-all">View All</button>
          </div>
          <div className="sessions-list">
            {recentSessions.map((session, index) => (
              <div key={index} className="session-item">
                <div className="session-info">
                  <h4>{session.client}</h4>
                  <p>
                    {session.type} • {session.date}
                  </p>
                </div>
                <span className={`badge ${getStatusClass(session.status)}`}>
                  {session.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="quick-actions card">
          <div className="card-header">
            <h3>Quick Actions</h3>
          </div>
          <div className="actions-grid">
            <button className="action-btn">
              <FiUserPlus />
              <span>New Client</span>
            </button>
            <button className="action-btn">
              <FiClipboard />
              <span>New Session</span>
            </button>
            <button className="action-btn">
              <FiLayers />
              <span>New Template</span>
            </button>
            <button className="action-btn">
              <FiCalendar />
              <span>Schedule</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
