import type { DropdownOption } from '@components/common/dropdown/Dropdown'
import React from 'react'
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
import { useHashnodePosts } from '@hooks/useHashnodePosts'
import { usePagination } from '@hooks/usePagination'
import { useHandleParams } from '@hooks/useHandleParams'
import { useTranslation } from '@localization/localize'
import {
  HASHNODE_DEFAULT_POSTS_LIMIT,
  HASHNODE_PUBLICATION_HOST,
} from '@services/hashnode/hashnode.api'
import type { BlogPostSummary } from '@services/hashnode/hashnode.types'

const sortBlogPosts = (posts: BlogPostSummary[], sortValue: BlogSortValue) => {
  const nextPosts = [...posts]

  if (sortValue === 'oldest') {
    return nextPosts.sort(
      (left, right) => new Date(left.publishedAt).getTime() - new Date(right.publishedAt).getTime(),
    )
  }

  if (sortValue === 'title-asc') {
    return nextPosts.sort((left, right) => left.title.localeCompare(right.title))
  }

  return nextPosts
}

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

  const { posts, hasNextPage, isFetchingNextPage, fetchNextPage } = useHashnodePosts(
    HASHNODE_PUBLICATION_HOST,
    HASHNODE_DEFAULT_POSTS_LIMIT,
    selectedTag,
  )

  const sortedPosts = sortBlogPosts(posts, selectedSort)
  const tagMap = new Map<string, string>()

  for (const post of posts) {
    for (const tag of post.tags) {
      tagMap.set(tag.slug, tag.name)
    }
  }

  const tagOptions: DropdownOption<string>[] = [
    {
      value: 'all',
      label: t('blog.filter.options.all'),
    },
    ...Array.from(tagMap.entries())
      .sort((left, right) => left[1].localeCompare(right[1]))
      .map(([slug, name]) => ({
        value: slug,
        label: name,
      })),
  ]

  if (selectedTag !== 'all' && !tagOptions.some((option) => option.value === selectedTag)) {
    tagOptions.push({
      value: selectedTag,
      label: selectedTag,
    })
  }

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
            <BlogFilterBar tagOptions={tagOptions} />
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
