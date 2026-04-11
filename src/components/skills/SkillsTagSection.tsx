import type { LucideIcon } from 'lucide-react'
import React from 'react'
import { Tag } from '@components/tag/Tag'
import {
  skillCategoryContainer,
  skillCategoryTitle,
  skillsHeadingIcon,
  skillsHeadingIconGapMd,
  skillsList,
} from '@components/skills/skills.css'

interface SkillsTagSectionProps {
  icon: LucideIcon
  titleText: string
  tags: string[]
}

export const SkillsTagSection: React.FC<SkillsTagSectionProps> = ({ icon, titleText, tags }) => {
  const Icon = icon

  if (tags.length === 0) {
    return null
  }

  return (
    <div className="row">
      <div className={`${skillCategoryContainer} padd-15`}>
        <h3 className={skillCategoryTitle}>
          <Icon
            className={`${skillsHeadingIcon} ${skillsHeadingIconGapMd}`}
            size={22}
            strokeWidth={2.25}
          />
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
