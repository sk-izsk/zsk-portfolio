import type { FilterBlogPostType } from '@hooks/blog/useBlogTypeFilteredPosts'
import { useTranslation } from '@localization/localize'
import { trackGaEvent, trackMixpanelEvent } from '@utils/analytics'
import React from 'react'
import { ProjectCard } from '@components/projects/ProjectCard'
import { compactBlogCard } from './blogCard.css'

interface BlogCardContainerProps {
  post: FilterBlogPostType
  onReadMoreClick: (post: FilterBlogPostType) => void
}

export const BlogCardContainer: React.FC<BlogCardContainerProps> = ({ post, onReadMoreClick }) => {
  const { t } = useTranslation()
  const localizedCategory =
    post.category === 'Frontend Architecture'
      ? t('blog.categories.frontendArchitecture')
      : post.category === 'State Management'
        ? t('blog.categories.stateManagement')
        : post.category === 'Data Fetching'
          ? t('blog.categories.dataFetching')
          : post.category

  return (
    <ProjectCard key={post.id} className={compactBlogCard}>
      <ProjectCard.TimeLink category={localizedCategory} publishDate={post.publishDate} />
      <ProjectCard.Title href={post.articleHref} isExternal={true}>
        {post.title}
      </ProjectCard.Title>
      <ProjectCard.Body shortDescription={post.shortDescription} highlights={[]} />
      <ProjectCard.Tags projectId={post.id} tags={post.tags} />
      <ProjectCard.Actions layout="center">
        <ProjectCard.Button
          href={post.articleHref}
          isExternal={true}
          onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            event.preventDefault()
            trackGaEvent('Blog', 'read_more_click', post.title)
            trackMixpanelEvent('read_more_click', 'Blog', post.title)
            onReadMoreClick(post)
          }}
        >
          {t('blog.readMore')}
        </ProjectCard.Button>
      </ProjectCard.Actions>
    </ProjectCard>
  )
}
