import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useTitle } from "ahooks"
import dayjs from "dayjs"
import React from "react"
import {
  useContactInfo,
  useEducation,
  useExperience,
  usePersonalInfo,
  usePortfolioError,
  usePortfolioLoading,
  useSkills,
} from "../../stores/portfolioStore"
import {
  aboutContent,
  aboutText,
  aboutTextH3,
  aboutTextP,
  aboutTextSpan,
  btnMargin,
  buttons,
  circleDot,
  education,
  experience,
  infoItem,
  infoItemP,
  infoItemSpan,
  personalInfoSection,
  timeline,
  timelineBox,
  timelineDate,
  timelineItem,
  timelineText,
  timelineTitle,
  title,
} from "./about.css"

const About: React.FC = () => {
  const personalInfo = usePersonalInfo()
  const contact = useContactInfo()
  const skillsData = useSkills()
  console.log("skillsData: ", skillsData)
  const educationData = useEducation()
  const experienceData = useExperience()
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

  // Calculate age for specific birthday: May 4, 1992
  const birthday = dayjs(personalInfo.birthday)
  const ageInYears = dayjs().diff(birthday, "year")

  const personalInfoData = [
    {
      label: "Birthday",
      value: birthday.format("MMMM D, YYYY"),
    },
    { label: "Age", value: ageInYears },
    { label: "Website", value: contact.social.website.label },
    { label: "Email", value: contact.email },
    { label: "Phone", value: contact.phone },
    { label: "City", value: personalInfo.location.city },
    { label: "Availability", value: personalInfo.availability.join(", ") },
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
          <div className={`${aboutContent} padd-15`}>
            <div className="row">
              <div className={`${aboutText} padd-15`}>
                <h3 className={aboutTextH3}>
                  I'm {personalInfo.name.split(" ")[0]} and{" "}
                  <span className={aboutTextSpan}>{personalInfo.title}</span>
                </h3>
                <p className={aboutTextP}>{personalInfo.detailedBio}</p>
              </div>
            </div>
            <div className="row">
              <div className={`${personalInfoSection} padd-15`}>
                <div className="row">
                  {personalInfoData.map((item, index) => (
                    <div key={index} className={`${infoItem} padd-15`}>
                      <p className={infoItemP}>
                        {item.label} :{" "}
                        <span className={infoItemSpan}>{item.value}</span>
                      </p>
                    </div>
                  ))}
                </div>
                <div className="row">
                  <div className={`${buttons} padd-15`}>
                    <a
                      href={personalInfo.resume_link}
                      className={`btn ${btnMargin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download CV
                    </a>
                    <a href="#contact" className={`btn hire-me ${btnMargin}`}>
                      Hire Me
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className={`${education} padd-15`}>
                <h3 className={title}>Education</h3>
                <div className="row">
                  <div className={`${timelineBox} padd-15`}>
                    <div className={`${timeline} shadow-dark`}>
                      {educationData?.map((item, index) => (
                        <div key={`edu-${index}`} className={timelineItem}>
                          <div className={circleDot}></div>
                          <h3 className={timelineDate}>
                            <FontAwesomeIcon icon="calendar" /> {item.duration}
                          </h3>
                          <h4 className={timelineTitle}>{item.degree}</h4>
                          <p className={timelineText}>{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${experience} padd-15`}>
                <h3 className={title}>Experience</h3>
                <div className="row">
                  <div className={`${timelineBox} padd-15`}>
                    <div className={`${timeline} shadow-dark`}>
                      {experienceData?.slice(0, 3).map((item, index) => (
                        <div key={`exp-${index}`} className={timelineItem}>
                          <div className={circleDot}></div>
                          <h3 className={timelineDate}>
                            <FontAwesomeIcon icon="calendar" /> {item.duration}
                          </h3>
                          <h4 className={timelineTitle}>
                            {item.position} at {item.company}
                          </h4>
                          <p className={timelineText}>{item.description}</p>
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
