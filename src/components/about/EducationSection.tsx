import React, { useMemo } from 'react'
import { useTranslation } from '../../localization/localize'
import { useEducation } from '../../stores/portfolioStore'
import { TextReveal } from '../common/TextReveal'
import { education } from './about.css'
import { ActivityTimeline } from './ActivityTimeline'

export const EducationSection: React.FC = () => {
  const educationData = useEducation()
  const { t } = useTranslation()

  const items = useMemo(
    () =>
      (educationData ?? []).map((item, index) => ({
        id: `edu-${index}`,
        timeSpan: item.duration,
        title: item.degree,
        body: item.description,
      })),
    [educationData],
  )

  return (
    <ActivityTimeline
      heading={t('about.sections.education')}
      containerClassName={`${education} padd-15`}
    >
      {items.map((item) => (
        <ActivityTimeline.Item key={item.id}>
          <ActivityTimeline.Item.TimeSpan>{item.timeSpan}</ActivityTimeline.Item.TimeSpan>
          <ActivityTimeline.Item.Title>
            <TextReveal>{item.title}</TextReveal>
          </ActivityTimeline.Item.Title>
          <ActivityTimeline.Item.Body>
            <TextReveal>{item.body}</TextReveal>
          </ActivityTimeline.Item.Body>
        </ActivityTimeline.Item>
      ))}
    </ActivityTimeline>
  )
}
