import { HASH_NODE_DEFAULT_POSTS_LIMIT, HASH_NODE_PUBLICATION_HOST } from '@/services/hash-node/api'
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
import { blogSortValues, type BlogSortValue } from '@hooks/blog/useSelectedBlogSort'
import { useHandleParams } from '@hooks/useHandleParams'
import { useHashNodePosts } from '@hooks/useHashNodePosts'
import { usePagination } from '@hooks/usePagination'
import { useTranslation } from '@localization/localize'
import { sortBlogPosts } from '@utils/sortBlogPosts'
import React from 'react'

export const BlogContainer: React.FC = () => {
  const { t } = useTranslation()
  const { currentParams } = useHandleParams<{
    blogTag: string
    blogSort: BlogSortValue
  }>()
  const selectedTag = currentParams.blogTag || 'all'
  const selectedSort = blogSortValues.includes(currentParams.blogSort as BlogSortValue)
    ? (currentParams.blogSort as BlogSortValue)
    : 'latest'

  const { posts, hasNextPage, isFetchingNextPage, fetchNextPage } = useHashNodePosts({
    host: HASH_NODE_PUBLICATION_HOST,
    first: HASH_NODE_DEFAULT_POSTS_LIMIT,
    tagFilter: selectedTag,
  })

  const sortedPosts = sortBlogPosts(posts, selectedSort)

  const loadMoreRef = usePagination({
    hasNextPage: Boolean(hasNextPage),
    isFetchingNextPage,
    fetchNextPage: () => {
      void fetchNextPage()
    },
  })

  return (
    <>
      <div className="row">
        <div className={`${blogHeading} padd-15`}>
          <div className={blogToolbar}>
            <BlogFilterBar posts={sortedPosts} />
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
