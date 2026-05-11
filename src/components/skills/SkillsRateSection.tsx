import type { LucideIcon } from 'lucide-react'
import React from 'react'
import { useSkills } from '@stores/portfolioStore'
import { title } from '@components/about/about.css'
import { SkillRateItem } from '@components/skills/SkillRateItem'
import {
  skillsHeading,
  skillsHeadingIcon,
  skillsHeadingIconGapSm,
  skillsSection,
} from '@components/skills/skills.css'
import { cx } from '@utils/cn'

interface SkillsRateSectionProps {
  icon: LucideIcon
  titleText: string
  category: 'frontend' | 'backend' | 'language' | 'tools'
}

export const SkillsRateSection: React.FC<SkillsRateSectionProps> = ({
  icon,
  titleText,
  category,
}) => {
  const Icon = icon
  const skillsData = useSkills()
  const skills = skillsData?.technical?.filter((skill) => skill.category === category) ?? []

  return (
    <div className={cx(skillsSection, 'padd-15')}>
      <h3 className={cx(title, skillsHeading)}>
        <Icon className={cx(skillsHeadingIcon, skillsHeadingIconGapSm)} size={22} strokeWidth={2.25} />
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
