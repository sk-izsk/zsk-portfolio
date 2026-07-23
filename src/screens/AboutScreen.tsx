import React from 'react'
import { aboutContent } from '@components/about/about.css'
import { AboutPersonalInfoSection } from '@components/about/AboutPersonalInfoSection'
import { AboutPersonalIntro } from '@components/about/AboutPersonalIntro'
import { ActivitiesSection } from '@components/about/ActivitiesSection'
import { Screen } from '@components/Screen'
import { useAnalytics } from '@hooks/useAnalytics'
import { useTranslation } from '@localization/localize'
import { usePortfolioError, usePortfolioLoading } from '@stores/portfolioStore'
import { cx } from '@utils/cn'

const AboutScreen: React.FC = () => {
  const loading = usePortfolioLoading()
  const error = usePortfolioError()
  const { t } = useTranslation()
  useAnalytics()

  return (
    <Screen
      sectionId="about"
      contentProtected
      isLoading={loading}
      isError={Boolean(error)}
      title={t('about.title')}
      description={t('about.seoDescription')}
      canonical="/about"
    >
      <div className="row">
        <div className={cx(aboutContent, 'padd-15')}>
          <AboutPersonalIntro />
          <AboutPersonalInfoSection />
          <ActivitiesSection />
        </div>
      </div>
    </Screen>
  )
}

export default AboutScreen
