// LandingItaly.jsx
import React, { useState, useEffect } from "react";
import "./home.css";
import posterImg from "./italy.webp";
import healthImg from "./health.webp";
import hospImg from "./hosp.webp";
import logo from "./logo.jpeg";
import { Link } from "react-router-dom";

// Import React Icons - Fixed with correct names
import { 
  FaHospital, FaStethoscope, FaUsers, FaUtensils, 
  FaConciergeBell, FaUserTie, FaWineGlassAlt, FaCookie, 
  FaBreadSlice, FaDrumstickBite, FaTractor, FaMonument, 
  FaCog, FaHammer, FaRobot, FaBolt, FaGem, 
  FaCheck, FaGraduationCap, FaBriefcase, FaPhone, 
  FaGlobe, FaMapMarkerAlt, FaEnvelope, FaCertificate,
  FaClock, FaUserGraduate, FaAward, FaRoad, FaLaptop,
  FaQuestionCircle, FaClipboardList
} from "react-icons/fa";

import { 
  GiChefToque, GiMeatCleaver, GiJewelCrown, GiCrane
} from "react-icons/gi";

import { 
  IoIosClose, IoIosArrowBack, IoIosArrowForward 
} from "react-icons/io";

// Import all ad images
import ad1 from "./assets/ads (1).jpeg";
import ad2 from "./assets/ads (2).jpeg";
import ad3 from "./assets/ads (3).jpeg";
import ad4 from "./assets/ads (4).jpeg";
import ad5 from "./assets/ads (5).jpeg";
import ad6 from "./assets/ads (6).jpeg";
import ad7 from "./assets/ads (7).jpeg";
import ad8 from "./assets/ads (8).jpeg";
import ad9 from "./assets/ads (9).jpeg";
import ad10 from "./assets/ads (10).jpeg";
import ad11 from "./assets/ads (11).jpeg";
import ad12 from "./assets/ads (12).jpeg";
import ad13 from "./assets/ads (13).jpeg";
import ad14 from "./assets/ads (14).jpeg";
import ad15 from "./assets/ads (15).jpeg";
import ad16 from "./assets/ads (16).jpeg";
import ad17 from "./assets/ads (17).jpeg";
import ad18 from "./assets/ads (18).jpeg";
import ad19 from "./assets/ads (19).jpeg";
import ad20 from "./assets/ads (20).jpeg";
import ad21 from "./assets/ads (21).jpeg";
import ad22 from "./assets/ads (22).jpeg";
import ad23 from "./assets/ads (23).jpeg";
import ad24 from "./assets/ads (24).jpeg";

export default function LandingItaly() {
  const [activeTab, setActiveTab] = useState("healthcare");
  const [isVisible, setIsVisible] = useState(false);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [showAds, setShowAds] = useState(true);

  // Array of all ad images
  const ads = [ad1, ad2, ad3, ad4, ad5, ad6, ad7, ad8, ad9, ad10, ad11, ad12, ad13, ad14, ad15, ad16, ad17, ad18, ad19, ad20, ad21, ad22, ad23, ad24];

  // Single destination for all Apply buttons
  const APPLY_PATH = "/jobselection/application-italy-form";

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Auto-rotate ads every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [ads.length]);

  // Healthcare programs data
  const healthcarePrograms = [
    {
      title: "O.S.S. - Healthcare Assistant",
      duration: "1000 hrs (250 DAD, 250 classroom, 200 labs, 300 internship)",
      requirements: "Compulsory education, A2 Italian, 18+",
      certification:
        "National healthcare qualification, valid across Italy & EU",
      career: "Hospitals, care homes, hospices, home care, cooperatives",
      icon: <FaHospital className="program-icon healthcare-icon" />,
      featured: true,
    },
    {
      title: "O.S.S.+S. – Specialized Healthcare Assistant",
      duration: "400 hrs (80 DAD, 120 classroom, 80 labs, 120 internship)",
      requirements: "Must hold O.S.S. qualification",
      certification:
        "Specialized healthcare certificate (palliative, ICU, oncology)",
      career:
        "Intensive care, emergency, oncology, geriatrics, diagnostics support",
      icon: <FaStethoscope className="program-icon healthcare-icon" />,
      featured: false,
    },
    {
      title: "O.S.A. - Certified Social Care Operator",
      duration: "600 hrs (120 DAD, 180 classroom, 150 labs, 150 internship)",
      requirements: "Compulsory education, 18+",
      certification: "EU-recognized socio-assistance qualification",
      career:
        "Home care, minors communities, assisted residences, disability centers",
      icon: <FaUsers className="program-icon healthcare-icon" />,
      featured: true,
    },
  ];

  // Hospitality programs data
  const hospitalityPrograms = [
    {
      title: "Kitchen Operator - Cook",
      duration:
        "480 hrs (90 online, 140 class, 130 lab, 100 internship, 20 exam)",
      requirements: "None specified",
      certification: "EU-Recognized Certificate",
      career: "Restaurants, hotels, catering, institutional kitchens",
      icon: <GiChefToque className="program-icon hospitality-icon" />,
      featured: true,
    },
    {
      title: "Dining Room Service Operator - Waiter",
      duration: "600 hrs (180 online, 270 class, 150 labs)",
      requirements: "None specified",
      certification: "EU-Recognized Certificate",
      career: "Waiter in hotels, restaurants, catering",
      icon: <FaConciergeBell className="program-icon hospitality-icon" />,
      featured: true,
    },
    {
      title: "Dining Room Technician - Maître",
      duration: "~3 months (mixed mode)",
      requirements: "Diploma or EQF level 3 + B1 Italian",
      certification: "EU-Recognized Certificate",
      career: "Supervisory roles in fine dining & hospitality",
      icon: <FaUserTie className="program-icon hospitality-icon" />,
      featured: false,
    },
    {
      title: "Food & Beverage Manager",
      duration: "300 hrs (80 online, 50 class, 90 lab, 80 internship)",
      requirements: "None specified",
      certification: "EU-Recognized Certificate",
      career: "Restaurant & hospitality management, F&B supervision",
      icon: <FaUtensils className="program-icon hospitality-icon" />,
      featured: true,
    },
    {
      title: "Bar Service Operator - Bartender",
      duration: "270 hrs (60 online, 30 class, 90 lab, 90 internship)",
      requirements: "None specified",
      certification: "EU-Recognized Certificate",
      career: "Hotels, restaurants, bar operations, mixology",
      icon: <FaWineGlassAlt className="program-icon hospitality-icon" />,
      featured: true,
    },
    {
      title: "Pastry Chef",
      duration: "320 hrs (80 online, 40 class, 100 lab, 100 internship)",
      requirements: "None specified",
      certification: "EU-Recognized Certificate",
      career:
        "Pastry shops, hotels, artisan bakeries, food production",
      icon: <FaCookie className="program-icon hospitality-icon" />,
      featured: true,
    },
    {
      title: "Artisanal Bakery Products Operator (Baker)",
      duration: "270 hrs (70 online, 30 class, 90 lab, 80 internship)",
      requirements: "None specified",
      certification: "EU-Recognized Certificate",
      career: "Bakeries, artisan bread production",
      icon: <FaBreadSlice className="program-icon hospitality-icon" />,
      featured: true,
    },
    {
      title: "Meat Processing Worker - Butcher",
      duration: "240 hrs (60 online, 30 class, 90 lab, 60 internship)",
      requirements: "None specified",
      certification: "EU-Recognized Certificate",
      career: "Butcher shops, meat processing industries",
      icon: <GiMeatCleaver className="program-icon hospitality-icon" />,
      featured: true,
    },
  ];

  // Technical programs data
  const technicalPrograms = [
    {
      title: "Excavation, Earthmoving & Demolition Machinery Operator",
      duration: "200 hrs (80 theory, 60 lab, 60 internship)",
      requirements: "Middle school diploma, 18+, A2 Italian",
      certification: "Heavy Machinery Operator Certificate",
      career: "Construction, roadworks, demolition companies",
      icon: <FaTractor className="program-icon technical-icon" />,
      featured: true,
    },
    {
      title: "Architectural Restoration Site Management Technician",
      duration: "300 hrs (160 theory, 140 field training)",
      requirements: "Middle school diploma, 18+, A2 Italian",
      certification: "Restoration Site Technician Certificate",
      career: "Restoration of historical/architectural buildings",
      icon: <FaMonument className="program-icon technical-icon" />,
      featured: true,
    },
    {
      title: "Mechanical Operator",
      duration: "300 hrs (210 theory, 90 practical/field)",
      requirements: "Middle school diploma, 18+, A2 Italian",
      certification: "Mechanical Operator Certificate (Italy/EU valid)",
      career: "Industrial machinery operation, maintenance, assembly",
      icon: <FaCog className="program-icon technical-icon" />,
      featured: true,
    },
    {
      title: "Construction Carpentry Operator",
      duration: "200 hrs (80 theory, 60 lab, 60 internship)",
      requirements: "Middle school diploma, 18+, A2 Italian",
      certification: "Construction Carpentry Certificate",
      career:
        "Formwork, concrete/steel structures, industrial carpentry",
      icon: <FaHammer className="program-icon technical-icon" />,
      featured: true,
    },
    {
      title: "CNC Machine Operator",
      duration: "450 hrs (150 theory online, 300 lab/field)",
      requirements: "Middle school diploma, 18+, A2 Italian",
      certification: "CNC Operator Certificate (EU-recognized)",
      career:
        "Mechanical workshops, manufacturing plants, precision engineering",
      icon: <FaRobot className="program-icon technical-icon" />,
      featured: true,
    },
    {
      title:
        "Electrical Systems Installation & Maintenance Operator",
      duration:
        "600 hrs (150 online, 200 class, 150 lab, 100 internship)",
      requirements:
        "Compulsory education, 18+, A2 Italian (included)",
      certification:
        "Professional Qualification Certificate recognized in Italy & EU",
      career:
        "Construction firms, maintenance companies, self-employment as technician",
      icon: <FaBolt className="program-icon technical-icon" />,
      featured: true,
    },
    {
      title: "Crane & Lifting Equipment Operator",
      duration: "200 hrs (60 theory, 60 lab, 60 internship)",
      requirements: "Middle school diploma, 18+, A2 Italian",
      certification:
        "Crane Operator Certificate (EU safety-approved)",
      career:
        "Cranes & lifting machinery in industrial sites, ports, construction",
      icon: <GiCrane className="program-icon technical-icon" />,
      featured: true,
    },
    {
      title: "Jewelry Designer",
      duration: "300 hrs (210 theory, 90 project/lab)",
      requirements: "Middle school diploma, 18+, A2 Italian",
      certification: "Jewelry Design Certificate",
      career:
        "Jewelry workshops, CAD modeling, fashion & luxury design",
      icon: <GiJewelCrown className="program-icon technical-icon" />,
      featured: true,
    },
  ];

  return (
    <main className={`modern-container ${isVisible ? "fade-in" : ""}`}>
      {/* Ads Carousel Section */}
      {showAds && (
        <section 
          className="ads-carousel-section"
          onClick={() => setShowAds(false)}
        >
          <div className="ads-container">
            <div 
              className="ads-carousel"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="ads-close-btn"
                onClick={() => setShowAds(false)}
                aria-label="Close ads"
              >
                <IoIosClose />
              </button>
              
              <button 
                className="ads-nav-btn ads-prev-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentAdIndex((prev) => prev === 0 ? ads.length - 1 : prev - 1);
                }}
                aria-label="Previous ad"
              >
                <IoIosArrowBack />
              </button>
              
              <button 
                className="ads-nav-btn ads-next-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentAdIndex((prev) => prev === ads.length - 1 ? 0 : prev + 1);
                }}
                aria-label="Next ad"
              >
                <IoIosArrowForward />
              </button>
              
              <img 
                src={ads[currentAdIndex]} 
                alt={`Advertisement ${currentAdIndex + 1}`}
                className="ad-image"
              />
            </div>
          </div>
        </section>
      )}

      {/* Modern Header */}
      <header className="modern-header">
        <div className="header-content">
          <div className="brand-section">
            <img src={logo} alt="CISD logo" className="brand-logo" />
            <div className="brand-text">
              <h1 className="brand-title">CISD</h1>
              <p className="brand-subtitle">
                College of International Skills Development
              </p>
            </div>
          </div>
          <div className="header-actions">
            <a href="tel:03171173879" className="contact-btn">
              <FaPhone className="contact-icon" />
              Call Now
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="modern-hero">
        <div
          className="hero-background"
          style={{ backgroundImage: `url(${posterImg})` }}
        >
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <FaCertificate className="badge-icon" />
            Professional Training in Italy
          </div>
          <h1 className="hero-title">
            Launch Your Career in
            <span className="hero-highlight"> Italy</span>
          </h1>
          <p className="hero-description">
            Get EU-recognized certifications in Healthcare, Hospitality &
            Technical fields. Learn Italian for FREE and start earning €1500+
            monthly in Italy.
          </p>
          <div className="hero-features">
            <div className="feature-item">
              <FaCheck className="feature-icon" />
              <span>Payment after Visa</span>
            </div>
            <div className="feature-item">
              <FaGraduationCap className="feature-icon" />
              <span>EU-Recognized Certificates</span>
            </div>
            <div className="feature-item">
              <FaBriefcase className="feature-icon" />
              <span>Job Placement Assistance</span>
            </div>
          </div>
          <div className="hero-actions">
            <a href="#programs" className="cta-primary">
              Explore Programs
            </a>
            <Link to={APPLY_PATH} className="cta-secondary">
              Apply Now
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">500+</div>
            <div className="stat-label">Students Trained</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">95%</div>
            <div className="stat-label">Success Rate</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">3-4</div>
            <div className="stat-label">Months Training</div>
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="featured-programs-section">
        <div className="featured-programs-grid">
          {[...healthcarePrograms.filter((p) => p.featured),
          ...hospitalityPrograms.filter((p) => p.featured),
          ...technicalPrograms.filter((p) => p.featured)]
            .map((program, index) => (
              <div key={index} className="featured-program-card">
                <div className="program-icon-container">{program.icon}</div>
                <div className="program-content">
                  <h3 className="program-title">{program.title}</h3>
                  <div className="program-highlights">
                    <span className="duration-highlight">
                      <FaClock className="highlight-icon" />
                      {program.duration}
                    </span>
                  </div>
                  <p className="program-career">{program.career}</p>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Fields */}
      <section className="fields-section">
        <div className="section-header">
          <h2 className="section-title">Choose Your Career Path</h2>
          <p className="section-description">
            Secure your future with international training & career
            opportunities in Italy!
          </p>
        </div>

        <div className="fields-grid">
          <div className="field-card healthcare-card">
            <div className="field-image">
              <img src={healthImg} alt="Health Care" />
              <div className="field-overlay">
                <FaHospital className="field-icon healthcare-field-icon" />
              </div>
            </div>
            <div className="field-content">
              <h3 className="field-title">Healthcare</h3>
              <p className="field-description">
                Join Italy's healthcare sector with EU-recognized certifications
              </p>
              <ul className="field-features">
                <li>Clinical basics & patient care</li>
                <li>Italian language support (A1-A2)</li>
                <li>Job placement assistance</li>
                <li>EU-recognized certifications</li>
              </ul>
              <button
                className="field-btn healthcare-btn"
                onClick={() => setActiveTab("healthcare")}
              >
                View Healthcare Programs
              </button>
            </div>
          </div>

          <div className="field-card hospitality-card">
            <div className="field-image">
              <img src={hospImg} alt="Hospitality" />
              <div className="field-overlay">
                <FaConciergeBell className="field-icon hospitality-field-icon" />
              </div>
            </div>
            <div className="field-content">
              <h3 className="field-title">Hospitality</h3>
              <p className="field-description">
                Master the art of hospitality in Italy's world-class tourism
                industry
              </p>
              <ul className="field-features">
                <li>Hotel & restaurant operations</li>
                <li>Customer service excellence</li>
                <li>Job placement assistance</li>
                <li>EU-recognized certifications</li>
              </ul>
              <button
                className="field-btn hospitality-btn"
                onClick={() => setActiveTab("hospitality")}
              >
                View Hospitality Programs
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits & Eligibility */}
      <section className="benefits-section">
        <div className="benefits-container">
          <div className="benefits-grid">
            <div className="benefit-card special-benefits">
              <div className="benefit-header">
                <FaCertificate className="benefit-icon" />
                <h3 className="benefit-title">Special Benefits</h3>
              </div>
              <div className="benefit-content">
                <div className="benefit-item">
                  <FaCheck className="benefit-check" />
                  <div className="benefit-text">
                    <strong>FREE Italian Language Training</strong>
                    <p>A1 & A2 levels from qualified Italian instructors</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <FaCheck className="benefit-check" />
                  <div className="benefit-text">
                    <strong>Payment After Visa</strong>
                    <p>No upfront payment required</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <FaCheck className="benefit-check" />
                  <div className="benefit-text">
                    <strong>Job Placement Assistance</strong>
                    <p>Direct placement in Italy after training</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="benefit-card eligibility-card">
              <div className="benefit-header">
                <FaClipboardList className="benefit-icon" />
                <h3 className="benefit-title">Eligibility Requirements</h3>
              </div>
              <div className="benefit-content">
                <div className="requirement-item">
                  <span className="requirement-label">Age</span>
                  <span className="requirement-value">18 - 40 years</span>
                </div>
                <div className="requirement-item">
                  <span className="requirement-label">Education</span>
                  <span className="requirement-value">
                    Middle school & above
                  </span>
                </div>
                <div className="requirement-item">
                  <span className="requirement-label">Language</span>
                  <span className="requirement-value">
                    Italian A2 (some programs)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="programs-section">
        <div className="section-header">
          <h2 className="section-title">Training Programs</h2>
        </div>

        <div className="programs-tabs">
          <div className="tabs-header">
            <button
              className={`tab-button ${
                activeTab === "healthcare" ? "active" : ""
              }`}
              onClick={() => setActiveTab("healthcare")}
            >
              <FaHospital className="tab-icon" />
              Healthcare Programs
            </button>
            <button
              className={`tab-button ${
                activeTab === "hospitality" ? "active" : ""
              }`}
              onClick={() => setActiveTab("hospitality")}
            >
              <FaConciergeBell className="tab-icon" />
              Hospitality Programs
            </button>
            <button
              className={`tab-button ${
                activeTab === "technical" ? "active" : ""
              }`}
              onClick={() => setActiveTab("technical")}
            >
              <FaCog className="tab-icon" />
              Technical Programs
            </button>
          </div>

          <div className="tabs-content">
            {activeTab === "healthcare" && (
              <div className="programs-grid">
                {healthcarePrograms.map((program, index) => (
                  <div key={index} className="program-card healthcare-program">
                    <div className="program-header">
                      <div className="program-icon-large">{program.icon}</div>
                      <div className="program-title-section">
                        <h3 className="program-title">{program.title}</h3>
                        <div className="program-badge" style={{
                          width:"fit-content"
                        }}>Healthcare</div>
                      </div>
                    </div>
                    <div className="program-details">
                      <div className="detail-item">
                        <FaClock className="detail-icon" />
                        <span className="detail-label">Duration</span>
                        <span className="detail-value">{program.duration}</span>
                      </div>
                      <div className="detail-item">
                        <FaUserGraduate className="detail-icon" />
                        <span className="detail-label">Requirements</span>
                        <span className="detail-value">
                          {program.requirements}
                        </span>
                      </div>
                      <div className="detail-item">
                        <FaAward className="detail-icon" />
                        <span className="detail-label">Certification</span>
                        <span className="detail-value">
                          {program.certification}
                        </span>
                      </div>
                      <div className="detail-item">
                        <FaRoad className="detail-icon" />
                        <span className="detail-label">Career Path</span>
                        <span className="detail-value">{program.career}</span>
                      </div>
                    </div>
                    <Link to={APPLY_PATH} className="program-apply-btn">
                      Apply Now
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "hospitality" && (
              <div className="programs-grid">
                {hospitalityPrograms.map((program, index) => (
                  <div key={index} className="program-card hospitality-program">
                    <div className="program-header">
                      <div className="program-icon-large">{program.icon}</div>
                      <div className="program-title-section">
                        <h3 className="program-title">{program.title}</h3>
                        <div className="program-badge" style={{
                          width:"fit-content"
                        }}>Hospitality</div>
                      </div>
                    </div>
                    <div className="program-details">
                      <div className="detail-item">
                        <FaClock className="detail-icon" />
                        <span className="detail-label">Duration</span>
                        <span className="detail-value">{program.duration}</span>
                      </div>
                      {program.requirements && (
                        <div className="detail-item">
                          <FaUserGraduate className="detail-icon" />
                          <span className="detail-label">Requirements</span>
                          <span className="detail-value">
                            {program.requirements}
                          </span>
                        </div>
                      )}
                      <div className="detail-item">
                        <FaAward className="detail-icon" />
                        <span className="detail-label">Certification</span>
                        <span className="detail-value">
                          {program.certification}
                        </span>
                      </div>
                      <div className="detail-item">
                        <FaRoad className="detail-icon" />
                        <span className="detail-label">Career Path</span>
                        <span className="detail-value">{program.career}</span>
                      </div>
                    </div>
                    <Link to={APPLY_PATH} className="program-apply-btn">
                      Apply Now
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "technical" && (
              <div className="programs-grid">
                {technicalPrograms.map((program, index) => (
                  <div key={index} className="program-card technical-program">
                    <div className="program-header">
                      <div className="program-icon-large">{program.icon}</div>
                      <div className="program-title-section">
                        <h3 className="program-title">{program.title}</h3>
                        <div className="program-badge" style={{
                          width:"fit-content"
                        }}>Technical</div>
                      </div>
                    </div>
                    <div className="program-details">
                      <div className="detail-item">
                        <FaClock className="detail-icon" />
                        <span className="detail-label">Duration</span>
                        <span className="detail-value">{program.duration}</span>
                      </div>
                      <div className="detail-item">
                        <FaUserGraduate className="detail-icon" />
                        <span className="detail-label">Requirements</span>
                        <span className="detail-value">
                          {program.requirements}
                        </span>
                      </div>
                      <div className="detail-item">
                        <FaAward className="detail-icon" />
                        <span className="detail-label">Certification</span>
                        <span className="detail-value">
                          {program.certification}
                        </span>
                      </div>
                      <div className="detail-item">
                        <FaRoad className="detail-icon" />
                        <span className="detail-label">Career Path</span>
                        <span className="detail-value">{program.career}</span>
                      </div>
                    </div>
                    <Link to={APPLY_PATH} className="program-apply-btn">
                      Apply Now
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="contact-section">
        <div className="contact-container">
          <div className="contact-content">
            <div className="contact-info">
              <h3 className="contact-title">Get in Touch</h3>
              <p className="contact-description">
                Ready to start your journey to Italy? Contact us today!
              </p>
              <div className="contact-details">
                <div className="contact-item">
                  <FaMapMarkerAlt className="contact-icon" />
                  <div className="contact-text">
                    <strong>Visit Our Office</strong>
                    <p>9A – Shershah Block, Garden Town, Lahore</p>
                    <p>House No. 48 Main Margalla Road F7-2, Islamabad</p>
                  </div>
                </div>
                <div className="contact-item">
                  <FaPhone className="contact-icon" />
                  <div className="contact-text">
                    <strong>Call Us</strong>
                    <p>0322 0547996, 0333 6367428</p>
                  </div>
                </div>
                <div className="contact-item">
                  <FaGlobe className="contact-icon" />
                  <div className="contact-text">
                    <strong>Website</strong>
                    <p>www.cisd.edu.pk</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-actions">
              <a
                href="https://www.cisd.edu.pk"
                target="_blank"
                rel="noreferrer"
                className="contact-btn secondary"
              >
                Visit Website
              </a>
              <a href="tel:03171173879" className="contact-btn primary">
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="modern-footer">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-brand">
              <div className="footer-brand-info">
                <img src={logo} alt="CISD logo" className="footer-logo" />
                <div className="footer-text">
                  <h4>CISD</h4>
                  <p>College of International Skills Development</p>
                </div>
              </div>
              <p className="footer-description">
                Empowering students with world-class technical training and
                EU-recognized certifications for successful careers in Italy.
              </p>
            </div>

            <div className="footer-section">
              <h5>Programs</h5>
              <div className="footer-links">
                <a href="#programs" className="footer-link">
                  <FaHospital className="footer-link-icon" />
                  Healthcare Programs
                </a>
                <a href="#programs" className="footer-link">
                  <FaConciergeBell className="footer-link-icon" />
                  Hospitality Programs
                </a>
                <a href="#programs" className="footer-link">
                  <FaCog className="footer-link-icon" />
                  Technical Programs
                </a>
                <Link to={APPLY_PATH} className="footer-link">
                  <FaLaptop className="footer-link-icon" />
                  Apply Now
                </Link>
              </div>
            </div>

            <div className="footer-section">
              <h5>Support</h5>
              <div className="footer-links">
                <a href="https://www.cisd.edu.pk" className="footer-link">
                  <FaGlobe className="footer-link-icon" />
                  Our Website
                </a>
                <a href="tel:03171173879" className="footer-link">
                  <FaPhone className="footer-link-icon" />
                  Call Us
                </a>
                <a href="#contact" className="footer-link">
                  <FaMapMarkerAlt className="footer-link-icon" />
                  Visit Office
                </a>
                <a href="#programs" className="footer-link">
                  <FaQuestionCircle className="footer-link-icon" />
                  FAQ
                </a>
              </div>
            </div>

            <div className="footer-section">
              <h5>Contact Info</h5>
              <div className="footer-contact">
                <div className="contact-item-footer">
                  <FaMapMarkerAlt className="contact-icon-footer" />
                  <div className="contact-text-footer">
                    <strong>Office Address</strong>
                    <span>9A – Shershah Block, Garden Town, Lahore</span>
                  </div>
                </div>
                <div className="contact-item-footer">
                  <FaPhone className="contact-icon-footer" />
                  <div className="contact-text-footer">
                    <strong>Phone</strong>
                    <span>0317-1173879</span>
                  </div>
                </div>
                <div className="contact-item-footer">
                  <FaGlobe className="contact-icon-footer" />
                  <div className="contact-text-footer">
                    <strong>Website</strong>
                    <span>www.cisd.edu.pk</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-copyright">
              <p>
                © {new Date().getFullYear()} CISD — Professional Technical
                Training in Italy
              </p>
              <p>Transform your future with EU-recognized certifications</p>
            </div>
            <div className="footer-social">
              <a
                href="https://www.cisd.edu.pk"
                className="social-link"
                title="Website"
              >
                <FaGlobe />
              </a>
              <a href="tel:03171173879" className="social-link" title="Call">
                <FaPhone />
              </a>
              <a
                href="mailto:info@cisd.edu.pk"
                className="social-link"
                title="Email"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}