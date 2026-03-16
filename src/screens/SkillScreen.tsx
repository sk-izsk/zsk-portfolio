import React from 'react'
import { useAppTranslation as useTranslation } from '../localization/localize'
import { Screen } from '../components/Screen'
import { SkillsRate } from '../components/skills/SkillsRate'
import { SkillsTag } from '../components/skills/SkillsTag'
import { usePortfolioError, usePortfolioLoading } from '../stores/portfolioStore'

const SkillScreen: React.FC = () => {
  const loading = usePortfolioLoading()
  const error = usePortfolioError()
  const { t } = useTranslation()

  return (
    <Screen
      sectionId="portfolio"
      isLoading={loading}
      isError={Boolean(error)}
      title={t('skills.title')}
    >
      <SkillsRate />
      <SkillsTag />
    </Screen>
  )
}

export default SkillScreen
