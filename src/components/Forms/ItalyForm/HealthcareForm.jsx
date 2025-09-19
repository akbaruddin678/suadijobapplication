import React, { useState } from "react";
import "./HealthcareForm.css";
import healthImg from "./health.webp";

const HealthcareForm = () => {
  const [formData, setFormData] = useState({
    jobtitle: "healthcare",
    fullName: "",
    age: "",
    gender: "",
    currentResidence: "",
    contactNumber: "",
    email: "",
    passportNumber: "",
    program: "",
    otherProgram: "",
    experience: "",
    willingToRelocate: "",
    preferredCity: "",
    otherCity: "",
    workedInItaly: "",
    whyWorkInItaly: "",
    reference: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const healthcarePrograms = [
    "O.S.S. - Healthcare Assistant",
    "O.S.S.+S. – Specialized Healthcare Assistant", 
    "O.S.A. - Certified Social Care Operator",
    "Other"
  ];

  const showToast = (title, description, type = "success") => {
    setToast({ title, description, type });
    setTimeout(() => setToast(null), 5000);
  };

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.age || Number(formData.age) < 18 || Number(formData.age) > 65)
      newErrors.age = "Age must be between 18 and 65";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.currentResidence.trim())
      newErrors.currentResidence = "Current residence is required";
    if (!formData.contactNumber.trim())
      newErrors.contactNumber = "Contact number is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required";
    if (!formData.passportNumber.trim())
      newErrors.passportNumber = "Passport number is required";
    if (!formData.program)
      newErrors.program = "Please select a healthcare program";
    if (formData.program === "Other" && !formData.otherProgram.trim())
      newErrors.otherProgram = "Please specify program";
    if (!formData.willingToRelocate)
      newErrors.willingToRelocate = "This field is required";
    if (!formData.preferredCity)
      newErrors.preferredCity = "Preferred city is required";
    if (formData.preferredCity === "Other" && !formData.otherCity.trim())
      newErrors.otherCity = "Please specify city";
    if (!formData.workedInItaly)
      newErrors.workedInItaly = "This field is required";
    if (!formData.whyWorkInItaly.trim())
      newErrors.whyWorkInItaly = "Please explain why you want to work in Italy";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const response = await fetch("/api/applications", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setSubmitted(true);
          showToast(
            "Application Submitted",
            "Your healthcare program application has been successfully submitted."
          );
        } else {
          const data = await response.json();
          showToast(
            "Submission Failed",
            data.message || "Error submitting application",
            "error"
          );
        }
      } catch {
        showToast(
          "Network Error",
          "Please check your connection and try again",
          "error"
        );
      } finally {
        setLoading(false);
      }
    }
  };

  if (submitted) {
    return (
      <div className="success-container">
        <div className="success-card slide-up">
          <div className="success-content">
            <div className="success-icon">🏥</div>
            <h2 className="success-title">
              Healthcare Application Submitted Successfully!
            </h2>
            <p className="success-description">
              Thank you for your application. We will review it and get back to
              you soon with details about your healthcare training program.
            </p>
            <div className="success-badge">
              Reference ID: #
              {Math.random().toString(36).substr(2, 9).toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="application-container">
      {/* Toast Notification */}
      {toast && (
        <div className={`toast ${toast.type} fade-in`}>
          <div className="toast-title">{toast.title}</div>
          <div className="toast-description">{toast.description}</div>
        </div>
      )}

      {/* Hero Section */}
      <div className="hero-section">
        <img
          src={healthImg}
          alt="Healthcare opportunities in Italy"
          className="hero-image"
        />
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">
              Healthcare Training Programs in Italy
            </h1>
            <p className="hero-subtitle">
              EU-Recognized Healthcare Certifications & Career Opportunities
            </p>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="form-wrapper">
        <div className="form-card slide-up">
          <div className="form-header">
            <h1 className="form-title">Healthcare Program Application</h1>
            <p className="form-description">
              Apply for EU-recognized healthcare training programs in Italy
            </p>
          </div>

          <div className="form-content">
            <form onSubmit={handleSubmit}>
              {/* Personal Information Section */}
              <div className="form-section">
                <div className="section-header">
                  <div className="section-number">1</div>
                  <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <h2 className="section-title">Personal Information</h2>
                </div>

                <div className="form-grid">
                  <input type="hidden" name="jobtitle" value="healthcare" />

                  <div className="form-group">
                    <label className="form-label" htmlFor="fullName">
                      Full Name (as per passport/CNIC) <span className="required-asterisk">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      className={`form-input ${errors.fullName ? "error" : ""}`}
                      value={formData.fullName}
                      onChange={(e) => handleChange("fullName", e.target.value)}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                      <div className="error-message">{errors.fullName}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="age">
                      Age <span className="required-asterisk">*</span>
                    </label>
                    <input
                      type="number"
                      id="age"
                      min="18"
                      max="65"
                      className={`form-input ${errors.age ? "error" : ""}`}
                      value={formData.age}
                      onChange={(e) => handleChange("age", e.target.value)}
                      placeholder="Your age"
                    />
                    {errors.age && (
                      <div className="error-message">{errors.age}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Gender <span className="required-asterisk">*</span></label>
                    <div className="radio-group">
                      <label className="radio-option">
                        <input
                          type="radio"
                          className="radio-input"
                          name="gender"
                          value="Female"
                          checked={formData.gender === "Female"}
                          onChange={(e) => handleChange("gender", e.target.value)}
                        />
                        Female
                      </label>
                      <label className="radio-option">
                        <input
                          type="radio"
                          className="radio-input"
                          name="gender"
                          value="Male"
                          checked={formData.gender === "Male"}
                          onChange={(e) => handleChange("gender", e.target.value)}
                        />
                        Male
                      </label>
                    </div>
                    {errors.gender && (
                      <div className="error-message">{errors.gender}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="currentResidence">
                      Current Residence (City) <span className="required-asterisk">*</span>
                    </label>
                    <input
                      type="text"
                      id="currentResidence"
                      className={`form-input ${errors.currentResidence ? "error" : ""}`}
                      value={formData.currentResidence}
                      onChange={(e) => handleChange("currentResidence", e.target.value)}
                      placeholder="Your current city"
                    />
                    {errors.currentResidence && (
                      <div className="error-message">{errors.currentResidence}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contactNumber">
                      Contact Number (with country code) <span className="required-asterisk">*</span>
                    </label>
                    <input
                      type="number"
                      id="contactNumber"
                      className={`form-input ${errors.contactNumber ? "error" : ""}`}
                      value={formData.contactNumber}
                      onChange={(e) => handleChange("contactNumber", e.target.value)}
                      placeholder="03XXXXXXXXX"
                    />
                    {errors.contactNumber && (
                      <div className="error-message">{errors.contactNumber}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="email">
                      Email Address <span className="required-asterisk">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      className={`form-input ${errors.email ? "error" : ""}`}
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <div className="error-message">{errors.email}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="passportNumber">
                      Passport Number/CNIC <span className="required-asterisk">*</span>
                    </label>
                    <input
                      type="text"
                      id="passportNumber"
                      className={`form-input ${errors.passportNumber ? "error" : ""}`}
                      value={formData.passportNumber}
                      onChange={(e) => handleChange("passportNumber", e.target.value)}
                      placeholder="Your passport number"
                    />
                    {errors.passportNumber && (
                      <div className="error-message">{errors.passportNumber}</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Program Selection Section */}
              {/* <div className="form-section">
                <div className="section-header">
                  <div className="section-number">2</div>
                  <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  <h2 className="section-title">Program Selection</h2>
                </div>

                <div className="form-group full-width">
                  <label className="form-label">
                    Select Healthcare Program <span className="required-asterisk">*</span>
                  </label>
                  <div className="radio-group">
                    {healthcarePrograms.map((program) => (
                      <label key={program} className="radio-option">
                        <input
                          type="radio"
                          className="radio-input"
                          name="program"
                          value={program}
                          checked={formData.program === program}
                          onChange={(e) => handleChange("program", e.target.value)}
                        />
                        {program}
                      </label>
                    ))}
                  </div>
                  {errors.program && (
                    <div className="error-message">{errors.program}</div>
                  )}

                  {formData.program === "Other" && (
                    <div className="other-input">
                      <label className="form-label" htmlFor="otherProgram">
                        Please specify program
                      </label>
                      <input
                        type="text"
                        id="otherProgram"
                        className={`form-input ${errors.otherProgram ? "error" : ""}`}
                        value={formData.otherProgram}
                        onChange={(e) => handleChange("otherProgram", e.target.value)}
                        placeholder="Specify other program"
                      />
                      {errors.otherProgram && (
                        <div className="error-message">{errors.otherProgram}</div>
                      )}
                    </div>
                  )}
                </div>

                <div className="form-group full-width">
                  <label className="form-label" htmlFor="experience">
                    Healthcare Experience (if any)
                  </label>
                  <textarea
                    id="experience"
                    className="form-textarea"
                    value={formData.experience}
                    onChange={(e) => handleChange("experience", e.target.value)}
                    rows={3}
                    placeholder="Describe any healthcare experience you have..."
                  />
                </div>
              </div> */}

              {/* Preferences Section */}
              <div className="form-section">
                <div className="section-header">
                  <div className="section-number">2</div>
                  <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <h2 className="section-title">Preferences & Motivation</h2>
                </div>

                <div className="form-group full-width">
                  <label className="form-label">
                    Are you willing to relocate to Italy? <span className="required-asterisk">*</span>
                  </label>
                  <div className="radio-group">
                    <label className="radio-option">
                      <input
                        type="radio"
                        className="radio-input"
                        name="willingToRelocate"
                        value="Yes"
                        checked={formData.willingToRelocate === "Yes"}
                        onChange={(e) => handleChange("willingToRelocate", e.target.value)}
                      />
                      Yes
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        className="radio-input"
                        name="willingToRelocate"
                        value="No"
                        checked={formData.willingToRelocate === "No"}
                        onChange={(e) => handleChange("willingToRelocate", e.target.value)}
                      />
                      No
                    </label>
                  </div>
                  {errors.willingToRelocate && (
                    <div className="error-message">{errors.willingToRelocate}</div>
                  )}
                </div>

                <div className="form-group full-width">
                  <label className="form-label">
                    Preferred city for training <span className="required-asterisk">*</span>
                  </label>
                  <div className="radio-group">
                    <label className="radio-option">
                      <input
                        type="radio"
                        className="radio-input"
                        name="preferredCity"
                        value="Rome"
                        checked={formData.preferredCity === "Rome"}
                        onChange={(e) => handleChange("preferredCity", e.target.value)}
                      />
                      Rome
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        className="radio-input"
                        name="preferredCity"
                        value="Milan"
                        checked={formData.preferredCity === "Milan"}
                        onChange={(e) => handleChange("preferredCity", e.target.value)}
                      />
                      Milan
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        className="radio-input"
                        name="preferredCity"
                        value="Other"
                        checked={formData.preferredCity === "Other"}
                        onChange={(e) => handleChange("preferredCity", e.target.value)}
                      />
                      Other
                    </label>
                  </div>
                  {errors.preferredCity && (
                    <div className="error-message">{errors.preferredCity}</div>
                  )}

                  {formData.preferredCity === "Other" && (
                    <div className="other-input">
                      <label className="form-label" htmlFor="otherCity">
                        Please specify city
                      </label>
                      <input
                        type="text"
                        id="otherCity"
                        className={`form-input ${errors.otherCity ? "error" : ""}`}
                        value={formData.otherCity}
                        onChange={(e) => handleChange("otherCity", e.target.value)}
                        placeholder="Specify other city"
                      />
                      {errors.otherCity && (
                        <div className="error-message">{errors.otherCity}</div>
                      )}
                    </div>
                  )}
                </div>

                <div className="form-group full-width">
                  <label className="form-label">
                    Have you ever worked in Italy before? <span className="required-asterisk">*</span>
                  </label>
                  <div className="radio-group">
                    <label className="radio-option">
                      <input
                        type="radio"
                        className="radio-input"
                        name="workedInItaly"
                        value="Yes"
                        checked={formData.workedInItaly === "Yes"}
                        onChange={(e) => handleChange("workedInItaly", e.target.value)}
                      />
                      Yes
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        className="radio-input"
                        name="workedInItaly"
                        value="No"
                        checked={formData.workedInItaly === "No"}
                        onChange={(e) => handleChange("workedInItaly", e.target.value)}
                      />
                      No
                    </label>
                  </div>
                  {errors.workedInItaly && (
                    <div className="error-message">{errors.workedInItaly}</div>
                  )}
                </div>

                <div className="form-group full-width">
                  <label className="form-label" htmlFor="whyWorkInItaly">
                    Why do you want to work in Italy's healthcare sector? <span className="required-asterisk">*</span>
                  </label>
                  <textarea
                    id="whyWorkInItaly"
                    className={`form-textarea ${errors.whyWorkInItaly ? "error" : ""}`}
                    value={formData.whyWorkInItaly}
                    onChange={(e) => handleChange("whyWorkInItaly", e.target.value)}
                    rows={4}
                    placeholder="Please explain your reasons for wanting to work in Italy's healthcare sector..."
                  />
                  {errors.whyWorkInItaly && (
                    <div className="error-message">{errors.whyWorkInItaly}</div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="submit-section">
                <button
                  type="submit"
                  className="submit-button"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="spinner"></div>
                      Submitting Application...
                    </>
                  ) : (
                    "Submit Healthcare Application"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthcareForm;
