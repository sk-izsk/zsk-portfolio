import React, { useState } from 'react'
import { useTranslation } from '../../localization/localize'
import { useExperience } from '../../stores/portfolioStore'
import { Modal } from '../common/ProjectModal'
import { ProjectCard } from '../projects/ProjectCard'
import { experience as experienceClass } from './about.css'
import { ActivityTimeline } from './ActivityTimeline'

export const ExperienceSection: React.FC = () => {
  const experienceData = useExperience() || []
  const { t } = useTranslation()
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <>
      <ActivityTimeline
        heading={t('about.sections.experience')}
        containerClassName={`${experienceClass} padd-15`}
      >
        {experienceData.slice(0, 3).map((item, idx) => (
          <ActivityTimeline.Item key={item.company + idx}>
            <ActivityTimeline.Item.TimeSpan>{item.duration}</ActivityTimeline.Item.TimeSpan>
            <ActivityTimeline.Item.Title>{`${item.position} at ${item.company}`}</ActivityTimeline.Item.Title>
            <ActivityTimeline.Item.Body>{item.description}</ActivityTimeline.Item.Body>
            <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-start' }}>
              <ProjectCard.ReadMore
                href="#"
                isExternal={false}
                onClick={(e) => {
                  e.preventDefault()
                  setOpenIdx(idx)
                }}
              />
            </div>
            {openIdx === idx && (
              <Modal open={true} onClose={() => setOpenIdx(null)}>
                <Modal.Title>{`${item.position} at ${item.company}`}</Modal.Title>
                <Modal.Description>{item.description}</Modal.Description>
                {item.highlights && item.highlights.length > 0 && (
                  <Modal.Highlights>
                    {item?.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </Modal.Highlights>
                )}
                {/* Footer: Only Close button, no Project Link */}
                <div style={{ width: '100%' }}>
                  <Modal.Footer onClose={() => setOpenIdx(null)} />
                </div>
              </Modal>
            )}
          </ActivityTimeline.Item>
        ))}
      </ActivityTimeline>
    </>
  )
}
