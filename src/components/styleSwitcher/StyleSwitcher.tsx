import * as styles from '@components/styleSwitcher/styleSwitcher.css'
import { StyleSwitcherThemeColors } from '@components/styleSwitcher/StyleSwitcherThemeColors'
import { useGenie } from '@hooks/useGenie'
import { useTranslation } from '@localization/localize'
import { useSoundStore } from '@stores/soundStore'
import { useThemeStore } from '@stores/themeStore'
import { trackGaEvent, trackMixpanelEvent } from '@utils/analytics'
import { createCn } from '@utils/cn'
import { Moon, Settings, Sun, Volume2, VolumeX } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
const cn = createCn(styles)

export const StyleSwitcher: React.FC = () => {
  const { t, i18n } = useTranslation()
  const isDarkMode = useThemeStore((state) => state.isDarkMode)
  const isSoundEnabled = useSoundStore((state) => state.isSoundEnabled)
  const toggleSound = useSoundStore((state) => state.toggleSound)
  const currentColor = useThemeStore((state) => state.currentColor)
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode)
  const setCurrentColor = useThemeStore((state) => state.setCurrentColor)
  const [isOpen, setIsOpen] = useState(false)
  const styleSwitcherRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useGenie(panelRef, triggerRef, isOpen)

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

  const toggleSwitcher = () => {
    setIsOpen((prevState) => !prevState)
  }

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleHide = () => {
      setIsOpen(false)
    }

    window.addEventListener('wheel', handleHide)
    window.addEventListener('touchmove', handleHide)

    return () => {
      window.removeEventListener('wheel', handleHide)
      window.removeEventListener('touchmove', handleHide)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (styleSwitcherRef.current && !styleSwitcherRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div ref={styleSwitcherRef} className={styles.styleSwitcher}>
      <button
        ref={triggerRef}
        className={styles.styleSwitcherTrigger}
        type="button"
        onClick={toggleSwitcher}
        aria-expanded={isOpen}
        aria-label={t('common.controls.openAppearance')}
      >
        <Settings className={styles.styleSwitcherSpinIcon} size={22} />
      </button>
      <div ref={panelRef} className={styles.styleSwitcherPanel} data-open={isOpen || undefined}>
        <p className={styles.panelEyebrow}>{t('common.controls.appearance')}</p>
        <h3 className={styles.panelHeading}>{t('common.controls.personalize')}</h3>
        <StyleSwitcherThemeColors currentColor={currentColor} onChangeColor={setCurrentColor} />
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
        <div className={styles.toggleGrid}>
          <button
            className={cn('toggleButton', { toggleButtonActive: isDarkMode })}
            type="button"
            onClick={toggleDarkMode}
          >
            <span className={styles.toggleButtonLabel}>
              {isDarkMode ? t('common.controls.lightMode') : t('common.controls.darkMode')}
            </span>
            {isDarkMode ? (
              <Sun className={styles.toggleButtonIcon} size={16} />
            ) : (
              <Moon className={styles.toggleButtonIcon} size={16} />
            )}
          </button>
          <button
            className={cn('toggleButton', { toggleButtonActive: isSoundEnabled })}
            type="button"
            onClick={toggleSound}
          >
            <span className={styles.toggleButtonLabel}>
              {isSoundEnabled ? t('common.controls.soundOn') : t('common.controls.soundOff')}
            </span>
            {isSoundEnabled ? (
              <Volume2 className={styles.toggleButtonIcon} size={16} />
            ) : (
              <VolumeX className={styles.toggleButtonIcon} size={16} />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
