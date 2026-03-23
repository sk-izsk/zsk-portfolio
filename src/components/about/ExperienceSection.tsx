import React, { useState } from 'react'
import { useTranslation } from '../../localization/localize'
import { useExperience } from '../../stores/portfolioStore'
import type { Experience } from '../../types/portfolio'
import { ProjectModal } from '../common/ProjectModal'
import { ProjectCard } from '../projects/ProjectCard'
import { experience as experienceClass } from './about.css'
import { ActivityTimeline } from './ActivityTimeline'

  const experienceData: Experience[] = useExperience() || []
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
              <ProjectModal open={true} onClose={() => setOpenIdx(null)} project={{} as any}>
                <ProjectModal.Title>{`${item.position} at ${item.company}`}</ProjectModal.Title>
                <ProjectModal.Description>{item.description}</ProjectModal.Description>
                {item.highlights && item.highlights.length > 0 && (
                  <ProjectModal.Highlights>
                    {item?.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ProjectModal.Highlights>
                )}
                {/* Footer: Only Close button, no Project Link */}
                <div style={{ width: '100%' }}>
                  <ProjectModal.Footer link={'' as any} onClose={() => setOpenIdx(null)} />
                </div>
              </ProjectModal>
            )}
          </ActivityTimeline.Item>
        ))}
      </ActivityTimeline>
    </>
  )
}
