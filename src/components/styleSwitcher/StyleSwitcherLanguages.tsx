import * as styles from '@components/styleSwitcher/styleSwitcher.css'
import { useLanguageSwitch } from '@hooks/useLanguageSwitch'
import { useTranslation } from '@localization/localize'
import { createCn } from '@utils/cn'
import React from 'react'

const cn = createCn(styles)

export const StyleSwitcherLanguages: React.FC = () => {
  const { t } = useTranslation()
  const { currentLanguage, changeLanguage } = useLanguageSwitch()
  const languages = [
    { id: 'en', label: t('common.controls.english') },
    { id: 'fr', label: t('common.controls.french') },
  ] as const

  return (
    <div className={styles.languageSection}>
      <h4 className={styles.heading}>{t('common.controls.language')}</h4>
      <div className={styles.languageGrid}>
        {languages.map((language) => (
          <button
            key={language.id}
            className={cn('toggleButton', {
              languageOptionActive: currentLanguage === language.id,
            })}
            type="button"
            aria-pressed={currentLanguage === language.id}
            onClick={() => changeLanguage(language.id)}
          >
            <span className={styles.toggleButtonLabel}>{language.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
