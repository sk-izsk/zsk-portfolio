import React from 'react'
import { home } from '@components/home/home.css'
import { HomeScene } from '@components/home/HomeScene'
import { Screen } from '@components/Screen'
import { useAnalytics } from '@hooks/useAnalytics'
import { useTranslation } from '@localization/localize'
import { usePortfolioError, usePortfolioLoading } from '@stores/portfolioStore'

const HomeScreen: React.FC = () => {
  const loading = usePortfolioLoading()
  const error = usePortfolioError()
  const { t } = useTranslation()
  useAnalytics()

  return (
    <Screen
      sectionId="home"
      sectionClassName={home}
      contentProtected
      isLoading={loading}
      isError={Boolean(error)}
      pageTitle={t('home.pageTitle')}
      description={t('home.seoDescription')}
      canonical="/"
    >
      <HomeScene />
    </Screen>
  )
}

export default HomeScreen
