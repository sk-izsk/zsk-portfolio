import { create } from "zustand"

export type ThemeColor =
  | "color-1"
  | "color-2"
  | "color-3"
  | "color-4"
  | "color-5"
  | "color-6"
  | "color-7"
  | "color-8"
  | "color-9"
  | "color-10"

const DEFAULT_THEME_COLOR: ThemeColor = "color-1"
const DEFAULT_DARK_MODE = true

const isThemeColor = (value: string): value is ThemeColor => {
  return (
    value === "color-1" ||
    value === "color-2" ||
    value === "color-3" ||
    value === "color-4" ||
    value === "color-5" ||
    value === "color-6" ||
    value === "color-7" ||
    value === "color-8" ||
    value === "color-9" ||
    value === "color-10"
  )
}

const getInitialThemeState = () => {
  if (typeof window === "undefined") {
    return {
      isDarkMode: DEFAULT_DARK_MODE,
      currentColor: DEFAULT_THEME_COLOR,
    }
  }

  const storedDarkMode = window.localStorage.getItem("portfolio-dark-mode")
  const storedColor = window.localStorage.getItem("portfolio-color-theme")

  return {
    isDarkMode:
      storedDarkMode === null ? DEFAULT_DARK_MODE : storedDarkMode === "true",
    currentColor:
      storedColor && isThemeColor(storedColor)
        ? storedColor
        : DEFAULT_THEME_COLOR,
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

    if (typeof window !== "undefined") {
      window.localStorage.setItem("portfolio-dark-mode", String(nextValue))
    }

    set({ isDarkMode: nextValue })
  },
  setDarkMode: (isDarkMode) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("portfolio-dark-mode", String(isDarkMode))
    }

    set({ isDarkMode })
  },
  setCurrentColor: (color) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("portfolio-color-theme", color)
    }

    set({ currentColor: color })
  },
}))
