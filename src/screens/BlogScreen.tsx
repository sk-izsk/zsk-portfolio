import { BlogContainer } from '@components/blog/BlogContainer'
import { BlogModalContainer } from '@components/blog/BlogModalContainer'
import { Screen } from '@components/Screen'
import { useBlogTagFilteredPosts } from '@hooks/blog/useBlogTagFilteredPosts'
import { useSelectedBlogTagFilters } from '@hooks/blog/useSelectedBlogTagFilters'
import type { FilterBlogPostType } from '@hooks/blog/useBlogTypeFilteredPosts'
import { useAnalytics } from '@hooks/useAnalytics'
import { useTranslation } from '@localization/localize'
import { useBlogPosts, usePortfolioError, usePortfolioLoading } from '@stores/portfolioStore'
import React, { useState } from 'react'

const BlogScreen: React.FC = () => {
  const { t } = useTranslation()
  const blogPosts = useBlogPosts()
  const loading = usePortfolioLoading()
  const error = usePortfolioError()
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<FilterBlogPostType | null>(null)

  const [selectedTags] = useSelectedBlogTagFilters()
  const filteredPosts = useBlogTagFilteredPosts(selectedTags)
  useAnalytics()

  return (
    <Screen
      sectionId="blog"
      isLoading={loading}
      isError={Boolean(error || !blogPosts)}
      title={t('blog.title')}
      description={t('blog.seoDescription')}
      canonical="/blog"
      errorMessage={t('blog.error')}
    >
      {blogPosts && (
        <BlogContainer
          posts={filteredPosts}
          allPosts={blogPosts}
          onReadMoreClick={(post) => {
            setSelectedPost(post)
            setModalOpen(true)
          }}
        />
      )}
      {selectedPost && (
        <BlogModalContainer open={modalOpen} onClose={() => setModalOpen(false)} post={selectedPost} />
      )}
    </Screen>
  )
}

export default BlogScreen
