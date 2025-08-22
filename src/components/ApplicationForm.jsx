// client/src/components/ApplicationForm.jsx
import React, { useState } from "react";
import "./ApplicationForm.css";

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    currentResidence: "",
    contactNumber: "",
    email: "",
    passportNumber: "",
    positions: [], // Changed to array for multiple selection
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

  const positionOptions = [
    "Domestic Worker",
    "Household Help",
    "Nanny / Babysitter",
    "Private Driver",
    "Cook / Chef",
    "Caregiver (Elderly / Special Needs)",
    "Cleaner (Hourly)",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePositionChange = (position) => {
    const updatedPositions = formData.positions.includes(position)
      ? formData.positions.filter((p) => p !== position)
      : [...formData.positions, position];

    setFormData({
      ...formData,
      positions: updatedPositions,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.age || formData.age < 18 || formData.age > 65)
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
          "http://cisdjob-env.eba-kipwaer2.ap-south-1.elasticbeanstalk.com/api/applications",
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
        } else {
          const data = await response.json();
          alert(data.message || "Error submitting application");
        }
      } catch (error) {
        alert("Error submitting application");
      } finally {
        setLoading(false);
      }
    }
  };

  if (submitted) {
    return (
      <div className="form-container">
        <div className="success-message">
          <div className="success-icon">✓</div>
          <h2>Application Submitted Successfully!</h2>
          <p>
            Thank you for your application. We will review it and get back to
            you soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <div className="form-card">
        <div className="form-header">
          <h1>Domestic Worker Job Application 2025-26 (Saudi Arabia)</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <div className="section-header">
              <div className="section-number">1</div>
              <h2>Personal Information</h2>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="fullName">
                  Full Name (as per passport/CNIC) *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={errors.fullName ? "error" : ""}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <span className="error-text">{errors.fullName}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="age">Age (Number) *</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="18"
                  max="65"
                  className={errors.age ? "error" : ""}
                  placeholder="Your age"
                />
                {errors.age && <span className="error-text">{errors.age}</span>}
              </div>

              <div className="form-group">
                <label>Gender *</label>
                <div className="radio-group">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={formData.gender === "Female"}
                      onChange={handleChange}
                    />
                    <span className="radio-custom"></span>
                    Female
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={formData.gender === "Male"}
                      onChange={handleChange}
                    />
                    <span className="radio-custom"></span>
                    Male
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="gender"
                      value="Other"
                      checked={formData.gender === "Other"}
                      onChange={handleChange}
                    />
                    <span className="radio-custom"></span>
                    Other
                  </label>
                </div>
                {errors.gender && (
                  <span className="error-text">{errors.gender}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="currentResidence">
                  Current Residence (City) *
                </label>
                <input
                  type="text"
                  id="currentResidence"
                  name="currentResidence"
                  value={formData.currentResidence}
                  onChange={handleChange}
                  className={errors.currentResidence ? "error" : ""}
                  placeholder="Your current city"
                />
                {errors.currentResidence && (
                  <span className="error-text">{errors.currentResidence}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="contactNumber">
                  Contact Number (with country code) *
                </label>
                <input
                  type="text"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="+92XXXXXXXXXX"
                  className={errors.contactNumber ? "error" : ""}
                />
                {errors.contactNumber && (
                  <span className="error-text">{errors.contactNumber}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "error" : ""}
                  placeholder="akbaruddin@gmail.com"
                />
                {errors.email && (
                  <span className="error-text">{errors.email}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="passportNumber">Passport Number </label>
                <input
                  type="text"
                  id="passportNumber"
                  name="passportNumber"
                  value={formData.passportNumber}
                  onChange={handleChange}
                  className={errors.passportNumber ? "error" : ""}
                  placeholder="Your passport number"
                />
                {errors.passportNumber && (
                  <span className="error-text">{errors.passportNumber}</span>
                )}
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="section-header">
              <div className="section-number">2</div>
              <h2>Job Preferences</h2>
            </div>

            <div className="form-group">
              <label>Position Applying For (Multiple choice) *</label>
              <div className="checkbox-grid">
                {positionOptions.map((position) => (
                  <label key={position} className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={formData.positions.includes(position)}
                      onChange={() => handlePositionChange(position)}
                    />
                    <span className="checkbox-custom"></span>
                    {position}
                  </label>
                ))}
              </div>
              {errors.positions && (
                <span className="error-text">{errors.positions}</span>
              )}

              {formData.positions.includes("Other") && (
                <div className="form-group other-input">
                  <label htmlFor="otherPosition">Please specify position</label>
                  <input
                    type="text"
                    id="otherPosition"
                    name="otherPosition"
                    value={formData.otherPosition}
                    onChange={handleChange}
                    className={errors.otherPosition ? "error" : ""}
                    placeholder="Specify other position"
                  />
                  {errors.otherPosition && (
                    <span className="error-text">{errors.otherPosition}</span>
                  )}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>
                Are you willing to relocate and process necessary documents? *
              </label>
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="willingToRelocate"
                    value="Yes"
                    checked={formData.willingToRelocate === "Yes"}
                    onChange={handleChange}
                  />
                  <span className="radio-custom"></span>
                  Yes
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="willingToRelocate"
                    value="No"
                    checked={formData.willingToRelocate === "No"}
                    onChange={handleChange}
                  />
                  <span className="radio-custom"></span>
                  No
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="willingToRelocate"
                    value="Other"
                    checked={formData.willingToRelocate === "Other"}
                    onChange={handleChange}
                  />
                  <span className="radio-custom"></span>
                  Other
                </label>
              </div>
              {errors.willingToRelocate && (
                <span className="error-text">{errors.willingToRelocate}</span>
              )}

              {formData.willingToRelocate === "Other" && (
                <div className="form-group other-input">
                  <label htmlFor="otherRelocate">Please specify</label>
                  <input
                    type="text"
                    id="otherRelocate"
                    name="otherRelocate"
                    value={formData.otherRelocate}
                    onChange={handleChange}
                    className={errors.otherRelocate ? "error" : ""}
                    placeholder="Specify your situation"
                  />
                  {errors.otherRelocate && (
                    <span className="error-text">{errors.otherRelocate}</span>
                  )}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Preferred city for training *</label>
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="preferredCity"
                    value="Islamabad"
                    checked={formData.preferredCity === "Islamabad"}
                    onChange={handleChange}
                  />
                  <span className="radio-custom"></span>
                  Islamabad
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="preferredCity"
                    value="Lahore"
                    checked={formData.preferredCity === "Lahore"}
                    onChange={handleChange}
                  />
                  <span className="radio-custom"></span>
                  Lahore
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="preferredCity"
                    value="Other"
                    checked={formData.preferredCity === "Other"}
                    onChange={handleChange}
                  />
                  <span className="radio-custom"></span>
                  Other
                </label>
              </div>
              {errors.preferredCity && (
                <span className="error-text">{errors.preferredCity}</span>
              )}

              {formData.preferredCity === "Other" && (
                <div className="form-group other-input">
                  <label htmlFor="otherCity">Please specify city</label>
                  <input
                    type="text"
                    id="otherCity"
                    name="otherCity"
                    value={formData.otherCity}
                    onChange={handleChange}
                    className={errors.otherCity ? "error" : ""}
                    placeholder="Specify other city"
                  />
                  {errors.otherCity && (
                    <span className="error-text">{errors.otherCity}</span>
                  )}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Have you ever worked in Saudi Arabia before? *</label>
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="workedInSaudi"
                    value="Yes"
                    checked={formData.workedInSaudi === "Yes"}
                    onChange={handleChange}
                  />
                  <span className="radio-custom"></span>
                  Yes
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="workedInSaudi"
                    value="No"
                    checked={formData.workedInSaudi === "No"}
                    onChange={handleChange}
                  />
                  <span className="radio-custom"></span>
                  No
                </label>
              </div>
              {errors.workedInSaudi && (
                <span className="error-text">{errors.workedInSaudi}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="whyWorkInSaudi">
                Why do you want to work in Saudi Arabia? *
              </label>
              <textarea
                id="whyWorkInSaudi"
                name="whyWorkInSaudi"
                value={formData.whyWorkInSaudi}
                onChange={handleChange}
                rows="4"
                className={errors.whyWorkInSaudi ? "error" : ""}
                placeholder="Please explain your reasons for wanting to work in Saudi Arabia..."
              ></textarea>
              {errors.whyWorkInSaudi && (
                <span className="error-text">{errors.whyWorkInSaudi}</span>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
