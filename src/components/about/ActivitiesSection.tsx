import React from 'react'
import { EducationSection } from './EducationSection'
import { ExperienceSection } from './ExperienceSection'

export const ActivitiesSection: React.FC = () => {
  return (
    <div className="row">
      <ExperienceSection />
      <EducationSection />
    </div>
  )
}
