// ApplicationProcess.jsx
import React, { useState } from 'react';
import './ApplicationProcess.css';
import PaymentTracker from './PaymentTracker';

const ApplicationProcess = ({ application, onBack }) => {
  const [currentStep, setCurrentStep] = useState(4); // Start at step 4 for demo
  const [stepsData, setStepsData] = useState({
    demandLetter: { completed: true, notes: "", documents: [] },
    oepPermission: { completed: true, notes: "", documents: [] },
    candidateRegistration: { completed: true, notes: "", documents: [] },
    medicalTest: { completed: true, notes: "", documents: [] },
    training: { completed: false, notes: "Candidate has completed basic orientation. Scheduled for job-specific training next week.", documents: [
      { name: "Orientation_Certificate.pdf", type: "pdf", size: 256000, uploadDate: new Date('2023-11-12') },
      { name: "Training_Schedule.docx", type: "docx", size: 128000, uploadDate: new Date('2023-11-10') }
    ] },
    visaProcessing: { completed: false, notes: "", documents: [] },
    finalClearance: { completed: false, notes: "", documents: [] },
    travelArrangements: { completed: false, notes: "", documents: [] }
  });

  const processSteps = [
    {
      key: "demandLetter",
      title: "Demand Letter & Power of Attorney",
      description: "The Saudi employer sends you a Demand Letter and Power of Attorney (duly attested by the Saudi Chamber of Commerce & MOFA). These documents must be attested by the Pakistan Embassy in KSA.",
      resources: [
        { name: "Sample Demand Letter", url: "#" },
        { name: "Power of Attorney Template", url: "#" }
      ]
    },
    {
      key: "oepPermission",
      title: "Permission from OEP",
      description: "Submit the Demand Letter & Power of Attorney to the Protector of Emigrants Office. Apply for Permission Number (prior approval) before advertising or processing candidates.",
      resources: [
        { name: "OEP Portal", url: "https://beoe.gov.pk/" },
        { name: "Application Form", url: "#" }
      ]
    },
    {
      key: "candidateRegistration",
      title: "Candidate Registration & Document Collection",
      description: "Collect required documents from the candidate: CNIC, Passport, Photographs, Educational/Experience Certificates, and Offer letter.",
      resources: [
        { name: "Document Checklist", url: "#" },
        { name: "Application Form", url: "#" }
      ]
    },
    {
      key: "medicalTest",
      title: "Medical Test Process",
      description: "Candidates undergo GAMCA/GCC-approved medical tests at designated medical centers. Medical clearance is mandatory for visa endorsement.",
      resources: [
        { name: "GCC Medical Portal", url: "https://v2.gcchmc.org/" },
        { name: "Approved Medical Centers", url: "#" }
      ]
    },
    {
      key: "training",
      title: "Training/NAVTTC & Skill Verification",
      description: "For some categories, skill test and training may be required. NAVTTC centers issue skill verification certificates.",
      resources: [
        { name: "NAVTTC Portal", url: "https://navttc.gov.pk/" },
        { name: "Skill Test Centers", url: "#" }
      ]
    },
    {
      key: "visaProcessing",
      title: "Visa Processing & Fingerprint",
      description: "Employer sends visa block/visa number. Apply for E-Number via Enjaz/Etimad system. Candidate goes to Gerrys/Etimad Visa Center for biometrics.",
      resources: [
        { name: "Enjaz System", url: "https://enjazit.com.sa/" },
        { name: "MOFA Services", url: "https://www.eservices.mofa.gov.sa/" },
        { name: "VFS Global", url: "https://visa.vfsglobal.com/pak/en/sau/" }
      ]
    },
    {
      key: "finalClearance",
      title: "Protector of Emigrants (Final Clearance)",
      description: "After visa stamping, candidate must get Emigration Protector clearance with required documents. Protector issues Protector Sticker.",
      resources: [
        { name: "Protectorate Portal", url: "https://beoe.gov.pk/protectorate-of-emigrants" },
        { name: "Required Documents", url: "#" }
      ]
    },
    {
      key: "travelArrangements",
      title: "Travel Arrangements",
      description: "Book air ticket (by employer or candidate). Candidate departs for KSA with original passport, CNIC copy, and contract.",
      resources: [
        { name: "Flight Booking", url: "#" },
        { name: "Pre-Departure Checklist", url: "#" }
      ]
    }
  ];

  const completedSteps = Object.values(stepsData).filter(step => step.completed).length;
  const progressPercentage = (completedSteps / processSteps.length) * 100;

  const toggleStepCompletion = (stepKey) => {
    setStepsData(prev => ({
      ...prev,
      [stepKey]: {
        ...prev[stepKey],
        completed: !prev[stepKey].completed
      }
    }));
  };

  const updateStepNotes = (stepKey, notes) => {
    setStepsData(prev => ({
      ...prev,
      [stepKey]: {
        ...prev[stepKey],
        notes
      }
    }));
  };

  const handleBreadcrumbClick = (stepIndex) => {
    setCurrentStep(stepIndex + 1);
  };

  const getFileIcon = (type) => {
    if (type.includes('pdf')) return 'fa-file-pdf';
    if (type.includes('word') || type.includes('doc')) return 'fa-file-word';
    if (type.includes('sheet') || type.includes('xls')) return 'fa-file-excel';
    return 'fa-file-alt';
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className="application-process">
          <PaymentTracker applicationId={application._id} />

      <div className="process-header">
        <button className="back-button" onClick={onBack}>
          <i className="fas fa-arrow-left"></i> Back to Dashboard
        </button>
        <h2>KSA Overseas Employment Processing</h2>
        <div className="candidate-info">
          <h3>{application.fullName}</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Position:</span>
              <span className="info-value">{application.position}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Passport:</span>
              <span className="info-value">{application.passportNumber}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Application Date:</span>
              <span className="info-value">{application.applicationDate}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Status:</span>
              <span className="info-value status-in-progress">In Progress</span>
            </div>
          </div>
        </div>
      </div>

      <div className="progress-container">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="progress-text">
          <span>Application Progress</span>
          <span>{Math.round(progressPercentage)}% Complete</span>
        </div>
      </div>

      <div className="step-breadcrumb">
        {processSteps.map((step, index) => {
          const stepData = stepsData[step.key];
          const isCompleted = stepData.completed;
          const isCurrent = currentStep === index + 1;
          
          return (
            <React.Fragment key={step.key}>
              <div 
                className={`breadcrumb-step ${isCompleted ? "completed" : ""} ${isCurrent ? "current" : ""}`}
                onClick={() => handleBreadcrumbClick(index)}
              >
                <span className="breadcrumb-number">{index + 1}</span>
                <span className="breadcrumb-title">{step.title}</span>
                {isCompleted && <i className="fas fa-check"></i>}
              </div>
              {index < processSteps.length - 1 && (
                <div className="breadcrumb-connector"></div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="process-steps">
        {processSteps.map((step, index) => {
          const stepData = stepsData[step.key];
          const isCompleted = stepData.completed;
          const isCurrent = currentStep === index + 1;
          
          if (!isCurrent) return null;
          
          return (
            <div 
              key={step.key} 
              className={`process-step ${isCompleted ? "completed" : ""} ${isCurrent ? "current" : ""}`}
            >
              <div className="step-header">
                <div className="step-number">
                  {isCompleted ? <i className="fas fa-check-circle"></i> : <i className="fas fa-circle"></i>}
                </div>
                <div className="step-title">
                  <h3>Step {index + 1}: {step.title}</h3>
                  <p>{step.description}</p>
                </div>
                <div className="step-actions">
                  <button 
                    className={`status-toggle ${isCompleted ? "completed" : ""}`}
                    onClick={() => toggleStepCompletion(step.key)}
                  >
                    {isCompleted ? "Mark Incomplete" : "Mark Complete"}
                  </button>
                </div>
              </div>

              <div className="step-content">
                <div className="step-notes">
                  <label>Notes:</label>
                  <textarea
                    value={stepData.notes}
                    onChange={(e) => updateStepNotes(step.key, e.target.value)}
                    placeholder="Add notes about this step..."
                  />
                </div>

                <div className="step-documents">
                  <h4>Documents</h4>
                  <div className="document-list">
                    {stepData.documents.map((doc, docIndex) => (
                      <div key={docIndex} className="document-item">
                        <i className={`fas ${getFileIcon(doc.type)}`}></i>
                        <span className="doc-name">{doc.name}</span>
                        <span className="doc-size">({formatFileSize(doc.size)})</span>
                        <span className="doc-date">{doc.uploadDate.toLocaleDateString()}</span>
                        <button className="doc-remove">
                          Remove
                        </button>
                      </div>
                    ))}
                    
                    <button className="add-document">
                      <i className="fas fa-plus"></i> Add Document
                    </button>
                  </div>
                </div>

                <div className="step-resources">
                  <h4>Resources</h4>
                  <div className="resource-links">
                    {step.resources.map((resource, resIndex) => (
                      <a 
                        key={resIndex} 
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="resource-link"
                      >
                        <i className="fas fa-external-link-alt"></i> {resource.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="process-actions">
        <button 
          className="btn secondary"
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
        >
          <i className="fas fa-arrow-left"></i> Previous Step
        </button>
        
        <div className="step-indicator">
          Step {currentStep} of {processSteps.length}
        </div>
        
        {currentStep < processSteps.length ? (
          <button 
            className="btn primary"
            onClick={() => setCurrentStep(currentStep + 1)}
          >
            Next Step <i className="fas fa-arrow-right"></i>
          </button>
        ) : (
          <button className="btn success">
            Complete Process
          </button>
        )}
      </div>
    </div>
  );
};

export default ApplicationProcess;