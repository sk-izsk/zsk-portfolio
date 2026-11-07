import { useEffect, type RefObject } from 'react'

const DISMISS_EVENTS = ['wheel', 'touchmove', 'resize'] as const

// Closes the panel on Escape, on scrolling or resizing the page, or on a press outside it.
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

    const isInPanel = (target: EventTarget | null) =>
      target instanceof Node && panelRef.current?.contains(target)

    // Scrolling inside the panel moves its own controls on a short screen, and must not close it.
    const handlePageMove = (event: Event) => {
      if (!isInPanel(event.target)) {
        close()
      }
    }

    const handlePress = (event: MouseEvent) => {
      const isInContainer =
        event.target instanceof Node && containerRef.current?.contains(event.target)

      if (!isInContainer && !isInPanel(event.target)) {
        close()
      }
    }

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close()
      }
    }

    DISMISS_EVENTS.forEach((name) => window.addEventListener(name, handlePageMove))
    document.addEventListener('mousedown', handlePress)
    window.addEventListener('keydown', handleKey)

    return () => {
      DISMISS_EVENTS.forEach((name) => window.removeEventListener(name, handlePageMove))
      document.removeEventListener('mousedown', handlePress)
      window.removeEventListener('keydown', handleKey)
    }
  }, [isOpen, close, containerRef, panelRef])
}
