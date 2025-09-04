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
    <div className="job-selection-container">
      {!isFormPage ? (
        <>
          <div className="job-selection-header">
            <h1>Career Opportunities</h1>
            <p>Select your desired career path to begin your application process</p>
          </div>
          
          <div className="job-cards-container">
            {jobOptions.map((job, index) => (
              <Link 
                key={job.id} 
                to={job.path}
                className={`job-card-link ${animateCards ? 'animate-in' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
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