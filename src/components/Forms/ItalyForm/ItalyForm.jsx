import React, { useState } from "react";
import "../Form.css";
import saudiHeroImage from "../../../assets/react.svg";

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    jobtitle: "italy-jobs",
    fullName: "",
    age: "",
    gender: "",
    currentResidence: "",
    contactNumber: "",
    email: "",
    passportNumber: "",
    position: "",
    otherPosition: "",
    willingToRelocate: "",
    otherRelocate: "",
    preferredCity: "",
    otherCity: "",
    workedInSaudi: "",
    whyWorkInSaudi: "",
    reference: "",
    heardAboutUs: "", // added so the select is controlled
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const positionOptions = [
    "O.S.S.+S.-Specialized Healthcare Assistant",
    "Socail Care Operator",
    "O.S.S.-Healthcare Assistant",
    "Food & Beverage Manager",
    "Kitchen Operator - Cook",
    "Bar Services Operator - Bartender",
    "Dining Room Service Operator",
    "Meat Processing Worker - Butcher",
    "Dining Room Technician - Maitre",
    "Artisanal Bakery Products Operato (Baker)",
    "Pastry Chef",
    "Architectural Restoration Site Management Technician",
    "Excavation, Earthmoving & Demoliyion Machinery Operator",
    "Construction Carpentry Operator",
    "Mechanical Operator",
    "Plasterer, Decorative Painter & Glider (Historical Buildings)",
    "CNC Machine Operator",
    "Building Finishes Operator - Flooring & Tiling",
    "Jewelry Designer",
    "Topographic Surveying Technician",
    "Crane & Lifting Equipment Operator",
    "Electical Systems Installation & Maintenance Operator",
    "Industrial Resin Applicator",
    "Garment Assembly Operator",
    "Other",
  ];

  const showToast = (title, description, type = "success") => {
    setToast({ title, description, type });
    setTimeout(() => setToast(null), 5000);
  };

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
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

    if (!formData.position) newErrors.position = "Please select a position";
    if (formData.position === "Other" && !formData.otherPosition.trim())
      newErrors.otherPosition = "Please specify position";

    if (!formData.willingToRelocate)
      newErrors.willingToRelocate = "This field is required";
    if (formData.willingToRelocate === "Other" && !formData.otherRelocate.trim())
      newErrors.otherRelocate = "Please specify";

    if (!formData.preferredCity)
      newErrors.preferredCity = "Preferred city is required";
    if (formData.preferredCity === "Other" && !formData.otherCity.trim())
      newErrors.otherCity = "Please specify city";

    if (!formData.workedInSaudi)
      newErrors.workedInSaudi = "This field is required";
    if (!formData.whyWorkInSaudi.trim())
      newErrors.whyWorkInSaudi =
        "Please explain why you want to work in Saudi Arabia";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        showToast(
          "Application Submitted",
          "Your job application has been successfully submitted."
        );
      } else {
        const data = await response.json().catch(() => ({}));
        showToast(
          "Submission Failed",
          data.message || "Error submitting application",
          "error"
        );
      }
    } catch (error) {
      showToast(
        "Network Error",
        "Please check your connection and try again",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="success-container">
        <div className="success-card slide-up">
          <div className="success-content">
            <div className="success-icon">✓</div>
            <h2 className="success-title">
              Application Submitted Successfully!
            </h2>
            <p className="success-description">
              Thank you for your application. We will review it and get back to
              you soon.
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
    <div className="enhanced-application-container">
      {/* Toast Notification */}
      {toast && (
        <div className={`toast ${toast.type} fade-in`}>
          <div className="toast-title">{toast.title}</div>
          <div className="toast-description">{toast.description}</div>
        </div>
      )}

      {/* Hero Section */}
      <div className="enhanced-hero-section">
        <img
          src={saudiHeroImage}
          alt="Professional opportunity in Italy"
          className="enhanced-hero-image"
        />
        <div className="enhanced-hero-overlay">
          <div className="enhanced-hero-content">
            <h1 className="enhanced-hero-title">
              Italy Job Application For Skilled Trades
            </h1>
            <p className="enhanced-hero-subtitle">
              Construction & Technical Opportunities 2025-26
            </p>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="enhanced-form-wrapper">
        <div className="enhanced-form-card slide-up">
          <div className="enhanced-form-header">
            <h1 className="enhanced-form-title">Skilled Trades Application</h1>
            <p className="enhanced-form-description">
              Complete all sections to submit your application
            </p>
          </div>

          <div className="enhanced-form-content">
            <form onSubmit={handleSubmit}>
              {/* Personal Information Section */}
              <div className="enhanced-form-section">
                <div className="enhanced-section-header">
                  <div className="enhanced-section-number">1</div>
                  <svg
                    className="enhanced-section-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <h2 className="enhanced-section-title">Personal Information</h2>
                </div>

                <div className="enhanced-form-grid">
                  <input type="hidden" name="jobtitle" value="italy-jobs" />

                  <div className="enhanced-form-group">
                    <label className="enhanced-form-label" htmlFor="fullName">
                      Full Name (as per passport/CNIC)
                      <span className="required-asterisk">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      className={`enhanced-form-input ${
                        errors.fullName ? "error" : ""
                      }`}
                      value={formData.fullName}
                      onChange={(e) => handleChange("fullName", e.target.value)}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                      <div className="enhanced-error-message">
                        {errors.fullName}
                      </div>
                    )}
                  </div>

                  <div className="enhanced-form-group">
                    <label className="enhanced-form-label" htmlFor="age">
                      Age <span className="required-asterisk">*</span>
                    </label>
                    <input
                      type="number"
                      id="age"
                      min="18"
                      max="65"
                      className={`enhanced-form-input ${
                        errors.age ? "error" : ""
                      }`}
                      value={formData.age}
                      onChange={(e) => handleChange("age", e.target.value)}
                      placeholder="Your age"
                    />
                    {errors.age && (
                      <div className="enhanced-error-message">{errors.age}</div>
                    )}
                  </div>

                  <div className="enhanced-form-group">
                    <label className="enhanced-form-label">
                      Gender <span className="required-asterisk">*</span>
                    </label>
                    <div className="enhanced-radio-group">
                      {["Female", "Male", "Other"].map((g) => (
                        <label key={g} className="enhanced-radio-option">
                          <input
                            type="radio"
                            className="enhanced-radio-input"
                            name="gender"
                            value={g}
                            checked={formData.gender === g}
                            onChange={(e) =>
                              handleChange("gender", e.target.value)
                            }
                          />
                          <span className="radio-custom" />
                          {g}
                        </label>
                      ))}
                    </div>
                    {errors.gender && (
                      <div className="enhanced-error-message">
                        {errors.gender}
                      </div>
                    )}
                  </div>

                  <div className="enhanced-form-group">
                    <label
                      className="enhanced-form-label"
                      htmlFor="currentResidence"
                    >
                      Current Residence (City)
                      <span className="required-asterisk">*</span>
                    </label>
                    <input
                      type="text"
                      id="currentResidence"
                      className={`enhanced-form-input ${
                        errors.currentResidence ? "error" : ""
                      }`}
                      value={formData.currentResidence}
                      onChange={(e) =>
                        handleChange("currentResidence", e.target.value)
                      }
                      placeholder="Your current city"
                    />
                    {errors.currentResidence && (
                      <div className="enhanced-error-message">
                        {errors.currentResidence}
                      </div>
                    )}
                  </div>

                  <div className="enhanced-form-group">
                    <label
                      className="enhanced-form-label"
                      htmlFor="contactNumber"
                    >
                      Contact Number (with country code)
                      <span className="required-asterisk">*</span>
                    </label>
                    <input
                      type="tel"
                      id="contactNumber"
                      className={`enhanced-form-input ${
                        errors.contactNumber ? "error" : ""
                      }`}
                      value={formData.contactNumber}
                      onChange={(e) =>
                        handleChange("contactNumber", e.target.value)
                      }
                      placeholder="+92 3XX XXXXXXX"
                    />
                    {errors.contactNumber && (
                      <div className="enhanced-error-message">
                        {errors.contactNumber}
                      </div>
                    )}
                  </div>

                  <div className="enhanced-form-group">
                    <label className="enhanced-form-label" htmlFor="email">
                      Email Address <span className="required-asterisk">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      className={`enhanced-form-input ${
                        errors.email ? "error" : ""
                      }`}
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <div className="enhanced-error-message">{errors.email}</div>
                    )}
                  </div>

                  <div className="enhanced-form-group">
                    <label
                      className="enhanced-form-label"
                      htmlFor="passportNumber"
                    >
                      Passport Number/CNIC
                      <span className="required-asterisk">*</span>
                    </label>
                    <input
                      type="text"
                      id="passportNumber"
                      className={`enhanced-form-input ${
                        errors.passportNumber ? "error" : ""
                      }`}
                      value={formData.passportNumber}
                      onChange={(e) =>
                        handleChange("passportNumber", e.target.value)
                      }
                      placeholder="Your passport number"
                    />
                    {errors.passportNumber && (
                      <div className="enhanced-error-message">
                        {errors.passportNumber}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Job Preferences Section */}
              <div className="enhanced-form-section">
                <div className="enhanced-section-header">
                  <div className="enhanced-section-number">2</div>
                  <svg
                    className="enhanced-section-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 002 2h2a2 2 0 002-2V6zM2 17h20v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                  <h2 className="enhanced-section-title">Job Preferences</h2>
                </div>

                <div className="enhanced-form-group full-width">
                  <label className="enhanced-form-label">
                    Position Applying For (Select one)
                    <span className="required-asterisk">*</span>
                  </label>
                  <div className="enhanced-radio-group">
                    {positionOptions.map((position) => (
                      <label key={position} className="enhanced-radio-option">
                        <input
                          type="radio"
                          className="enhanced-radio-input"
                          name="position"
                          value={position}
                          checked={formData.position === position}
                          onChange={(e) =>
                            handleChange("position", e.target.value)
                          }
                        />
                        <span className="radio-custom" />
                        {position}
                      </label>
                    ))}
                  </div>
                  {errors.position && (
                    <div className="enhanced-error-message">{errors.position}</div>
                  )}

                  {formData.position === "Other" && (
                    <div className="enhanced-other-input">
                      <label className="enhanced-form-label" htmlFor="otherPosition">
                        Please specify position
                      </label>
                      <input
                        type="text"
                        id="otherPosition"
                        className={`enhanced-form-input ${
                          errors.otherPosition ? "error" : ""
                        }`}
                        value={formData.otherPosition}
                        onChange={(e) =>
                          handleChange("otherPosition", e.target.value)
                        }
                        placeholder="Specify other position"
                      />
                      {errors.otherPosition && (
                        <div className="enhanced-error-message">
                          {errors.otherPosition}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="enhanced-form-group full-width">
                  <label className="enhanced-form-label">
                    Are you willing to relocate and process necessary documents?
                    <span className="required-asterisk">*</span>
                  </label>
                  <div className="enhanced-radio-group">
                    {["Yes", "No", "Other"].map((opt) => (
                      <label key={opt} className="enhanced-radio-option">
                        <input
                          type="radio"
                          className="enhanced-radio-input"
                          name="willingToRelocate"
                          value={opt}
                          checked={formData.willingToRelocate === opt}
                          onChange={(e) =>
                            handleChange("willingToRelocate", e.target.value)
                          }
                        />
                        <span className="radio-custom" />
                        {opt}
                      </label>
                    ))}
                  </div>
                  {errors.willingToRelocate && (
                    <div className="enhanced-error-message">
                      {errors.willingToRelocate}
                    </div>
                  )}

                  {formData.willingToRelocate === "Other" && (
                    <div className="enhanced-other-input">
                      <label className="enhanced-form-label" htmlFor="otherRelocate">
                        Please specify
                      </label>
                      <input
                        type="text"
                        id="otherRelocate"
                        className={`enhanced-form-input ${
                          errors.otherRelocate ? "error" : ""
                        }`}
                        value={formData.otherRelocate}
                        onChange={(e) =>
                          handleChange("otherRelocate", e.target.value)
                        }
                        placeholder="Specify your situation"
                      />
                      {errors.otherRelocate && (
                        <div className="enhanced-error-message">
                          {errors.otherRelocate}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="enhanced-form-group full-width">
                  <label className="enhanced-form-label">
                    Preferred city for training
                    <span className="required-asterisk">*</span>
                  </label>
                  <div className="enhanced-radio-group">
                    {["Islamabad", "Lahore", "Other"].map((city) => (
                      <label key={city} className="enhanced-radio-option">
                        <input
                          type="radio"
                          className="enhanced-radio-input"
                          name="preferredCity"
                          value={city}
                          checked={formData.preferredCity === city}
                          onChange={(e) =>
                            handleChange("preferredCity", e.target.value)
                          }
                        />
                        <span className="radio-custom" />
                        {city}
                      </label>
                    ))}
                  </div>
                  {errors.preferredCity && (
                    <div className="enhanced-error-message">
                      {errors.preferredCity}
                    </div>
                  )}

                  {formData.preferredCity === "Other" && (
                    <div className="enhanced-other-input">
                      <label className="enhanced-form-label" htmlFor="otherCity">
                        Please specify city
                      </label>
                      <input
                        type="text"
                        id="otherCity"
                        className={`enhanced-form-input ${
                          errors.otherCity ? "error" : ""
                        }`}
                        value={formData.otherCity}
                        onChange={(e) => handleChange("otherCity", e.target.value)}
                        placeholder="Specify other city"
                      />
                      {errors.otherCity && (
                        <div className="enhanced-error-message">
                          {errors.otherCity}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="enhanced-form-group full-width">
                  <label className="enhanced-form-label">
                    Have you ever worked in Saudi Arabia before?
                    <span className="required-asterisk">*</span>
                  </label>
                  <div className="enhanced-radio-group">
                    {["Yes", "No"].map((ans) => (
                      <label key={ans} className="enhanced-radio-option">
                        <input
                          type="radio"
                          className="enhanced-radio-input"
                          name="workedInSaudi"
                          value={ans}
                          checked={formData.workedInSaudi === ans}
                          onChange={(e) =>
                            handleChange("workedInSaudi", e.target.value)
                          }
                        />
                        <span className="radio-custom" />
                        {ans}
                      </label>
                    ))}
                  </div>
                  {errors.workedInSaudi && (
                    <div className="enhanced-error-message">
                      {errors.workedInSaudi}
                    </div>
                  )}
                </div>

                <div className="enhanced-form-group full-width">
                  <label className="enhanced-form-label" htmlFor="whyWorkInSaudi">
                    Why do you want to work in Saudi Arabia?
                    <span className="required-asterisk">*</span>
                  </label>
                  <textarea
                    id="whyWorkInSaudi"
                    className={`enhanced-form-textarea ${
                      errors.whyWorkInSaudi ? "error" : ""
                    }`}
                    value={formData.whyWorkInSaudi}
                    onChange={(e) =>
                      handleChange("whyWorkInSaudi", e.target.value)
                    }
                    rows={4}
                    placeholder="Please explain your reasons for wanting to work in Saudi Arabia..."
                  />
                  {errors.whyWorkInSaudi && (
                    <div className="enhanced-error-message">
                      {errors.whyWorkInSaudi}
                    </div>
                  )}
                </div>

                <div className="enhanced-form-group">
                  <label className="enhanced-form-label" htmlFor="heardAboutUs">
                    Where did you hear about us? (Optional)
                  </label>
                  <select
                    id="heardAboutUs"
                    className="enhanced-form-select"
                    value={formData.heardAboutUs || ""}
                    onChange={(e) => handleChange("heardAboutUs", e.target.value)}
                  >
                    <option value="">Select an option</option>
                    <option value="friend">Friend</option>
                    <option value="socialMedia">Social Media</option>
                    <option value="website">Website</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="form-navigation">
                <div />
                <button
                  type="submit"
                  className="enhanced-submit-button"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="spinner"></div>
                      Submitting Application...
                    </>
                  ) : (
                    "Submit Application"
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

export default ApplicationForm;
