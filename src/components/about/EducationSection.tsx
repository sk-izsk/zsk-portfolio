import React from "react"
import { useEducation } from "../../stores/portfolioStore"
import { education } from "./about.css"
import { ActivityTimeline } from "./ActivityTimeline"

export const EducationSection: React.FC = () => {
  const educationData = useEducation() ?? []

  const items = educationData.map((item, index) => ({
    id: `edu-${index}`,
    duration: item.duration,
    heading: item.degree,
    description: item.description,
  }))

  return (
    <ActivityTimeline
      heading="Education"
      containerClassName={`${education} padd-15`}
      items={items}
    />
  )
}
