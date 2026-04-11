import { useEffect } from 'react'
import { usePortfolioStore } from '../stores/portfolioStore'
import { useSoundStore } from '../stores/soundStore'
import { useThemeStore } from '../stores/themeStore'

export const useKeyboardShortcuts = () => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore key events triggered inside text inputs
      const target = event.target as HTMLElement
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable) {
        return
      }

      const key = event.key.toLowerCase()

      // [M] - Mute / Unmute Sound
      if (key === 'm' && !event.ctrlKey && !event.metaKey) {
        useSoundStore.getState().toggleSound()
      }

      // [T] - Toggle Theme (Dark / Light)
      if (key === 't' && !event.ctrlKey && !event.metaKey) {
        useThemeStore.getState().toggleDarkMode()
      }

      // [Cmd/Ctrl + D] - Download CV
      if (key === 'd' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault() // Prevents native 'Add Bookmark' behavior
        const personalInfo = usePortfolioStore.getState().data?.personalInfo
        if (personalInfo?.resume_link) {
          window.open(personalInfo.resume_link, '_blank', 'noopener,noreferrer')
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
}
