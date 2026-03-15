import React from "react"
import { useExperience } from "../../stores/portfolioStore"
import { experience } from "./about.css"
import { ActivityTimeline } from "./ActivityTimeline"

export const ExperienceSection: React.FC = () => {
  const experienceData = useExperience() ?? []

  const items = experienceData.slice(0, 3).map((item, index) => ({
    id: `exp-${index}`,
    duration: item.duration,
    heading: `${item.position} at ${item.company}`,
    description: item.description,
  }))

  return (
    <ActivityTimeline
      heading="Experience"
      containerClassName={`${experience} padd-15`}
      items={items}
    />
  )
}
