import * as styles from '@components/styleSwitcher/styleSwitcher.css'
import { StyleSwitcherThemeColors } from '@components/styleSwitcher/StyleSwitcherThemeColors'
import { useTranslation } from '@localization/localize'
import { useSoundStore } from '@stores/soundStore'
import { useThemeStore } from '@stores/themeStore'
import { createCn } from '@utils/cn'
import { Moon, Settings, Sun, Volume2, VolumeX } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
const cn = createCn(styles)

export const StyleSwitcher: React.FC = () => {
  const { t } = useTranslation()
  const isDarkMode = useThemeStore((state) => state.isDarkMode)
  const isSoundEnabled = useSoundStore((state) => state.isSoundEnabled)
  const toggleSound = useSoundStore((state) => state.toggleSound)
  const currentColor = useThemeStore((state) => state.currentColor)
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode)
  const setCurrentColor = useThemeStore((state) => state.setCurrentColor)
  const [isOpen, setIsOpen] = useState(false)
  const styleSwitcherRef = useRef<HTMLDivElement>(null)

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
        className={styles.styleSwitcherTrigger}
        type="button"
        onClick={toggleSwitcher}
        aria-expanded={isOpen}
        aria-label={t('common.controls.openAppearance')}
      >
        <Settings className={styles.styleSwitcherSpinIcon} size={22} />
      </button>
      <div className={cn('styleSwitcherPanel', { styleSwitcherOpen: isOpen })}>
        <p className={styles.panelEyebrow}>{t('common.controls.appearance')}</p>
        <h3 className={styles.panelHeading}>{t('common.controls.personalize')}</h3>
        <StyleSwitcherThemeColors currentColor={currentColor} onChangeColor={setCurrentColor} />
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
