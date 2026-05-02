import { BlogCardContainer } from '@components/blog/BlogCardContainer'
import { BlogFilterBar } from '@components/blog/BlogFilterBar'
import {
  blogContent,
  blogGrid,
  blogHeading,
  blogLoadMoreState,
  blogLoadMoreTrigger,
  blogState,
  blogToolbar,
} from '@components/blog/blog.css'
import { usePagination } from '@hooks/usePagination'
import { useTranslation } from '@localization/localize'
import { sortBlogPosts } from '@utils/sortBlogPosts'
import type { BlogSortValue } from '@hooks/blog/useSelectedBlogSort'
import type { BlogPostSummary } from '@services/hash-node/types'
import React, { useMemo } from 'react'

interface BlogContainerProps {
  posts: BlogPostSummary[]
  selectedSort: BlogSortValue
  hasNextPage: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => void
}

export const BlogContainer: React.FC<BlogContainerProps> = ({
  posts,
  selectedSort,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}) => {
  const { t } = useTranslation()
  const sortedPosts = useMemo(() => sortBlogPosts(posts, selectedSort), [posts, selectedSort])

  const loadMoreRef = usePagination({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })

  return (
    <>
      <div className="row">
        <div className={`${blogHeading} padd-15`}>
          <div className={blogToolbar}>
            <BlogFilterBar posts={posts} />
          </div>
        </div>
      </div>
      <div className="row">
        <div className={`${blogContent} padd-15`}>
          {sortedPosts.length === 0 ? <div className={blogState}>{t('blog.empty')}</div> : null}
          {sortedPosts.length ? (
            <>
              <div className={blogGrid}>
                {sortedPosts.map((post) => (
                  <BlogCardContainer key={post.id} post={post} />
                ))}
              </div>
              {hasNextPage ? <div ref={loadMoreRef} className={blogLoadMoreTrigger} /> : null}
              {isFetchingNextPage ? (
                <div className={blogLoadMoreState}>{t('blog.loadingMore')}</div>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    </>
  )
}
