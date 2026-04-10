import { BookOpenText, CalendarDays } from 'lucide-react'
import type { PropsWithChildren } from 'react'
import React from 'react'
import { useTranslation } from '../../localization/localize'
import { Tag } from '../tag/Tag'
import {
  projectContent,
  projectInfo,
  projectInfoIcon,
  projectInfoText,
  projectItem,
  projectItemInner,
  projectLink,
  projectTags,
  projectTitle,
} from './projects.css'

type ProjectCardRootProps = PropsWithChildren

interface ProjectCardTimeLinkProps {
  category: string
  publishDate: string
}

interface ProjectCardTitleProps extends PropsWithChildren {
  href: string
  isExternal: boolean
}

interface ProjectCardBodyProps {
  shortDescription: string
  highlights: string[]
}

interface ProjectCardTagsProps {
  projectId: number
  tags?: string[]
}

interface ProjectCardReadMoreProps {
  href: string
  isExternal: boolean
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

type ProjectCardCompound = React.FC<ProjectCardRootProps> & {
  TimeLink: React.FC<ProjectCardTimeLinkProps>
  Title: React.FC<ProjectCardTitleProps>
  Body: React.FC<ProjectCardBodyProps>
  Tags: React.FC<ProjectCardTagsProps>
  ReadMore: React.FC<ProjectCardReadMoreProps>
}

const getLinkAttrs = (isExternal: boolean) => ({
  target: isExternal ? '_blank' : undefined,
  rel: isExternal ? 'noopener noreferrer' : undefined,
})

const ProjectCardRoot: React.FC<ProjectCardRootProps> = ({ children }) => {
  return (
    <div className={projectItem}>
      <div className={projectItemInner}>{children}</div>
    </div>
  )
}

const ProjectCardTimeLink: React.FC<ProjectCardTimeLinkProps> = ({ category, publishDate }) => {
  const { i18n } = useTranslation()
  const readableDate = new Date(publishDate).toLocaleDateString(
    i18n.resolvedLanguage === 'fr' ? 'fr-FR' : 'en-US',
  )

  return (
    <div className={projectInfo}>
      <div className="category">
        <p className={projectInfoText}>
          <BookOpenText className={projectInfoIcon} size={16} />
          {category}
        </p>
      </div>
      <div className="date">
        <p className={projectInfoText}>
          <CalendarDays className={projectInfoIcon} size={16} />
          {readableDate}
        </p>
      </div>
    </div>
  )
}

const ProjectCardTitle: React.FC<ProjectCardTitleProps> = ({ children }) => {
  return <h4 className={projectTitle}>{children}</h4>
}

const ProjectCardBody: React.FC<ProjectCardBodyProps> = ({ shortDescription }) => {
  return <div className={projectContent}>{shortDescription}</div>
}

const ProjectCardTags: React.FC<ProjectCardTagsProps> = ({ projectId, tags }) => {
  if (!tags?.length) {
    return null
  }

  return (
    <div className={projectTags}>
      {tags.map((value) => (
        <Tag key={`${projectId}-${value}`} label={value} />
      ))}
    </div>
  )
}

const ProjectCardReadMore: React.FC<ProjectCardReadMoreProps> = ({ href, isExternal, onClick }) => {
  const linkAttrs = getLinkAttrs(isExternal)
  const { t } = useTranslation()

  return (
    <a href={href} className={projectLink} {...linkAttrs} onClick={onClick}>
      {t('projects.readMore')}
    </a>
  )
}

export const ProjectCard: ProjectCardCompound = Object.assign(ProjectCardRoot, {
  TimeLink: ProjectCardTimeLink,
  Title: ProjectCardTitle,
  Body: ProjectCardBody,
  Tags: ProjectCardTags,
  ReadMore: ProjectCardReadMore,
})
