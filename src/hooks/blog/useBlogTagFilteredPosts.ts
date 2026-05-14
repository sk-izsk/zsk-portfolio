import { useMemo } from 'react'
import { useBlogTypeFilteredPosts, type FilterBlogPostType } from './useBlogTypeFilteredPosts'
import { normalizeTagSlug } from '@utils/tagFilters'

export const useBlogTagFilteredPosts = (selectedTags: string[]): FilterBlogPostType[] => {
  const typeFilteredPosts = useBlogTypeFilteredPosts()

  return useMemo(() => {
    if (selectedTags.length === 0) {
      return typeFilteredPosts
    }

    return typeFilteredPosts.filter((post) =>
      selectedTags.some((selectedTag) =>
        post.tags.some((tag) => normalizeTagSlug(tag) === selectedTag),
      ),
    )
  }, [selectedTags, typeFilteredPosts])
}
