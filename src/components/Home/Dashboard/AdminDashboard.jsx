// AdminDashboard.jsx
import React, { useEffect, useMemo, useState, useRef } from "react";
import {
  FaBellConcierge,
  FaIndustry,
  FaHelmetSafety,
  FaHouse,
  FaGaugeHigh,
  FaRightFromBracket,
  FaBell,
  FaCircleUser,
  FaChevronDown,
  FaChevronUp,
  FaDownload,
  FaMagnifyingGlass,
  FaBars,
  FaXmark,
} from "react-icons/fa6";
import { utils, writeFile } from "xlsx";
import ApplicationProcess from "../ApplicationProcess/ApplicationProcess";
import "./AdminDashboard.css";

const DEFAULT_USER = { name: "User", role: "Admin", location: "all" };

/** Pretty status pills */
const StatusPill = ({ status = "pending", size = "md" }) => {
  const normalized = (status || "").toLowerCase();
  const cls = `status-pill ${normalized} ${size}`;
  const text =
    normalized.charAt(0).toUpperCase() + normalized.slice(1) || "Pending";
  return (
    <span className={cls}>
      <span className="dot" />
      {text}
    </span>
  );
};

const AdminDashboard = ({ user = DEFAULT_USER, onLogout = () => {} }) => {
  const safeUser = { ...DEFAULT_USER, ...(user || {}) };

  const [activeTab, setActiveTab] = useState("dashboard");
  const [applications, setApplications] = useState({
    hospitality: [],
    germany: [],
    civil: [],
    domestic: [],
    tailoriron: [],
    pipefitter: [],
    mechanical: [],
    helper: [],
    italyjob: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters / search / sort
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");
  const [sortKey, setSortKey] = useState("createdAt");
  const [sortDir, setSortDir] = useState("desc");

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);

  // Application process state
  const [viewingProcess, setViewingProcess] = useState(false);
  const [selectedProcessApp, setSelectedProcessApp] = useState(null);

  // Mobile sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [isSavingComment, setIsSavingComment] = useState(false);

  const commentTimeout = useRef(null);

  const startApplicationProcess = (type, app) => {
    setSelectedProcessApp(app); // Set the selected application
    setViewingProcess(true); // Open the application process form
  };
  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      if (!token) {
        window.location.href = "/login";
        throw new Error("Access Denied. Please login again.");
      }

      const response = await fetch(
        "https://hungry-hopper.210-56-25-68.plesk.page/api/applications/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
          throw new Error("Session expired. Please login again.");
        }
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      const normalizedData = data.map((app) => ({
        ...app,
        status: (app.status || "pending").toLowerCase(),
      }));

      // Process data into categories based on jobtitle
      const processedData = {
        hospitality: normalizedData.filter(
          (app) => app.jobtitle === "hospitality"
        ),
        germany: data.filter((app) => app.jobtitle === "germany"),
        civil: data.filter((app) => app.jobtitle === "civil"),
        domestic: data.filter((app) => app.jobtitle === "domestic"),
        tailoriron: data.filter((app) => app.jobtitle === "tailoriron"),
        pipefitter: data.filter((app) => app.jobtitle === "pipefitter"),
        mechanical: data.filter((app) => app.jobtitle === "mechanical"),
        helper: data.filter((app) => app.jobtitle === "helper"),
        italyjob: normalizedData.filter((app) => app.jobtitle === "italy-jobs"),
      };

      // Apply location filter if user has specific location
      if (safeUser.location !== "all") {
        Object.keys(processedData).forEach((key) => {
          processedData[key] = processedData[key].filter(
            (app) => app.city === safeUser.location
          );
        });
      }

      setApplications(processedData);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching applications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [safeUser.location]);

  // Replace the updateApplicationComment function with this:
  const updateApplicationComment = async (type, id, comment) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      // First update the backend using POST
      const response = await fetch(
        `https://hungry-hopper.210-56-25-68.plesk.page/api/applications/${id}/comment`,
        {
          method: "POST", // Changed from PUT to POST
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ comment }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Server error: ${response.status}`
        );
      }

      // Then update local state
      setApplications((prev) => {
        const updated = { ...prev };
        updated[type] = (updated[type] || []).map((app) =>
          app._id === id ? { ...app, comment } : app
        );
        return updated;
      });

      // Also update selectedApp if it's the current one
      if (selectedApp && selectedApp._id === id) {
        setSelectedApp((prev) => ({ ...prev, comment }));
      }

      return true;
    } catch (err) {
      console.error("Comment save error:", err);
      throw err;
    }
  };

  // Remove the commentDraft state and related functions
  // Replace the openModal and closeModal functions with these:

  const openModal = (type, app) => {
    setSelectedType(type);
    setSelectedApp(app);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedApp(null);
    setSelectedType(null);
  };

  // Add debouncing to prevent too many API calls
  const handleCommentChange = async (e) => {
    const newComment = e.target.value;
    setSelectedApp((prev) => ({ ...prev, comment: newComment }));

    // Clear previous timeout
    if (commentTimeout.current) {
      clearTimeout(commentTimeout.current);
    }

    // Set new timeout for saving (1 second delay)
    commentTimeout.current = setTimeout(async () => {
      if (selectedApp && selectedType) {
        setIsSavingComment(true);
        try {
          await updateApplicationComment(
            selectedType,
            selectedApp._id,
            newComment
          );
        } catch (err) {
          alert(`Failed to save comment: ${err.message}`);
          // Revert to original comment if save fails
          setSelectedApp((prev) => ({ ...prev, comment: selectedApp.comment }));
        } finally {
          setIsSavingComment(false);
        }
      }
    }, 3000);
  };

  // Also add a cleanup effect to clear the timeout when component unmounts
  useEffect(() => {
    return () => {
      if (commentTimeout.current) {
        clearTimeout(commentTimeout.current);
      }
    };
  }, []);
  // // Update the textarea in the modal to use commentDraft
  // <textarea
  //   id="comment"
  //   className="comment-box"
  //   rows="3"
  //   placeholder="Write your comments here..."
  //   value={commentDraft}
  //   onChange={(e) => setCommentDraft(e.target.value)}
  // />;

  const updateApplicationStatus = async (type, id, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      // Map frontend status to backend status format
      const statusMap = {
        pending: "Pending",
        reviewed: "Reviewed",
        accepted: "Accepted",
        rejected: "Rejected",
        completed: "Completed",
      };

      const backendStatus = statusMap[newStatus] || newStatus;

      // Use POST instead of PUT for updating status
      const response = await fetch(
        `https://hungry-hopper.210-56-25-68.plesk.page/api/applications/${id}/status`,
        {
          method: "POST", // Changed from PUT to POST
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: backendStatus }),
        }
      );

      if (!response.ok) {
        let errorMessage = "Failed to update status";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      // After the successful update, fetch the applications again or update them in the local state
      const updatedApplication = await response.json();

      // Update the application status in the local state
      setApplications((prev) => {
        const updated = { ...prev };
        const appIndex = (updated[type] || []).findIndex(
          (app) => app._id === id
        );
        if (appIndex !== -1) {
          updated[type] = [...updated[type]];
          updated[type][appIndex] = {
            ...updated[type][appIndex],
            status: newStatus, // Keep frontend format
          };
        }
        return updated;
      });

      // Update the selected application status in the modal if it's open
      if (isModalOpen && selectedApp && selectedApp._id === id) {
        setSelectedApp((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      console.error("Error updating status:", err);
      alert(`Failed to update status: ${err.message}`);
    }
  };

  // Derived helpers
  const allApplications = useMemo(
    () => Object.values(applications).flat(),
    [applications]
  );

  const cities = useMemo(() => {
    const set = new Set(allApplications.map((a) => a.city).filter(Boolean));
    return ["all", ...Array.from(set)];
  }, [allApplications]);

  const statusCounts = useMemo(() => {
    const tally = {
      pending: 0,
      reviewed: 0,
      accepted: 0,
      rejected: 0,
      completed: 0,
    };

    // Loop over all applications and count the occurrences of each status
    allApplications.forEach((a) => {
      if (tally[a.status] !== undefined) tally[a.status]++;
    });

    return tally;
  }, [applications]); // Recalculate when the applications state changes

  // Global filter/sort
  const applyListFilters = (list) => {
    let out = list;

    if (statusFilter !== "all") {
      out = out.filter((a) => a.status === statusFilter);
    }
    if (cityFilter !== "all") {
      out = out.filter((a) => a.city === cityFilter);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      out = out.filter((a) => {
        const name = (a.fullName || "").toLowerCase();
        const email = (a.email || "").toLowerCase();
        const contact = (a.contactNumber || "").toLowerCase();
        const positionText = Array.isArray(a.positions)
          ? a.positions.join(", ").toLowerCase()
          : (a.position || "").toLowerCase();
        const city = (a.city || "").toLowerCase();
        return (
          name.includes(q) ||
          email.includes(q) ||
          contact.includes(q) ||
          positionText.includes(q) ||
          city.includes(q)
        );
      });
    }

    // sort
    out = [...out].sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      const av = a[sortKey] ?? "";
      const bv = b[sortKey] ?? "";

      if (sortKey === "createdAt" || sortKey === "submissionDate") {
        return (new Date(av) - new Date(bv)) * dir;
      }
      if (typeof av === "string" && typeof bv === "string") {
        return av.localeCompare(bv) * dir;
      }
      return ((av || 0) - (bv || 0)) * dir;
    });

    return out;
  };

  const filteredRecentHospitality = useMemo(
    () => applyListFilters(applications.hospitality || []).slice(0, 5),
    [applications, query, statusFilter, cityFilter, sortKey, sortDir]
  );

  const statCards = [
    {
      key: "hospitality",
      icon: <FaBellConcierge />,
      title: "Hospitality Applications",
      value: applications.hospitality.length,
      color: "hospitality",
    },
    {
      key: "germany",
      icon: <FaIndustry />,
      title: "Germany Applications",
      value: applications.germany.length,
      color: "germany",
    },
    {
      key: "civil",
      icon: <FaHelmetSafety />,
      title: "Civil Applications",
      value: applications.civil.length,
      color: "civil",
    },
    {
      key: "domestic",
      icon: <FaHouse />,
      title: "Domestic Applications",
      value: applications.domestic.length,
      color: "domestic",
    },
    {
      key: "tailoriron",
      icon: <FaHouse />,
      title: "Tailor Applications",
      value: applications.tailoriron.length,
      color: "tailoriron",
    },
    {
      key: "pipefitter",
      icon: <FaHouse />,
      title: "Pipe Fitter Applications",
      value: applications.pipefitter.length,
      color: "pipefitter",
    },
    {
      key: "helper",
      icon: <FaHouse />,
      title: "Helper Applications",
      value: applications.helper.length,
      color: "helper",
    },
    {
      key: "mechanical",
      icon: <FaHouse />,
      title: "Mechanical Applications",
      value: applications.mechanical.length,
      color: "mechanical",
    },
    {
      key: "italy-jobs",
      icon: <FaHouse />,
      title: "Italy Job Applications",
      value: applications.italyjob.length,
      color: "italy-jobs",
    },
  ];

  const sortLabel = (key) =>
    ({
      fullName: "Name",
      age: "Age",
      city: "City",
      createdAt: "Date",
      submissionDate: "Date",
      status: "Status",
    }[key] || key);

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  // Excel export with SheetJS
  const exportExcel = (type) => {
    const headers = [
      "Form Type",
      "Name",
      "Age",
      "Contact",
      "Email",
      "Position(s)",
      "Date",
      "City",
      "Status",
    ];

    const data = applyListFilters(applications[type] || []);
    const rows = data.map((a) => ({
      "Form Type": type,
      Name: a.fullName || "",
      Age: a.age ?? "",
      Contact: a.contactNumber || "",
      Email: a.email || "",
      "Position(s)": Array.isArray(a.positions)
        ? a.positions.join(", ")
        : a.position || "",
      Date: a.createdAt ? new Date(a.createdAt).toLocaleDateString() : "",
      City: a.city || "",
      Status: a.status || "",
    }));

    const ws = utils.json_to_sheet(rows, { header: headers });
    ws["!cols"] = headers.map((h) => ({ wch: Math.max(12, h.length + 2) }));
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, `${type[0].toUpperCase()}${type.slice(1)}`);
    writeFile(wb, `${type}-applications.xlsx`);
  };

  // Modal controls
  // const openModal = (type, app) => {
  //   setSelectedType(type);
  //   setSelectedApp(app);
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  //   setSelectedApp(null);
  //   setSelectedType(null);
  // };

  const DetailRow = ({ label, value }) => (
    <div className="detail-row">
      <span className="detail-label">{label}</span>
      <span className="detail-value">{value ?? "—"}</span>
    </div>
  );

  // If we're viewing the application process, show that component
  if (viewingProcess && selectedProcessApp) {
    return (
      <ApplicationProcess
        application={selectedProcessApp}
        onBack={() => setViewingProcess(false)}
        onComplete={() => {
          setViewingProcess(false);
          updateApplicationStatus(
            selectedProcessApp.type,
            selectedProcessApp._id,
            "completed"
          );
        }}
      />
    );
  }

  if (loading) {
    return (
      <div className="admin-dashboard loading">
        <div className="loading-spinner">Loading applications...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard error">
        <div className="error-message">
          <h2>Error</h2>
          <p>{error}</p>
          <button className="btn primary" onClick={fetchApplications}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  const renderDashboard = () => (
    <div className="dashboard-overview card">
      <div className="dashboard-header">
        <div className="header-left">
          <div className="header-icon">
            <FaGaugeHigh />
          </div>
          <div>
            <h1>Welcome, {safeUser?.name || "User"}</h1>
            <p>
              Role: {safeUser?.role}
              {safeUser?.location !== "all" && ` — ${safeUser?.location}`}
            </p>
          </div>
        </div>
        <div className="header-right">
          <div className="filter-chip">
            <span>Status</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="filter-chip">
            <span>City</span>
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
            >
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c[0].toUpperCase() + c.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-chip">
            <span>Sort</span>
            <button
              className="sort-btn"
              onClick={() => toggleSort(sortKey)}
              title={`Toggle sort on ${sortLabel(sortKey)}`}
            >
              {sortLabel(sortKey)}{" "}
              {sortDir === "asc" ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
            >
              <option value="createdAt">Date</option>
              <option value="fullName">Name</option>
              <option value="age">Age</option>
              <option value="city">City</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        {statCards.map((c) => (
          <div key={c.key} className={`stat-card ${c.color} card`}>
            <div className="stat-icon">{c.icon}</div>
            <div className="stat-content">
              <h3>{c.value}</h3>
              <p>{c.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="status-overview">
        <h2>Application Status Overview</h2>
        <div className="status-cards">
          <div className="status-card card">
            <h3>{statusCounts.pending}</h3>
            <p>Pending</p>
          </div>
          <div className="status-card card">
            <h3>{statusCounts.reviewed}</h3>
            <p>Reviewed</p>
          </div>
          <div className="status-card card">
            <h3>{statusCounts.accepted}</h3>
            <p>Accepted</p>
          </div>
          <div className="status-card card">
            <h3>{statusCounts.rejected}</h3>
            <p>Rejected</p>
          </div>
          <div className="status-card card">
            <h3>{statusCounts.completed}</h3>
            <p>Completed</p>
          </div>
        </div>
      </div>

      <div className="recent-applications card">
        <div className="recent-header">
          <h2>Recent Hospitality Applications</h2>
          <button className="btn" onClick={() => exportExcel("hospitality")}>
            <FaDownload /> Export Excel
          </button>
        </div>

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th onClick={() => toggleSort("fullName")} role="button">
                  Name
                </th>
                <th>Position</th>
                <th className="hide-sm">Form Type</th>
                <th onClick={() => toggleSort("createdAt")} role="button">
                  Date
                </th>
                <th
                  onClick={() => toggleSort("city")}
                  role="button"
                  className="hide-md"
                >
                  City
                </th>
                <th>Status</th>
                <th className="hide-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecentHospitality.map((app) => (
                <tr
                  key={`hosp-${app._id}`}
                  className="clickable-row"
                  onClick={() => openModal("hospitality", app)}
                >
                  <td data-label="Name">{app.fullName}</td>
                  <td data-label="Position">
                    {Array.isArray(app.positions)
                      ? app.positions.join(", ")
                      : app.position || "N/A"}
                  </td>
                  <td data-label="Form" className="hide-sm">
                    Hospitality
                  </td>
                  <td data-label="Date">
                    {app.createdAt
                      ? new Date(app.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td data-label="City" className="hide-md">
                    {app.city}
                  </td>
                  <td data-label="Status">
                    <StatusPill status={app.status} />
                  </td>
                  <td
                    className="hide-sm"
                    onClick={(e) => e.stopPropagation()}
                    data-label="Actions"
                  >
                    <select
                      value={app.status}
                      onChange={(e) =>
                        updateApplicationStatus(
                          "hospitality",
                          app._id,
                          e.target.value
                        )
                      }
                      className="status-select"
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                </tr>
              ))}
              {filteredRecentHospitality.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", opacity: 0.6 }}>
                    No matching applications.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderApplicationsTable = (type) => {
    const raw = applications[type] || [];
    const data = applyListFilters(raw);

    const formTitles = {
      hospitality: "Hospitality",
      germany: "Germany",
      civil: "Civil",
      domestic: "Domestic",
      mechanical: "Mechanical Workers",
      pipefitter: "Pipe Fitter",
      tailoriron: "Tailor and Ironer",
      helper: "Helper Jobs in Saudi Arabia",
      italyjob: "Italy Jobs",
    };

    return (
      <div className="applications-section card">
        <div className="section-header">
          <h2>{formTitles[type]} Applications</h2>
          <div className="section-actions">
            <button className="btn" onClick={() => exportExcel(type)}>
              <FaDownload /> Export Excel
            </button>
          </div>
        </div>

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th onClick={() => toggleSort("fullName")} role="button">
                  Name
                </th>
                <th
                  onClick={() => toggleSort("age")}
                  role="button"
                  className="hide-md"
                >
                  Age
                </th>
                <th>Contact</th>
                <th>Position</th>
                <th onClick={() => toggleSort("createdAt")} role="button">
                  Date
                </th>
                <th
                  onClick={() => toggleSort("city")}
                  role="button"
                  className="hide-md"
                >
                  City
                </th>
                <th onClick={() => toggleSort("status")} role="button">
                  Status
                </th>
                <th className="hide-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((app) => (
                <tr
                  key={`${type}-${app._id}`}
                  className="clickable-row"
                  onClick={() => openModal(type, app)}
                >
                  <td data-label="Name">{app.fullName}</td>
                  <td data-label="Age" className="hide-md">
                    {app.age ?? "—"}
                  </td>
                  <td data-label="Contact">{app.contactNumber || "N/A"}</td>
                  <td data-label="Position">
                    {Array.isArray(app.positions)
                      ? app.positions.join(", ")
                      : app.position || "N/A"}
                  </td>
                  <td data-label="Date">
                    {app.createdAt
                      ? new Date(app.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td data-label="City" className="hide-md">
                    {app.city}
                  </td>
                  <td data-label="Status">
                    <StatusPill status={app.status} />
                  </td>
                  <td
                    className="hide-sm"
                    onClick={(e) => e.stopPropagation()}
                    data-label="Actions"
                  >
                    <select
                      value={app.status}
                      onChange={(e) =>
                        updateApplicationStatus(type, app._id, e.target.value)
                      }
                      className="status-select"
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center", opacity: 0.6 }}>
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`admin-dashboard light ${sidebarOpen ? "sidebar-open" : ""}`}
    >
      {/* Sidebar */}
      <aside className="sidebar card">
        <div className="sidebar-header">
          <h2>Admin Portal</h2>
          <div className="user-info">
            <p>{safeUser?.name || "User"}</p>
            <span>
              {safeUser?.role}
              {safeUser?.location !== "all" && ` — ${safeUser?.location}`}
            </span>
          </div>
        </div>

        <nav className="sidebar-menu">
          <div
            className={`menu-item ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("dashboard");
              setSidebarOpen(false);
            }}
          >
            <FaGaugeHigh />
            <span>Dashboard</span>
          </div>

          <div className="menu-section">Application Forms</div>

          <div
            className={`menu-item ${
              activeTab === "hospitality" ? "active" : ""
            }`}
            onClick={() => {
              setActiveTab("hospitality");
              setSidebarOpen(false);
            }}
          >
            <FaBellConcierge />
            <span>Hospitality</span>
          </div>

          <div
            className={`menu-item ${activeTab === "germany" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("germany");
              setSidebarOpen(false);
            }}
          >
            <FaIndustry />
            <span>Germany</span>
          </div>

          <div
            className={`menu-item ${activeTab === "civil" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("civil");
              setSidebarOpen(false);
            }}
          >
            <FaHelmetSafety />
            <span>Civil</span>
          </div>

          <div
            className={`menu-item ${activeTab === "domestic" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("domestic");
              setSidebarOpen(false);
            }}
          >
            <FaHouse />
            <span>Domestic</span>
          </div>

          {/* New job categories */}
          <div
            className={`menu-item ${
              activeTab === "mechanical" ? "active" : ""
            }`}
            onClick={() => {
              setActiveTab("mechanical");
              setSidebarOpen(false);
            }}
          >
            <FaIndustry />
            <span>Mechanical Workers</span>
          </div>

          <div
            className={`menu-item ${
              activeTab === "pipefitter" ? "active" : ""
            }`}
            onClick={() => {
              setActiveTab("pipefitter");
              setSidebarOpen(false);
            }}
          >
            <FaIndustry />
            <span>Pipe Fitter</span>
          </div>

          <div
            className={`menu-item ${
              activeTab === "tailoriron" ? "active" : ""
            }`}
            onClick={() => {
              setActiveTab("tailoriron");
              setSidebarOpen(false);
            }}
          >
            <FaIndustry />
            <span>Tailor and Ironer</span>
          </div>

          <div
            className={`menu-item ${activeTab === "helper" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("helper");
              setSidebarOpen(false);
            }}
          >
            <FaIndustry />
            <span>Helper Jobs in Saudi Arabia</span>
          </div>

          <div
            className={`menu-item ${activeTab === "italyjob" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("italyjob");
              setSidebarOpen(false);
            }}
          >
            <FaIndustry />
            <span>Italy Job</span>
          </div>

          <div className="menu-item logout" onClick={onLogout}>
            <FaRightFromBracket />
            <span>Logout</span>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="topbar card">
          <button
            className="icon-btn only-mobile"
            aria-label="Toggle sidebar"
            onClick={() => setSidebarOpen((v) => !v)}
          >
            {sidebarOpen ? <FaXmark /> : <FaBars />}
          </button>

          <div className="search-bar">
            <FaMagnifyingGlass />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, email, position, city…"
            />
          </div>

          <div className="user-menu">
            <div className="notifications" title="Notifications">
              <FaBell />
              <span className="notification-badge">3</span>
            </div>
            <div className="user-profile">
              <FaCircleUser />
              <span>{safeUser?.name || "User"}</span>
            </div>
          </div>
        </div>

        <div className="content-area">
          {activeTab === "dashboard" && renderDashboard()}
          {activeTab === "hospitality" &&
            renderApplicationsTable("hospitality")}
          {activeTab === "germany" && renderApplicationsTable("germany")}
          {activeTab === "civil" && renderApplicationsTable("civil")}
          {activeTab === "domestic" && renderApplicationsTable("domestic")}
          {/* New job categories */}
          {activeTab === "mechanical" && renderApplicationsTable("mechanical")}
          {activeTab === "pipefitter" && renderApplicationsTable("pipefitter")}
          {activeTab === "tailoriron" && renderApplicationsTable("tailoriron")}
          {activeTab === "helper" && renderApplicationsTable("helper")}
          {activeTab === "italyjob" && renderApplicationsTable("italyjob")}
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && selectedApp && (
        <>
          <div className="modal-backdrop" onClick={closeModal} />
          <div className="modal card" role="dialog" aria-modal="true">
            <div className="modal-header">
              <h3>
                {selectedApp.fullName} —{" "}
                {Array.isArray(selectedApp.positions)
                  ? selectedApp.positions.join(", ")
                  : selectedApp.position || "Application"}
              </h3>
              <button
                className="icon-btn"
                onClick={closeModal}
                aria-label="Close"
              >
                <FaXmark />
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-grid">
                <DetailRow
                  label="Form Type"
                  value={selectedType[0].toUpperCase() + selectedType.slice(1)}
                />
                <DetailRow
                  label="Status"
                  value={<StatusPill status={selectedApp.status} />}
                />
                <DetailRow
                  label="Submission Date"
                  value={
                    selectedApp.createdAt
                      ? new Date(selectedApp.createdAt).toLocaleDateString()
                      : "N/A"
                  }
                />
                <DetailRow label="City" value={selectedApp.preferredCity} />
                <DetailRow label="Email" value={selectedApp.email} />
                <DetailRow label="Contact" value={selectedApp.contactNumber} />
                <DetailRow label="Age" value={selectedApp.age} />
                <DetailRow label="Gender" value={selectedApp.gender} />
                <DetailRow
                  label="Residence"
                  value={selectedApp.currentResidence}
                />
                <DetailRow
                  label="Passport"
                  value={selectedApp.passportNumber}
                />
                {(selectedType || "").toLowerCase() !== "italyjob" && (
                  <DetailRow
                    label="Positions"
                    value={
                      Array.isArray(selectedApp.positions)
                        ? selectedApp.positions.join(", ")
                        : selectedApp.position || "—"
                    }
                  />
                )}
                <DetailRow
                  label="Previous Experience in the Country"
                  value={selectedApp.workedInSaudi}
                />
                <DetailRow
                  label="Willing to Relocate"
                  value={selectedApp.willingToRelocate}
                />
                <DetailRow
                  label="Preferred City"
                  value={selectedApp.preferredCity}
                />
              </div>
            </div>

            <div className="modal-comments">
              <label htmlFor="comment" className="comment-label">
                Add Comment:
                {isSavingComment && (
                  <span className="saving-indicator">Saving...</span>
                )}
              </label>
              <textarea
                id="comment"
                className="comment-box"
                rows="3"
                placeholder="Write your comments here..."
                value={selectedApp.comment || ""}
                onChange={handleCommentChange}
                disabled={isSavingComment}
              />
            </div>
            <div className="modal-footer">
              <div className="inline">
                <label htmlFor="statusSel">Update Status:</label>
                <select
                  id="statusSel"
                  className="status-select"
                  value={selectedApp?.status} // Ensure the selected status is passed here
                  onChange={(e) => {
                    const newStatus = e.target.value;
                    updateApplicationStatus(
                      selectedType,
                      selectedApp._id,
                      newStatus
                    );
                  }}
                >
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="footer-actions">
                <button className="btn ghost" onClick={closeModal}>
                  Close
                </button>

                {selectedApp.status === "accepted" && (
                  <button
                    className="btn primary"
                    onClick={() => {
                      closeModal();
                      startApplicationProcess(selectedType, selectedApp);
                    }}
                  >
                    Start Application Process
                  </button>
                )}

                <button
                  className="btn"
                  onClick={() => {
                    const type = selectedType;
                    const row = selectedApp;
                    const headers = [
                      "Form Type",
                      "Name",
                      "Age",
                      "Contact",
                      "Email",
                      "Position(s)",
                      "Date",
                      "City",
                      "Status",
                      "Comment",
                    ];
                    const one = [
                      {
                        "Form Type": type,
                        Name: row.fullName || "",
                        Age: row.age ?? "",
                        Contact: row.contactNumber || "",
                        Email: row.email || "",
                        "Position(s)": Array.isArray(row.positions)
                          ? row.positions.join(", ")
                          : row.position || "",
                        Date: row.createdAt
                          ? new Date(row.createdAt).toLocaleDateString()
                          : "",
                        City: row.city || "",
                        Status: row.status || "",
                        Comment: row.comment || "",
                      },
                    ];
                    const ws = utils.json_to_sheet(one, { header: headers });
                    ws["!cols"] = headers.map((h) => ({
                      wch: Math.max(12, h.length + 2),
                    }));
                    const wb = utils.book_new();
                    utils.book_append_sheet(wb, ws, "Application");
                    writeFile(
                      wb,
                      `${type}-${row.fullName.replace(/\s+/g, "_")}.xlsx`
                    );
                  }}
                >
                  <FaDownload /> Export This
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
