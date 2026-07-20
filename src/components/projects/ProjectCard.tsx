import { BookOpenText, CalendarDays } from 'lucide-react'
import type { PropsWithChildren } from 'react'
import React from 'react'
import { useTranslation } from '@localization/localize'
import { Tag } from '@components/tag/Tag'
import { RichText } from '@components/common/richText/RichText'
import {
  projectContent,
  projectInfo,
  projectInfoIcon,
  projectInfoLabel,
  projectInfoText,
  projectActions,
  projectActionsCenter,
  projectActionsSplit,
  projectItem,
  projectItemInner,
  projectLink,
  projectTags,
  projectTitle,
} from '@components/projects/projects.css'
import { cx } from '@utils/cn'

interface ProjectCardRootProps extends PropsWithChildren {
  className?: string
}

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

interface ProjectCardActionsProps extends PropsWithChildren {
  layout: 'split' | 'center'
}

interface ProjectCardButtonProps {
  href: string
  isExternal: boolean
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

type ProjectCardCompound = React.FC<ProjectCardRootProps> & {
  TimeLink: React.FC<ProjectCardTimeLinkProps>
  Title: React.FC<ProjectCardTitleProps>
  Body: React.FC<ProjectCardBodyProps>
  Tags: React.FC<ProjectCardTagsProps>
  Actions: React.FC<ProjectCardActionsProps>
  Button: React.FC<ProjectCardButtonProps & PropsWithChildren>
}

const getLinkAttrs = (isExternal: boolean) => ({
  target: isExternal ? '_blank' : undefined,
  rel: isExternal ? 'noopener noreferrer' : undefined,
})

const ProjectCardRoot: React.FC<ProjectCardRootProps> = ({ children, className }) => {
  return (
    <div className={cx(projectItem, className)}>
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
      <div className="category" style={{ minWidth: 0, flex: '1 1 auto' }}>
        <p className={projectInfoText}>
          <BookOpenText className={projectInfoIcon} size={16} />
          <span className={projectInfoLabel}>{category}</span>
        </p>
      </div>
      <div className="date" style={{ flex: '0 0 auto' }}>
        <p className={projectInfoText}>
          <CalendarDays className={projectInfoIcon} size={16} />
          <span>{readableDate}</span>
        </p>
      </div>
    </div>
  )
}

const ProjectCardTitle: React.FC<ProjectCardTitleProps> = ({ children }) => {
  return <h4 className={projectTitle}>{children}</h4>
}

const ProjectCardBody: React.FC<ProjectCardBodyProps> = ({ shortDescription }) => {
  return <RichText content={shortDescription} className={projectContent} variant="inline" />
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

const ProjectCardActions: React.FC<ProjectCardActionsProps> = ({ children, layout }) => {
  const layoutClass = layout === 'split' ? projectActionsSplit : projectActionsCenter

  return (
    <div className={cx(projectActions, layoutClass)} data-layout={layout}>
      {children}
    </div>
  )
}

// const ProjectCardDemoLink: React.FC<ProjectCardDemoLinkProps> = ({ href }) => {
//   const { t } = useTranslation()

//   return (
//     <a href={href} className={projectDemoLink} target="_blank" rel="noopener noreferrer">
//       {t('projects.demoLink')}
//     </a>
//   )
// }

const ProjectCardButton: React.FC<ProjectCardButtonProps & PropsWithChildren> = ({
  href,
  isExternal,
  onClick,
  children,
}) => {
  const linkAttrs = getLinkAttrs(isExternal)

  return (
    <a href={href} className={projectLink} {...linkAttrs} onClick={onClick}>
      {children}
    </a>
  )
}

export const ProjectCard: ProjectCardCompound = Object.assign(ProjectCardRoot, {
  TimeLink: ProjectCardTimeLink,
  Title: ProjectCardTitle,
  Body: ProjectCardBody,
  Tags: ProjectCardTags,
  Actions: ProjectCardActions,
  // DemoLink: ProjectCardDemoLink,
  Button: ProjectCardButton,
})
