import {
  panelEyebrow,
  panelHeading,
  styleSwitcher,
  styleSwitcherOpen,
  styleSwitcherPanel,
  styleSwitcherSpinIcon,
  styleSwitcherTrigger,
  toggleButton,
  toggleButtonActive,
  toggleButtonIcon,
  toggleButtonLabel,
  toggleGrid,
} from '@components/styleSwitcher/styleSwitcher.css'
import { StyleSwitcherThemeColors } from '@components/styleSwitcher/StyleSwitcherThemeColors'
import { useTranslation } from '@localization/localize'
import { useSoundStore } from '@stores/soundStore'
import { useThemeStore } from '@stores/themeStore'
import {
  color1Theme,
  color2Theme,
  color3Theme,
  color5Theme,
  color7Theme,
  color9Theme,
  darkColor1Theme,
  darkColor2Theme,
  darkColor3Theme,
  darkColor5Theme,
  darkColor7Theme,
  darkColor9Theme,
  darkTheme,
  lightTheme,
} from '@styles/themes.css'
import { Moon, Settings, Sun, Volume2, VolumeX } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

const lightThemeByColor = {
  'color-1': color1Theme,
  'color-2': color2Theme,
  'color-3': color3Theme,
  'color-5': color5Theme,
  'color-7': color7Theme,
  'color-9': color9Theme,
} as const

const darkThemeByColor = {
  'color-1': darkColor1Theme,
  'color-2': darkColor2Theme,
  'color-3': darkColor3Theme,
  'color-5': darkColor5Theme,
  'color-7': darkColor7Theme,
  'color-9': darkColor9Theme,
} as const

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
    document.body.className = ''

    const themeClass = isDarkMode
      ? (darkThemeByColor[currentColor] ?? darkTheme)
      : (lightThemeByColor[currentColor] ?? lightTheme)

    document.body.classList.add(themeClass)
  }, [isDarkMode, currentColor])

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
    <div ref={styleSwitcherRef} className={styleSwitcher}>
      <button
        className={styleSwitcherTrigger}
        type="button"
        onClick={toggleSwitcher}
        aria-expanded={isOpen}
        aria-label={t('common.controls.openAppearance')}
      >
        <Settings className={styleSwitcherSpinIcon} size={22} />
      </button>
      <div className={`${styleSwitcherPanel} ${isOpen ? styleSwitcherOpen : ''}`}>
        <p className={panelEyebrow}>{t('common.controls.appearance')}</p>
        <h3 className={panelHeading}>{t('common.controls.personalize')}</h3>
        <StyleSwitcherThemeColors currentColor={currentColor} onChangeColor={setCurrentColor} />
        <div className={toggleGrid}>
          <button
            className={`${toggleButton} ${isDarkMode ? toggleButtonActive : ''}`}
            type="button"
            onClick={toggleDarkMode}
          >
            <span className={toggleButtonLabel}>
              {isDarkMode ? t('common.controls.lightMode') : t('common.controls.darkMode')}
            </span>
            {isDarkMode ? (
              <Sun className={toggleButtonIcon} size={16} />
            ) : (
              <Moon className={toggleButtonIcon} size={16} />
            )}
          </button>
          <button
            className={`${toggleButton} ${isSoundEnabled ? toggleButtonActive : ''}`}
            type="button"
            onClick={toggleSound}
          >
            <span className={toggleButtonLabel}>
              {isSoundEnabled ? t('common.controls.soundOn') : t('common.controls.soundOff')}
            </span>
            {isSoundEnabled ? (
              <Volume2 className={toggleButtonIcon} size={16} />
            ) : (
              <VolumeX className={toggleButtonIcon} size={16} />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
