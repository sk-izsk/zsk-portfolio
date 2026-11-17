import { ProjectCardContainer } from '@components/projects/ProjectCardContainer'
import { ProjectFilterBar } from '@components/projects/ProjectFilterBar'
import { ProjectModalContainer } from '@components/projects/ProjectModalContainer'
import {
  projectGrid,
  projectHeading,
  projectSeeAll,
  projectToolbar,
} from '@components/projects/projects.css'
import { Button } from '@components/common/button/Button'
import { Screen } from '@components/Screen'
import { useProjectTagFilteredProjects } from '@hooks/project/useProjectTagFilteredProjects'
import { useSelectedProjectTagFilters } from '@hooks/project/useSelectedProjectTagFilters'
import { useAnalytics } from '@hooks/useAnalytics'
import { useSearchQuery } from '@hooks/useSearchQuery'
import { usePreview } from '@hooks/usePreview'
import { useTranslation } from '@localization/localize'
import { usePortfolioError, usePortfolioLoading, useProjects } from '@stores/portfolioStore'
import { cx } from '@utils/cn'
import { filterBySearch } from '@utils/search'
import React, { useDeferredValue, useState } from 'react'
import type { FilterProjectType } from '../hooks/project/useProjectTypeFilteredProjects'

const PREVIEW_COUNT = 6
const PREVIEW_COUNT_PHONE = 3

const ProjectScreen: React.FC = () => {
  const projects = useProjects()
  const loading = usePortfolioLoading()
  const error = usePortfolioError()
  const { t } = useTranslation()
  useAnalytics()

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<FilterProjectType | null>(null)

  const [selectedTags, setSelectedTags] = useSelectedProjectTagFilters()
  const [searchQuery, setSearchQuery] = useSearchQuery('projectSearch')
  // Typing stays instant; the grid catches up when React has a spare moment.
  const deferredSearchQuery = useDeferredValue(searchQuery)
  const filteredProjects = filterBySearch(
    useProjectTagFilteredProjects(selectedTags),
    deferredSearchQuery,
  )
  const {
    visibleItems: visibleProjects,
    hasMore,
    showAll,
  } = usePreview(filteredProjects, PREVIEW_COUNT_PHONE, PREVIEW_COUNT)

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
                  searchQuery={searchQuery}
                  onSearchQueryChange={setSearchQuery}
                />
              </div>
            </div>
          </div>
          <div className={projectGrid}>
            {filteredProjects.length === 0 ? <div>{t('projects.search.empty')}</div> : null}
            {visibleProjects.map((project) => {
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
          {hasMore ? (
            <div className={projectSeeAll}>
              <Button variant="secondary" size="large" onClick={showAll}>
                {t('projects.seeAll', { count: filteredProjects.length })}
              </Button>
            </div>
          ) : null}
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
