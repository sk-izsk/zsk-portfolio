import React from 'react'
import { Screen } from '@components/Screen'
import { useAnalytics } from '@hooks/useAnalytics'
import { useTranslation } from '@localization/localize'
import { usePortfolioError, usePortfolioLoading } from '@stores/portfolioStore'

const BlogScreen: React.FC = () => {
  const loading = usePortfolioLoading()
  const error = usePortfolioError()
  const { t } = useTranslation()
  useAnalytics()

  return (
    <Screen
      sectionId="blog"
      isLoading={loading}
      isError={Boolean(error)}
      title={t('blog.title')}
      description={t('blog.seoDescription')}
      canonical="/blog"
    />
  )
}

export default BlogScreen
