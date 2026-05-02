import { HASH_NODE_DEFAULT_POSTS_LIMIT, HASH_NODE_PUBLICATION_HOST } from '@/services/hash-node/api'
import { BlogContainer } from '@components/blog/BlogContainer'
import { Screen } from '@components/Screen'
import { blogSortValues, type BlogSortValue } from '@hooks/blog/useSelectedBlogSort'
import { useAnalytics } from '@hooks/useAnalytics'
import { useHandleParams } from '@hooks/useHandleParams'
import { useHashNodePosts } from '@hooks/useHashnodePosts'
import { useTranslation } from '@localization/localize'
import React from 'react'

const BlogScreen: React.FC = () => {
  const { t } = useTranslation()
  const { currentParams } = useHandleParams<{
    blogTag: string
    blogSort: BlogSortValue
  }>()
  const selectedTag = currentParams.blogTag || 'all'
  const selectedSort = blogSortValues.includes(currentParams.blogSort as BlogSortValue)
    ? (currentParams.blogSort as BlogSortValue)
    : 'latest'
  const { posts, isLoading, isError, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useHashNodePosts({
      host: HASH_NODE_PUBLICATION_HOST,
      first: HASH_NODE_DEFAULT_POSTS_LIMIT,
      tagFilter: selectedTag,
    })
  useAnalytics()

  const isInitialLoading = isLoading && posts.length === 0
  const isInitialError = isError && posts.length === 0

  return (
    <Screen
      sectionId="blog"
      isLoading={isInitialLoading}
      isError={isInitialError}
      title={t('blog.title')}
      description={t('blog.seoDescription')}
      canonical="/blog"
      errorMessage={t('blog.error')}
    >
      {!isInitialLoading && !isInitialError ? (
        <BlogContainer
          posts={posts}
          selectedSort={selectedSort}
          hasNextPage={Boolean(hasNextPage)}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={() => {
            void fetchNextPage()
          }}
        />
      ) : null}
    </Screen>
  )
}

export default BlogScreen
