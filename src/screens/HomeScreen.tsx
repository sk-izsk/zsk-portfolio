import React from 'react'
import { home, homeInfo, homeIntroBlock, homeQuoteShelf, homeRow } from '@components/home/home.css'
import { HomeDetailBio } from '@components/home/HomeDetailBio'
import { HomeDownloadCv } from '@components/home/HomeDownloadCv'
import { HomeImageContainer } from '@components/home/HomeImageContainer'
import { HomeQuotePlacements } from '@components/home/HomeQuotePlacements'
import { HomeTitleAnimated } from '@components/home/HomeTitleAnimated'
import { Screen } from '@components/Screen'
import { useAnalytics } from '@hooks/useAnalytics'
import { useTranslation } from '@localization/localize'
import { usePortfolioError, usePortfolioLoading } from '@stores/portfolioStore'
import { cx } from '@utils/cn'

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
      <div className={cx('row', homeRow)}>
        <div className={cx(homeInfo, 'padd-15')}>
          <div className={homeIntroBlock}>
            <HomeTitleAnimated />
            <HomeDetailBio />
            <HomeDownloadCv />
          </div>
          <div className={homeQuoteShelf}>
            <HomeQuotePlacements />
          </div>
        </div>
        <HomeImageContainer />
      </div>
    </Screen>
  )
}

export default HomeScreen
