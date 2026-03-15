import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { useSkills } from "../../stores/portfolioStore"
import { title } from "../about/about.css"
import { SkillRateItem } from "./SkillRateItem"
import { skillsSection } from "./skills.css"

interface SkillsRateSectionProps {
  icon: IconDefinition
  titleText: string
  category: "frontend" | "backend" | "language" | "tools"
}

export const SkillsRateSection: React.FC<SkillsRateSectionProps> = ({
  icon,
  titleText,
  category,
}) => {
  const skillsData = useSkills()
  const skills =
    skillsData?.technical?.filter((skill) => skill.category === category) ?? []

  return (
    <div className={`${skillsSection} padd-15`}>
      <h3 className={title}>
        <FontAwesomeIcon icon={icon} style={{ marginRight: "8px" }} />
        {titleText}
      </h3>
      <div className="row">
        {skills.map((skill, index) => (
          <SkillRateItem
            key={`${skill.name}-${index}`}
            name={skill.name}
            level={skill.level}
          />
        ))}
      </div>
    </div>
  )
}
