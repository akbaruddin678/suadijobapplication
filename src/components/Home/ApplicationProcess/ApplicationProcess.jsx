// ApplicationProcess.jsx
import React, { useState } from "react";
import {
  FaCircleCheck,
  FaFileInvoice,
  FaFileMedical,
  FaGraduationCap,
  FaPassport,
  FaCreditCard,
  FaArrowLeft,
  FaArrowRight,
  FaPrint
} from "react-icons/fa6";
import "./ApplicationProcess.css";

const ApplicationProcess = ({ application, onBack, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  const steps = [
    {
      id: "demand",
      title: "Demand Letter Verification",
      icon: <FaFileInvoice />,
      description: "Verify the demand letter from employer"
    },
    {
      id: "documents",
      title: "Document Verification",
      icon: <FaFileMedical />,
      description: "Verify all required documents"
    },
    {
      id: "medical",
      title: "Medical GAMCA",
      icon: <FaFileMedical />,
      description: "Complete medical examination"
    },
    {
      id: "training",
      title: "Training (If needed)",
      icon: <FaGraduationCap />,
      description: "Complete required training programs"
    },
    {
      id: "visa",
      title: "Visa Process",
      icon: <FaPassport />,
      description: "Process visa application"
    },
    {
      id: "payment",
      title: "Fee Payment",
      icon: <FaCreditCard />,
      description: "Pay required fees online"
    }
  ];

  const markStepComplete = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const goToStep = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const StepIndicator = () => (
    <div className="process-steps">
      {steps.map((step, index) => (
        <div 
          key={step.id} 
          className={`step-indicator ${index === currentStep ? "active" : ""} ${completedSteps.includes(index) ? "completed" : ""}`}
          onClick={() => goToStep(index)}
        >
          <div className="step-icon">
            {completedSteps.includes(index) ? <FaCircleCheck /> : step.icon}
          </div>
          <div className="step-info">
            <span className="step-title">{step.title}</span>
            <span className="step-description">{step.description}</span>
          </div>
          <div className="step-connector"></div>
        </div>
      ))}
    </div>
  );

  const StepContent = () => {
    const step = steps[currentStep];
    
    return (
      <div className="step-content">
        <div className="step-header">
          <h2>{step.title}</h2>
          <p>{step.description}</p>
        </div>
        
        <div className="step-details">
          {step.id === "demand" && (
            <div className="demand-verification">
              <h3>Demand Letter Details</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <label>Employer Name</label>
                  <span>Al-Nakheel Saudi Company</span>
                </div>
                <div className="detail-item">
                  <label>Position</label>
                  <span>{application.positions?.join(", ") || application.position}</span>
                </div>
                <div className="detail-item">
                  <label>Salary</label>
                  <span>SAR 2,500</span>
                </div>
                <div className="detail-item">
                  <label>Contract Duration</label>
                  <span>2 Years</span>
                </div>
              </div>
              
              <div className="verification-actions">
                <div className="upload-section">
                  <h4>Upload Verified Demand Letter</h4>
                  <input type="file" accept=".pdf,.jpg,.png" />
                </div>
                
                <div className="verification-options">
                  <button className="btn secondary">Request Changes</button>
                  <button className="btn" onClick={markStepComplete}>Verify & Continue</button>
                </div>
              </div>
            </div>
          )}
          
          {step.id === "documents" && (
            <div className="document-verification">
              <h3>Required Documents</h3>
              <div className="documents-list">
                <div className="document-item verified">
                  <span>Passport Copy</span>
                  <span className="status">Verified</span>
                </div>
                <div className="document-item pending">
                  <span>Educational Certificates</span>
                  <span className="status">Pending</span>
                </div>
                <div className="document-item missing">
                  <span>Experience Letters</span>
                  <span className="status">Missing</span>
                </div>
                <div className="document-item">
                  <span>Photographs (4)</span>
                  <span className="status">Not Uploaded</span>
                </div>
              </div>
              
              <div className="document-actions">
                <button className="btn secondary">
                  <FaPrint /> Print Document Checklist
                </button>
                <button className="btn" onClick={markStepComplete}>
                  Mark as Verified
                </button>
              </div>
            </div>
          )}
          
          {step.id === "medical" && (
            <div className="medical-process">
              <h3>GAMCA Medical Appointment</h3>
              <div className="appointment-details">
                <div className="detail-item">
                  <label>Appointment Date</label>
                  <span>15 Nov 2023</span>
                </div>
                <div className="detail-item">
                  <label>Time</label>
                  <span>10:30 AM</span>
                </div>
                <div className="detail-item">
                  <label>Center</label>
                  <span>GAMCA Medical Center, Lahore</span>
                </div>
                <div className="detail-item">
                  <label>Reference Number</label>
                  <span>GAMCA-2023-876543</span>
                </div>
              </div>
              
              <div className="medical-instructions">
                <h4>Instructions:</h4>
                <ul>
                  <li>Fasting required for 8 hours before appointment</li>
                  <li>Bring original passport</li>
                  <li>Bring 2 passport-size photographs</li>
                  <li>Arrive 30 minutes before appointment time</li>
                </ul>
              </div>
              
              <div className="medical-actions">
                <button className="btn secondary">Reschedule Appointment</button>
                <button className="btn" onClick={markStepComplete}>
                  Confirm Medical Completed
                </button>
              </div>
            </div>
          )}
          
          {step.id === "training" && (
            <div className="training-process">
              <h3>Training Requirements</h3>
              <div className="training-options">
                <div className="training-card">
                  <h4>Basic Orientation</h4>
                  <p>Mandatory for all overseas workers</p>
                  <span className="duration">3 Days</span>
                  <button className="btn">Schedule</button>
                </div>
                
                <div className="training-card">
                  <h4>Job-Specific Training</h4>
                  <p>Required for selected positions</p>
                  <span className="duration">5-10 Days</span>
                  <button className="btn">Schedule</button>
                </div>
                
                <div className="training-card">
                  <h4>Language Course</h4>
                  <p>Basic Arabic communication</p>
                  <span className="duration">2 Weeks</span>
                  <button className="btn">Schedule</button>
                </div>
              </div>
              
              <div className="training-actions">
                <label className="checkbox">
                  <input type="checkbox" />
                  <span>No training required for this applicant</span>
                </label>
                
                <button className="btn" onClick={markStepComplete}>
                  Continue
                </button>
              </div>
            </div>
          )}
          
          {step.id === "visa" && (
            <div className="visa-process">
              <h3>Visa Application Process</h3>
              
              <div className="visa-timeline">
                <div className="timeline-item completed">
                  <span className="timeline-marker"></span>
                  <div className="timeline-content">
                    <h4>Application Submitted</h4>
                    <p>Visa application submitted to embassy</p>
                    <span className="timeline-date">12 Nov 2023</span>
                  </div>
                </div>
                
                <div className="timeline-item current">
                  <span className="timeline-marker"></span>
                  <div className="timeline-content">
                    <h4>Under Processing</h4>
                    <p>Application is being reviewed</p>
                    <span className="timeline-date">Expected: 18 Nov 2023</span>
                  </div>
                </div>
                
                <div className="timeline-item">
                  <span className="timeline-marker"></span>
                  <div className="timeline-content">
                    <h4>Approval</h4>
                    <p>Visa approval notification</p>
                  </div>
                </div>
                
                <div className="timeline-item">
                  <span className="timeline-marker"></span>
                  <div className="timeline-content">
                    <h4>Visa Stamping</h4>
                    <p>Passport with visa stamp</p>
                  </div>
                </div>
              </div>
              
              <div className="visa-actions">
                <button className="btn secondary">Download Application</button>
                <button className="btn" onClick={markStepComplete}>
                  Mark as Completed
                </button>
              </div>
            </div>
          )}
          
          {step.id === "payment" && (
            <div className="payment-process">
              <h3>Fee Payment</h3>
              
              <div className="payment-summary">
                <div className="fee-breakdown">
                  <h4>Fee Breakdown</h4>
                  
                  <div className="fee-item">
                    <span>Processing Fee</span>
                    <span>PKR 5,000</span>
                  </div>
                  
                  <div className="fee-item">
                    <span>Visa Fee</span>
                    <span>PKR 25,000</span>
                  </div>
                  
                  <div className="fee-item">
                    <span>Medical Fee</span>
                    <span>PKR 8,000</span>
                  </div>
                  
                  <div className="fee-item">
                    <span>Training Fee (if applicable)</span>
                    <span>PKR 10,000</span>
                  </div>
                  
                  <div className="fee-total">
                    <span>Total Amount</span>
                    <span>PKR 48,000</span>
                  </div>
                </div>
                
                <div className="payment-methods">
                  <h4>Payment Methods</h4>
                  
                  <div className="payment-option selected">
                    <label>
                      <input type="radio" name="payment" defaultChecked />
                      <span>Credit/Debit Card</span>
                    </label>
                  </div>
                  
                  <div className="payment-option">
                    <label>
                      <input type="radio" name="payment" />
                      <span>Bank Transfer</span>
                    </label>
                  </div>
                  
                  <div className="payment-option">
                    <label>
                      <input type="radio" name="payment" />
                      <span>JazzCash</span>
                    </label>
                  </div>
                  
                  <div className="payment-option">
                    <label>
                      <input type="radio" name="payment" />
                      <span>EasyPaisa</span>
                    </label>
                  </div>
                  
                  <div className="card-details">
                    <div className="form-row">
                      <input type="text" placeholder="Card Number" />
                    </div>
                    
                    <div className="form-row">
                      <input type="text" placeholder="MM/YY" />
                      <input type="text" placeholder="CVV" />
                    </div>
                    
                    <div className="form-row">
                      <input type="text" placeholder="Cardholder Name" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="payment-actions">
                <button className="btn secondary">Download Invoice</button>
                <button className="btn" onClick={markStepComplete}>
                  Pay Now
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="step-navigation">
          {currentStep > 0 && (
            <button 
              className="btn secondary" 
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              <FaArrowLeft /> Previous
            </button>
          )}
          
          <button className="btn primary" onClick={markStepComplete}>
            {currentStep === steps.length - 1 ? 'Complete Process' : 'Next'} <FaArrowRight />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="application-process">
      <div className="process-header">
        <button className="back-button" onClick={onBack}>
          <FaArrowLeft /> Back to Applications
        </button>
        <h1>Application Process</h1>
        <div className="applicant-info">
          <h2>{application.fullName}</h2>
          <p>{application.positions?.join(", ") || application.position}</p>
        </div>
      </div>
      
      <div className="process-container">
        <StepIndicator />
        <StepContent />
      </div>
    </div>
  );
};

export default ApplicationProcess;