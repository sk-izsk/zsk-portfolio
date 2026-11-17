import { cx } from '@utils/cn'
import type { Project } from '@app-types/portfolio'
import { SearchInput } from '@components/common/searchInput/SearchInput'
import { useTranslation } from '@localization/localize'
import React from 'react'
import { projectFilterBar, projectFilterControl, projectSearchControl } from './projects.css'
import { ProjectTagPickerContainer } from './ProjectTagPickerContainer'
import { ProjectTypeDropdown } from './ProjectTypeDropdown'

interface ProjectFilterBarProps {
  projects: Project[]
  selectedTags: string[]
  onSelectedTagsChange: (values: string[]) => void
  searchQuery: string
  onSearchQueryChange: (value: string) => void
}

export const ProjectFilterBar: React.FC<ProjectFilterBarProps> = ({
  projects,
  selectedTags,
  onSelectedTagsChange,
  searchQuery,
  onSearchQueryChange,
}) => {
  const { t } = useTranslation()

  return (
    <div className={projectFilterBar}>
      <div className={cx(projectFilterControl, projectSearchControl)}>
        <SearchInput
          value={searchQuery}
          onChange={onSearchQueryChange}
          placeholder={t('projects.search.placeholder')}
          ariaLabel={t('projects.search.label')}
        />
      </div>
      <ProjectTagPickerContainer
        selectedTags={selectedTags}
        projects={projects}
        onSelectedTagsChange={onSelectedTagsChange}
      />
      <div className={projectFilterControl}>
        <ProjectTypeDropdown />
      </div>
    </div>
  )
}
