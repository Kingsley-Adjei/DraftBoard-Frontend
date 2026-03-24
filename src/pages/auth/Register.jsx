// src/pages/auth/Register.jsx
import { useState } from "react";
import RegisterStep1 from "./RegisterStep1";
import RegisterStep2 from "./RegisterStep2";
import RegisterStep3 from "./RegisterStep3";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { companyService } from "../../services/companyService";
import { useAuth } from "../../contexts/AuthContext";

export default function Register() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(null);
  const [companyId, setCompanyId] = useState(null);
  const navigate = useNavigate();
  const { login, updateUser } = useAuth();

  const handleNext = (stepData) => {
    console.log("Step data received:", stepData);
    setFormData((prev) => ({ ...prev, ...stepData }));
    setCurrentStep((s) => s + 1);
  };

  const handleBack = () => {
    setCurrentStep((s) => Math.max(1, s - 1));
  };

  // Step 1: Register user (POST on first time)
  const handleRegister = async (userData, isUpdating = false) => {
    console.log("handleRegister called with:", {
      userData,
      isUpdating,
      userId,
    });

    // If we already have a userId (coming back from step 2), just update the form data and proceed
    if (userId) {
      // User already exists, just update local form data and go to step 2
      console.log(
        "User already exists, updating form data and proceeding to step 2"
      );
      setFormData((prev) => ({ ...prev, ...userData }));
      setCurrentStep(2);
      return;
    }

    // Otherwise, this is a new registration
    setLoading(true);
    setError("");

    const payload = {
      email: userData.email,
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phoneNumber: userData.phone,
      role: "OWNER",
    };

    try {
      const response = await authService.register(payload);
      if (response.data.success) {
        const { token, refreshToken, user } = response.data.data;

        localStorage.setItem("accessToken", token);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("userId", user.id);
        setUserId(user.id);

        const loginResult = await login(userData.email, userData.password);
        if (loginResult.success) {
          setFormData((prev) => ({ ...prev, ...userData, userId: user.id }));
          setCurrentStep(2);
        } else {
          navigate("/login");
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Create company (POST on first time)
  const handleCreateCompany = async (companyData) => {
    // If company already exists (coming back from step 3), update instead
    if (companyId) {
      await handleUpdateCompany(companyData);
      return;
    }

    setLoading(true);
    setError("");

    if (!companyData.name || !companyData.name.trim()) {
      setError("Company name is required");
      setLoading(false);
      return;
    }

    try {
      const response = await companyService.createCompany({
        name: companyData.name,
        phoneNumber: companyData.phoneNumber,
        companyType: companyData.companyType,
        address: companyData.address || null,
        city: companyData.city || null,
        state: companyData.state || null,
        country: companyData.country || null,
        postalCode: companyData.postalCode || null,
        email: companyData.email || null,
        website: companyData.website || null,
        businessNumber: companyData.businessNumber || null,
      });

      console.log("Company creation response:", response);

      if (response.data.success) {
        const newCompany = response.data.data;
        localStorage.setItem("companyId", newCompany.id);
        localStorage.setItem("companyName", newCompany.name);
        setCompanyId(newCompany.id);

        setFormData((prev) => ({
          ...prev,
          companyId: newCompany.id,
          companyName: newCompany.name,
        }));
        setCurrentStep(3);
      } else {
        setError(response.data.message || "Failed to create company");
      }
    } catch (err) {
      console.error("Company creation error:", err);
      setError(err.response?.data?.message || "Failed to create company");
    } finally {
      setLoading(false);
    }
  };

  // Update company when going back from step 3
  const handleUpdateCompany = async (companyData) => {
    setLoading(true);
    setError("");

    try {
      const response = await companyService.updateCompany(companyId, {
        name: companyData.name,
        phoneNumber: companyData.phoneNumber,
        companyType: companyData.companyType,
        address: companyData.address || null,
        city: companyData.city || null,
        state: companyData.state || null,
        country: companyData.country || null,
        postalCode: companyData.postalCode || null,
        email: companyData.email || null,
        website: companyData.website || null,
        businessNumber: companyData.businessNumber || null,
      });

      if (response.data.success) {
        const updatedCompany = response.data.data;
        localStorage.setItem("companyName", updatedCompany.name);
        setFormData((prev) => ({ ...prev, ...companyData }));
        setCurrentStep(3);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update company");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Send invitations
  const handleSendInvitations = async (inviteData) => {
    if (
      inviteData.skip ||
      !inviteData.invitations ||
      inviteData.invitations.length === 0
    ) {
      navigate("/dashboard");
      return;
    }

    setLoading(true);
    const currentCompanyId = localStorage.getItem("companyId");

    if (!currentCompanyId) {
      console.error("No company ID found");
      navigate("/dashboard");
      return;
    }

    try {
      for (const invite of inviteData.invitations) {
        await companyService.inviteMember(currentCompanyId, {
          email: invite.email,
          memberRole: invite.role,
        });
      }
      navigate("/dashboard");
    } catch (err) {
      console.error("Error sending invitations:", err);
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const mapBusinessType = (type) => {
    const typeMap = {
      "Tailor Shop": "TAILOR_SHOP",
      "Fashion Designer": "FASHION_DESIGNER",
      Boutique: "OTHER",
      "Clothing Manufacturer": "MANUFACTURER",
      "Alteration Service": "OTHER",
      Other: "OTHER",
    };
    return typeMap[type] || "OTHER";
  };

  
  if (loading) {
    return (
      <div className="db-page">
        <div
          className="db-card-wrapper"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="db-loading-card">
            <div className="db-loading-spinner"></div>
            <p className="db-loading-text">
              {currentStep === 3
                ? "Sending invitations..."
                : currentStep === 2
                ? "Creating your company..."
                : "Creating your account..."}
            </p>
            <p className="db-loading-sub">
              Please wait, this may take a moment
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    // Determine error type for better user experience
    const isDuplicateEmail =
      error.includes("already exists") || error.includes("duplicate");
    const isNetworkError =
      error.includes("network") || error.includes("Failed to fetch");
    const isValidationError =
      error.includes("validation") || error.includes("invalid");

    const getErrorIcon = () => {
      if (isDuplicateEmail) return "📧";
      if (isNetworkError) return "🌐";
      if (isValidationError) return "📝";
      return "⚠️";
    };

    const getErrorTitle = () => {
      if (isDuplicateEmail) return "Email Already Registered";
      if (isNetworkError) return "Connection Error";
      if (isValidationError) return "Invalid Information";
      return "Registration Failed";
    };

    const getErrorMessage = () => {
      if (isDuplicateEmail) {
        return "This email address is already registered. Please use a different email or try logging in.";
      }
      if (isNetworkError) {
        return "Unable to connect to the server. Please check your internet connection and try again.";
      }
      return error;
    };

    return (
      <div className="db-page">
        <div
          className="db-card-wrapper"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="db-error-card">
            <div className="db-error-icon">{getErrorIcon()}</div>
            <h3 className="db-error-title">{getErrorTitle()}</h3>
            <p className="db-error-message">{getErrorMessage()}</p>
            <div className="db-error-actions">
              {isNetworkError && (
                <button
                  className="db-btn db-btn-secondary"
                  onClick={() => window.location.reload()}
                >
                  Refresh Page
                </button>
              )}
              <button className="db-btn" onClick={() => setError("")}>
                Try Again
              </button>
            </div>
            {isDuplicateEmail && (
              <p className="db-error-help">
                Already have an account? <a href="/login">Sign in here</a>
              </p>
            )}
            {!isDuplicateEmail && !isNetworkError && (
              <p className="db-error-help">
                Need help? <a href="/contact-support">Contact Support</a>
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
  // Check if user already exists (has userId in state)
  const hasUser = userId !== null;

  switch (currentStep) {
    case 1:
      return (
        <RegisterStep1
          onNext={handleRegister}
          defaultValues={formData}
          isUpdating={hasUser}
        />
      );
    case 2:
      return (
        <RegisterStep2
          onSubmit={handleCreateCompany}
          onBack={handleBack}
          defaultValues={formData}
        />
      );
    case 3:
      return (
        <RegisterStep3
          onSubmit={handleSendInvitations}
          onBack={handleBack}
          defaultValues={formData}
        />
      );
    default:
      return null;
  }
}
