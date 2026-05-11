import type { ThemeColor } from '@stores/themeStore'
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

const DEFAULT_THEME_COLOR: ThemeColor = 'color-3'

const lightThemeByColor: Record<ThemeColor, string> = {
  'color-1': color1Theme,
  'color-2': color2Theme,
  'color-3': color3Theme,
  'color-5': color5Theme,
  'color-7': color7Theme,
  'color-9': color9Theme,
}

const darkThemeByColor: Record<ThemeColor, string> = {
  'color-1': darkColor1Theme,
  'color-2': darkColor2Theme,
  'color-3': darkColor3Theme,
  'color-5': darkColor5Theme,
  'color-7': darkColor7Theme,
  'color-9': darkColor9Theme,
}

const isThemeColor = (value: string): value is ThemeColor => {
  return (
    value === 'color-1' ||
    value === 'color-2' ||
    value === 'color-3' ||
    value === 'color-5' ||
    value === 'color-7' ||
    value === 'color-9'
  )
}

export const getStoredThemePreferences = () => {
  if (typeof window === 'undefined') {
    return {
      isDarkMode: false,
      currentColor: DEFAULT_THEME_COLOR,
    }
  }

  const storedDarkMode = window.localStorage.getItem('portfolio-dark-mode')
  const storedColor = window.localStorage.getItem('portfolio-color-theme')

  return {
    isDarkMode: storedDarkMode === 'true',
    currentColor: storedColor && isThemeColor(storedColor) ? storedColor : DEFAULT_THEME_COLOR,
  }
}

export const resolveThemeClass = (isDarkMode: boolean, currentColor: ThemeColor) => {
  return isDarkMode
    ? (darkThemeByColor[currentColor] ?? darkTheme)
    : (lightThemeByColor[currentColor] ?? lightTheme)
}

export const applyThemeClassToBody = (isDarkMode: boolean, currentColor: ThemeColor) => {
  if (typeof document === 'undefined') {
    return
  }

  document.body.className = ''
  document.body.classList.add(resolveThemeClass(isDarkMode, currentColor))
}

export const applyStoredThemeClass = () => {
  const { isDarkMode, currentColor } = getStoredThemePreferences()
  applyThemeClassToBody(isDarkMode, currentColor)
}
