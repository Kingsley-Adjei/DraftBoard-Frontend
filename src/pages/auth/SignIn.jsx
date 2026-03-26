import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Logo from "../../assets/logo_black.png";
import "./SignIn.css";

const SLIDES = [
  {
    image:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&q=80",
    tagline: (
      <>
        Welcome To <strong>DraftBoard</strong>, Where <strong>Tradition</strong>{" "}
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

const validators = {
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
  password: (v) => v.length >= 1,
};
const errorMessages = {
  email: "Enter a valid email address",
  password: "Password is required",
};

function EyeIcon({ visible, onClick }) {
  return (
    <button type="button" className="db-eye" onClick={onClick} tabIndex={-1}>
      {visible ? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )}
    </button>
  );
}

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

export default function SignIn() {
  const navigate = useNavigate();
  const { login, isAuthenticated, loading: authLoading } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, authLoading, navigate]);

  const validity = {
    email: validators.email(form.email),
    password: validators.password(form.password),
  };
  const ft = (name) => touched[name] || submitAttempted;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear API error when user starts typing
    if (apiError) setApiError("");
  };

  const handleBlur = (e) =>
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));

  const handleSubmit = async () => {
    setSubmitAttempted(true);
    setApiError("");

    if (!validity.email || !validity.password) return;

    setIsLoading(true);

    try {
      const result = await login(form.email, form.password);

      if (result.success) {
        // Store remember me preference if checked
        if (form.remember) {
          localStorage.setItem("rememberEmail", form.email);
        } else {
          localStorage.removeItem("rememberEmail");
        }

        // Navigate to dashboard on success
        navigate("/dashboard");
      } else {
        setApiError(result.message);
      }
    } catch (error) {
      setApiError("An unexpected error occurred. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load remembered email on component mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberEmail");
    if (rememberedEmail) {
      setForm((prev) => ({ ...prev, email: rememberedEmail, remember: true }));
    }
  }, []);

  return (
    <div className="db-page">
      <div className="db-card-wrapper">
        <Carousel />
        <div className="db-right">
          <div
            className="db-card"
            style={{
              marginTop: "3rem",
            }}
          >
            <div className="db-header">
              <div className="welcome-header">
                <h1 className="db-logo">Sign in to </h1>
                <div className="img-container">
                  <img src={Logo} alt="DraftBoard Logo" className="logo" />
                  <h1 className="db-logo">raftBoard</h1>
                </div>
              </div>

              <p className="db-sub-head">
                Enter your credentials to access your account
              </p>
            </div>

            <div className="db-oauth">
              <button
                className="db-oauth-btn google"
                type="button"
                disabled={isLoading}
              >
                <svg viewBox="0 0 24 24" className="db-oauth-icon">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Sign in with Google
              </button>
              <button
                className="db-oauth-btn apple"
                type="button"
                disabled={isLoading}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="db-oauth-icon"
                  fill="currentColor"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Sign in with Apple
              </button>
            </div>

            <div className="db-divider">
              <span />
              <p>Or</p>
              <span />
            </div>

            {apiError && (
              <div className="db-error-message">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {apiError}
              </div>
            )}

            <div
              className="db-form"
              onKeyDown={(e) =>
                e.key === "Enter" && !isLoading && handleSubmit()
              }
            >
              <div className="db-field">
                <label className="db-label">
                  <span className="db-label-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                  Email
                </label>
                <div
                  className={`db-input-wrap ${
                    ft("email") && !validity.email ? "error" : ""
                  }`}
                >
                  <input
                    name="email"
                    type="email"
                    placeholder="example@gmail.com"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="email"
                    disabled={isLoading}
                  />
                </div>
                {ft("email") && !validity.email && (
                  <p className="db-error">{errorMessages.email}</p>
                )}
              </div>

              <div className="db-field">
                <label className="db-label">
                  <span className="db-label-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  Password
                </label>
                <div
                  className={`db-input-wrap ${
                    ft("password") && !validity.password ? "error" : ""
                  }`}
                >
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••••••"
                    value={form.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="current-password"
                    disabled={isLoading}
                  />
                  <EyeIcon
                    visible={showPassword}
                    onClick={() => setShowPassword((p) => !p)}
                  />
                </div>
                {ft("password") && !validity.password && (
                  <p className="db-error">{errorMessages.password}</p>
                )}
              </div>

              <div className="db-remember-row">
                <label className="db-checkbox-label">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={form.remember}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  <span className="db-checkbox-custom" />
                  Remember me
                </label>
                <a href="/forgot-password" className="db-forgot">
                  Forgot Password?
                </a>
              </div>

              <button
                className={`db-btn ${isLoading ? "loading" : ""}`}
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="db-spinner" />
                ) : (
                  <>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                      <polyline points="10 17 15 12 10 7" />
                      <line x1="15" y1="12" x2="3" y2="12" />
                    </svg>
                    Sign in
                  </>
                )}
              </button>

              <p className="db-signin-alt">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/register")}
                  className="db-link-btn"
                  disabled={isLoading}
                >
                  Create one
                </button>
              </p>

              <div className="db-footer-links">
                <a href="#">Privacy</a>
                <span>•</span>
                <a href="#">Terms</a>
                <span>•</span>
                <a href="#">Help</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
