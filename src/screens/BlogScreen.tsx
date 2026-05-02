import React from 'react'
import { BlogContainer } from '@components/blog/BlogContainer'
import { Screen } from '@components/Screen'
import { useAnalytics } from '@hooks/useAnalytics'
import { useHashnodePosts } from '@hooks/useHashnodePosts'
import { useTranslation } from '@localization/localize'

const BlogScreen: React.FC = () => {
  const { t } = useTranslation()
  const { posts, isLoading, isError } = useHashnodePosts()
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
      {!isInitialLoading && !isInitialError ? <BlogContainer /> : null}
    </Screen>
  )
}

export default BlogScreen
