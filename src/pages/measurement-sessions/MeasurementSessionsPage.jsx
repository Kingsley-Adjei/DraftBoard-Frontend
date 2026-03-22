import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../dashboard/DashboardLayout";
import { useToast } from "../../components/ui/Toast";
import MeasurementSessions from "./Measurement-sessions";

export default function MeasurementSessionsPage() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("sessions");
  const toast = useToast();

  const handleNavigation = (pageId) => {
    // Map page IDs to routes
    const routes = {
      dashboard: "/dashboard",
      companies: "/dashboard",
      clients: "/dashboard",
      sessions: "/measurement-sessions",
      templates: "/dashboard",
      reports: "/dashboard",
      profile: "/dashboard",
      settings: "/settings",
    };

    const targetRoute = routes[pageId];
    
    // Update active page state
    setActivePage(pageId);

    // Navigate if it's a different route
    if (targetRoute && targetRoute !== "/measurement-sessions") {
      navigate(targetRoute);
    }
  };

  return (
    <DashboardLayout 
      activePage={activePage} 
      setActivePage={handleNavigation}
    >
      <MeasurementSessions />
    </DashboardLayout>
  );
}
