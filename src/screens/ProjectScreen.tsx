import { ProjectCardContainer } from '@components/projects/ProjectCardContainer'
import { ProjectFilterBar } from '@components/projects/ProjectFilterBar'
import { ProjectModalContainer } from '@components/projects/ProjectModalContainer'
import { projectGrid, projectHeading, projectToolbar } from '@components/projects/projects.css'
import { Screen } from '@components/Screen'
import { useProjectTagFilteredProjects } from '@hooks/project/useProjectTagFilteredProjects'
import { useSelectedProjectTagFilters } from '@hooks/project/useSelectedProjectTagFilters'
import { useAnalytics } from '@hooks/useAnalytics'
import { useTranslation } from '@localization/localize'
import { usePortfolioError, usePortfolioLoading, useProjects } from '@stores/portfolioStore'
import { cx } from '@utils/cn'
import React, { useState } from 'react'
import type { FilterProjectType } from '../hooks/project/useProjectTypeFilteredProjects'

const ProjectScreen: React.FC = () => {
  const projects = useProjects()
  const loading = usePortfolioLoading()
  const error = usePortfolioError()
  const { t } = useTranslation()
  useAnalytics()

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<FilterProjectType | null>(null)

  const [selectedTags, setSelectedTags] = useSelectedProjectTagFilters()
  const filteredProjects = useProjectTagFilteredProjects(selectedTags)

  return (
    <Screen
      sectionId="projects"
      sectionClassName="projects"
      contentProtected
      isLoading={loading}
      isError={Boolean(error || !projects)}
      title={t('projects.title')}
      description={t('projects.seoDescription')}
      canonical="/projects"
    >
      {projects && (
        <>
          <div className="row">
            <div className={cx(projectHeading, 'padd-15')}>
              <div className={projectToolbar}>
                <ProjectFilterBar
                  projects={projects}
                  selectedTags={selectedTags}
                  onSelectedTagsChange={setSelectedTags}
                />
              </div>
            </div>
          </div>
          <div className={cx(projectGrid, 'padd-15')}>
            {filteredProjects.map((project) => {
              return (
                <ProjectCardContainer
                  key={project.id}
                  project={project}
                  onReadMoreClick={(project) => {
                    setSelectedProject(project)
                    setModalOpen(true)
                  }}
                />
              )
            })}
          </div>
          {selectedProject && (
            <ProjectModalContainer
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              project={selectedProject}
            />
          )}
        </>
      )}
    </Screen>
  )
}

export default ProjectScreen
