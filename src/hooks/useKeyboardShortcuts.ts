import { useEffect } from 'react'
import { usePortfolioStore } from '@stores/portfolioStore'
import { useSoundStore } from '@stores/soundStore'
import { useThemeStore } from '@stores/themeStore'

export const useKeyboardShortcuts = () => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable) {
        return
      }

      const key = event.key.toLowerCase()

      if (key === 'm' && !event.ctrlKey && !event.metaKey) {
        useSoundStore.getState().toggleSound()
      }

      if (key === 't' && !event.ctrlKey && !event.metaKey) {
        useThemeStore.getState().toggleDarkMode()
      }

      if (key === 'd' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
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
