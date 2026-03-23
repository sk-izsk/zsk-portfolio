import React, { useState } from 'react'
import { useTranslation } from '../../localization/localize'
import { useExperience } from '../../stores/portfolioStore'
import { Modal } from '../common/Modal'
import { ProjectCard } from '../projects/ProjectCard'
import { experience as experienceClass } from './about.css'
import { ActivityTimeline } from './ActivityTimeline'

export const ExperienceSection: React.FC = () => {
  const experienceData = useExperience() || []
  const { t } = useTranslation()
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedExperience, setSelectedExperience] = useState<(typeof experienceData)[0] | null>(
    null,
  )

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
                  setSelectedExperience(item)
                  setModalOpen(true)
                }}
              />
            </div>
          </ActivityTimeline.Item>
        ))}
        {selectedExperience && (
          <Modal
            open={modalOpen}
            onClose={() => {
              setModalOpen(false)
              setSelectedExperience(null)
            }}
          >
            <Modal.Title>{`${selectedExperience.position} at ${selectedExperience.company}`}</Modal.Title>
            <Modal.Description>{selectedExperience.description}</Modal.Description>
            {selectedExperience.highlights && selectedExperience.highlights.length > 0 && (
              <Modal.Highlights>
                {selectedExperience.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </Modal.Highlights>
            )}
            <div style={{ width: '100%' }}>
              <Modal.Footer
                onClose={() => {
                  setModalOpen(false)
                  setSelectedExperience(null)
                }}
              />
            </div>
          </Modal>
        )}
      </ActivityTimeline>
    </>
  )
}
