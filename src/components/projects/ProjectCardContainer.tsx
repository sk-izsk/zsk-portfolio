import { useTranslation } from '@/localization/localize'
import type { FilterProjectType } from '@hooks/project/useProjectTypeFilteredProjects'
import { trackGaEvent, trackMixpanelEvent } from '@utils/analytics'
import React from 'react'
import { ProjectCard } from './ProjectCard'

interface Props {
  project: FilterProjectType
  onReadMoreClick: (project: FilterProjectType) => void
}

export const ProjectCardContainer: React.FC<Props> = ({ project, onReadMoreClick }) => {
  const hasDemoLink = project.demoLink !== ''
  const { t } = useTranslation()

  return (
    <ProjectCard key={project.id}>
      <ProjectCard.TimeLink category={project.category} publishDate={project.publishDate} />
      <ProjectCard.Title href={project.projectHref} isExternal={project.isExternal}>
        {project.title}
      </ProjectCard.Title>
      <ProjectCard.Body shortDescription={project.shortDescription} highlights={[]} />
      <ProjectCard.Tags projectId={project.id} tags={project.tags} />
      <ProjectCard.Actions layout={hasDemoLink ? 'split' : 'center'}>
        {hasDemoLink && (
          <ProjectCard.Button href={project.demoLink} isExternal={true}>
            {t('projects.demoLink')}
          </ProjectCard.Button>
        )}
        <ProjectCard.Button
          href={project.projectHref}
          isExternal={project.isExternal}
          onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            e.preventDefault()
            trackGaEvent('Projects', 'read_more_click', project.title)
            trackMixpanelEvent('read_more_click', 'Projects', project.title)
            onReadMoreClick(project)
          }}
        >
          {t('projects.readMore')}
        </ProjectCard.Button>
      </ProjectCard.Actions>
    </ProjectCard>
  )
}
