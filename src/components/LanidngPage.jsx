// client/src/components/LandingPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      // Scroll animation logic
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


//    const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false); // State to track screen size


  // Function to check screen width and update state
  const checkScreenSize = () => {
    setIsSmallScreen(window.innerWidth < 768); // You can adjust this breakpoint as needed
  };

  useEffect(() => {
    checkScreenSize(); // Check size on mount

    // Add event listener to track window resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleApplyNow = () => {
    navigate("/application");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  return (
    <div className="landing-page">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="logo">
            <h2>
              {isSmallScreen ? "CISD" : "College of International Skill Developments"}
            </h2>
          </div>
          <nav className={`nav ${isMenuOpen ? "nav-open" : ""}`}>
            <div className="nav-buttons">
              <button className="btn btn-primary" onClick={handleApplyNow}>
                Apply Now
              </button>
            </div>
          </nav>
          <button className="menu-toggle" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Exciting Job Opportunities in Saudi Arabia!</h1>
            <p>
              Join our team in the hospitality industry with attractive benefits
              and growth opportunities
            </p>

            <div className="hero-stats">
              <div className="stat">
                <h3>9+</h3>
                <p>Positions Available</p>
              </div>
              <div className="stat">
                <h3>2 Years</h3>
                <p>Renewable Contract</p>
              </div>
              <div className="stat">
                <h3>Free</h3>
                <p>Accommodation & Meals</p>
              </div>
            </div>

            <div className="cta-center">
              <button className="btn btn-primary" onClick={handleApplyNow}>
                Apply Now
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="image-placeholder">
              <div className="floating-card card-1">
                <h4>Hostess</h4>
                <p>Hospitality • Saudi Arabia</p>
                <span>Attractive Package</span>
                <button className="btn-apply" onClick={handleApplyNow}>
                  Apply Now
                </button>
              </div>
              <div className="floating-card card-2">
                <h4>Barista</h4>
                <p>Hospitality • Saudi Arabia</p>
                <span>Attractive Package</span>
                <button className="btn-apply" onClick={handleApplyNow}>
                  Apply Now
                </button>
              </div>
              <div className="floating-card card-3">
                <h4>Waiter/Waitress</h4>
                <p>Hospitality • Saudi Arabia</p>
                <span>Attractive Package</span>
                <button className="btn-apply" onClick={handleApplyNow}>
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Positions Section */}
      <section id="positions" className="features">
        <div className="container">
          <div className="section-header">
            <h2>We Are Hiring for Multiple Hospitality Roles</h2>
            <p>
              Join our team in Saudi Arabia with comprehensive benefits package
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">👩‍💼</div>
              <h3>Hostess</h3>
              <p>
                Welcome guests, manage reservations, and ensure excellent first
                impressions.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">☕</div>
              <h3>Barista</h3>
              <p>
                Prepare and serve premium coffee beverages with exceptional
                customer service.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🍽️</div>
              <h3>Waiter/Waitress</h3>
              <p>
                Provide outstanding dining experiences with attention to detail.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛏️</div>
              <h3>Room Attendant</h3>
              <p>
                Maintain high standards of cleanliness and comfort in guest
                rooms.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👔</div>
              <h3>Laundry Attendant</h3>
              <p>
                Handle professional laundry services with care and efficiency.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🍳</div>
              <h3>Commi III</h3>
              <p>
                Support kitchen operations and learn from experienced chefs.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🧹</div>
              <h3>Steward</h3>
              <p>Maintain kitchen cleanliness and support culinary team.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛎️</div>
              <h3>Bellman</h3>
              <p>Assist guests with luggage and provide warm welcomes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
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
            </div>
            <div className="step">
              <div className="step-number">🍽️</div>
              <h3>3 Meals Daily / 300 SAR Allowance</h3>
              <p>Enjoy nutritious meals provided or receive meal allowance.</p>
            </div>
            <div className="step">
              <div className="step-number">🚌</div>
              <h3>Transportation Provided</h3>
              <p>Convenient transport to and from work locations.</p>
            </div>
            <div className="step">
              <div className="step-number">🏥</div>
              <h3>Medical Insurance</h3>
              <p>Comprehensive health coverage for your peace of mind.</p>
            </div>
            <div className="step">
              <div className="step-number">✈️</div>
              <h3>Exit Ticket After Contract</h3>
              <p>Return flight ticket provided upon completion of contract.</p>
            </div>
            <div className="step">
              <div className="step-number">💰</div>
              <h3>Paid Holidays & Overtime</h3>
              <p>Enjoy paid public holidays and overtime compensation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Details Section */}
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
      </div>
      <div className="detail-card">
        <h3>⏰ Working Hours</h3>
        <p>9-Hour Shifts + Weekly Off</p>
      </div>
      <div className="detail-card">
        <h3>🎉 Holidays</h3>
        <p>Paid Public Holidays & Overtime</p>
      </div>
      <div className="detail-card">
        <h3>💰 Salary</h3>
        <p>Attractive Monthly Salary + Performance Bonuses</p>
      </div>
    </div>
  </div>
</section>


      {/* Contact Section */}
      {/* <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to join our team in Saudi Arabia?</h2>
            <p>Contact us today to start your application process</p>
            <div className="contact-details">
              <div className="contact-item">
                <h4>Phone</h4>
                <p>0317-1173879</p>
              </div>
              <div className="contact-item">
                <h4>Address</h4>
                <p>9A - Shershah Block, Garden Town, Lahore</p>
                <p>House 48 Main Margalla Road F7/2 Islamabad</p>
              </div>
              <div className="contact-item">
                <h4>Website</h4>
                <p>www.cisd.edu.pk</p>
              </div>
            </div>
            <div className="cta-buttons">
              <button className="btn btn-primary" onClick={handleApplyNow}>
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>College of International Skill Developments</h3>
              <p>Connecting talent with international opportunities</p>
              <div className="social-links">
                <a href="#">
                  <span>📱</span>
                </a>
                <a href="#">
                  <span>💻</span>
                </a>
                <a href="#">
                  <span>📸</span>
                </a>
                <a href="#">
                  <span>🐦</span>
                </a>
              </div>
            </div>
            <div className="footer-section">
              <h4>Job Seekers</h4>
              <a href="#positions">Available Positions</a>
              <a href="#benefits">Benefits</a>
              <a href="#details">Employment Details</a>
              <a href="#" onClick={handleApplyNow}>
                Apply Now
              </a>
            </div>
            <div className="footer-section">
              <h4>Contact Information</h4>
              <p>Phone: 0317-1173879</p>
              <p>Address: 9A - Shershah Block, Garden Town, Lahore</p>
              <p>Website: www.cisd.edu.pk</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>
              &copy; 2025 College of International Skill Developments. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
