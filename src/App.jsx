import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/auth/SignIn";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import General from "./pages/settings/General";
import Notifications from "./pages/settings/Notifications";
import Privacy from "./pages/settings/Privacy";
import Security from "./pages/settings/Security";
import Appearance from "./pages/settings/Appearance";
import MeasurementSessionsPage from "./pages/measurement-sessions/MeasurementSessionsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/measurement-sessions" element={<MeasurementSessionsPage />} />
        <Route path="/settings" element={<General />} />
        <Route path="/settings/notifications" element={<Notifications />} />
        <Route path="/settings/privacy" element={<Privacy />} />
        <Route path="/settings/security" element={<Security />} />
        <Route path="/settings/appearance" element={<Appearance />} />
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
