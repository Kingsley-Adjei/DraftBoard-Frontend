import React, { useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiCamera,
  FiSave,
  FiCalendar,
  FiBriefcase,
} from "react-icons/fi";
import "./Profile.css";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const [profileData, setProfileData] = useState({
    firstName: "Kwame",
    lastName: "Asante",
    email: "kwame.asante@draftboard.com",
    phone: "+233 24 123 4567",
    role: "OWNER",
    company: "Premium Tailors",
    joinDate: "2024-01-15",
    bio: "Master tailor with 10+ years of experience specializing in traditional and modern Ghanaian fashion.",
    address: "123 Fashion Street, Accra, Ghana",
    timezone: "GMT",
    language: "English",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const recentActivities = [
    { action: "Created new session for Ama Mensah", time: "2 hours ago" },
    {
      action: "Updated client measurements for Kwame Asante",
      time: "5 hours ago",
    },
    { action: "Added new template: Classic Kaba Set", time: "1 day ago" },
    { action: "Completed fitting session for Esi Owusu", time: "2 days ago" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    // Save profile logic here
    setIsEditing(false);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    // Password change logic here
  };

  return (
    <div className="profile-page">
      <div className="page-header">
        <div>
          <h1>My Profile</h1>
          <p className="text-secondary">
            Manage your personal information and settings
          </p>
        </div>
        {!isEditing ? (
          <button
            className="btn btn-primary"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        ) : (
          <div className="header-actions">
            <button
              className="btn btn-secondary"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSaveProfile}>
              <FiSave /> Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="profile-grid">
        {/* Left Column - Profile Info */}
        <div className="profile-left">
          <div className="profile-card">
            <div className="profile-cover">
              <div className="profile-avatar-large">
                <span>
                  {profileData.firstName[0]}
                  {profileData.lastName[0]}
                </span>
                {isEditing && (
                  <button className="avatar-edit">
                    <FiCamera />
                  </button>
                )}
              </div>
            </div>

            <div className="profile-info">
              <h2>
                {profileData.firstName} {profileData.lastName}
              </h2>
              <p className="profile-role">{profileData.role}</p>
              <p className="profile-company">{profileData.company}</p>

              <div className="profile-stats">
                <div className="stat">
                  <span className="stat-value">342</span>
                  <span className="stat-label">Sessions</span>
                </div>
                <div className="stat">
                  <span className="stat-value">156</span>
                  <span className="stat-label">Clients</span>
                </div>
                <div className="stat">
                  <span className="stat-value">28</span>
                  <span className="stat-label">Templates</span>
                </div>
              </div>
            </div>
          </div>

          <div className="activity-card">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              {recentActivities.map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-dot"></div>
                  <div className="activity-content">
                    <p>{activity.action}</p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Tabs */}
        <div className="profile-right">
          <div className="profile-tabs">
            <button
              className={`tab ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              <FiUser /> Profile Details
            </button>
            <button
              className={`tab ${activeTab === "security" ? "active" : ""}`}
              onClick={() => setActiveTab("security")}
            >
              <FiLock /> Security
            </button>
            <button
              className={`tab ${activeTab === "preferences" ? "active" : ""}`}
              onClick={() => setActiveTab("preferences")}
            >
              <FiBriefcase /> Preferences
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "profile" && (
              <div className="profile-details">
                <div className="form-group">
                  <label>First Name</label>
                  <div className="input-wrapper">
                    <FiUser className="input-icon" />
                    <input
                      type="text"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Last Name</label>
                  <div className="input-wrapper">
                    <FiUser className="input-icon" />
                    <input
                      type="text"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <div className="input-wrapper">
                    <FiMail className="input-icon" />
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <div className="input-wrapper">
                    <FiPhone className="input-icon" />
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Bio</label>
                  <textarea
                    name="bio"
                    value={profileData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows="4"
                  />
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={profileData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="security-settings">
                <form onSubmit={handleChangePassword}>
                  <div className="form-group">
                    <label>Current Password</label>
                    <div className="input-wrapper">
                      <FiLock className="input-icon" />
                      <input
                        type="password"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        placeholder="Enter current password"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>New Password</label>
                    <div className="input-wrapper">
                      <FiLock className="input-icon" />
                      <input
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        placeholder="Enter new password"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Confirm New Password</label>
                    <div className="input-wrapper">
                      <FiLock className="input-icon" />
                      <input
                        type="password"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Update Password
                  </button>
                </form>

                <div className="security-info">
                  <h4>Security Tips</h4>
                  <ul>
                    <li>Use at least 8 characters</li>
                    <li>Include uppercase and lowercase letters</li>
                    <li>Add numbers and special characters</li>
                    <li>Don't use common passwords</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "preferences" && (
              <div className="preferences-settings">
                <div className="form-group">
                  <label>Language</label>
                  <select
                    name="language"
                    value={profileData.language}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  >
                    <option value="English">English</option>
                    <option value="Twi">Twi</option>
                    <option value="French">French</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Timezone</label>
                  <select
                    name="timezone"
                    value={profileData.timezone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  >
                    <option value="GMT">GMT (Accra)</option>
                    <option value="EST">Eastern Time</option>
                    <option value="PST">Pacific Time</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Measurement Unit</label>
                  <div className="radio-group">
                    <label>
                      <input
                        type="radio"
                        name="unit"
                        value="cm"
                        defaultChecked
                      />{" "}
                      Centimeters (cm)
                    </label>
                    <label>
                      <input type="radio" name="unit" value="inches" /> Inches
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label>Email Notifications</label>
                  <div className="checkbox-group">
                    <label>
                      <input type="checkbox" defaultChecked /> New session
                      created
                    </label>
                    <label>
                      <input type="checkbox" defaultChecked /> Client updates
                    </label>
                    <label>
                      <input type="checkbox" /> Weekly reports
                    </label>
                    <label>
                      <input type="checkbox" defaultChecked /> Team invitations
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
