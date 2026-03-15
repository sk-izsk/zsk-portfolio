import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Tag } from "../Tag/Tag"
import {
  skillCategoryContainer,
  skillCategoryTitle,
  skillsList,
} from "./skills.css"

interface SkillsTagSectionProps {
  icon: "laptop-code" | "server" | "code" | "cog" | "vial" | "graduation-cap"
  titleText: string
  tags: string[]
}

export const SkillsTagSection: React.FC<SkillsTagSectionProps> = ({
  icon,
  titleText,
  tags,
}) => {
  if (tags.length === 0) {
    return null
  }

  return (
    <div className="row">
      <div className={`${skillCategoryContainer} padd-15`}>
        <h3 className={skillCategoryTitle}>
          <FontAwesomeIcon icon={icon} style={{ marginRight: "10px" }} />
          {titleText}
        </h3>
        <div className={skillsList}>
          {tags.map((tag) => (
            <Tag key={`${titleText}-${tag}`} label={tag} />
          ))}
        </div>
      </div>
    </div>
  )
}
