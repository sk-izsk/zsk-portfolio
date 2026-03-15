import {
  faCode,
  faCog,
  faLaptopCode,
  faServer,
} from "@fortawesome/free-solid-svg-icons"
import React from "react"
import { useTranslation } from "react-i18next"
import { SkillsRateSection } from "./SkillsRateSection"

export const SkillsRate: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <div className="row">
        <SkillsRateSection
          icon={faLaptopCode}
          titleText={t("skills.rate.frontend")}
          category="frontend"
        />
        <SkillsRateSection
          icon={faServer}
          titleText={t("skills.rate.backend")}
          category="backend"
        />
      </div>
      <div className="row">
        <SkillsRateSection
          icon={faCode}
          titleText={t("skills.rate.languages")}
          category="language"
        />
        <SkillsRateSection
          icon={faCog}
          titleText={t("skills.rate.tools")}
          category="tools"
        />
      </div>
    </>
  )
}
