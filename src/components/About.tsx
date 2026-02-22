import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useTitle } from "ahooks"
import React from "react"
import {
  useContactInfo,
  useEducation,
  useExperience,
  usePersonalInfo,
  usePortfolioError,
  usePortfolioLoading,
  useSkills,
} from "../stores/portfolioStore"

const About: React.FC = () => {
  const personalInfo = usePersonalInfo()
  const contact = useContactInfo()
  const skills = useSkills()
  const education = useEducation()
  const experience = useExperience()
  const loading = usePortfolioLoading()
  const error = usePortfolioError()

  // Update page title
  useTitle("About - ZSK Portfolio")

  if (loading) {
    return (
      <section className="about section active" id="about">
        <div className="container">
          <div className="loading">Loading...</div>
        </div>
      </section>
    )
  }

  if (error || !personalInfo || !contact) {
    return (
      <section className="about section active" id="about">
        <div className="container">
          <div className="error">Error loading data</div>
        </div>
      </section>
    )
  }

  const personalInfoData = [
    {
      label: "Birthday",
      value: new Date(personalInfo.birthday).toLocaleDateString(),
    },
    { label: "Age", value: personalInfo.age.toString() },
    { label: "Website", value: contact.social.website.label },
    { label: "Email", value: contact.email },
    { label: "Phone", value: contact.phone },
    { label: "City", value: personalInfo.location.city },
    { label: "Freelance", value: personalInfo.availability.status },
    { label: "Languages", value: personalInfo.languages.join(", ") },
  ]

  return (
    <section className="about section active" id="about">
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
                  I'm {personalInfo.name.split(" ")[0]} and{" "}
                  <span>{personalInfo.title}</span>
                </h3>
                <p>{personalInfo.detailedBio}</p>
              </div>
            </div>
            <div className="row">
              <div className="personal-info padd-15">
                <div className="row">
                  {personalInfoData.map((item, index) => (
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
                  {skills?.technical.slice(0, 6).map((skill, index) => (
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
                      {education?.map((item, index) => (
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
                      {experience?.slice(0, 3).map((item, index) => (
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
