import * as styles from '@components/styleSwitcher/styleSwitcher.css'
import { useTranslation } from '@localization/localize'
import { trackGaEvent, trackMixpanelEvent } from '@utils/analytics'
import { createCn } from '@utils/cn'
import React from 'react'

const cn = createCn(styles)

export const StyleSwitcherLanguages: React.FC = () => {
  const { t, i18n } = useTranslation()
  const currentLanguage = i18n.resolvedLanguage === 'fr' ? 'fr' : 'en'
  const languages = [
    { id: 'en', label: t('common.controls.english') },
    { id: 'fr', label: t('common.controls.french') },
  ] as const

  const handleLanguageChange = (language: 'en' | 'fr') => {
    const label = language.toUpperCase()
    trackGaEvent('Language', 'language_switch_click', label)
    trackMixpanelEvent('language_switch_click', 'Language', label)
    void i18n.changeLanguage(language)
  }

  return (
    <>
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
            onClick={() => handleLanguageChange(language.id)}
          >
            <span className={styles.toggleButtonLabel}>{language.label}</span>
          </button>
        ))}
      </div>
    </>
  )
}
