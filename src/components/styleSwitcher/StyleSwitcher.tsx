import React, { useEffect, useRef, useState } from 'react'
import { useThemeStore } from '../../stores/themeStore'
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
} from '../../styles/themes.css'
import { styleSwitcher, styleSwitcherOpen } from './styleSwitcher.css'
import { StyleSwitcherSettings } from './StyleSwitcherSettings'
import { StyleSwitcherToggleTheme } from './StyleSwitcherToggleTheme'

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
  const isDarkMode = useThemeStore((state) => state.isDarkMode)
  const currentColor = useThemeStore((state) => state.currentColor)
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode)
  const setCurrentColor = useThemeStore((state) => state.setCurrentColor)
  const [isOpen, setIsOpen] = useState(false)
  const styleSwitcherRef = useRef<HTMLDivElement>(null)

  const toggleSwitcher = () => {
    setIsOpen((prevState) => !prevState)
  }

  // Hide style switcher on mouse wheel or touch move
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

  // Apply selected theme class to body
  useEffect(() => {
    document.body.className = ''

    const themeClass = isDarkMode
      ? (darkThemeByColor[currentColor] ?? darkTheme)
      : (lightThemeByColor[currentColor] ?? lightTheme)

    document.body.classList.add(themeClass)
  }, [isDarkMode, currentColor])

  // Handle click outside to close style switcher
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
    <div ref={styleSwitcherRef} className={`${styleSwitcher} ${isOpen ? styleSwitcherOpen : ''}`}>
      <StyleSwitcherSettings
        currentColor={currentColor}
        isOpen={isOpen}
        onToggleOpen={toggleSwitcher}
        onChangeColor={setCurrentColor}
      />
      <StyleSwitcherToggleTheme isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
    </div>
  )
}
