// client/src/components/JobSelection/JobSelection.jsx
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faGraduationCap, 
  faConciergeBell, 
  faHome, 
  faGlobeEurope,
  faArrowRight,
  faBuilding,
  faTools,
  faPersonDigging,
  faScissors
} from '@fortawesome/free-solid-svg-icons'
import './JobSelection.css'

const JobSelection = () => {
  const location = useLocation();
  const [animateCards, setAnimateCards] = useState(false);
  const isFormPage = location.pathname !== '/jobselection';

  useEffect(() => {
    // Trigger animation after component mounts
    setAnimateCards(true);
  }, []);

  // Featured Italy Jobs (special section)
  const featuredItalyJobs = {
    id: "italy-jobs",
    title: "🇮🇹 Healthcare & Hospitality Courses in Italy",
    description: "Professional Careers in Italy Begin Here, With Accredited Training + Job Support.",
    icon: faGlobeEurope,
    path: "application-italyjobs",
    color: "#e74a3b",
    gradient: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 50%, #ff9ff3 100%)",
    isFeatured: true
  }

  // Regular job options
  const jobOptions = [
    {
      id: 'civil',
      title: 'Civil Workers',
      description: 'For educational program applications',
      icon: faGraduationCap,
      path: 'application-civil',
      color: '#4e73df',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    { 
      id: 'hospitality',
      title: 'Hospitality Jobs',
      description: 'Apply for positions in hospitality industry',
      icon: faConciergeBell,
      path: 'application-hospitality',
      color: '#1cc88a',
      gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'
    },
    {
      id: 'domestic',
      title: 'Domestic Jobs',
      description: 'Apply for domestic helper positions',
      icon: faHome,
      path: 'application-domestic',
      color: '#f6c23e',
      gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)'
    },
    {
      id: 'germany',
      title: 'Germany Internship',
      description: 'Apply for internship positions in Germany',
      icon: faGlobeEurope,
      path: 'application-germany',
      color: '#e74a3b',
      gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)'
    },
    {
      id: 'mechanical',
      title: 'Mechanical Workers',
      description: 'Apply for the jobs in abroad',
      icon: faTools,
      path: 'application-mechanical',
      color: '#36b9cc',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      id: 'pipefitter',
      title: 'Pipe Fitter',
      description: 'Apply for the jobs in Saudia',
      icon: faBuilding,
      path: 'application-pipefitter',
      color: '#5a67d8',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
      id: "tailor/ironer",
      title: "Tailor and Ironer",
      description: "Apply for the jobs in Saudia",
      icon: faScissors,
      path: "application-tailor/ironer",
      color: "#f7971e",
      gradient: "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)",
    },
    {
      id: "Helping Jobs",
      title: "Helper Jobs in Saudi Arabia",
      description: "Painter, Tiler, Woodworker & Helper Jobs in Saudi Arabia",
      icon: faPersonDigging,
      path: "application-helperjobs",
      color: "#5a67d8",
      gradient: "linear-gradient(135deg, #3a7bd5 0%, #3a6073 100%)",
    },
  ]

  return (
    <div style={{
    }} className="job-selection-container">
      {!isFormPage ? (
        <>
          <div className="job-selection-header">
            <h1>Career Opportunities</h1>
            <p>Select your desired career path to begin your application process</p>
          </div>

          {/* Featured Italy Jobs Section */}
          <div className="featured-section">
            <div className="featured-header">
              <h2>🌟 Featured Opportunity</h2>
              <p>Don’t miss this unique chance to join our Italy courses!</p>
            </div>
            <Link 
              to={featuredItalyJobs.path}
              className={`featured-job-link ${animateCards ? 'animate-in' : ''}`}
              style={{ animationDelay: '0.1s' }}
            >
              <div 
                className="featured-job-card"
                style={{ '--accent-color': featuredItalyJobs.color }}
              >
                <div className="featured-job-bg" style={{ background: featuredItalyJobs.gradient }}></div>
                <div className="featured-job-content">
                  <div className="featured-job-icon" style={{ background: featuredItalyJobs.gradient }}>
                    <FontAwesomeIcon icon={featuredItalyJobs.icon} />
                  </div>
                  <div className="featured-job-text">
                    <h3>{featuredItalyJobs.title}</h3>
                    <p>{featuredItalyJobs.description}</p>
                    <div className="featured-job-features">
                      <span className="feature-badge">🏥 Healthcare</span>
                      <span className="feature-badge">🏨 Hospitality</span>
                      <span className="feature-badge">🇮🇹 Italy</span>
                    </div>
                  </div>
                  <div className="featured-job-footer">
                    <span className="apply-text">Apply Now</span>
                    <div className="job-card-arrow">
                      <FontAwesomeIcon icon={faArrowRight} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Regular Jobs Section */}
          <div className="regular-jobs-section">
            <div className="section-header">
              <h2>Other Career Opportunities</h2>
              <p>Explore our diverse range of job opportunities</p>
            </div>
            <div className="job-cards-container">
              {jobOptions.map((job, index) => (
                <Link 
                  key={job.id} 
                  to={job.path}
                  className={`job-card-link ${animateCards ? 'animate-in' : ''}`}
                  style={{ animationDelay: `${(index + 2) * 0.1}s` }}
                >
                  <div 
                    className="job-card"
                    style={{ '--accent-color': job.color }}
                  >
                    <div className="job-card-bg" style={{ background: job.gradient }}></div>
                    <div className="job-card-content">
                      <div className="job-card-icon" style={{ background: job.gradient }}>
                        <FontAwesomeIcon icon={job.icon} />
                      </div>
                      <h3>{job.title}</h3>
                      <p>{job.description}</p>
                      <div className="job-card-footer">
                        <span className="apply-text">Apply Now</span>
                        <div className="job-card-arrow">
                          <FontAwesomeIcon icon={faArrowRight} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="job-selection-footer">
            <p>Need help deciding? <a href="#contact">Contact our career advisors</a></p>
          </div>
        </>
      ) : (
        <div className="form-container">
          <Outlet />
        </div>
      )}
    </div>
  )
}

export default JobSelection