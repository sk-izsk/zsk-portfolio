import React, { useMemo, useState } from 'react'
import { ProjectModal } from '../components/common/ProjectModal'
import { ProjectCard } from '../components/projects/ProjectCard'
import {
  projectGrid,
  projectHeading,
  projectHeadingTitle,
} from '../components/projects/projects.css'
import { Screen } from '../components/Screen'
import { useTranslation } from '../localization/localize'
import { usePortfolioError, usePortfolioLoading, useProjects } from '../stores/portfolioStore'

const ProjectScreen: React.FC = () => {
  const projects = useProjects()
  const loading = usePortfolioLoading()
  const error = usePortfolioError()
  const { t } = useTranslation()

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
        }
      }),
    [projects],
  )

  return (
    <Screen
      sectionId="projects"
      sectionClassName="projects"
      isLoading={loading}
      isError={Boolean(error || !projects)}
      title={t('projects.title')}
    >
      {projects && (
        <>
          <div className="row">
            <div className={`${projectHeading} padd-15`}>
              <h2 className={projectHeadingTitle}>{t('projects.heading')}</h2>
            </div>
          </div>
          <div className={`${projectGrid} padd-15`}>
            {projectViewModels.map((project) => {
              return (
                <ProjectCard key={project.id}>
                  <ProjectCard.TimeLink
                    category={project.category}
                    publishDate={project.publishDate}
                    href={project.projectHref}
                    isExternal={project.isExternal}
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
                      setSelectedProject(project)
                      setModalOpen(true)
                    }}
                  />
                </ProjectCard>
              )
            })}
          </div>
          {selectedProject && (
            <ProjectModal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              project={selectedProject}
            >
              <ProjectModal.Title onClose={() => setModalOpen(false)}>
                {selectedProject.title}
              </ProjectModal.Title>
              <ProjectModal.Body>
                <ProjectModal.Description>
                  {selectedProject?.shortDescription}
                </ProjectModal.Description>
                <ProjectModal.Highlights>
                  {selectedProject.highlights?.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ProjectModal.Highlights>
              </ProjectModal.Body>
              <ProjectModal.Footer
                link={selectedProject.projectHref}
                onClose={() => setModalOpen(false)}
              />
            </ProjectModal>
          )}
        </>
      )}
    </Screen>
  )
}

export default ProjectScreen
