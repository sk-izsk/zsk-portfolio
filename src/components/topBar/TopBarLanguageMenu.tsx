import * as styles from '@components/topBar/topBar.css'
import { useTranslation } from '@localization/localize'
import { cx } from '@utils/cn'
import { Languages } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

interface TopBarLanguageMenuProps {
  currentLanguage: 'en' | 'fr'
  onChange: (language: 'en' | 'fr') => void
}

const LANGUAGES = ['en', 'fr'] as const

export const TopBarLanguageMenu: React.FC<TopBarLanguageMenuProps> = ({
  currentLanguage,
  onChange,
}) => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', closeOnOutsideClick)
    window.addEventListener('keydown', closeOnEscape)

    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick)
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [isOpen])

  return (
    <div ref={rootRef} className={styles.languageMenu}>
      <button
        className={styles.languageMenuButton}
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-label={t('topBar.language.label')}
      >
        <Languages size={20} aria-hidden="true" />
      </button>
      {isOpen ? (
        <div className={styles.languageMenuPanel}>
          {LANGUAGES.map((language) => (
            <button
              key={language}
              className={cx(
                styles.languageMenuOption,
                currentLanguage === language && styles.languageActive,
              )}
              type="button"
              aria-pressed={currentLanguage === language}
              onClick={() => {
                onChange(language)
                setIsOpen(false)
              }}
            >
              {t(`topBar.language.${language}`)}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
