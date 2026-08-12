import { create } from 'zustand'

export type ThemeColor = 'color-1' | 'color-2' | 'color-3' | 'color-5' | 'color-7' | 'color-9'

const DEFAULT_THEME_COLOR: ThemeColor = 'color-3'
const DEFAULT_DARK_MODE = false

const getStorage = (): Storage | null => {
  if (typeof window === 'undefined') {
    return null
  }

  const storage = window.localStorage

  if (
    !storage ||
    typeof storage.getItem !== 'function' ||
    typeof storage.setItem !== 'function'
  ) {
    return null
  }

  return storage
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

const getInitialThemeState = () => {
  const storage = getStorage()

  if (!storage) {
    return {
      isDarkMode: DEFAULT_DARK_MODE,
      currentColor: DEFAULT_THEME_COLOR,
    }
  }

  const storedDarkMode = storage.getItem('portfolio-dark-mode')
  const storedColor = storage.getItem('portfolio-color-theme')

  return {
    isDarkMode: storedDarkMode === null ? DEFAULT_DARK_MODE : storedDarkMode === 'true',
    currentColor: storedColor && isThemeColor(storedColor) ? storedColor : DEFAULT_THEME_COLOR,
  }
}

type ThemeStore = {
  isDarkMode: boolean
  currentColor: ThemeColor
  toggleDarkMode: () => void
  setDarkMode: (isDarkMode: boolean) => void
  setCurrentColor: (color: ThemeColor) => void
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  ...getInitialThemeState(),
  toggleDarkMode: () => {
    const nextValue = !get().isDarkMode
    const storage = getStorage()

    if (storage) {
      storage.setItem('portfolio-dark-mode', String(nextValue))
    }

    set({ isDarkMode: nextValue })
  },
  setDarkMode: (isDarkMode) => {
    const storage = getStorage()

    if (storage) {
      storage.setItem('portfolio-dark-mode', String(isDarkMode))
    }

    set({ isDarkMode })
  },
  setCurrentColor: (color) => {
    const storage = getStorage()

    if (storage) {
      storage.setItem('portfolio-color-theme', color)
    }

    set({ currentColor: color })
  },
}))
