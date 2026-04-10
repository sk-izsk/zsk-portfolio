import React, { useState } from 'react'
import { trackGaEvent, trackMixpanelEvent } from '../../hooks/useAnalytics'
import { useTranslation } from '../../localization/localize'
import { useExperience } from '../../stores/portfolioStore'
import { Modal } from '../common/Modal'
import { TextReveal } from '../common/TextReveal'
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
        {experienceData.slice(0, 3).map((item) => (
          <ActivityTimeline.Item key={item.company + item.position + item.duration}>
            <ActivityTimeline.Item.TimeSpan>{item.duration}</ActivityTimeline.Item.TimeSpan>
            <ActivityTimeline.Item.Title>
              <TextReveal>{`${item.position} at ${item.company}`}</TextReveal>
            </ActivityTimeline.Item.Title>
            <ActivityTimeline.Item.Body>
              <TextReveal>{item.description}</TextReveal>
            </ActivityTimeline.Item.Body>
            <div
              style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-start' }}
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.preventDefault()
                setSelectedExperience(item)
                setModalOpen(true)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedExperience(item)
                  setModalOpen(true)
                }
              }}
            >
              <ProjectCard.ReadMore
                href="#"
                isExternal={false}
                onClick={(e) => {
                  e.preventDefault()
                  const label = `${item.position} at ${item.company}`
                  trackGaEvent('About', 'read_more_click', label)
                  trackMixpanelEvent('read_more_click', 'About', label)
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
            <Modal.Body>
              <Modal.Description>{selectedExperience.description}</Modal.Description>
              {selectedExperience.highlights && selectedExperience.highlights.length > 0 && (
                <Modal.Highlights>
                  {selectedExperience.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </Modal.Highlights>
              )}
            </Modal.Body>
            <Modal.Footer
              onClose={() => {
                setModalOpen(false)
                setSelectedExperience(null)
              }}
            />
          </Modal>
        )}
      </ActivityTimeline>
    </>
  )
}
