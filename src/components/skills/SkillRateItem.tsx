import React from 'react'
import {
  progress,
  progressIn,
  progressInWidth,
  skillPercent,
  skillsItem,
  skillsItemH5,
} from '../about/about.css'

interface SkillRateItemProps {
  name: string
  level: number
}

export const SkillRateItem: React.FC<SkillRateItemProps> = ({ name, level }) => {
  const boundedLevel = Math.max(0, Math.min(100, Math.round(level)))

  return (
    <div className={`${skillsItem} padd-15`}>
      <h5 className={skillsItemH5}>{name}</h5>
      <div className={progress}>
        <div className={`${progressIn} ${progressInWidth[boundedLevel]}`}></div>
        <div className={skillPercent}>{level}%</div>
      </div>
    </div>
  )
}
