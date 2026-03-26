// src/pages/auth/ForgotPassword.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiMail,
  FiArrowLeft,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { authService } from "../../services/authService";
import "./ForgotPassword.css";
import Logo from "../../assets/logo_black.png";

const SLIDES = [
  {
    image:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&q=80",
    tagline: (
      <>
        Welcome To <strong>FitFolio</strong>, Where <strong>Tradition</strong>{" "}
        Meets <strong>Precision</strong> In Every <strong>Stitch</strong>
      </>
    ),
    sub: "Digitize your tailoring business, manage client measurements, and create perfect fits every time.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
    tagline: (
      <>
        Measure <strong>Once</strong>, Create <strong>Forever</strong>
      </>
    ),
    sub: "Store measurements securely, track client history, and deliver consistent quality with every order.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1537832816519-689ad163238b?w=900&q=80",
    tagline: (
      <>
        Digitizing <strong>Ghanaian Fashion</strong>,{" "}
        <strong>One Measurement</strong> at a Time
      </>
    ),
    sub: "Specialized support for Kaba, Slit, and traditional Ghanaian garments with precision measurement tools.",
  },
];

const SLIDE_INTERVAL = 8000;

function Carousel() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = (idx) => {
    if (idx === current || animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 500);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % SLIDES.length);
        setAnimating(false);
      }, 500);
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[current];

  return (
    <div className="db-left">
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className={`db-slide-bg ${i === current ? "active" : ""} ${
            animating && i === current ? "fading" : ""
          }`}
          style={{ backgroundImage: `url(${s.image})` }}
        />
      ))}
      <div className="db-left-overlay" />
      <div className={`db-left-content ${animating ? "content-fade" : ""}`}>
        <p className="db-tagline">{slide.tagline}</p>
        <p className="db-sub">{slide.sub}</p>
        <div className="db-dots">
          {SLIDES.map((_, i) => (
            <span
              key={i}
              className={`db-dot ${i === current ? "active" : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      // FIXED: Send just the email string, not an object
      await authService.forgotPassword(email);
      setSuccess(true);
    } catch (err) {
      console.error("Forgot password error:", err);
      setError(
        err.response?.data?.message ||
          "Unable to send reset link. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="db-page">
        <div className="db-card-wrapper">
          <Carousel />
          <div className="db-right">
            <div className="db-card">
              <div className="db-header">
                <div className="welcome-header">
                  <h1 className="db-logo">Check Your Email</h1>
                </div>
                <p className="db-sub-head">Password reset link sent</p>
              </div>

              <div className="success-container">
                <div className="success-icon">
                  <FiCheckCircle />
                </div>
                <p className="success-message">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
                <p className="info-text">
                  Click the link in the email to reset your password. The link
                  will expire in 30 minutes.
                </p>
                <div className="db-buttons">
                  <button className="db-btn" onClick={() => navigate("/login")}>
                    Back to Login
                  </button>
                  <button
                    className="db-btn db-btn-secondary"
                    onClick={() => {
                      setSuccess(false);
                      setEmail("");
                    }}
                  >
                    Resend Email
                  </button>
                </div>
                <div className="db-footer-links">
                  <Link to="/login">← Return to Sign In</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="db-page">
      <div className="db-card-wrapper">
        <Carousel />
        <div className="db-right">
          <div className="db-card">
            <div className="db-header">
              <div className="welcome-header">
                <h1 className="db-logo">Forgot Password</h1>
              </div>
              <p className="db-sub-head">
                Enter your email address and we'll send you a link to reset your
                password.
              </p>
            </div>

            {error && (
              <div className="db-error-message">
                <FiAlertCircle />
                <span>{error}</span>
              </div>
            )}

            <div className="db-form">
              <div className="db-field">
                <label className="db-label">
                  <span className="db-label-icon">
                    <FiMail />
                  </span>
                  Email Address
                </label>
                <div className="db-input-wrap">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    autoFocus
                  />
                </div>
              </div>

              <button
                className="db-btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="db-spinner"></span>
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </button>

              <div className="db-footer-links">
                <Link to="/login">
                  <FiArrowLeft /> Back to Sign In
                </Link>
              </div>

              <p className="db-signin-alt">
                Don't have an account? <Link to="/register">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
