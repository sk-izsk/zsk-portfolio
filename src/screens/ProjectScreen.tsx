import { Modal } from '@components/common/modal/Modal'
import { ProjectCard } from '@components/projects/ProjectCard'
import {
  projectFilter,
  projectGrid,
  projectHeading,
  projectHeadingTitle,
  projectToolbar,
} from '@components/projects/projects.css'
import { ProjectTypeDropdown } from '@components/projects/ProjectTypeDropdown'
import { Screen } from '@components/Screen'
import { useAnalytics } from '@hooks/useAnalytics'
import { useTranslation } from '@localization/localize'
import { usePortfolioError, usePortfolioLoading, useProjects } from '@stores/portfolioStore'
import { trackGaEvent, trackMixpanelEvent } from '@utils/analytics'
import React, { useState } from 'react'
import { useProjectTypeFilteredProjects } from '../hooks/project/useProjectTypeFilteredProjects'
import type { Project } from '../types/portfolio'

const ProjectScreen: React.FC = () => {
  const projects = useProjects()
  const loading = usePortfolioLoading()
  const error = usePortfolioError()
  const { t } = useTranslation()
  useAnalytics()

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filteredProjects = useProjectTypeFilteredProjects()

  return (
    <Screen
      sectionId="projects"
      sectionClassName="projects"
      isLoading={loading}
      isError={Boolean(error || !projects)}
      title={t('projects.title')}
      description={t('projects.seoDescription')}
      canonical="/projects"
    >
      {projects && (
        <>
          <div className="row">
            <div className={`${projectHeading} padd-15`}>
              <div className={projectToolbar}>
                <h2 className={projectHeadingTitle}>{t('projects.heading')}</h2>
                <div className={projectFilter}>
                  <ProjectTypeDropdown />
                </div>
              </div>
            </div>
          </div>
          <div className={`${projectGrid} padd-15`}>
            {filteredProjects.map((project) => {
              return (
                <ProjectCard key={project.id}>
                  <ProjectCard.TimeLink
                    category={project.category}
                    publishDate={project.publishDate}
                  />
                  <ProjectCard.Title href={project.projectHref} isExternal={project.isExternal}>
                    {project.title}
                  </ProjectCard.Title>
                  <ProjectCard.Body shortDescription={project.shortDescription} highlights={[]} />
                  <ProjectCard.Tags projectId={project.id} tags={project.tags} />
                  <ProjectCard.ReadMore
                    href={project.projectHref}
                    isExternal={project.isExternal}
                    onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                      e.preventDefault()
                      trackGaEvent('Projects', 'read_more_click', project.title)
                      trackMixpanelEvent('read_more_click', 'Projects', project.title)
                      setSelectedProject(project)
                      setModalOpen(true)
                    }}
                  />
                </ProjectCard>
              )
            })}
          </div>
          {selectedProject && (
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
              <Modal.Title onClose={() => setModalOpen(false)}>{selectedProject.title}</Modal.Title>
              <Modal.Body>
                <Modal.Description>{selectedProject?.shortDescription}</Modal.Description>
                <Modal.Highlights>
                  {selectedProject.highlights?.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </Modal.Highlights>
              </Modal.Body>
              <Modal.Footer
                link={selectedProject.url}
                demoLink={selectedProject.demo_link}
                onClose={() => setModalOpen(false)}
              />
            </Modal>
          )}
        </>
      )}
    </Screen>
  )
}

export default ProjectScreen
