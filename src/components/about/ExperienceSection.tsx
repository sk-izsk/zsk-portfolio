import React, { useMemo } from 'react'
import { useTranslation } from '../../localization/localize'
import { useExperience } from '../../stores/portfolioStore'
import { experience } from './about.css'
import { ActivityTimeline } from './ActivityTimeline'

export const ExperienceSection: React.FC = () => {
  const experienceData = useExperience()
  const { t } = useTranslation()

  const items = useMemo(() => {
    const data = experienceData ?? []
    return data.slice(0, 3).map((item, index) => ({
      id: `exp-${index}`,
      timeSpan: item.duration,
      title: `${item.position} at ${item.company}`,
      body: item.description,
    }))
  }, [experienceData])

  return (
    <ActivityTimeline
      heading={t('about.sections.experience')}
      containerClassName={`${experience} padd-15`}
    >
      {items.map((item) => (
        <ActivityTimeline.Item key={item.id}>
          <ActivityTimeline.Item.TimeSpan>{item.timeSpan}</ActivityTimeline.Item.TimeSpan>
          <ActivityTimeline.Item.Title>{item.title}</ActivityTimeline.Item.Title>
          <ActivityTimeline.Item.Body>{item.body}</ActivityTimeline.Item.Body>
        </ActivityTimeline.Item>
      ))}
    </ActivityTimeline>
  )
}
