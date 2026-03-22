import React from 'react'
import { useTranslation } from '../../localization/localize'
import { usePersonalInfo } from '../../stores/portfolioStore'
import { Button } from '../common/Button'

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
    >
      {t('home.downloadCv')}
    </Button>
  )
}
