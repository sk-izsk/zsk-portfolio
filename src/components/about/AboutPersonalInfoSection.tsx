import dayjs from "dayjs"
import React from "react"
import { useTranslation } from "react-i18next"
import { useContactInfo, usePersonalInfo } from "../../stores/portfolioStore"
import {
  btnMargin,
  buttons,
  infoItem,
  infoItemP,
  infoItemSpan,
  personalInfoSection,
} from "./about.css"

export const AboutPersonalInfoSection: React.FC = () => {
  const { t, i18n } = useTranslation()
  const personalInfo = usePersonalInfo()
  const contact = useContactInfo()

  if (!personalInfo || !contact) {
    return null
  }

  const birthday = dayjs(personalInfo.birthday)
  const ageInYears = dayjs().diff(birthday, "year")

  const personalInfoData = [
    {
      label: t("about.info.birthday"),
      value: birthday.isValid()
        ? new Date(personalInfo.birthday).toLocaleDateString(
            i18n.resolvedLanguage === "fr" ? "fr-FR" : "en-US",
            {
              month: "long",
              day: "numeric",
              year: "numeric",
            },
          )
        : t("about.info.notAvailable"),
    },
    { label: t("about.info.age"), value: ageInYears },
    { label: t("about.info.website"), value: contact.social.website.label },
    { label: t("about.info.email"), value: contact.email },
    { label: t("about.info.phone"), value: contact.phone },
    { label: t("about.info.city"), value: personalInfo.location.city },
    {
      label: t("about.info.availability"),
      value: personalInfo.availability.join(", "),
    },
    {
      label: t("about.info.languages"),
      value: personalInfo.languages.join(", "),
    },
  ]

  return (
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
              {t("about.actions.downloadCv")}
            </a>
            <a href="#contact" className={`btn hire-me ${btnMargin}`}>
              {t("about.actions.hireMe")}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
