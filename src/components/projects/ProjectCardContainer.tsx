import type { FilterProjectType } from '@hooks/project/useProjectTypeFilteredProjects'
import { trackGaEvent, trackMixpanelEvent } from '@utils/analytics'
import React from 'react'
import { ProjectCard } from './ProjectCard'

interface Props {
  project: FilterProjectType
  onReadMoreClick: (project: FilterProjectType) => void
}

export const ProjectCardContainer: React.FC<Props> = ({ project, onReadMoreClick }) => {
  return (
    <ProjectCard key={project.id}>
      <ProjectCard.TimeLink category={project.category} publishDate={project.publishDate} />
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
          onReadMoreClick(project)
        }}
      />
    </ProjectCard>
  )
}
