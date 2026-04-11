import { createTheme } from '@vanilla-extract/css'
import { createDarkThemeConfig, createLightThemeConfig } from '@utils/theme'
import { vars } from '@styles/theme.css'

const skinByColor = {
  'color-1': '#ec1839',
  'color-2': '#fa5b0f',
  'color-3': '#37b182',
  'color-5': '#f021b2',
  'color-7': '#daa520',
  'color-9': '#00bfff',
} as const

export const lightTheme = createTheme(vars, createLightThemeConfig(skinByColor['color-1']))

// Color theme variations - light mode base
export const color1Theme = createTheme(vars, createLightThemeConfig(skinByColor['color-1']))

export const color2Theme = createTheme(vars, createLightThemeConfig(skinByColor['color-2']))

export const color3Theme = createTheme(vars, createLightThemeConfig(skinByColor['color-3']))

export const color5Theme = createTheme(vars, createLightThemeConfig(skinByColor['color-5']))

// Dark theme variations
export const darkColor1Theme = createTheme(vars, createDarkThemeConfig(skinByColor['color-1']))

export const darkColor2Theme = createTheme(vars, createDarkThemeConfig(skinByColor['color-2']))

export const darkColor3Theme = createTheme(vars, createDarkThemeConfig(skinByColor['color-3']))

export const darkColor5Theme = createTheme(vars, createDarkThemeConfig(skinByColor['color-5']))

// Additional light color themes
export const color7Theme = createTheme(vars, createLightThemeConfig(skinByColor['color-7']))

export const color9Theme = createTheme(vars, createLightThemeConfig(skinByColor['color-9']))

// Additional dark color themes
export const darkColor7Theme = createTheme(vars, createDarkThemeConfig(skinByColor['color-7']))

export const darkColor9Theme = createTheme(vars, createDarkThemeConfig(skinByColor['color-9']))

// Default dark theme (alias for darkColor1Theme)
export const darkTheme = darkColor1Theme
