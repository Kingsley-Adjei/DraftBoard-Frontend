import { useState } from "react";
import RegisterStep1 from "./RegisterStep1";
import RegisterStep2 from "./RegisterStep2";
import RegisterStep3 from "./RegisterStep3";
import { useNavigate } from "react-router-dom";

/**
 * Register.jsx — flow controller
 *
 * Owns:
 *  - currentStep: 1 | 2 | 3
 *  - formData: accumulated across all steps
 *
 * Step 3 renders different fields based on formData.role:
 *  "business_owner" → Company Name, Business Contact, Business Type, Unit, Terms
 *  "employee"       → Invitation Token, Unit, Terms
 */
export default function Register() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleNext = (stepData) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
    setCurrentStep((s) => s + 1);
  };

  const handleBack = () => setCurrentStep((s) => Math.max(1, s - 1));

  const handleSubmit = (finalData) => {
    // TODO: call your API here
    navigate("/dashboard");

    console.log("Registration complete:", finalData);
  };

  switch (currentStep) {
    case 1:
      return <RegisterStep1 onNext={handleNext} defaultValues={formData} />;
    case 2:
      return (
        <RegisterStep2
          onNext={handleNext}
          onBack={handleBack}
          defaultValues={formData}
        />
      );
    case 3:
      return (
        <RegisterStep3
          onSubmit={handleSubmit}
          onBack={handleBack}
          defaultValues={formData}
        />
      );
    default:
      return null;
  }
}
