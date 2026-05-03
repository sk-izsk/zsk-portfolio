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
import { useSelectedBlogSort } from '@hooks/blog/useSelectedBlogSort'
import { usePagination } from '@hooks/usePagination'
import { useTranslation } from '@localization/localize'
import type { BlogPostSummary } from '@services/hash-node/types'
import { sortBlogPosts } from '@utils/sortBlogPosts'
import React, { useMemo } from 'react'
import { useSelectedBlogTagFilters } from '../../hooks/blog/useSelectedBlogTagFilters'

interface BlogContainerProps {
  posts: BlogPostSummary[]
  hasNextPage: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => void
}

export const BlogContainer: React.FC<BlogContainerProps> = ({
  posts,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}) => {
  const [selectedTags, setSelectedTags] = useSelectedBlogTagFilters()
  const [selectedSort, setSelectedSort] = useSelectedBlogSort()
  const { t } = useTranslation()
  const filteredPosts = useMemo(() => {
    if (selectedTags.length === 0) {
      return posts
    }

    return posts.filter((post) =>
      selectedTags.every((selectedTag) => post.tags.some((tag) => tag.slug === selectedTag)),
    )
  }, [posts, selectedTags])

  const sortedPosts = useMemo(
    () => sortBlogPosts(filteredPosts, selectedSort),
    [filteredPosts, selectedSort],
  )

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
            <BlogFilterBar
              posts={posts}
              selectedTags={selectedTags}
              onSelectedTagsChange={setSelectedTags}
              selectedSort={selectedSort}
              onSelectedSortChange={setSelectedSort}
            />
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
