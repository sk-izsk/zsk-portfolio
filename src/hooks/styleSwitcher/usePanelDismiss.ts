import { useEffect, type RefObject } from 'react'

const DISMISS_EVENTS = ['wheel', 'touchmove', 'resize'] as const

// Closes the panel on scrolling, resizing, or a press outside both of its parts.
export const usePanelDismiss = (
  isOpen: boolean,
  close: () => void,
  containerRef: RefObject<HTMLElement | null>,
  panelRef: RefObject<HTMLElement | null>,
) => {
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handlePress = (event: MouseEvent) => {
      const target = event.target as Node

      if (!containerRef.current?.contains(target) && !panelRef.current?.contains(target)) {
        close()
      }
    }

    DISMISS_EVENTS.forEach((name) => window.addEventListener(name, close))
    document.addEventListener('mousedown', handlePress)

    return () => {
      DISMISS_EVENTS.forEach((name) => window.removeEventListener(name, close))
      document.removeEventListener('mousedown', handlePress)
    }
  }, [isOpen, close, containerRef, panelRef])
}
