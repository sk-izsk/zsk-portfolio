import * as styles from '@components/sidebar/sidebar.css'
import { useLanguageSwitch } from '@hooks/useLanguageSwitch'
import { useTranslation } from '@localization/localize'
import { createCn } from '@utils/cn'
import React from 'react'

const cn = createCn(styles)

export const SidebarLanguages: React.FC = () => {
  const { t } = useTranslation()
  const { currentLanguage, changeLanguage } = useLanguageSwitch()
  const languages = [
    { id: 'en', label: t('sidebar.language.en') },
    { id: 'fr', label: t('sidebar.language.fr') },
  ] as const

  return (
    <div className={styles.languages}>
      {languages.map((language, index) => (
        <React.Fragment key={language.id}>
          {index > 0 ? (
            <span className={styles.languageDivider} aria-hidden="true">
              |
            </span>
          ) : null}
          <button
            className={cn('languageButton', {
              languageButtonActive: currentLanguage === language.id,
            })}
            type="button"
            aria-pressed={currentLanguage === language.id}
            onClick={() => changeLanguage(language.id)}
          >
            {language.label}
          </button>
        </React.Fragment>
      ))}
    </div>
  )
}
