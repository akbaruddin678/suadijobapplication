// StatusBadge.jsx
import React from "react";

const StatusBadge = ({ status }) => {
  const getStatusDetails = (status) => {
    switch (status) {
      case "pending":
        return { text: "Pending", color: "#f59e0b", icon: "⏳" };
      case "accepted":
        return { text: "Accepted", color: "#10b981", icon: "✅" };
      case "rejected":
        return { text: "Rejected", color: "#ef4444", icon: "❌" };
      case "reviewed":
        return { text: "Reviewed", color: "#3b82f6", icon: "👁️" };
      default:
        return { text: "Unknown", color: "#6b7280", icon: "❓" };
    }
  };

  const statusInfo = getStatusDetails(status);

  return (
    <span 
      className="status-badge" 
      style={{ backgroundColor: statusInfo.color }}
    >
      {statusInfo.icon} {statusInfo.text}
    </span>
  );
};

export default StatusBadge;