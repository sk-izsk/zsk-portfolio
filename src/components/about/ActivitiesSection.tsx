import React from 'react'
import { EducationSection } from '@components/about/EducationSection'
import { ExperienceSection } from '@components/about/ExperienceSection'

export const ActivitiesSection: React.FC = () => {
  return (
    <div className="row">
      <ExperienceSection />
      <EducationSection />
    </div>
  )
}
