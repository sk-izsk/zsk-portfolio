import type { BlogPostSummary } from '@/services/hash-node/types'
import { useTranslation } from '@localization/localize'
import { trackGaEvent, trackMixpanelEvent } from '@utils/analytics'
import React from 'react'
import { BlogCard, BlogCardBody } from './BlogCard'

interface BlogCardContainerProps {
  post: BlogPostSummary
}

export const BlogCardContainer: React.FC<BlogCardContainerProps> = ({ post }) => {
  const { t } = useTranslation()

  return (
    <BlogCard>
      <BlogCard.Cover
        imageUrl={post.coverImageUrl}
        imageAlt={post.title}
        fallbackLabel={t('blog.coverFallback')}
      />
      <BlogCardBody>
        <BlogCard.Meta publishedAt={post.publishedAt} sourceLabel={t('blog.sourceLabel')} />
        <BlogCard.Title>{post.title}</BlogCard.Title>
        <BlogCard.Excerpt brief={post.brief} />
        <BlogCard.Tags postId={post.id} tags={post.tags} />
        <BlogCard.Footer>
          <BlogCard.ReadMore
            href={post.url}
            isExternal={true}
            ariaLabel={t('blog.openArticleAriaLabel', { title: post.title })}
            onClick={() => {
              trackGaEvent('Blog', 'read_article_click', post.title)
              trackMixpanelEvent('read_article_click', 'Blog', post.title)
            }}
          >
            {t('blog.readArticle')}
          </BlogCard.ReadMore>
        </BlogCard.Footer>
      </BlogCardBody>
    </BlogCard>
  )
}
