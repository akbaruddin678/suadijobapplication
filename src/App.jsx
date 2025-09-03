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
import ApplicationFormMechanical from './components/Forms/MechanicalForm/MechanicalForm.jsx'
import ApplicationFormPipeFitter from './components/Forms/PipeFitter/PipeFitter.jsx'
import LandingPage from "./components/Home/LanidngPage.jsx";
import JobSelection from "./components/JobSelection/JobSelection.jsx";
import AdminDashboard from "./components/Home/Dashboard/AdminDashboard.jsx";

import Login from "./components/Auth/Login.jsx";
import "./App.css";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

      if (token && savedUser) {
        try {
          // Verify token with backend (optional)
          const response = await fetch(
            "http://localhost:5000/api/auth/verify",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

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

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

// Public Route Component (redirect to dashboard if already logged in)
// Public Route Component (redirect to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in - now checking both 'user' and 'token'
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  return user ? <Navigate to="/admin" /> : children;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/jobselection" element={<JobSelection />}>
            {/* Nested routes */}
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
          </Route>

          {/* Auth Routes */}
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
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Catch all route - redirect to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
