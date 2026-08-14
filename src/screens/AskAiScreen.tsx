import { AskAiContent, askAiContainerClassName } from '@components/askAi/AskAiContent'
import { Screen } from '@components/Screen'
import { useAnalytics } from '@hooks/useAnalytics'
import { useTranslation } from '@localization/localize'
import { usePortfolioError, usePortfolioLoading } from '@stores/portfolioStore'
import React from 'react'

const AskAiScreen: React.FC = () => {
  const loading = usePortfolioLoading()
  const error = usePortfolioError()
  const { t } = useTranslation()
  useAnalytics()

  return (
    <Screen
      sectionId="ask-ai"
      containerClassName={askAiContainerClassName}
      isLoading={loading}
      isError={Boolean(error)}
      title={t('askAi.title')}
      pageTitle={t('askAi.pageTitle')}
      description={t('askAi.seoDescription')}
      canonical="/ask-ai"
      contentProtected
    >
      <AskAiContent />
    </Screen>
  )
}

export default AskAiScreen
