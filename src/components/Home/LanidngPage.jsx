// client/src/components/LandingPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [hospitalityCurrentIndex, setHospitalityCurrentIndex] = useState(0);
  const [domesticCurrentIndex, setDomesticCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const navigate = useNavigate();
  const hospitalityCarouselRef = useRef(null);
  const domesticCarouselRef = useRef(null);

  // Unified Apply handler -> JobSelection
  const handleApply = (jobType = "any") => {
    navigate("/jobselection", { state: { jobType } });
  };

  // Admin login handler
  const handleAdminLogin = () => {
    navigate("/login");
  };

  // Responsive checks + header shrink on scroll
  const checkScreenSize = () => setIsSmallScreen(window.innerWidth < 768);
  const onScroll = () => setIsScrolled(window.scrollY > 10);

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen((v) => !v);
  const closeMenu = () => setIsMenuOpen(false);

  // Positions data
  const hospitalityPositions = [
    { icon: "👩‍💼", title: "Hostess", description: "Welcome guests, manage reservations, and ensure excellent first impressions." },
    { icon: "☕", title: "Barista", description: "Prepare and serve premium coffee beverages with exceptional customer." },
    { icon: "🍽️", title: "Waiter/Waitress", description: "Provide outstanding dining experiences with attention to detail." },
    { icon: "🛏️", title: "Room Attendant", description: "Maintain high standards of cleanliness and comfort in guest rooms." },
    { icon: "👔", title: "Laundry Attendant", description: "Handle professional laundry services with care and efficiency." },
    { icon: "🍳", title: "Commi III", description: "Support kitchen operations and learn from experienced chefs." },
    { icon: "🧹", title: "Steward", description: "Maintain kitchen cleanliness and support culinary team." },
    { icon: "🛎️", title: "Bellman", description: "Assist guests with luggage and provide warm welcomes." }
  ];

  const domesticPositions = [
    { icon: "👶", title: "Nanny/Babysitter", description: "Provide childcare services in private households." },
    { icon: "🚗", title: "Private Driver", description: "Provide safe transportation for families." },
    { icon: "👨‍🍳", title: "Cook/Chef", description: "Prepare meals in private household settings." },
    { icon: "👵", title: "Caregiver", description: "Provide care for elderly or special needs individuals." },
    { icon: "🏠", title: "Domestic Worker", description: "Perform various household tasks and maintenance." },
    { icon: "🧹", title: "Household Help", description: "Assist with cleaning and general household duties." },
    { icon: "⏰", title: "Cleaner (Hourly)", description: "Provide cleaning services on an hourly basis." },
    { icon: "❤️", title: "Elderly Care Specialist", description: "Specialized care for senior family members." }
  ];

  // Items per slide
  const getItemsPerSlide = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  // Carousel nav
  const nextHospitalitySlide = () => {
    const max = hospitalityPositions.length - getItemsPerSlide();
    setHospitalityCurrentIndex((prev) => (prev >= max ? 0 : prev + 1));
  };
  const prevHospitalitySlide = () => {
    const max = hospitalityPositions.length - getItemsPerSlide();
    setHospitalityCurrentIndex((prev) => (prev <= 0 ? max : prev - 1));
  };

  const nextDomesticSlide = () => {
    const max = domesticPositions.length - getItemsPerSlide();
    setDomesticCurrentIndex((prev) => (prev >= max ? 0 : prev + 1));
  };
  const prevDomesticSlide = () => {
    const max = domesticPositions.length - getItemsPerSlide();
    setDomesticCurrentIndex((prev) => (prev <= 0 ? max : prev - 1));
  };

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    const hospitalityInterval = setInterval(nextHospitalitySlide, 4000);
    const domesticInterval = setInterval(nextDomesticSlide, 4200);
    return () => {
      clearInterval(hospitalityInterval);
      clearInterval(domesticInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused]);

  // Pause on hover
  const handleCarouselHover = () => setIsPaused(true);
  const handleCarouselLeave = () => setIsPaused(false);

  // Helpers for indicators (make indicator reflect slide, not raw index)
  const activeHospitalityDot = Math.floor(hospitalityCurrentIndex / getItemsPerSlide());
  const activeDomesticDot = Math.floor(domesticCurrentIndex / getItemsPerSlide());
  const hospitalityDots = Math.ceil(hospitalityPositions.length / getItemsPerSlide());
  const domesticDots = Math.ceil(domesticPositions.length / getItemsPerSlide());

  return (
    <div className="landing-page">
      {/* Header */}
      <header className={`header ${isScrolled ? "scrolled" : ""}`}>
        <div className="container">
          <div className="logo">
            <h2>{isSmallScreen ? "CISD" : "College of International Skill Developments"}</h2>
          </div>

          <nav className={`nav ${isMenuOpen ? "active" : ""}`}>
            <a href="#positions" onClick={closeMenu}>Positions</a>
            <a href="#benefits" onClick={closeMenu}>Benefits</a>
            <a href="#details" onClick={closeMenu}>Details</a>
            <a href="#job-types" onClick={closeMenu}>Job Types</a>

            <div className="nav-buttons">
              <button className="btn btn-primary" onClick={() => { closeMenu(); handleApply(); }}>
                Apply For Jobs
              </button>
            </div>
          </nav>

          <button className={`menu-toggle ${isMenuOpen ? "active" : ""}`} onClick={toggleMenu} aria-label="Toggle menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Global Career Opportunities</h1>
            <p>Discover your path to international employment with our diverse job offerings</p>

            <div className="hero-stats">
              <div className="stat">
                <h3>6+</h3>
                <p>Job Categories</p>
              </div>
              <div className="stat">
                <h3>50+</h3>
                <p>Available Positions</p>
              </div>
              <div className="stat">
                <h3>5+</h3>
                <p>Countries</p>
              </div>
            </div>

            <div className="cta-center" style={{ marginBottom: "5rem" }}>
              <div className="hero-buttons" style={{
                marginTop:"2rem"
              }}>
                <button className="btn btn-secondary" onClick={() => handleApply()}>
                  Explore All Jobs
                </button>
              </div>
            </div>
          </div>

          <div className="hero-image">
            <div className="image-placeholder">
              <div className="floating-card card-1">
                <h4>Civil Workers</h4>
                <p>Education Programs • Global</p>
                <span>Training & Placement</span>
                <button className="btn-apply" onClick={() => handleApply("civil")}>Apply Now</button>
              </div>
              <div className="floating-card card-2">
                <h4>Hospitality</h4>
                <p>Hotels & Restaurants • Saudi Arabia</p>
                <span>Attractive Package</span>
                <button className="btn-apply" onClick={() => handleApply("hospitality")}>Apply Now</button>
              </div>
              <div className="floating-card card-3">
                <h4>Germany Internship</h4>
                <p>Professional Development • Germany</p>
                <span>Career Growth</span>
                <button className="btn-apply" onClick={() => handleApply("germany")}>Apply Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Types */}
      <section id="job-types" className="job-types">
        <div className="container">
          <div className="section-header">
            <h2>Explore Our Job Categories</h2>
            <p>Select from our diverse range of international opportunities</p>
          </div>
          <div className="job-types-grid">
            <div className="job-type-card">
              <div className="job-type-icon">🏗️</div>
              <h3>Civil Workers</h3>
              <p>Educational program applications for skilled civil workers seeking international opportunities.</p>
              <ul>
                <li>Construction Specialists</li>
                <li>Skilled Laborers</li>
                <li>Project Assistants</li>
                <li>Technical Roles</li>
                <li>And more...</li>
              </ul>
              <button className="btn btn-primary" onClick={() => handleApply("civil")}>
                Apply for Civil Jobs
              </button>
            </div>

            <div className="job-type-card">
              <div className="job-type-icon">🏨</div>
              <h3>Hospitality Jobs</h3>
              <p>Join the thriving hospitality industry with positions in hotels, restaurants, and resorts globally.</p>
              <ul>
                <li>Hostess/Host</li>
                <li>Barista</li>
                <li>Waiter/Waitress</li>
                <li>Room Attendant</li>
                <li>And more...</li>
              </ul>
              <button className="btn btn-secondary" onClick={() => handleApply("hospitality")}>
                Apply for Hospitality
              </button>
            </div>

            <div className="job-type-card">
              <div className="job-type-icon">🏠</div>
              <h3>Domestic Jobs</h3>
              <p>Work in private households with competitive packages and comfortable working environments.</p>
              <ul>
                <li>Domestic Worker</li>
                <li>Nanny/Babysitter</li>
                <li>Private Driver</li>
                <li>Cook/Chef</li>
                <li>And more...</li>
              </ul>
              <button className="btn btn-primary" onClick={() => handleApply("domestic")}>
                Apply for Domestic
              </button>
            </div>

            <div className="job-type-card">
              <div className="job-type-icon">🇩🇪</div>
              <h3>Germany Internship</h3>
              <p>Professional internship opportunities in Germany with career development and cultural experience.</p>
              <ul>
                <li>Technical Internships</li>
                <li>Hospitality Training</li>
                <li>Engineering Placements</li>
                <li>Business Programs</li>
                <li>And more...</li>
              </ul>
              <button className="btn btn-secondary" onClick={() => handleApply("germany")}>
                Apply for Germany
              </button>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button className="btn btn-primary" onClick={() => handleApply()}>
              View All Job Categories
            </button>
          </div>
        </div>
      </section>

      {/* Positions */}
      <section id="positions" className="positions">
        <div className="container">
          <div className="section-header">
            <h2>Featured Job Opportunities</h2>
            <p>Discover exciting positions with competitive packages and benefits</p>
          </div>

          {/* Hospitality Carousel */}
          <div className="carousel-section">
            <div className="carousel-header">
              <h3 className="carousel-title"><span className="carousel-icon">🏨</span>Hospitality Positions</h3>
              <div className="carousel-controls">
                <button className="carousel-control-btn" onClick={prevHospitalitySlide} aria-label="Previous">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button className="carousel-control-btn" onClick={nextHospitalitySlide} aria-label="Next">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>

            <div
              className="carousel-container"
              onMouseEnter={handleCarouselHover}
              onMouseLeave={handleCarouselLeave}
              ref={hospitalityCarouselRef}
            >
              <div className="carousel-track">
                <div
                  className="carousel-slide"
                  style={{ transform: `translateX(-${hospitalityCurrentIndex * (100 / getItemsPerSlide())}%)` }}
                >
                  {hospitalityPositions.map((position, idx) => (
                    <div key={idx} className="carousel-item">
                      <div className="position-card">
                        <div className="position-icon">{position.icon}</div>
                        <h4>{position.title}</h4>
                        <p>{position.description}</p>
                        {/* <div className="position-salary">{position.salary}</div> */}
                        <button className="btn-apply-now" onClick={() => handleApply("hospitality")}>
                          Apply Now
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="carousel-indicators">
              {Array.from({ length: hospitalityDots }).map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  className={`carousel-indicator ${dotIdx === activeHospitalityDot ? "active" : ""}`}
                  onClick={() => setHospitalityCurrentIndex(dotIdx * getItemsPerSlide())}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Domestic Carousel */}
          <div className="carousel-section">
            <div className="carousel-header">
              <h3 className="carousel-title"><span className="carousel-icon">🏠</span>Domestic Positions</h3>
              <div className="carousel-controls">
                <button className="carousel-control-btn" onClick={prevDomesticSlide} aria-label="Previous">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button className="carousel-control-btn" onClick={nextDomesticSlide} aria-label="Next">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>

            <div
              className="carousel-container"
              onMouseEnter={handleCarouselHover}
              onMouseLeave={handleCarouselLeave}
              ref={domesticCarouselRef}
            >
              <div className="carousel-track">
                <div
                  className="carousel-slide"
                  style={{ transform: `translateX(-${domesticCurrentIndex * (100 / getItemsPerSlide())}%)` }}
                >
                  {domesticPositions.map((position, idx) => (
                    <div key={idx} className="carousel-item">
                      <div className="position-card">
                        <div className="position-icon">{position.icon}</div>
                        <h4>{position.title}</h4>
                        {/* <p>{position.description}</p> */}
                        {/* <div className="position-salary">{position.salary}</div> */}
                        <button className="btn-apply-now" onClick={() => handleApply("domestic")}>
                          Apply Now
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="carousel-indicators">
              {Array.from({ length: domesticDots }).map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  className={`carousel-indicator ${dotIdx === activeDomesticDot ? "active" : ""}`}
                  onClick={() => setDomesticCurrentIndex(dotIdx * getItemsPerSlide())}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2>Employment Benefits</h2>
            <p>We take care of our team with comprehensive benefits</p>
          </div>
          <div className="steps">
            <div className="step">
              <div className="step-number">🏠</div>
              <h3>Free Accommodation</h3>
              <p>Comfortable housing provided at no cost to our employees.</p>
              <button className="btn-apply-small" onClick={() => handleApply()}>Apply</button>
            </div>
            <div className="step">
              <div className="step-number">🍽️</div>
              <h3>3 Meals Daily / 300 SAR Allowance</h3>
              <p>Enjoy nutritious meals provided or receive meal allowance.</p>
              <button className="btn-apply-small" onClick={() => handleApply()}>Apply</button>
            </div>
            <div className="step">
              <div className="step-number">🚌</div>
              <h3>Transportation Provided</h3>
              <p>Convenient transport to and from work locations.</p>
              <button className="btn-apply-small" onClick={() => handleApply()}>Apply</button>
            </div>
            <div className="step">
              <div className="step-number">🏥</div>
              <h3>Medical Insurance</h3>
              <p>Comprehensive health coverage for your peace of mind.</p>
              <button className="btn-apply-small" onClick={() => handleApply()}>Apply</button>
            </div>
            <div className="step">
              <div className="step-number">✈️</div>
              <h3>Exit Ticket After Contract</h3>
              <p>Return flight ticket provided upon completion of contract.</p>
              <button className="btn-apply-small" onClick={() => handleApply()}>Apply</button>
            </div>
            <div className="step">
              <div className="step-number">💰</div>
              <h3>Paid Holidays & Overtime</h3>
              <p>Enjoy paid public holidays and overtime compensation.</p>
              <button className="btn-apply-small" onClick={() => handleApply()}>Apply</button>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section id="details" className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2>Employment Details</h2>
            <p>Clear terms for a rewarding work experience</p>
          </div>
          <div className="details-cards">
            <div className="detail-card">
              <h3>📝 Contract</h3>
              <p>2-Year Contract (Renewable)</p>
              <button className="btn-apply-small" onClick={() => handleApply()}>Apply</button>
            </div>
            <div className="detail-card">
              <h3>⏰ Working Hours</h3>
              <p>9-Hour Shifts + Weekly Off</p>
              <button className="btn-apply-small" onClick={() => handleApply()}>Apply</button>
            </div>
            <div className="detail-card">
              <h3>🎉 Holidays</h3>
              <p>Paid Public Holidays & Overtime</p>
              <button className="btn-apply-small" onClick={() => handleApply()}>Apply</button>
            </div>
            <div className="detail-card">
              <h3>💰 Salary</h3>
              <p>Attractive Monthly Salary + Performance Bonuses</p>
              <button className="btn-apply-small" onClick={() => handleApply()}>Apply</button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your International Career?</h2>
            <p>Join thousands of successful professionals who have found their dream jobs through our platform</p>
            <div className="cta-buttons">
              <button className="btn btn-secondary" onClick={() => handleApply()}>
                Browse All Jobs
              </button>
              <button className="btn btn-outline" onClick={() => document.getElementById('job-types').scrollIntoView({ behavior: 'smooth' })}>
                Explore Categories
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>College of International Skill Developments</h3>
              <p>Connecting talent with international opportunities across multiple industries and countries</p>
              {/* <div className="social-links">
                <a href="#"><span>📱</span></a>
                <a href="#"><span>💻</span></a>
                <a href="#"><span>📸</span></a>
                <a href="#"><span>🐦</span></a>
              </div> */}
            </div>

            <div className="footer-section">
              <h4>Job Categories</h4>
              <a href="#" onClick={(e) => { e.preventDefault(); handleApply("civil"); }}>Civil Workers</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleApply("hospitality"); }}>Hospitality Jobs</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleApply("domestic"); }}>Domestic Jobs</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleApply("germany"); }}>Germany Internship</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleApply("mechanical"); }}>Mechanical Workers</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleApply("pipefitter"); }}>Pipe Fitter</a>
            </div>

            <div className="footer-section">
              <h4>Contact Information</h4>
              <p>Phone: 0322 0547996</p>
              <p>Address: 9A - Shershah Block, Garden Town, Lahore</p>
              <p>Website: www.cisd.edu.pk</p>
              {/* <p>Email: info@cisd.edu.pk</p> */}
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2025 College of International Skill Developments. All rights reserved.</p>
            {/* Add Admin Login Button */}
            <button className="btn btn-admin" onClick={() => { closeMenu(); handleAdminLogin(); }}>
              Admin Login
            </button>
          </div>
        </div>
      </footer>

      {/* Click-away overlay for mobile nav */}
      {isMenuOpen && <div onClick={closeMenu} style={{position:"fixed", inset:0, background:"rgba(0,0,0,0.25)", zIndex:999}} />}
    </div>
  );
};

export default LandingPage;