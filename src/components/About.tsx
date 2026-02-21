import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { usePortfolioData } from "../hooks/usePortfolioData"

interface AboutProps {
  isActive: boolean
}

const About: React.FC<AboutProps> = ({ isActive }) => {
  const { loading, data, error } = usePortfolioData()

  if (loading) {
    return (
      <section
        className={`about section ${isActive ? "active" : ""}`}
        id="about"
      >
        <div className="container">
          <div className="loading">Loading...</div>
        </div>
      </section>
    )
  }

  if (error || !data) {
    return (
      <section
        className={`about section ${isActive ? "active" : ""}`}
        id="about"
      >
        <div className="container">
          <div className="error">Error loading data</div>
        </div>
      </section>
    )
  }

  const personalInfo = [
    {
      label: "Birthday",
      value: new Date(data.personalInfo.birthday).toLocaleDateString(),
    },
    { label: "Age", value: data.personalInfo.age.toString() },
    { label: "Website", value: data.contact.social.website.label },
    { label: "Email", value: data.contact.email },
    { label: "Phone", value: data.contact.phone },
    { label: "City", value: data.personalInfo.location.city },
    { label: "Freelance", value: data.personalInfo.availability.status },
    { label: "Languages", value: data.personalInfo.languages.join(", ") },
  ]

  return (
    <section className={`about section ${isActive ? "active" : ""}`} id="about">
      <div className="container">
        <div className="row">
          <div className="section-title padd-15">
            <h2>About Me</h2>
          </div>
        </div>
        <div className="row">
          <div className="about-content padd-15">
            <div className="row">
              <div className="about-text padd-15">
                <h3>
                  I'm {data.personalInfo.name.split(" ")[0]} and{" "}
                  <span>{data.personalInfo.title}</span>
                </h3>
                <p>{data.personalInfo.detailedBio}</p>
              </div>
            </div>
            <div className="row">
              <div className="personal-info padd-15">
                <div className="row">
                  {personalInfo.map((item, index) => (
                    <div key={index} className="info-item padd-15">
                      <p>
                        {item.label} : <span>{item.value}</span>
                      </p>
                    </div>
                  ))}
                </div>
                <div className="row">
                  <div className="buttons padd-15">
                    <a href="#" className="btn">
                      Download CV
                    </a>
                    <a href="#contact" className="btn hire-me">
                      Hire Me
                    </a>
                  </div>
                </div>
              </div>
              <div className="skills padd-15">
                <div className="row">
                  {data.skills.technical.slice(0, 6).map((skill, index) => (
                    <div key={index} className="skills-item padd-15">
                      <h5>{skill.name}</h5>
                      <div className="progress">
                        <div
                          className="progress-in"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                        <div className="skill-percent">{skill.level}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="education padd-15">
                <h3 className="title">Education</h3>
                <div className="row">
                  <div className="timeline-box padd-15">
                    <div className="timeline shadow-dark">
                      {data.education.map((item, index) => (
                        <div key={`edu-${index}`} className="timeline-item">
                          <div className="circle-dot"></div>
                          <h3 className="timeline-date">
                            <FontAwesomeIcon icon="calendar" /> {item.duration}
                          </h3>
                          <h4 className="timeline-title">{item.degree}</h4>
                          <p className="timeline-text">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="experience padd-15">
                <h3 className="title">Experience</h3>
                <div className="row">
                  <div className="timeline-box padd-15">
                    <div className="timeline shadow-dark">
                      {data.experience.slice(0, 3).map((item, index) => (
                        <div key={`exp-${index}`} className="timeline-item">
                          <div className="circle-dot"></div>
                          <h3 className="timeline-date">
                            <FontAwesomeIcon icon="calendar" /> {item.duration}
                          </h3>
                          <h4 className="timeline-title">
                            {item.position} at {item.company}
                          </h4>
                          <p className="timeline-text">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
