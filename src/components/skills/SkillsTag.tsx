import {
  faCode,
  faCog,
  faGraduationCap,
  faLaptopCode,
  faServer,
  faVial,
} from "@fortawesome/free-solid-svg-icons"
import React from "react"
import { useTranslation } from "react-i18next"
import { useSkills } from "../../stores/portfolioStore"
import { SkillsTagSection } from "./SkillsTagSection"

export const SkillsTag: React.FC = () => {
  const { t } = useTranslation()
  const categories = useSkills()?.categories

  if (!categories) {
    return null
  }

  return (
    <>
      <SkillsTagSection
        icon={faLaptopCode}
        titleText={t("skills.tags.frontend")}
        tags={categories.frontend ?? []}
      />
      <SkillsTagSection
        icon={faServer}
        titleText={t("skills.tags.backend")}
        tags={categories.backend ?? []}
      />
      <SkillsTagSection
        icon={faCode}
        titleText={t("skills.tags.languages")}
        tags={categories.languages ?? []}
      />
      <SkillsTagSection
        icon={faCog}
        titleText={t("skills.tags.tools")}
        tags={categories.tools ?? []}
      />
      <SkillsTagSection
        icon={faVial}
        titleText={t("skills.tags.testing")}
        tags={categories.testing ?? []}
      />
      <SkillsTagSection
        icon={faGraduationCap}
        titleText={t("skills.tags.learning")}
        tags={categories.learning ?? []}
      />
    </>
  )
}
