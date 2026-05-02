import type { BlogPostSummary } from '@/services/hash-node/types'
import { Tag } from '@components/tag/Tag'
import { useTranslation } from '@localization/localize'
import { ArrowUpRight, CalendarDays, PencilLine } from 'lucide-react'
import type { MouseEventHandler, PropsWithChildren } from 'react'
import React from 'react'
import {
  blogBody,
  blogCard,
  blogCardInner,
  blogCover,
  blogCoverImage,
  blogCoverPlaceholder,
  blogCoverPlaceholderText,
  blogExcerpt,
  blogFooter,
  blogMeta,
  blogMetaIcon,
  blogMetaItem,
  blogReadMore,
  blogReadMoreIcon,
  blogTags,
  blogTitle,
} from './blog.css'

interface BlogCardRootProps extends PropsWithChildren {}

interface BlogCardCoverProps {
  imageUrl?: string | null
  imageAlt: string
  fallbackLabel: string
}

interface BlogCardMetaProps {
  publishedAt: string
  sourceLabel: string
}

type BlogCardTitleProps = PropsWithChildren

interface BlogCardExcerptProps {
  brief: string
}

interface BlogCardTagsProps {
  postId: BlogPostSummary['id']
  tags: BlogPostSummary['tags']
}

type BlogCardFooterProps = PropsWithChildren
interface BlogCardReadMoreProps extends PropsWithChildren {
  href: string
  isExternal: boolean
  onClick?: MouseEventHandler<HTMLAnchorElement>
  ariaLabel?: string
}

type BlogCardCompound = React.FC<BlogCardRootProps> & {
  Cover: React.FC<BlogCardCoverProps>
  Meta: React.FC<BlogCardMetaProps>
  Title: React.FC<BlogCardTitleProps>
  Excerpt: React.FC<BlogCardExcerptProps>
  Tags: React.FC<BlogCardTagsProps>
  Footer: React.FC<BlogCardFooterProps>
  ReadMore: React.FC<BlogCardReadMoreProps>
}

const getLinkAttrs = (isExternal: boolean) => ({
  target: isExternal ? '_blank' : undefined,
  rel: isExternal ? 'noopener noreferrer' : undefined,
})

const BlogCardRoot: React.FC<BlogCardRootProps> = ({ children }) => {
  return (
    <article className={blogCard}>
      <div className={blogCardInner}>{children}</div>
    </article>
  )
}

const BlogCardCover: React.FC<BlogCardCoverProps> = ({ imageUrl, imageAlt, fallbackLabel }) => {
  return (
    <div className={blogCover}>
      {imageUrl ? (
        <img src={imageUrl} alt={imageAlt} className={blogCoverImage} />
      ) : (
        <div className={blogCoverPlaceholder}>
          <span className={blogCoverPlaceholderText}>{fallbackLabel}</span>
        </div>
      )}
    </div>
  )
}

const BlogCardMeta: React.FC<BlogCardMetaProps> = ({ publishedAt, sourceLabel }) => {
  const { i18n } = useTranslation()
  const readableDate = new Date(publishedAt).toLocaleDateString(
    i18n.resolvedLanguage === 'fr' ? 'fr-FR' : 'en-US',
    {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    },
  )

  return (
    <div className={blogMeta}>
      <span className={blogMetaItem}>
        <CalendarDays className={blogMetaIcon} size={14} />
        {readableDate}
      </span>
      <span className={blogMetaItem}>
        <PencilLine className={blogMetaIcon} size={14} />
        {sourceLabel}
      </span>
    </div>
  )
}

const BlogCardTitle: React.FC<BlogCardTitleProps> = ({ children }) => {
  return <h3 className={blogTitle}>{children}</h3>
}

const BlogCardExcerpt: React.FC<BlogCardExcerptProps> = ({ brief }) => {
  return <p className={blogExcerpt}>{brief}</p>
}

const BlogCardTags: React.FC<BlogCardTagsProps> = ({ postId, tags }) => {
  if (!tags.length) {
    return null
  }

  return (
    <div className={blogTags}>
      {tags.map((tag) => (
        <Tag key={`${postId}-${tag.slug}`} label={tag.name} />
      ))}
    </div>
  )
}

const BlogCardFooter: React.FC<BlogCardFooterProps> = ({ children }) => {
  return <div className={blogFooter}>{children}</div>
}

const BlogCardReadMore: React.FC<BlogCardReadMoreProps> = ({
  href,
  isExternal,
  onClick,
  ariaLabel,
  children,
}) => {
  const linkAttrs = getLinkAttrs(isExternal)

  return (
    <a href={href} className={blogReadMore} onClick={onClick} aria-label={ariaLabel} {...linkAttrs}>
      {children}
      <ArrowUpRight className={blogReadMoreIcon} size={16} />
    </a>
  )
}

export const BlogCard: BlogCardCompound = Object.assign(BlogCardRoot, {
  Cover: BlogCardCover,
  Meta: BlogCardMeta,
  Title: BlogCardTitle,
  Excerpt: BlogCardExcerpt,
  Tags: BlogCardTags,
  Footer: BlogCardFooter,
  ReadMore: BlogCardReadMore,
})

export const BlogCardBody: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className={blogBody}>{children}</div>
}
