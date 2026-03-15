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
        icon="laptop-code"
        titleText="Frontend Development"
        tags={categories.frontend ?? []}
      />
      <SkillsTagSection
        icon="server"
        titleText="Backend Development"
        tags={categories.backend ?? []}
      />
      <SkillsTagSection
        icon="code"
        titleText="Programming Languages"
        tags={categories.languages ?? []}
      />
      <SkillsTagSection
        icon="cog"
        titleText="Development Tools"
        tags={categories.tools ?? []}
      />
      <SkillsTagSection
        icon="vial"
        titleText="Testing Frameworks"
        tags={categories.testing ?? []}
      />
      <SkillsTagSection
        icon="graduation-cap"
        titleText="Currently Learning"
        tags={categories.learning ?? []}
      />
    </>
  )
}
