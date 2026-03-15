import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { useSkills } from "../../stores/portfolioStore"
import { title } from "../About/about.css"
import { skillsSection } from "./skills.css"
import { SkillRateItem } from "./SkillRateItem"

interface SkillsRateSectionProps {
  icon: "laptop-code" | "server" | "code" | "cog"
  titleText: string
  category: "frontend" | "backend" | "language" | "tools"
}

export const SkillsRateSection: React.FC<SkillsRateSectionProps> = ({
  icon,
  titleText,
  category,
}) => {
  const skillsData = useSkills()
  const skills = skillsData?.technical?.filter((skill) => skill.category === category) ?? []

  return (
    <div className={`${skillsSection} padd-15`}>
      <h3 className={title}>
        <FontAwesomeIcon icon={icon} style={{ marginRight: "8px" }} />
        {titleText}
      </h3>
      <div className="row">
        {skills.map((skill, index) => (
          <SkillRateItem key={`${skill.name}-${index}`} name={skill.name} level={skill.level} />
        ))}
      </div>
    </div>
  )
}