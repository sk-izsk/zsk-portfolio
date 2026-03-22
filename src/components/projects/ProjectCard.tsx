import { faBookOpenReader, faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
  href: string
  isExternal: boolean
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

const ProjectCardTimeLink: React.FC<ProjectCardTimeLinkProps> = ({
  category,
  publishDate,
  href,
  isExternal,
}) => {
  const { i18n } = useTranslation()
  const linkAttrs = getLinkAttrs(isExternal)
  const readableDate = new Date(publishDate).toLocaleDateString(
    i18n.resolvedLanguage === 'fr' ? 'fr-FR' : 'en-US',
  )

  return (
    <div className={projectInfo}>
      <div className="category">
        <a href={href} {...linkAttrs}>
          <p className={projectInfoText}>
            <FontAwesomeIcon icon={faBookOpenReader} />
            <i className={`fa fa-book-open-reader ${projectInfoIcon}`} />
            {category}
          </p>
        </a>
      </div>
      <div className="date">
        <p className={projectInfoText}>
          <FontAwesomeIcon icon={faCalendarDays} />
          <i className={`fa fa-calendar-days ${projectInfoIcon}`} />
          {readableDate}
        </p>
      </div>
    </div>
  )
}

const ProjectCardTitle: React.FC<ProjectCardTitleProps> = ({ href, isExternal, children }) => {
  const linkAttrs = getLinkAttrs(isExternal)

  return (
    <a href={href} {...linkAttrs}>
      <h4 className={projectTitle}>{children}</h4>
    </a>
  )
}

const ProjectCardBody: React.FC<ProjectCardBodyProps> = ({ shortDescription, highlights }) => {
  return (
    <div className={projectContent}>
      <div style={{ marginBottom: highlights.length ? '0.5em' : 0 }}>{shortDescription}</div>
      {highlights.length > 0 && (
        <ul
          style={{
            margin: 0,
            paddingLeft: '1.2em',
            listStyleType: 'disc',
            fontSize: '0.97em',
            lineHeight: 1.5,
          }}
        >
          {highlights.slice(0, 3).map((point, idx) => (
            <li key={idx} style={{ marginBottom: 2 }}>
              {point}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
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

const ProjectCardReadMore: React.FC<ProjectCardReadMoreProps> = ({ href, isExternal }) => {
  const linkAttrs = getLinkAttrs(isExternal)
  const { t } = useTranslation()

  return (
    <a href={href} className={projectLink} {...linkAttrs}>
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
