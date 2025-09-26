import React, { useState } from "react";
import "./MechanicalForm.css";
import saudiHeroImage from "../../../assets/react.svg";

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    jobtitle: "mechanical",
    fullName: "",
    age: "",
    gender: "",
    currentResidence: "",
    contactNumber: "",
    email: "",
    passportNumber: "",
    positions: [],
    otherPosition: "",
    willingToRelocate: "",
    otherRelocate: "",
    preferredCity: "",
    otherCity: "",
    workedInSaudi: "",
    whyWorkInSaudi: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const positionOptions = ["Multi Weilders", "Fabricators", "Fitters", "Other"];

  const showToast = (title, description, type = "success") => {
    setToast({ title, description, type });
    setTimeout(() => setToast(null), 5000);
  };

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handlePositionChange = (position, checked) => {
    const updatedPositions = checked
      ? [...formData.positions, position]
      : formData.positions.filter((p) => p !== position);

    setFormData({
      ...formData,
      positions: updatedPositions,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.age || Number(formData.age) < 18 || Number(formData.age) > 40)
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
    if (formData.positions.length === 0)
      newErrors.positions = "At least one position is required";
    if (formData.positions.includes("Other") && !formData.otherPosition.trim())
      newErrors.otherPosition = "Please specify position";
    if (!formData.willingToRelocate)
      newErrors.willingToRelocate = "This field is required";
    if (
      formData.willingToRelocate === "Other" &&
      !formData.otherRelocate.trim()
    )
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
    if (validateForm()) {
      setLoading(true);
      try {
        const response = await fetch(
          "https://hungry-hopper.210-56-25-68.plesk.page/api/applications",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          setSubmitted(true);
          showToast(
            "Application Submitted",
            "Your job application has been successfully submitted."
          );
        } else {
          const data = await response.json();
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
          src={saudiHeroImage}
          alt="Professional opportunity in Saudi Arabia"
          className="hero-image"
        />
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">
              Saudi Arabia Job Application For Mechanical
            </h1>
            <p
              style={{
                color: "white",
              }}
              className="hero-subtitle"
            >
              Mechanical Job Opportunities 2025-26
            </p>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="form-wrapper">
        <div className="form-card slide-up">
          <div className="form-header">
            <h1 className="form-title">Application Form</h1>
            <p className="form-description">
              Complete all sections to submit your application
            </p>
          </div>

          <div className="form-content">
            <form onSubmit={handleSubmit}>
              {/* Personal Information Section */}
              <div className="form-section">
                <div className="section-header">
                  <div className="section-number">1</div>
                  <svg
                    className="section-icon"
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
                  <h2 className="section-title">Personal Information</h2>
                </div>

                <div className="form-grid">
                  <input type="hidden" name="jobtitle" value="mechanical" />

                  <div className="form-group">
                    <label className="form-label" htmlFor="fullName">
                      Full Name (as per passport/CNIC){" "}
                      <span className="required-asterisk">*</span>
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
                      max="40"
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
                    <label className="form-label">
                      Gender <span className="required-asterisk">*</span>
                    </label>
                    <div className="radio-group">
                      <label className="radio-option">
                        <input
                          type="radio"
                          className="radio-input"
                          name="gender"
                          value="Female"
                          checked={formData.gender === "Female"}
                          onChange={(e) =>
                            handleChange("gender", e.target.value)
                          }
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
                          onChange={(e) =>
                            handleChange("gender", e.target.value)
                          }
                        />
                        Male
                      </label>
                      <label className="radio-option">
                        <input
                          type="radio"
                          className="radio-input"
                          name="gender"
                          value="Other"
                          checked={formData.gender === "Other"}
                          onChange={(e) =>
                            handleChange("gender", e.target.value)
                          }
                        />
                        Other
                      </label>
                    </div>
                    {errors.gender && (
                      <div className="error-message">{errors.gender}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="currentResidence">
                      Current Residence (City){" "}
                      <span className="required-asterisk">*</span>
                    </label>
                    <input
                      type="text"
                      id="currentResidence"
                      className={`form-input ${
                        errors.currentResidence ? "error" : ""
                      }`}
                      value={formData.currentResidence}
                      onChange={(e) =>
                        handleChange("currentResidence", e.target.value)
                      }
                      placeholder="Your current city"
                    />
                    {errors.currentResidence && (
                      <div className="error-message">
                        {errors.currentResidence}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contactNumber">
                      Contact Number (with country code){" "}
                      <span className="required-asterisk">*</span>
                    </label>
                    <input
                      type="number"
                      id="contactNumber"
                      className={`form-input ${
                        errors.contactNumber ? "error" : ""
                      }`}
                      value={formData.contactNumber}
                      onChange={(e) =>
                        handleChange("contactNumber", e.target.value)
                      }
                      placeholder="03XXXXXXXXX"
                    />
                    {errors.contactNumber && (
                      <div className="error-message">
                        {errors.contactNumber}
                      </div>
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
                      Passport Number/CNIC{" "}
                      <span className="required-asterisk">*</span>
                    </label>
                    <input
                      type="text"
                      id="passportNumber"
                      className={`form-input ${
                        errors.passportNumber ? "error" : ""
                      }`}
                      value={formData.passportNumber}
                      onChange={(e) =>
                        handleChange("passportNumber", e.target.value)
                      }
                      placeholder="Your passport number"
                    />
                    {errors.passportNumber && (
                      <div className="error-message">
                        {errors.passportNumber}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Job Preferences Section */}
              <div className="form-section">
                <div className="section-header">
                  <div className="section-number">2</div>
                  <svg
                    className="section-icon"
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
                  <h2 className="section-title">Job Preferences</h2>
                </div>

                <div className="form-group full-width">
                  <label className="form-label">
                    Position Applying For (Multiple choice){" "}
                    <span className="required-asterisk">*</span>
                  </label>
                  <div className="checkbox-grid">
                    {positionOptions.map((position) => (
                      <label key={position} className="checkbox-option">
                        <input
                          type="checkbox"
                          className="checkbox-input"
                          checked={formData.positions.includes(position)}
                          onChange={(e) =>
                            handlePositionChange(position, e.target.checked)
                          }
                        />
                        {position}
                      </label>
                    ))}
                  </div>
                  {errors.positions && (
                    <div className="error-message">{errors.positions}</div>
                  )}

                  {formData.positions.includes("Other") && (
                    <div className="other-input">
                      <label className="form-label" htmlFor="otherPosition">
                        Please specify position
                      </label>
                      <input
                        type="text"
                        id="otherPosition"
                        className={`form-input ${
                          errors.otherPosition ? "error" : ""
                        }`}
                        value={formData.otherPosition}
                        onChange={(e) =>
                          handleChange("otherPosition", e.target.value)
                        }
                        placeholder="Specify other position"
                      />
                      {errors.otherPosition && (
                        <div className="error-message">
                          {errors.otherPosition}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="form-group full-width">
                  <label className="form-label">
                    Are you willing to relocate and process necessary documents?{" "}
                    <span className="required-asterisk">*</span>
                  </label>
                  <div className="radio-group">
                    <label className="radio-option">
                      <input
                        type="radio"
                        className="radio-input"
                        name="willingToRelocate"
                        value="Yes"
                        checked={formData.willingToRelocate === "Yes"}
                        onChange={(e) =>
                          handleChange("willingToRelocate", e.target.value)
                        }
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
                        onChange={(e) =>
                          handleChange("willingToRelocate", e.target.value)
                        }
                      />
                      No
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        className="radio-input"
                        name="willingToRelocate"
                        value="Other"
                        checked={formData.willingToRelocate === "Other"}
                        onChange={(e) =>
                          handleChange("willingToRelocate", e.target.value)
                        }
                      />
                      Other
                    </label>
                  </div>
                  {errors.willingToRelocate && (
                    <div className="error-message">
                      {errors.willingToRelocate}
                    </div>
                  )}

                  {formData.willingToRelocate === "Other" && (
                    <div className="other-input">
                      <label className="form-label" htmlFor="otherRelocate">
                        Please specify
                      </label>
                      <input
                        type="text"
                        id="otherRelocate"
                        className={`form-input ${
                          errors.otherRelocate ? "error" : ""
                        }`}
                        value={formData.otherRelocate}
                        onChange={(e) =>
                          handleChange("otherRelocate", e.target.value)
                        }
                        placeholder="Specify your situation"
                      />
                      {errors.otherRelocate && (
                        <div className="error-message">
                          {errors.otherRelocate}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="form-group full-width">
                  <label className="form-label">
                    <svg
                      className="section-icon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Preferred city for training{" "}
                    <span className="required-asterisk">*</span>
                  </label>
                  <div className="radio-group">
                    <label className="radio-option">
                      <input
                        type="radio"
                        className="radio-input"
                        name="preferredCity"
                        value="Islamabad"
                        checked={formData.preferredCity === "Islamabad"}
                        onChange={(e) =>
                          handleChange("preferredCity", e.target.value)
                        }
                      />
                      Islamabad
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        className="radio-input"
                        name="preferredCity"
                        value="Lahore"
                        checked={formData.preferredCity === "Lahore"}
                        onChange={(e) =>
                          handleChange("preferredCity", e.target.value)
                        }
                      />
                      Lahore
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        className="radio-input"
                        name="preferredCity"
                        value="Other"
                        checked={formData.preferredCity === "Other"}
                        onChange={(e) =>
                          handleChange("preferredCity", e.target.value)
                        }
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
                        className={`form-input ${
                          errors.otherCity ? "error" : ""
                        }`}
                        value={formData.otherCity}
                        onChange={(e) =>
                          handleChange("otherCity", e.target.value)
                        }
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
                    Have you ever worked in Saudi Arabia before?{" "}
                    <span className="required-asterisk">*</span>
                  </label>
                  <div className="radio-group">
                    <label className="radio-option">
                      <input
                        type="radio"
                        className="radio-input"
                        name="workedInSaudi"
                        value="Yes"
                        checked={formData.workedInSaudi === "Yes"}
                        onChange={(e) =>
                          handleChange("workedInSaudi", e.target.value)
                        }
                      />
                      Yes
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        className="radio-input"
                        name="workedInSaudi"
                        value="No"
                        checked={formData.workedInSaudi === "No"}
                        onChange={(e) =>
                          handleChange("workedInSaudi", e.target.value)
                        }
                      />
                      No
                    </label>
                  </div>
                  {errors.workedInSaudi && (
                    <div className="error-message">{errors.workedInSaudi}</div>
                  )}
                </div>

                <div className="form-group full-width">
                  <label className="form-label" htmlFor="whyWorkInSaudi">
                    Why do you want to work in Saudi Arabia?{" "}
                    <span className="required-asterisk">*</span>
                  </label>
                  <textarea
                    id="whyWorkInSaudi"
                    className={`form-textarea ${
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
                    <div className="error-message">{errors.whyWorkInSaudi}</div>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="heardAboutUs">
                    Where did you hear about us? (Optional)
                  </label>
                  <select
                    id="heardAboutUs"
                    className="form-input"
                    value={formData.heardAboutUs || ""}
                    onChange={(e) =>
                      handleChange("heardAboutUs", e.target.value)
                    }
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