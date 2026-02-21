import React from "react"
import {
  getCurrentExperience,
  getSkillsByCategory,
  usePortfolioData,
} from "../hooks/usePortfolioData"

/**
 * Example component demonstrating how to use portfolio data
 * This component shows the basic structure for using the portfolio data in your React components
 */
const PortfolioExample: React.FC = () => {
  const { loading, data, error } = usePortfolioData()

  // Loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading portfolio data...</div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="error-container">
        <p>Error loading portfolio data: {error}</p>
      </div>
    )
  }

  // No data state
  if (!data) {
    return (
      <div className="no-data-container">
        <p>No portfolio data available</p>
      </div>
    )
  }

  const currentJob = getCurrentExperience(data)
  const frontendSkills = getSkillsByCategory(data, "frontend")

  return (
    <div className="portfolio-example">
      {/* Personal Info Section */}
      <section className="personal-info">
        <div className="avatar">
          <img
            src={data.personalInfo.avatar.primary}
            alt={data.personalInfo.avatar.alt}
            width="120"
            height="120"
          />
        </div>
        <h1>{data.personalInfo.name}</h1>
        <h2>{data.personalInfo.title}</h2>
        <p className="location">{data.personalInfo.location.fullAddress}</p>
        <p className="bio">{data.personalInfo.bio}</p>
      </section>

      {/* Contact Section */}
      <section className="contact-info">
        <h3>Contact Information</h3>
        <div className="contact-item">
          <strong>Email:</strong>
          <a href={`mailto:${data.contact.email}`}>{data.contact.email}</a>
        </div>
        <div className="contact-item">
          <strong>Phone:</strong> {data.contact.phone}
        </div>

        <div className="social-links">
          <h4>Social Links</h4>
          {Object.entries(data.contact.social).map(([platform, info]) => (
            <a
              key={platform}
              href={info.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <i className={info.icon}></i>
              {info.label}
            </a>
          ))}
        </div>
      </section>

      {/* Current Experience */}
      {currentJob && (
        <section className="current-experience">
          <h3>Current Position</h3>
          <div className="job-info">
            <h4>
              {currentJob.position} at {currentJob.company}
            </h4>
            <p className="duration">{currentJob.duration}</p>
            <p className="location">{currentJob.location}</p>
            <p className="description">{currentJob.description}</p>

            <div className="technologies">
              <h5>Technologies Used:</h5>
              <div className="tech-tags">
                {currentJob.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Frontend Skills */}
      <section className="skills-showcase">
        <h3>Frontend Skills</h3>
        <div className="skills-grid">
          {frontendSkills.map((skill) => (
            <div key={skill.name} className="skill-item">
              <div className="skill-header">
                <i className={skill.icon}></i>
                <span className="skill-name">{skill.name}</span>
              </div>
              <div className="skill-progress">
                <div
                  className="progress-bar"
                  style={{
                    width: `${skill.level}%`,
                    backgroundColor: skill.color,
                  }}
                />
                <span className="skill-level">{skill.level}%</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="services">
        <h3>Services</h3>
        <div className="services-grid">
          {data.services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon">
                <i className={service.icon}></i>
              </div>
              <h4>{service.title}</h4>
              <p>{service.description}</p>
              <div className="service-features">
                <h5>Features:</h5>
                <ul>
                  {service.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education Timeline */}
      <section className="education">
        <h3>Education</h3>
        <div className="timeline">
          {data.education.map((edu) => (
            <div key={edu.id} className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h4>{edu.degree}</h4>
                <h5>{edu.institution}</h5>
                <span className="duration">{edu.duration}</span>
                <p>{edu.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Blog Posts */}
      <section className="blog">
        <h3>Recent Blog Posts</h3>
        <div className="blog-grid">
          {data.blog.slice(0, 3).map((post) => (
            <article key={post.id} className="blog-card">
              <img src={post.image} alt={post.title} />
              <div className="blog-content">
                <span className="blog-category">{post.category}</span>
                <h4>{post.title}</h4>
                <p>{post.excerpt}</p>
                <div className="blog-meta">
                  <span className="read-time">{post.readTime}</span>
                  <span className="publish-date">{post.publishDate}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default PortfolioExample
