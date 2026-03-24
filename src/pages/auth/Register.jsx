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
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleNext = (stepData) => {
    console.log("Step data received:", stepData);
    setFormData((prev) => ({ ...prev, ...stepData }));
    setCurrentStep((s) => s + 1);
  };

  const handleBack = () => setCurrentStep((s) => Math.max(1, s - 1));

  // Step 1: Register user
  const handleRegister = async (userData) => {
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

  // Step 2: Create company
  const handleCreateCompany = async (companyData) => {
    console.log("🔵 Creating company with data:", companyData);
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

  // Step 3: Send invitations - FIXED
  const handleSendInvitations = async (inviteData) => {
    console.log("🔵 Sending invitations:", inviteData);

    // If user skipped, go to dashboard
    if (
      inviteData.skip ||
      !inviteData.invitations ||
      inviteData.invitations.length === 0
    ) {
      navigate("/dashboard");
      return;
    }

    setLoading(true);
    const companyId = localStorage.getItem("companyId");

    if (!companyId) {
      console.error("No company ID found");
      navigate("/dashboard");
      return;
    }

    let successCount = 0;
    let failCount = 0;

    try {
      // Send each invitation
      for (const invite of inviteData.invitations) {
        try {
          console.log(
            `🔵 Sending invitation to ${invite.email} as ${invite.role}`
          );
          await companyService.inviteMember(companyId, {
            email: invite.email,
            memberRole: invite.role,
          });
          successCount++;
        } catch (err) {
          console.error(`Failed to invite ${invite.email}:`, err);
          failCount++;
        }
      }

      // Show summary of invitations sent
      if (successCount > 0) {
        console.log(`✅ Successfully sent ${successCount} invitation(s)`);
      }
      if (failCount > 0) {
        console.warn(`⚠️ Failed to send ${failCount} invitation(s)`);
      }

      // Navigate to dashboard regardless of invitation results
      navigate("/dashboard");
    } catch (err) {
      console.error("Error sending invitations:", err);
      // Still navigate to dashboard, just show error in console
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
        <div className="db-card-wrapper">
          <div className="db-right" style={{ justifyContent: "center" }}>
            <div className="db-card" style={{ textAlign: "center" }}>
              <div className="loading-spinner"></div>
              <p>Processing...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="db-page">
        <div className="db-card-wrapper">
          <div className="db-right" style={{ justifyContent: "center" }}>
            <div className="db-card" style={{ textAlign: "center" }}>
              <div className="error-icon">⚠️</div>
              <p className="error-message">{error}</p>
              <button className="db-btn" onClick={() => setError("")}>
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  switch (currentStep) {
    case 1:
      return <RegisterStep1 onNext={handleRegister} defaultValues={formData} />;
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
