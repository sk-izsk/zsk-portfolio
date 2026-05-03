import { experience as experienceClass, readMoreTrigger } from '@components/about/about.css'
import { ActivityTimeline } from '@components/about/ActivityTimeline'
import { Modal } from '@components/common/modal/Modal'
import { TextReveal } from '@components/common/textReveal/TextReveal'
import { ProjectCard } from '@components/projects/ProjectCard'
import { useTranslation } from '@localization/localize'
import { useExperience } from '@stores/portfolioStore'
import { trackGaEvent, trackMixpanelEvent } from '@utils/analytics'
import React, { useState } from 'react'

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
        {experienceData.slice(0, 4).map((item) => (
          <ActivityTimeline.Item key={item.company + item.position + item.duration}>
            <ActivityTimeline.Item.TimeSpan>{item.duration}</ActivityTimeline.Item.TimeSpan>
            <ActivityTimeline.Item.Title>
              <TextReveal>{`${item.position} at ${item.company}`}</TextReveal>
            </ActivityTimeline.Item.Title>
            <ActivityTimeline.Item.Body>
              <TextReveal>{item.description}</TextReveal>
            </ActivityTimeline.Item.Body>
            <div
              className={readMoreTrigger}
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
              <ProjectCard.Button
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
              >
                {' '}
                {t('projects.readMore')}
              </ProjectCard.Button>
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
