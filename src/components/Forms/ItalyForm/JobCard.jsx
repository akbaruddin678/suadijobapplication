import React from "react";

const JobCard = ({ job, isActive, onClick }) => {
  return (
    <button
      type="button"
      className={`job-card glass ${isActive ? "active" : ""}`}
      onClick={onClick}
      aria-pressed={isActive}
    >
      <div className="job-icon" aria-hidden="true">{job.icon}</div>
      <h3 className="job-title">{job.title}</h3>
      <p className="job-blurb">{job.blurb}</p>
      <ul className="job-perks">
        {job.perks.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      <span className="select-chip">{isActive ? "Selected" : "Select"}</span>
    </button>
  );
};

export default JobCard;
