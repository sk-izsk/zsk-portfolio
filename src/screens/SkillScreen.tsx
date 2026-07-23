import React from 'react'
import { Screen } from '@components/Screen'
import { SkillsRate } from '@components/skills/SkillsRate'
import { SkillsTag } from '@components/skills/SkillsTag'
import { useAnalytics } from '@hooks/useAnalytics'
import { useTranslation } from '@localization/localize'
import { usePortfolioError, usePortfolioLoading } from '@stores/portfolioStore'

const SkillScreen: React.FC = () => {
  const loading = usePortfolioLoading()
  const error = usePortfolioError()
  const { t } = useTranslation()
  useAnalytics()

  return (
    <Screen
      sectionId="portfolio"
      contentProtected
      isLoading={loading}
      isError={Boolean(error)}
      title={t('skills.title')}
      description={t('skills.seoDescription')}
      canonical="/portfolio"
    >
      <SkillsRate />
      <SkillsTag />
    </Screen>
  )
}

export default SkillScreen
