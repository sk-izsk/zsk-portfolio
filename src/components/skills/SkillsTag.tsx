import {
  faCode,
  faCog,
  faGraduationCap,
  faLaptopCode,
  faServer,
  faVial,
} from "@fortawesome/free-solid-svg-icons"
import React from "react"
import { useSkills } from "../../stores/portfolioStore"
import { SkillsTagSection } from "./SkillsTagSection"

export const SkillsTag: React.FC = () => {
  const categories = useSkills()?.categories

  if (!categories) {
    return null
  }

  return (
    <>
      <SkillsTagSection
        icon={faLaptopCode}
        titleText="Frontend Development"
        tags={categories.frontend ?? []}
      />
      <SkillsTagSection
        icon={faServer}
        titleText="Backend Development"
        tags={categories.backend ?? []}
      />
      <SkillsTagSection
        icon={faCode}
        titleText="Programming Languages"
        tags={categories.languages ?? []}
      />
      <SkillsTagSection
        icon={faCog}
        titleText="Development Tools"
        tags={categories.tools ?? []}
      />
      <SkillsTagSection
        icon={faVial}
        titleText="Testing Frameworks"
        tags={categories.testing ?? []}
      />
      <SkillsTagSection
        icon={faGraduationCap}
        titleText="Currently Learning"
        tags={categories.learning ?? []}
      />
    </>
  )
}
