import type { Project } from '@app-types/portfolio'
import React from 'react'
import { projectFilterBar, projectFilterControl } from './projects.css'
import { ProjectTagPickerContainer } from './ProjectTagPickerContainer'
import { ProjectTypeDropdown } from './ProjectTypeDropdown'

interface ProjectFilterBarProps {
  projects: Project[]
  selectedTags: string[]
  onSelectedTagsChange: (values: string[]) => void
}

export const ProjectFilterBar: React.FC<ProjectFilterBarProps> = ({
  projects,
  selectedTags,
  onSelectedTagsChange,
}) => {
  return (
    <div className={projectFilterBar}>
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
