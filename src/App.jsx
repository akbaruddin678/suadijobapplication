// client/src/App.jsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ApplicationFormHospitality from "./components/Forms/HospitalityForm/HospitalityForm.jsx";
import ApplicationFormDomestic from "./components/Forms/DomesticForm/DomesticForm.jsx";
import ApplicationFormCivil from "./components/Forms/CivilForm/CivilForm.jsx";
import ApplicationFormGermany from "./components/Forms/GermanyForm/GermanyForm.jsx";
import ApplicationFormMechanical from "./components/Forms/MechanicalForm/MechanicalForm.jsx";
import ApplicationFormPipeFitter from "./components/Forms/PipeFitter/PipeFitter.jsx";
import ApplicationFormTailorIroner from "./components/Forms/TailorIroner/TailorIroner.jsx";
import ApplicationFormHelpers from "./components/Forms/hHelperJobs/helperjobs.jsx";

import ItalyHomePage from "./components/Forms/ItalyForm/HomePage.jsx";
import HealthcareForm from "./components/Forms/ItalyForm/HealthcareForm.jsx";

import LandingPage from "./components/Home/LanidngPage.jsx";
import JobSelection from "./components/JobSelection/JobSelection.jsx";
import AdminDashboard from "./components/Home/Dashboard/AdminDashboard.jsx";
import Login from "./components/Auth/Login.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

import "./App.css";

/* ---------------- Route Guards ---------------- */

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

      if (token && savedUser) {
        try {
          const response = await fetch("/api/auth/verify", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.ok) {
            setUser(JSON.parse(savedUser));
          } else {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          }
        } catch (error) {
          console.error("Failed: Try Again:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }
      setLoading(false);
    };

    verifyAuth();
  }, []);

  if (loading) return <div className="loading-container">Loading...</div>;
  return user ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (savedUser && token) setUser(JSON.parse(savedUser));
    setLoading(false);
  }, []);

  if (loading) return <div className="loading-container">Loading...</div>;
  return user ? <Navigate to="/admin" replace /> : children;
};

/* ---------------- App ---------------- */

function App() {
  // Simple global logout handler: clears auth and redirects to /login
  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      // hard redirect to ensure all state resets
      window.location.href = "/login";
    }
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />

          {/* JobSelection hub + nested routes */}
          <Route path="/jobselection" element={<JobSelection />}>
            {/* General application forms */}
            <Route
              path="application-hospitality"
              element={<ApplicationFormHospitality />}
            />
            <Route
              path="application-domestic"
              element={<ApplicationFormDomestic />}
            />
            <Route
              path="application-civil"
              element={<ApplicationFormCivil />}
            />
            <Route
              path="application-germany"
              element={<ApplicationFormGermany />}
            />
            <Route
              path="application-mechanical"
              element={<ApplicationFormMechanical />}
            />
            <Route
              path="application-pipefitter"
              element={<ApplicationFormPipeFitter />}
            />
            <Route
              path="application-tailor/ironer"
              element={<ApplicationFormTailorIroner />}
            />
            <Route
              path="application-helperjobs"
              element={<ApplicationFormHelpers />}
            />

            {/* Italy landing + namespaced Italy program forms */}
            <Route path="application-italyjobs" element={<ItalyHomePage />} />
            <Route path="application-italy-form" element={<HealthcareForm />} />
          </Route>

          {/* Auth */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          {/* Protected Admin Route */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminDashboard onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
