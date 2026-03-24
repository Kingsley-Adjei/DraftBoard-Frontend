import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiCopy,
  FiShare2,
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiFilter,
  FiStar,
  FiUsers,
  FiLock,
  FiUnlock,
  FiMoreVertical,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
} from "react-icons/fi";
import "./Templates.css";

const Templates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("popular");

  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: "Classic Business Shirt",
      garmentType: "SHIRT",
      description:
        "Standard measurements for formal business shirts with spread collar and french cuffs",
      measurements: [
        "Neck",
        "Chest",
        "Waist",
        "Sleeve Length",
        "Shoulder",
        "Bicep",
        "Wrist",
      ],
      isShared: true,
      usageCount: 234,
      rating: 4.8,
      createdAt: "2024-01-15",
      updatedAt: "2024-02-10",
      author: "Kwame Asante",
      tags: ["formal", "business", "classic"],
    },
    {
      id: 2,
      name: "Traditional Kaba Set",
      garmentType: "KABA",
      description:
        "Complete measurements for traditional Kaba and Slit with African print specifications",
      measurements: [
        "Bust",
        "Waist",
        "Hip",
        "Shoulder to Waist",
        "Sleeve Length",
        "Underbust",
        "Neck Circumference",
      ],
      isShared: true,
      usageCount: 456,
      rating: 4.9,
      createdAt: "2024-01-20",
      updatedAt: "2024-02-15",
      author: "Ama Mensah",
      tags: ["traditional", "kaba", "african-print"],
    },
    {
      id: 3,
      name: "Modern Slim Fit Suit",
      garmentType: "SUIT",
      description:
        "Measurements for single-breasted modern suit with slim fit profile",
      measurements: [
        "Jacket Chest",
        "Jacket Length",
        "Sleeve Length",
        "Trouser Waist",
        "Inseam",
        "Shoulder Width",
      ],
      isShared: false,
      usageCount: 89,
      rating: 4.5,
      createdAt: "2024-02-01",
      updatedAt: "2024-02-20",
      author: "Kwame Asante",
      tags: ["suit", "formal", "slim-fit"],
    },
    {
      id: 4,
      name: "A-Line Dress",
      garmentType: "DRESS",
      description:
        "Versatile A-line dress measurements suitable for various occasions",
      measurements: [
        "Bust",
        "Waist",
        "Hip",
        "Dress Length",
        "Shoulder to Bust",
        "Neckline",
      ],
      isShared: true,
      usageCount: 167,
      rating: 4.7,
      createdAt: "2024-01-25",
      updatedAt: "2024-02-18",
      author: "Esi Owusu",
      tags: ["dress", "a-line", "casual"],
    },
    {
      id: 5,
      name: "Pencil Skirt",
      garmentType: "SKIRT",
      description:
        "Professional pencil skirt measurements with back slit option",
      measurements: [
        "Waist",
        "Hip",
        "Skirt Length",
        "Vent Length",
        "Waistband Height",
      ],
      isShared: true,
      usageCount: 123,
      rating: 4.6,
      createdAt: "2024-02-05",
      updatedAt: "2024-02-22",
      author: "Ama Mensah",
      tags: ["skirt", "professional", "pencil"],
    },
    {
      id: 6,
      name: "Wedding Gown",
      garmentType: "DRESS",
      description:
        "Comprehensive wedding gown measurements with train specifications",
      measurements: [
        "Bust",
        "Waist",
        "Hip",
        "Dress Length",
        "Train Length",
        "Shoulder to Floor",
      ],
      isShared: false,
      usageCount: 45,
      rating: 4.9,
      createdAt: "2024-01-10",
      updatedAt: "2024-02-25",
      author: "Esi Owusu",
      tags: ["wedding", "formal", "gown"],
    },
  ]);

  const garmentTypes = [
    { value: "all", label: "All Garments" },
    { value: "SHIRT", label: "Shirt", icon: "👔" },
    { value: "TROUSER", label: "Trouser", icon: "👖" },
    { value: "SUIT", label: "Suit", icon: "🤵" },
    { value: "DRESS", label: "Dress", icon: "👗" },
    { value: "SKIRT", label: "Skirt", icon: "👘" },
    { value: "KABA", label: "Kaba", icon: "👚" },
    { value: "SLIT", label: "Slit", icon: "👗" },
  ];

  const garmentTypeColors = {
    SHIRT: "#5A001F",
    TROUSER: "#7A0F33",
    SUIT: "#A63A5F",
    DRESS: "#D97A9A",
    SKIRT: "#F9A8D4",
    KABA: "#5A001F",
    SLIT: "#7A0F33",
  };

  const garmentIcons = {
    SHIRT: "👔",
    TROUSER: "👖",
    SUIT: "🤵",
    DRESS: "👗",
    SKIRT: "👘",
    KABA: "👚",
    SLIT: "👗",
  };

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesType =
      filterType === "all" || template.garmentType === filterType;
    return matchesSearch && matchesType;
  });

  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    if (sortBy === "popular") return b.usageCount - a.usageCount;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "recent")
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    return 0;
  });

  const handleDuplicate = (templateId) => {
    // Duplicate logic
    console.log("Duplicate template:", templateId);
  };

  const handleToggleShare = (templateId) => {
    setTemplates(
      templates.map((t) =>
        t.id === templateId ? { ...t, isShared: !t.isShared } : t
      )
    );
  };

  const handleDelete = (templateId) => {
    if (window.confirm("Are you sure you want to delete this template?")) {
      setTemplates(templates.filter((t) => t.id !== templateId));
    }
  };

  return (
    <div className="templates-page">
      {/* Header */}
      <motion.div
        className="templates-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1>Measurement Templates</h1>
          <p className="text-secondary">
            Create, manage, and reuse measurement templates for faster sessions
          </p>
        </div>
        <Link to="/templates/new" className="btn-create">
          <FiPlus /> Create Template
        </Link>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        className="templates-filters"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="search-section">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search templates by name, description or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-actions">
            <button
              className={`filter-toggle ${showFilters ? "active" : ""}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiFilter /> Filters
            </button>

            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="recent">Recently Updated</option>
            </select>
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              className="advanced-filters"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="filter-group">
                <label>Garment Type:</label>
                <div className="garment-filter-buttons">
                  {garmentTypes.map((type) => (
                    <button
                      key={type.value}
                      className={`filter-btn ${
                        filterType === type.value ? "active" : ""
                      }`}
                      onClick={() => setFilterType(type.value)}
                    >
                      <span>{type.icon}</span>
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Templates Grid */}
      <motion.div
        className="templates-grid"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        initial="hidden"
        animate="visible"
      >
        {sortedTemplates.map((template) => (
          <motion.div
            key={template.id}
            className="template-card"
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <div className="template-card-header">
              <div
                className="template-type-icon"
                style={{
                  backgroundColor: garmentTypeColors[template.garmentType],
                }}
              >
                {garmentIcons[template.garmentType]}
              </div>
              <div className="template-actions">
                <button
                  className="action-btn"
                  onClick={() => handleToggleShare(template.id)}
                  title={template.isShared ? "Shared" : "Private"}
                >
                  {template.isShared ? <FiUnlock /> : <FiLock />}
                </button>
                <button
                  className="action-btn"
                  onClick={() => handleDuplicate(template.id)}
                >
                  <FiCopy />
                </button>
                <button className="action-btn menu-btn">
                  <FiMoreVertical />
                </button>
              </div>
            </div>

            <div className="template-card-body">
              <h3>{template.name}</h3>
              <p className="template-description">{template.description}</p>

              <div className="template-tags">
                {template.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="template-measurements">
                <h4>Measurements ({template.measurements.length})</h4>
                <div className="measurement-tags">
                  {template.measurements.slice(0, 4).map((m, i) => (
                    <span key={i} className="measurement-tag">
                      {m}
                    </span>
                  ))}
                  {template.measurements.length > 4 && (
                    <span className="measurement-tag more">
                      +{template.measurements.length - 4}
                    </span>
                  )}
                </div>
              </div>

              <div className="template-meta">
                <div className="meta-item">
                  <FiUsers />
                  <span>{template.usageCount} uses</span>
                </div>
                <div className="meta-item">
                  <FiStar />
                  <span>{template.rating}</span>
                </div>
                <div className="meta-item">
                  <FiClock />
                  <span>
                    {new Date(template.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="template-author">
                <div className="author-avatar">
                  {template.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <span className="author-name">{template.author}</span>
              </div>
            </div>

            <div className="template-card-footer">
              <Link to={`/templates/${template.id}`} className="btn-view">
                View Template
              </Link>
              <Link to={`/templates/${template.id}/edit`} className="btn-edit">
                <FiEdit2 />
              </Link>
              <button
                className="btn-delete"
                onClick={() => handleDelete(template.id)}
              >
                <FiTrash2 />
              </button>
            </div>

            {template.isShared && (
              <div className="shared-badge">
                <FiShare2 /> Shared
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {sortedTemplates.length === 0 && (
        <motion.div
          className="empty-state"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="empty-icon">📏</div>
          <h3>No templates found</h3>
          <p>Try adjusting your search or create a new template</p>
          <Link to="/templates/new" className="btn-create">
            <FiPlus /> Create Your First Template
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default Templates;
