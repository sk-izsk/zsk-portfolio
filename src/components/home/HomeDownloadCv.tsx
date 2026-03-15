import React from "react"
import { usePersonalInfo } from "../../stores/portfolioStore"

export const HomeDownloadCv: React.FC = () => {
  const personalInfo = usePersonalInfo()

  if (!personalInfo) {
    return null
  }

  return (
    <a
      href={personalInfo.resume_link}
      className="btn"
      target="_blank"
      rel="noopener noreferrer"
    >
      Download CV
    </a>
  )
}
