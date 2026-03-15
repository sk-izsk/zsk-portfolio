import React from 'react'
import { useTranslation } from 'react-i18next'
import { usePersonalInfo } from '../../stores/portfolioStore'
import { aboutText, aboutTextH3, aboutTextP, aboutTextSpan } from './about.css'

export const AboutPersonalIntro: React.FC = () => {
  const { t } = useTranslation()
  const personalInfo = usePersonalInfo()

  if (!personalInfo) {
    return null
  }

  return (
    <div className="row">
      <div className={`${aboutText} padd-15`}>
        <h3 className={aboutTextH3}>
          {t('about.introPrefix', { name: personalInfo.name })}{' '}
          <span className={aboutTextSpan}>{personalInfo.title}</span>
        </h3>
        <p className={aboutTextP}>{personalInfo.detailedBio}</p>
      </div>
    </div>
  )
}
