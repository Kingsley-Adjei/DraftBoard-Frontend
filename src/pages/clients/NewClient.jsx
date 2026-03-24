import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiCamera,
  FiSave,
  FiArrowLeft,
  FiChevronRight,
  FiChevronLeft,
  FiCheck,
  FiX,
  FiHeart,
  FiScissors,
} from "react-icons/fi";
import "./NewClient.css";

const NewClient = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    dateOfBirth: "",

    // Address Information
    address: "",
    city: "",
    region: "",
    country: "Ghana",
    postalCode: "",

    // Additional Information
    notes: "",
    preferredGarments: [],
    referralSource: "",
    measurements: {
      bust: "",
      waist: "",
      hip: "",
      height: "",
    },

    // Photo
    profilePhoto: null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [touched, setTouched] = useState({});

  const garmentOptions = [
    { id: "SHIRT", label: "Shirt", icon: "👔" },
    { id: "TROUSER", label: "Trouser", icon: "👖" },
    { id: "SUIT", label: "Suit", icon: "🤵" },
    { id: "DRESS", label: "Dress", icon: "👗" },
    { id: "SKIRT", label: "Skirt", icon: "👘" },
    { id: "KABA", label: "Kaba", icon: "👚" },
    { id: "SLIT", label: "Slit", icon: "👗" },
  ];

  const regions = [
    "Greater Accra",
    "Ashanti",
    "Western",
    "Eastern",
    "Northern",
    "Central",
    "Volta",
    "Upper East",
    "Upper West",
    "Bono",
    "Ahafo",
    "Bono East",
    "Savannah",
    "North East",
    "Oti",
    "Western North",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "preferredGarments") {
      setFormData((prev) => ({
        ...prev,
        preferredGarments: checked
          ? [...prev.preferredGarments, value]
          : prev.preferredGarments.filter((g) => g !== value),
      }));
    } else if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profilePhoto: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setFormData((prev) => ({ ...prev, profilePhoto: null }));
    setPhotoPreview(null);
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number format";
    }
    if (!formData.gender) {
      newErrors.gender = "Please select a gender";
    }

    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!formData.region) {
      newErrors.region = "Please select a region";
    }

    return newErrors;
  };

  const handleNext = () => {
    const stepErrors = validateStep1();
    if (Object.keys(stepErrors).length === 0) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setErrors(stepErrors);
      // Mark all fields as touched to show errors
      const allTouched = {};
      Object.keys(stepErrors).forEach((key) => {
        allTouched[key] = true;
      });
      setTouched((prev) => ({ ...prev, ...allTouched }));
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 1) {
      handleNext();
      return;
    }

    if (step === 2) {
      const stepErrors = validateStep2();
      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        const allTouched = {};
        Object.keys(stepErrors).forEach((key) => {
          allTouched[key] = true;
        });
        setTouched((prev) => ({ ...prev, ...allTouched }));
        return;
      }
      setStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate("/clients", {
        state: {
          success: true,
          message: `✨ Client ${formData.firstName} ${formData.lastName} has been added successfully!`,
        },
      });
    }, 2000);
  };

  const pageVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  };

  return (
    <div className="sleek-new-client-page">
      {/* Background Pattern */}
      <div className="sleek-bg-pattern">
        <div className="pattern-circle circle-1"></div>
        <div className="pattern-circle circle-2"></div>
        <div className="pattern-circle circle-3"></div>
      </div>

      <div className="sleek-header">
        <Link to="/clients" className="sleek-back-btn">
          <FiArrowLeft />
          <span>Back to Clients</span>
        </Link>
        <h1>Add New Client</h1>
        <p className="sleek-subtitle">
          Enter client information to create a new profile
        </p>
      </div>

      {/* Progress Steps */}
      <div className="sleek-progress">
        <div
          className={`sleek-step ${step >= 1 ? "active" : ""} ${
            step > 1 ? "completed" : ""
          }`}
        >
          <div className="step-indicator">{step > 1 ? <FiCheck /> : "1"}</div>
          <div className="step-content">
            <span className="step-title">Personal Info</span>
            <span className="step-desc">Basic details</span>
          </div>
        </div>
        <div
          className={`sleek-step ${step >= 2 ? "active" : ""} ${
            step > 2 ? "completed" : ""
          }`}
        >
          <div className="step-indicator">{step > 2 ? <FiCheck /> : "2"}</div>
          <div className="step-content">
            <span className="step-title">Address</span>
            <span className="step-desc">Location details</span>
          </div>
        </div>
        <div className={`sleek-step ${step >= 3 ? "active" : ""}`}>
          <div className="step-indicator">3</div>
          <div className="step-content">
            <span className="step-title">Additional</span>
            <span className="step-desc">Preferences & notes</span>
          </div>
        </div>
      </div>

      <div className="sleek-form-container">
        <AnimatePresence mode="wait">
          <motion.form
            key={step}
            onSubmit={handleSubmit}
            className="sleek-form"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className="sleek-form-step">
                {/* Photo Upload */}
                <div className="sleek-photo-section">
                  <div className="sleek-photo-preview">
                    {photoPreview ? (
                      <>
                        <img src={photoPreview} alt="Profile" />
                        <button
                          type="button"
                          className="photo-remove"
                          onClick={removePhoto}
                        >
                          <FiX />
                        </button>
                      </>
                    ) : (
                      <div className="photo-placeholder">
                        <FiCamera />
                      </div>
                    )}
                  </div>
                  <div className="sleek-photo-upload">
                    <label htmlFor="photo" className="photo-upload-btn">
                      <FiCamera /> Upload Photo
                    </label>
                    <input
                      type="file"
                      id="photo"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="photo-input"
                    />
                    <span className="photo-hint">Optional • Max 5MB</span>
                  </div>
                </div>

                <div className="sleek-form-grid">
                  <div
                    className={`sleek-input-group ${
                      touched.firstName && errors.firstName ? "error" : ""
                    } ${formData.firstName ? "filled" : ""}`}
                  >
                    <label>
                      <FiUser /> First Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      onBlur={() => handleBlur("firstName")}
                      placeholder="Enter first name"
                    />
                    {touched.firstName && errors.firstName && (
                      <span className="error-text">{errors.firstName}</span>
                    )}
                  </div>

                  <div
                    className={`sleek-input-group ${
                      touched.lastName && errors.lastName ? "error" : ""
                    } ${formData.lastName ? "filled" : ""}`}
                  >
                    <label>
                      <FiUser /> Last Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      onBlur={() => handleBlur("lastName")}
                      placeholder="Enter last name"
                    />
                    {touched.lastName && errors.lastName && (
                      <span className="error-text">{errors.lastName}</span>
                    )}
                  </div>
                </div>

                <div className="sleek-form-grid">
                  <div
                    className={`sleek-input-group ${
                      touched.email && errors.email ? "error" : ""
                    } ${formData.email ? "filled" : ""}`}
                  >
                    <label>
                      <FiMail /> Email <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur("email")}
                      placeholder="client@example.com"
                    />
                    {touched.email && errors.email && (
                      <span className="error-text">{errors.email}</span>
                    )}
                  </div>

                  <div
                    className={`sleek-input-group ${
                      touched.phone && errors.phone ? "error" : ""
                    } ${formData.phone ? "filled" : ""}`}
                  >
                    <label>
                      <FiPhone /> Phone <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={() => handleBlur("phone")}
                      placeholder="+233 24 123 4567"
                    />
                    {touched.phone && errors.phone && (
                      <span className="error-text">{errors.phone}</span>
                    )}
                  </div>
                </div>

                <div className="sleek-form-grid">
                  <div
                    className={`sleek-select-group ${
                      touched.gender && errors.gender ? "error" : ""
                    }`}
                  >
                    <label>
                      Gender <span className="required">*</span>
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      onBlur={() => handleBlur("gender")}
                    >
                      <option value="">Select gender</option>
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="OTHER">Other</option>
                    </select>
                    {touched.gender && errors.gender && (
                      <span className="error-text">{errors.gender}</span>
                    )}
                  </div>

                  <div className="sleek-input-group">
                    <label>
                      <FiCalendar /> Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Address Information */}
            {step === 2 && (
              <div className="sleek-form-step">
                <div
                  className={`sleek-input-group ${
                    touched.address && errors.address ? "error" : ""
                  } ${formData.address ? "filled" : ""}`}
                >
                  <label>
                    <FiMapPin /> Street Address{" "}
                    <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    onBlur={() => handleBlur("address")}
                    placeholder="Enter street address"
                  />
                  {touched.address && errors.address && (
                    <span className="error-text">{errors.address}</span>
                  )}
                </div>

                <div className="sleek-form-grid">
                  <div
                    className={`sleek-input-group ${
                      touched.city && errors.city ? "error" : ""
                    } ${formData.city ? "filled" : ""}`}
                  >
                    <label>
                      City <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      onBlur={() => handleBlur("city")}
                      placeholder="Enter city"
                    />
                    {touched.city && errors.city && (
                      <span className="error-text">{errors.city}</span>
                    )}
                  </div>

                  <div
                    className={`sleek-select-group ${
                      touched.region && errors.region ? "error" : ""
                    }`}
                  >
                    <label>
                      Region <span className="required">*</span>
                    </label>
                    <select
                      name="region"
                      value={formData.region}
                      onChange={handleChange}
                      onBlur={() => handleBlur("region")}
                    >
                      <option value="">Select region</option>
                      {regions.map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                    {touched.region && errors.region && (
                      <span className="error-text">{errors.region}</span>
                    )}
                  </div>
                </div>

                <div className="sleek-form-grid">
                  <div className="sleek-input-group">
                    <label>Country</label>
                    <input
                      type="text"
                      value={formData.country}
                      disabled
                      className="disabled"
                    />
                  </div>

                  <div className="sleek-input-group">
                    <label>Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="e.g., GA-123"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Additional Information */}
            {step === 3 && (
              <div className="sleek-form-step">
                <div className="sleek-garment-section">
                  <label className="section-label">
                    <FiHeart /> Preferred Garments
                  </label>
                  <div className="sleek-garment-grid">
                    {garmentOptions.map((garment) => (
                      <label
                        key={garment.id}
                        className={`garment-card ${
                          formData.preferredGarments.includes(garment.id)
                            ? "selected"
                            : ""
                        }`}
                      >
                        <input
                          type="checkbox"
                          name="preferredGarments"
                          value={garment.id}
                          checked={formData.preferredGarments.includes(
                            garment.id
                          )}
                          onChange={handleChange}
                        />
                        <span className="garment-icon">{garment.icon}</span>
                        <span className="garment-label">{garment.label}</span>
                        {formData.preferredGarments.includes(garment.id) && (
                          <FiCheck className="garment-check" />
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="sleek-form-grid">
                  <div className="sleek-select-group">
                    <label>How did you hear about us?</label>
                    <select
                      name="referralSource"
                      value={formData.referralSource}
                      onChange={handleChange}
                    >
                      <option value="">Select an option</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Friend">Friend/Family</option>
                      <option value="Google">Google Search</option>
                      <option value="Walk-in">Walk-in</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="sleek-textarea-group">
                  <label>
                    <FiScissors /> Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Any special notes about the client (preferences, allergies, etc.)"
                    rows="4"
                  />
                </div>

                <div className="sleek-consent">
                  <label className="consent-checkbox">
                    <input type="checkbox" name="consent" />
                    <span className="checkmark"></span>
                    <span className="consent-text">
                      I confirm that I have obtained consent to store this
                      client's information
                    </span>
                  </label>
                </div>
              </div>
            )}

            <div className="sleek-form-actions">
              {step > 1 && (
                <button
                  type="button"
                  className="sleek-btn sleek-btn-secondary"
                  onClick={handleBack}
                  disabled={loading}
                >
                  <FiChevronLeft /> Back
                </button>
              )}

              <button
                type="submit"
                className="sleek-btn sleek-btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <span className="sleek-spinner"></span>
                ) : step === 3 ? (
                  <>
                    <FiSave /> Create Client
                  </>
                ) : (
                  <>
                    Continue <FiChevronRight />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        </AnimatePresence>

        {/* Live Preview Card */}
        <motion.div
          className="sleek-preview-card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="preview-header">
            <h3>Live Preview</h3>
            <span className="preview-badge">Draft</span>
          </div>

          <div className="preview-avatar">
            {photoPreview ? (
              <img src={photoPreview} alt="Preview" />
            ) : (
              <div className="preview-avatar-placeholder">
                {formData.firstName && formData.lastName ? (
                  `${formData.firstName[0]}${formData.lastName[0]}`
                ) : (
                  <FiUser />
                )}
              </div>
            )}
          </div>

          <div className="preview-info">
            <h4>
              {formData.firstName || "First Name"}{" "}
              {formData.lastName || "Last Name"}
            </h4>
            <p>{formData.email || "email@example.com"}</p>
            <p>{formData.phone || "+233 XX XXX XXXX"}</p>
          </div>

          <div className="preview-details">
            <div className="preview-detail-item">
              <FiMapPin />
              <span>
                {formData.city || "City"}
                {formData.city && formData.region ? ", " : ""}
                {formData.region || "Region"}
              </span>
            </div>
            {formData.preferredGarments.length > 0 && (
              <div className="preview-garments">
                {formData.preferredGarments.slice(0, 3).map((g) => (
                  <span key={g} className="preview-garment-tag">
                    {garmentOptions.find((opt) => opt.id === g)?.icon} {g}
                  </span>
                ))}
                {formData.preferredGarments.length > 3 && (
                  <span className="preview-garment-tag">
                    +{formData.preferredGarments.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>

          {step === 3 && (
            <div className="preview-ready">
              <FiCheck /> Ready to create
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default NewClient;
