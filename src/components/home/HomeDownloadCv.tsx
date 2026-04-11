import React from 'react'
import { trackGaEvent, trackMixpanelEvent } from '../../hooks/useAnalytics'
import { useTranslation } from '../../localization/localize'
import { usePersonalInfo } from '../../stores/portfolioStore'
import { Button } from '../common/button/Button'

export const HomeDownloadCv: React.FC = () => {
  const personalInfo = usePersonalInfo()
  const { t } = useTranslation()

  if (!personalInfo) {
    return null
  }

  return (
    <Button
      as="a"
      href={personalInfo.resume_link}
      variant="primary"
      size="large"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        trackGaEvent('Home', 'download_cv_click', 'Download CV')
        trackMixpanelEvent('download_cv_click', 'Home', 'Download CV')
      }}
    >
      {t('home.downloadCv')}
    </Button>
  )
}
