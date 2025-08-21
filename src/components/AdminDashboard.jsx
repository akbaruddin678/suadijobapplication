// client/src/components/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import * as XLSX from "xlsx";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalApplications, setTotalApplications] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const { logout } = useAuth();

  const fetchApplications = async (page = 1) => {
    try {
      const token = JSON.parse(localStorage.getItem("user")).token;
      const response = await fetch(
        `http://localhost:5000/api/applications?page=${page}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setApplications(data.applications);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
      setTotalApplications(data.totalApplications);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching applications:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchApplications(page);
  };

  const handleStatusChange = async (id, status) => {
    try {
      const token = JSON.parse(localStorage.getItem("user")).token;
      const response = await fetch(
        `http://localhost:5000/api/applications/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (response.ok) {
        fetchApplications(currentPage);
        setSelectedApplication(null);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const downloadExcel = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.token) {
        throw new Error("No authentication token found");
      }

      const token = user.token;
      const response = await fetch(
        "http://localhost:5000/api/applications/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Server error: ${response.status}`
        );
      }

      const allApplications = await response.json();
      const excelData = allApplications.map((app) => ({
        "Full Name": app.fullName,
        Age: app.age,
        Gender: app.gender,
        "Current Residence": app.currentResidence,
        "Contact Number": app.contactNumber,
        Email: app.email,
        "Passport Number": app.passportNumber,
        Positions: app.positions.join(", "),
        "Other Position": app.otherPosition || "",
        "Willing to Relocate": app.willingToRelocate,
        "Other Relocate": app.otherRelocate || "",
        "Preferred City": app.preferredCity,
        "Other City": app.otherCity || "",
        "Worked in Saudi Before": app.workedInSaudi,
        "Why work in Saudi": app.whyWorkInSaudi,
        Status: app.status,
        "Applied On": formatDate(app.createdAt),
      }));

      const worksheet = XLSX.utils.json_to_sheet(excelData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `job_applications_${
        new Date().toISOString().split("T")[0]
      }.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading Excel file:", error);
      alert(`Failed to download Excel file: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading applications...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-title">
            <h1>Admin Dashboard</h1>
            <p className="subtitle">Manage job applications</p>
          </div>
          <div className="header-stats">
            <div className="stat-card">
              <span className="stat-number">{totalApplications}</span>
              <span className="stat-label">Total Applications</span>
            </div>
          </div>
        </div>

        <div className="header-buttons">
          <button onClick={downloadExcel} className="excel-download-btn">
            <span className="btn-icon">📊</span>
            Export Excel
          </button>
          <button onClick={logout} className="logout-btn">
            <span className="btn-icon">🚪</span>
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="applications-list">
          <div className="section-header">
            <h2>Job Applications</h2>
            <div className="pagination-info">
              Page {currentPage} of {totalPages} • {applications.length}{" "}
              applications
            </div>
          </div>

          {applications.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <h3>No applications found</h3>
              <p>There are no job applications to display at this time.</p>
            </div>
          ) : (
            <>
              <div className="applications-table-container">
                <table className="applications-table">
                  <thead>
                    <tr>
                      <th className="number-col">#</th>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Applied On</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app, index) => (
                      <tr key={app._id} className="application-row">
                        <td className="number-col">
                          {(currentPage - 1) * 10 + index + 1}
                        </td>
                        <td className="applicant-name">
                          {/* <div className="name-avatar">
                            {app.fullName.charAt(0).toUpperCase()}
                          </div> */}
                          {app.fullName}
                        </td>
                        <td>
                          <div className="positions-list">
                            {app.positions.map((pos, i) => (
                              <span key={i} className="position-tag">
                                {pos}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td>
                          <a
                            href={`mailto:${app.email}`}
                            className="email-link"
                          >
                            {app.email}
                          </a>
                        </td>
                        <td>
                          <span
                            className={`status-badge status-${app.status.toLowerCase()}`}
                          >
                            {app.status}
                          </span>
                        </td>
                        <td>{formatDate(app.createdAt)}</td>
                        <td>
                          <button
                            onClick={() => setSelectedApplication(app)}
                            className="view-btn"
                            title="View details"
                          >
                            <span className="btn-icon">👁️</span>
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="pagination-controls">
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="pagination-btn"
                >
                  ← Previous
                </button>

                <div className="pagination-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        className={`pagination-number ${
                          currentPage === page ? "active" : ""
                        }`}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="pagination-btn"
                >
                  Next →
                </button>
              </div>
            </>
          )}
        </div>

        {selectedApplication && (
          <div className="application-detail-overlay">
            <div className="application-detail">
              <div className="detail-header">
                <h2>Application Details</h2>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="close-btn"
                  aria-label="Close"
                >
                  &times;
                </button>
              </div>

              <div className="detail-content">
                <div className="detail-section">
                  <h3>
                    <span className="section-icon">👤</span>
                    Personal Information
                  </h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <label>Full Name</label>
                      <p>{selectedApplication.fullName}</p>
                    </div>
                    <div className="detail-item">
                      <label>Age</label>
                      <p>{selectedApplication.age}</p>
                    </div>
                    <div className="detail-item">
                      <label>Gender</label>
                      <p>{selectedApplication.gender}</p>
                    </div>
                    <div className="detail-item">
                      <label>Current Residence</label>
                      <p>{selectedApplication.currentResidence}</p>
                    </div>
                    <div className="detail-item">
                      <label>Contact Number</label>
                      <p>{selectedApplication.contactNumber}</p>
                    </div>
                    <div className="detail-item">
                      <label>Email</label>
                      <p>
                        <a href={`mailto:${selectedApplication.email}`}>
                          {selectedApplication.email}
                        </a>
                      </p>
                    </div>
                    <div className="detail-item">
                      <label>Passport Number</label>
                      <p>{selectedApplication.passportNumber}</p>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>
                    <span className="section-icon">💼</span>
                    Job Preferences
                  </h3>
                  <div className="detail-grid">
                    <div className="detail-item full-width">
                      <label>Positions</label>
                      <div className="positions-list">
                        {selectedApplication.positions.map((pos, i) => (
                          <span key={i} className="position-tag">
                            {pos}
                          </span>
                        ))}
                      </div>
                    </div>
                    {selectedApplication.otherPosition && (
                      <div className="detail-item">
                        <label>Other Position</label>
                        <p>{selectedApplication.otherPosition}</p>
                      </div>
                    )}
                    <div className="detail-item">
                      <label>Willing to Relocate</label>
                      <p>{selectedApplication.willingToRelocate}</p>
                    </div>
                    {selectedApplication.otherRelocate && (
                      <div className="detail-item">
                        <label>Relocate Details</label>
                        <p>{selectedApplication.otherRelocate}</p>
                      </div>
                    )}
                    <div className="detail-item">
                      <label>Preferred City</label>
                      <p>{selectedApplication.preferredCity}</p>
                    </div>
                    {selectedApplication.otherCity && (
                      <div className="detail-item">
                        <label>Other City</label>
                        <p>{selectedApplication.otherCity}</p>
                      </div>
                    )}
                    <div className="detail-item">
                      <label>Worked in Saudi Before</label>
                      <p>{selectedApplication.workedInSaudi}</p>
                    </div>
                    <div className="detail-item full-width">
                      <label>Why work in Saudi</label>
                      <p className="multiline-text">
                        {selectedApplication.whyWorkInSaudi}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>
                    <span className="section-icon">🔄</span>
                    Update Status
                  </h3>
                  <div className="status-actions">
                    <button
                      onClick={() =>
                        handleStatusChange(selectedApplication._id, "Accepted")
                      }
                      className="status-btn accepted"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() =>
                        handleStatusChange(selectedApplication._id, "Reviewed")
                      }
                      className="status-btn reviewed"
                    >
                      Mark as Reviewed
                    </button>
                    <button
                      onClick={() =>
                        handleStatusChange(selectedApplication._id, "Rejected")
                      }
                      className="status-btn rejected"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
