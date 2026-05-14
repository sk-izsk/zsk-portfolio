import type { BlogPost } from '@app-types/portfolio'
import { useSelectedBlogType } from '@hooks/blog/useSelectedBlogType'
import { useBlogPosts } from '@stores/portfolioStore'
import { useMemo } from 'react'

export type FilterBlogPostType = BlogPost & {
  articleHref: string
}

export const useBlogTypeFilteredPosts = (): FilterBlogPostType[] => {
  const blogPostsData = useBlogPosts()
  const blogPosts = useMemo(
    () =>
      (blogPostsData ?? []).map((post) => ({
        ...post,
        articleHref: post.url || '#',
      })),
    [blogPostsData],
  )
  const [selectedBlogType] = useSelectedBlogType()

  const sortedPosts = useMemo(
    () =>
      [...blogPosts].sort(
        (left, right) =>
          new Date(right.publishDate).getTime() - new Date(left.publishDate).getTime(),
      ),
    [blogPosts],
  )

  return useMemo(() => {
    if (selectedBlogType === 'all') {
      return sortedPosts
    }

    return sortedPosts.filter((post) => post.blogTypes.includes(selectedBlogType))
  }, [selectedBlogType, sortedPosts])
}
