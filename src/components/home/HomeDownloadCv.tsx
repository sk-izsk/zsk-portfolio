import React from "react"
import { useTranslation } from "react-i18next"
import { usePersonalInfo } from "../../stores/portfolioStore"

export const HomeDownloadCv: React.FC = () => {
  const personalInfo = usePersonalInfo()
  const { t } = useTranslation()

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
      {t("home.downloadCv")}
    </a>
  )
}
