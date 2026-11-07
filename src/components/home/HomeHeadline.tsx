import React from 'react'
import { helloName, homeEyebrow, homeHeadline } from '@components/home/home.css'
import { useTranslation } from '@localization/localize'
import { usePersonalInfo } from '@stores/portfolioStore'

export const HomeHeadline: React.FC = () => {
  const { t } = useTranslation()
  const personalInfo = usePersonalInfo()

  if (!personalInfo) {
    return null
  }

  return (
    <>
      <p className={homeEyebrow}>
        {personalInfo.greeting} <span className={helloName}>{personalInfo.name}</span>
      </p>
      <h1 className={homeHeadline}>{t('home.headline')}</h1>
    </>
  )
}
