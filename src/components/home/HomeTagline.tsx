import React from 'react'
import { homeTagline, homeTaglineWord } from '@components/home/home.css'
import { useTranslation } from '@localization/localize'

export const HomeTagline: React.FC = () => {
  const { t } = useTranslation()

  return (
    <p className={homeTagline}>
      {t('home.tagline')
        .split(' ')
        .map((word, index) => (
          // Words repeat and the list never reorders, so the position is the identity.
          <React.Fragment key={`${word}-${index}`}>
            <span className={homeTaglineWord}>{word}</span>{' '}
          </React.Fragment>
        ))}
    </p>
  )
}
