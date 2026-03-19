import { beforeEach, describe, expect, it } from 'vitest'
import { useThemeStore } from '../../src/stores/themeStore'

describe('themeStore', () => {
  beforeEach(() => {
    localStorage.clear()
    useThemeStore.setState({ isDarkMode: true, currentColor: 'color-1' })
  })

  it('has a valid initial dark mode default', () => {
    expect(typeof useThemeStore.getState().isDarkMode).toBe('boolean')
  })

  it('toggleDarkMode flips isDarkMode and persists to localStorage', () => {
    useThemeStore.setState({ isDarkMode: false })
    useThemeStore.getState().toggleDarkMode()

    expect(useThemeStore.getState().isDarkMode).toBe(true)
    expect(localStorage.getItem('portfolio-dark-mode')).toBe('true')
  })

  it('setDarkMode sets isDarkMode to false and persists', () => {
    useThemeStore.getState().setDarkMode(false)

    expect(useThemeStore.getState().isDarkMode).toBe(false)
    expect(localStorage.getItem('portfolio-dark-mode')).toBe('false')
  })

  it('setCurrentColor updates the theme color', () => {
    useThemeStore.getState().setCurrentColor('color-3')

    expect(useThemeStore.getState().currentColor).toBe('color-3')
  })

  it('setCurrentColor persists color to localStorage', () => {
    useThemeStore.getState().setCurrentColor('color-7')
    expect(localStorage.getItem('portfolio-color-theme')).toBe('color-7')
  })
})
