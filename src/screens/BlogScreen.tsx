import { BlogContainer } from '@components/blog/BlogContainer'
import { Screen } from '@components/Screen'
import { useAnalytics } from '@hooks/useAnalytics'
import { useHashNodePosts } from '@hooks/useHashNodePosts'
import { useTranslation } from '@localization/localize'
import React from 'react'

const BlogScreen: React.FC = () => {
  const { t } = useTranslation()
  // const { posts, isLoading, isError } = useHashNodePosts()
  useAnalytics()

  // const isInitialLoading = isLoading && posts.length === 0
  // const isInitialError = isError && posts.length === 0

  return (
    <Screen
      sectionId="blog"
      isLoading={false}
      isError={false}
      title={t('blog.title')}
      description={t('blog.seoDescription')}
      canonical="/blog"
      errorMessage={t('blog.error')}
    >
      <BlogContainer />
      {/* {!isInitialLoading && !isInitialError ? <BlogContainer /> : null} */}
    </Screen>
  )
}

export default BlogScreen
