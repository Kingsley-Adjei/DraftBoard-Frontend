import React, { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart,
  Scatter,
} from "recharts";
import {
  FiDownload,
  FiCalendar,
  FiFilter,
  FiTrendingUp,
  FiUsers,
  FiScissors,
  FiDollarSign,
  FiClock,
  FiBarChart2,
  FiPieChart,
  FiActivity,
  FiAward,
  FiStar,
  FiMapPin,
  FiRefreshCw,
} from "react-icons/fi";
import { motion } from "framer-motion";
import "./Reports.css";

const Reports = () => {
  const [dateRange, setDateRange] = useState("month");
  const [selectedReport, setSelectedReport] = useState("overview");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Sample data - In real app, this would come from API
  const monthlyData = [
    {
      month: "Jan",
      sessions: 45,
      clients: 12,
      revenue: 1200,
      fitting: 18,
      alteration: 27,
    },
    {
      month: "Feb",
      sessions: 52,
      clients: 15,
      revenue: 1500,
      fitting: 22,
      alteration: 30,
    },
    {
      month: "Mar",
      sessions: 48,
      clients: 10,
      revenue: 1300,
      fitting: 20,
      alteration: 28,
    },
    {
      month: "Apr",
      sessions: 70,
      clients: 18,
      revenue: 2100,
      fitting: 30,
      alteration: 40,
    },
    {
      month: "May",
      sessions: 65,
      clients: 14,
      revenue: 1800,
      fitting: 25,
      alteration: 40,
    },
    {
      month: "Jun",
      sessions: 80,
      clients: 22,
      revenue: 2400,
      fitting: 35,
      alteration: 45,
    },
  ];

  const weeklyData = [
    { day: "Mon", sessions: 12, revenue: 360 },
    { day: "Tue", sessions: 15, revenue: 450 },
    { day: "Wed", sessions: 18, revenue: 540 },
    { day: "Thu", sessions: 14, revenue: 420 },
    { day: "Fri", sessions: 22, revenue: 660 },
    { day: "Sat", sessions: 25, revenue: 750 },
    { day: "Sun", sessions: 8, revenue: 240 },
  ];

  const garmentDistribution = [
    { name: "Kaba & Slit", value: 28, color: "#5A001F", icon: "👗" },
    { name: "Shirt", value: 22, color: "#7A0F33", icon: "👔" },
    { name: "Dress", value: 18, color: "#A63A5F", icon: "👗" },
    { name: "Trouser", value: 15, color: "#D97A9A", icon: "👖" },
    { name: "Suit", value: 12, color: "#F9A8D4", icon: "🤵" },
    { name: "Other", value: 5, color: "#C084FC", icon: "👘" },
  ];

  const topClients = [
    {
      name: "Ama Mensah",
      sessions: 12,
      revenue: 2400,
      garments: ["KABA", "SLIT", "DRESS"],
    },
    {
      name: "Kwame Asante",
      sessions: 8,
      revenue: 1600,
      garments: ["SHIRT", "SUIT"],
    },
    {
      name: "Esi Owusu",
      sessions: 7,
      revenue: 1400,
      garments: ["DRESS", "SKIRT"],
    },
    {
      name: "Yaw Adjei",
      sessions: 6,
      revenue: 1200,
      garments: ["SUIT", "TROUSER"],
    },
    {
      name: "Abena Nyarko",
      sessions: 5,
      revenue: 1000,
      garments: ["KABA", "SLIT"],
    },
  ];

  const employeePerformance = [
    {
      name: "Kwame Asante",
      sessions: 45,
      clients: 28,
      revenue: 4500,
      rating: 4.8,
      satisfaction: 98,
    },
    {
      name: "Ama Mensah",
      sessions: 38,
      clients: 24,
      revenue: 3800,
      rating: 4.9,
      satisfaction: 99,
    },
    {
      name: "Kofi Annan",
      sessions: 42,
      clients: 26,
      revenue: 4200,
      rating: 4.7,
      satisfaction: 95,
    },
    {
      name: "Esi Owusu",
      sessions: 35,
      clients: 22,
      revenue: 3500,
      rating: 4.8,
      satisfaction: 97,
    },
  ];

  const regionData = [
    { region: "Accra", clients: 85, sessions: 245, revenue: 18500 },
    { region: "Kumasi", clients: 62, sessions: 178, revenue: 13200 },
    { region: "Takoradi", clients: 38, sessions: 112, revenue: 8400 },
    { region: "Cape Coast", clients: 27, sessions: 78, revenue: 5900 },
    { region: "Tamale", clients: 21, sessions: 65, revenue: 4800 },
  ];

  const summaryStats = [
    {
      label: "Total Revenue",
      value: "GH₵ 45,280",
      change: "+23.5%",
      icon: FiDollarSign,
      color: "#10b981",
      bgColor: "#d1fae5",
    },
    {
      label: "Total Sessions",
      value: "384",
      change: "+18.2%",
      icon: FiScissors,
      color: "#A63A5F",
      bgColor: "#f5d7e3",
    },
    {
      label: "Active Clients",
      value: "189",
      change: "+12.8%",
      icon: FiUsers,
      color: "#5A001F",
      bgColor: "#f5d7e3",
    },
    {
      label: "Avg. Session Value",
      value: "GH₵ 118",
      change: "+5.3%",
      icon: FiTrendingUp,
      color: "#D97A9A",
      bgColor: "#fce4ec",
    },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="reports-page">
      {/* Header */}
      <motion.div
        className="reports-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1>Analytics Dashboard</h1>
          <p className="text-secondary">
            Comprehensive insights into your tailoring business
          </p>
        </div>
        <div className="header-actions">
          <div className="date-range-selector">
            <FiCalendar className="selector-icon" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="week">Last 7 days</option>
              <option value="month">Last 30 days</option>
              <option value="quarter">Last 90 days</option>
              <option value="year">This year</option>
              <option value="custom">Custom range</option>
            </select>
          </div>
          <button className="btn-refresh" onClick={handleRefresh}>
            <FiRefreshCw
              className={`refresh-icon ${isRefreshing ? "spinning" : ""}`}
            />
          </button>
          <button className="btn-export">
            <FiDownload /> Export
          </button>
        </div>
      </motion.div>

      {/* Summary Stats */}
      <motion.div
        className="summary-stats"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {summaryStats.map((stat, index) => (
          <motion.div key={index} className="stat-card" variants={itemVariants}>
            <div
              className="stat-icon"
              style={{ backgroundColor: stat.bgColor, color: stat.color }}
            >
              <stat.icon />
            </div>
            <div className="stat-content">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
              <span className="stat-change" style={{ color: stat.color }}>
                {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Report Type Tabs */}
      <motion.div
        className="report-tabs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <button
          className={`tab-btn ${selectedReport === "overview" ? "active" : ""}`}
          onClick={() => setSelectedReport("overview")}
        >
          <FiBarChart2 /> Overview
        </button>
        <button
          className={`tab-btn ${selectedReport === "revenue" ? "active" : ""}`}
          onClick={() => setSelectedReport("revenue")}
        >
          <FiDollarSign /> Revenue
        </button>
        <button
          className={`tab-btn ${selectedReport === "clients" ? "active" : ""}`}
          onClick={() => setSelectedReport("clients")}
        >
          <FiUsers /> Client Insights
        </button>
        <button
          className={`tab-btn ${selectedReport === "garments" ? "active" : ""}`}
          onClick={() => setSelectedReport("garments")}
        >
          <FiPieChart /> Garment Trends
        </button>
        <button
          className={`tab-btn ${
            selectedReport === "employees" ? "active" : ""
          }`}
          onClick={() => setSelectedReport("employees")}
        >
          <FiAward /> Team Performance
        </button>
      </motion.div>

      {/* Report Content */}
      <motion.div
        className="report-content"
        key={selectedReport}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {selectedReport === "overview" && (
          <div className="overview-reports">
            {/* Key Metrics Row */}
            <div className="metrics-row">
              <div className="metric-card">
                <div className="metric-icon blue">
                  <FiClock />
                </div>
                <div className="metric-info">
                  <span className="metric-label">Avg. Session Duration</span>
                  <span className="metric-value">45 min</span>
                  <span className="metric-trend positive">↑ 8%</span>
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-icon purple">
                  <FiUsers />
                </div>
                <div className="metric-info">
                  <span className="metric-label">Repeat Clients</span>
                  <span className="metric-value">76%</span>
                  <span className="metric-trend positive">↑ 12%</span>
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-icon green">
                  <FiStar />
                </div>
                <div className="metric-info">
                  <span className="metric-label">Satisfaction Rate</span>
                  <span className="metric-value">4.8/5</span>
                  <span className="metric-trend positive">↑ 0.3</span>
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-icon orange">
                  <FiActivity />
                </div>
                <div className="metric-info">
                  <span className="metric-label">Conversion Rate</span>
                  <span className="metric-value">68%</span>
                  <span className="metric-trend positive">↑ 5%</span>
                </div>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="charts-grid">
              {/* Revenue Trend */}
              <div className="chart-card">
                <div className="chart-header">
                  <h3>Revenue Trend</h3>
                  <div className="chart-legend">
                    <span className="legend-item">
                      <span
                        className="legend-dot"
                        style={{ background: "#A63A5F" }}
                      ></span>
                      Revenue
                    </span>
                  </div>
                </div>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyData}>
                      <defs>
                        <linearGradient
                          id="revenueGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#A63A5F"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#A63A5F"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#A63A5F"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#revenueGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Session Distribution */}
              <div className="chart-card">
                <div className="chart-header">
                  <h3>Session Distribution</h3>
                  <div className="chart-legend">
                    <span className="legend-item">
                      <span
                        className="legend-dot"
                        style={{ background: "#7A0F33" }}
                      ></span>
                      Fittings
                    </span>
                    <span className="legend-item">
                      <span
                        className="legend-dot"
                        style={{ background: "#D97A9A" }}
                      ></span>
                      Alterations
                    </span>
                  </div>
                </div>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar
                        dataKey="fitting"
                        fill="#7A0F33"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="alteration"
                        fill="#D97A9A"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Bottom Charts */}
            <div className="charts-grid two-column">
              {/* Garment Distribution */}
              <div className="chart-card">
                <div className="chart-header">
                  <h3>Garment Distribution</h3>
                </div>
                <div className="chart-container pie-chart">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={garmentDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {garmentDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Weekly Activity */}
              <div className="chart-card">
                <div className="chart-header">
                  <h3>Weekly Activity</h3>
                </div>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height={300}>
                    <ComposedChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="day" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar
                        yAxisId="left"
                        dataKey="sessions"
                        fill="#A63A5F"
                        radius={[4, 4, 0, 0]}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="revenue"
                        stroke="#5A001F"
                        strokeWidth={2}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedReport === "revenue" && (
          <div className="revenue-reports">
            <div className="revenue-summary">
              <div className="summary-card">
                <h4>Total Revenue</h4>
                <span className="amount">GH₵ 45,280</span>
                <span className="period">Jan 1 - Mar 31, 2024</span>
              </div>
              <div className="summary-card">
                <h4>Average per Session</h4>
                <span className="amount">GH₵ 118</span>
                <span className="trend positive">↑ 12% vs last period</span>
              </div>
              <div className="summary-card">
                <h4>Projected Revenue</h4>
                <span className="amount">GH₵ 52,500</span>
                <span className="trend">Next 30 days</span>
              </div>
            </div>

            <div className="chart-card full-width">
              <div className="chart-header">
                <h3>Revenue Breakdown</h3>
                <select className="chart-filter">
                  <option>By Garment Type</option>
                  <option>By Employee</option>
                  <option>By Region</option>
                </select>
              </div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={garmentDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#A63A5F" radius={[4, 4, 0, 0]}>
                      {garmentDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {selectedReport === "clients" && (
          <div className="clients-reports">
            <div className="clients-stats">
              <div className="stat-box">
                <FiUsers />
                <div>
                  <span className="stat-big">189</span>
                  <span className="stat-desc">Active Clients</span>
                </div>
              </div>
              <div className="stat-box">
                <FiUsers />
                <div>
                  <span className="stat-big">76%</span>
                  <span className="stat-desc">Repeat Rate</span>
                </div>
              </div>
              <div className="stat-box">
                <FiMapPin />
                <div>
                  <span className="stat-big">5</span>
                  <span className="stat-desc">Cities</span>
                </div>
              </div>
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <h3>Top Clients by Revenue</h3>
              </div>
              <div className="table-container">
                <table className="clients-table">
                  <thead>
                    <tr>
                      <th>Client</th>
                      <th>Sessions</th>
                      <th>Revenue</th>
                      <th>Garments</th>
                      <th>Last Visit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topClients.map((client, index) => (
                      <tr key={index}>
                        <td className="client-name">{client.name}</td>
                        <td>{client.sessions}</td>
                        <td className="revenue">GH₵ {client.revenue}</td>
                        <td>
                          <div className="garment-badges">
                            {client.garments.map((g, i) => (
                              <span key={i} className="garment-badge">
                                {g}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td>2 days ago</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <h3>Client Growth</h3>
              </div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="clients"
                      stroke="#A63A5F"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {selectedReport === "garments" && (
          <div className="garments-reports">
            <div className="garment-stats">
              {garmentDistribution.map((garment, index) => (
                <div
                  key={index}
                  className="garment-stat-card"
                  style={{ borderTopColor: garment.color }}
                >
                  <span className="garment-icon">{garment.icon}</span>
                  <div className="garment-stat-info">
                    <span className="garment-name">{garment.name}</span>
                    <span className="garment-count">
                      {garment.value} sessions
                    </span>
                  </div>
                  <span className="garment-percentage">{garment.value}%</span>
                </div>
              ))}
            </div>

            <div className="charts-grid two-column">
              <div className="chart-card">
                <h3>Monthly Trend by Garment</h3>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="fitting"
                        stroke="#5A001F"
                      />
                      <Line
                        type="monotone"
                        dataKey="alteration"
                        stroke="#A63A5F"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="chart-card">
                <h3>Garment Popularity</h3>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart outerRadius={90} data={garmentDistribution}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="name" />
                      <PolarRadiusAxis angle={30} domain={[0, 30]} />
                      <Radar
                        name="Sessions"
                        dataKey="value"
                        stroke="#A63A5F"
                        fill="#A63A5F"
                        fillOpacity={0.3}
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedReport === "employees" && (
          <div className="employees-reports">
            <div className="performance-grid">
              {employeePerformance.map((emp, index) => (
                <div key={index} className="employee-card">
                  <div className="employee-avatar">
                    {emp.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <h4>{emp.name}</h4>
                  <div className="employee-stats">
                    <div className="stat-row">
                      <span>Sessions:</span>
                      <strong>{emp.sessions}</strong>
                    </div>
                    <div className="stat-row">
                      <span>Clients:</span>
                      <strong>{emp.clients}</strong>
                    </div>
                    <div className="stat-row">
                      <span>Revenue:</span>
                      <strong>GH₵ {emp.revenue}</strong>
                    </div>
                    <div className="stat-row">
                      <span>Rating:</span>
                      <strong className="rating">{emp.rating} ★</strong>
                    </div>
                  </div>
                  <div className="satisfaction-bar">
                    <div
                      className="satisfaction-fill"
                      style={{
                        width: `${emp.satisfaction}%`,
                        backgroundColor: "#A63A5F",
                      }}
                    ></div>
                  </div>
                  <span className="satisfaction-label">
                    {emp.satisfaction}% Satisfaction
                  </span>
                </div>
              ))}
            </div>

            <div className="chart-card">
              <h3>Employee Performance Comparison</h3>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={employeePerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="sessions" fill="#5A001F" />
                    <Bar yAxisId="right" dataKey="revenue" fill="#A63A5F" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Reports;
