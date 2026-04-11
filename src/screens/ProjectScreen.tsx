import React, { useMemo, useState } from 'react'
import { Modal } from '../components/common/modal/Modal'
import { ProjectCard } from '../components/projects/ProjectCard'
import {
  projectFilter,
  projectGrid,
  projectHeading,
  projectHeadingTitle,
  projectToolbar,
} from '../components/projects/projects.css'
import { ProjectTypeDropdown } from '../components/projects/ProjectTypeDropdown'
import { Screen } from '../components/Screen'
import { trackGaEvent, trackMixpanelEvent, useAnalytics } from '../hooks/useAnalytics'
import { useHandleParams } from '../hooks/useHandleParams'
import { useTranslation } from '../localization/localize'
import { usePortfolioError, usePortfolioLoading, useProjects } from '../stores/portfolioStore'
import type { ProjectFilterType } from '../types/portfolio'

const projectFilterValues = [
  'all',
  'full-stack',
  'frontend',
  'backend',
  'library',
  'misc',
] as const satisfies readonly ProjectFilterType[]

const ProjectScreen: React.FC = () => {
  const projects = useProjects()
  const loading = usePortfolioLoading()
  const error = usePortfolioError()
  const { t } = useTranslation()
  useAnalytics()
  const { currentParams, updateParams, clearParams } = useHandleParams<{
    projectType: ProjectFilterType
  }>()

  const selectedProjectType: ProjectFilterType = projectFilterValues.includes(
    currentParams.projectType as ProjectFilterType,
  )
    ? (currentParams.projectType as ProjectFilterType)
    : 'all'

  const handleProjectTypeChange = (value: ProjectFilterType) => {
    if (value === 'all') {
      clearParams(['projectType'])
      return
    }

    updateParams({ projectType: value })
  }

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(
    null as null | (typeof projectViewModels)[0],
  )

  const projectViewModels = useMemo(
    () =>
      (projects ?? []).map((project) => {
        const projectHref = project.url || '#'
        return {
          ...project,
          projectHref,
          isExternal: projectHref.startsWith('http'),
          demoLink: project.demo_link ?? '',
        }
      }),
    [projects],
  )

  const filteredProjects = useMemo(() => {
    if (selectedProjectType === 'all') {
      return projectViewModels
    }

    return projectViewModels.filter((project) => project.projectType === selectedProjectType)
  }, [projectViewModels, selectedProjectType])

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
                <ProjectTypeDropdown
                  value={selectedProjectType}
                  onChange={handleProjectTypeChange}
                  className={projectFilter}
                />
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
                link={selectedProject.projectHref}
                demoLink={selectedProject.demoLink}
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
