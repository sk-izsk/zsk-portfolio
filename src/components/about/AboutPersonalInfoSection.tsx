import { useContactInfo, usePersonalInfo } from "../../stores/portfolioStore"
import dayjs from "dayjs"
import React from "react"
import {
  btnMargin,
  buttons,
  infoItem,
  infoItemP,
  infoItemSpan,
  personalInfoSection,
} from "./about.css"

export const AboutPersonalInfoSection: React.FC = () => {
  const personalInfo = usePersonalInfo()
  const contact = useContactInfo()

  if (!personalInfo || !contact) {
    return null
  }

  const birthday = dayjs(personalInfo.birthday)
  const ageInYears = dayjs().diff(birthday, "year")

  const personalInfoData = [
    {
      label: "Birthday",
      value: birthday.isValid() ? birthday.format("MMMM D, YYYY") : "N/A",
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
    <div className="row">
      <div className={`${personalInfoSection} padd-15`}>
        <div className="row">
          {personalInfoData.map((item, index) => (
            <div key={index} className={`${infoItem} padd-15`}>
              <p className={infoItemP}>
                {item.label} : <span className={infoItemSpan}>{item.value}</span>
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
  )
}