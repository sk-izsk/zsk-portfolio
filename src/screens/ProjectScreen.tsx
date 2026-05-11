import { ProjectFilterBar } from '@components/projects/ProjectFilterBar'
import {
  projectGrid,
  projectHeading,
  projectHeadingTitle,
  projectToolbar,
} from '@components/projects/projects.css'
import { Screen } from '@components/Screen'
import { useAnalytics } from '@hooks/useAnalytics'
import { useProjectTagFilteredProjects } from '@hooks/project/useProjectTagFilteredProjects'
import { useSelectedProjectTagFilters } from '@hooks/project/useSelectedProjectTagFilters'
import { useTranslation } from '@localization/localize'
import { usePortfolioError, usePortfolioLoading, useProjects } from '@stores/portfolioStore'
import React, { useState } from 'react'
import { ProjectCardContainer } from '@components/projects/ProjectCardContainer'
import { ProjectModalContainer } from '@components/projects/ProjectModalContainer'
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
                <ProjectFilterBar
                  projects={projects}
                  selectedTags={selectedTags}
                  onSelectedTagsChange={setSelectedTags}
                />
              </div>
            </div>
          </div>
          <div className={`${projectGrid} padd-15`}>
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
