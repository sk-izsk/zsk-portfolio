import type { BlogSortValue } from '@hooks/blog/useSelectedBlogSort'
import type { BlogPostSummary } from '@services/hash-node/types'

export const sortBlogPosts = (posts: BlogPostSummary[], sortValue: BlogSortValue) => {
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
