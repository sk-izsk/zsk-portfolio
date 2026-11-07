import { useEffect, type RefObject } from 'react'

export const useAskAiPanelFocus = (
  panelRef: RefObject<HTMLElement | null>,
  triggerRef: RefObject<HTMLElement | null>,
  isOpen: boolean,
  close: () => void,
) => {
  useEffect(() => {
    const panel = panelRef.current

    if (isOpen) {
      panel?.focus({ preventScroll: true })
      return
    }

    // Closing hides what had focus, so keyboard users continue from the button that opened it.
    if (panel?.contains(document.activeElement)) {
      triggerRef.current?.focus({ preventScroll: true })
    }
  }, [panelRef, triggerRef, isOpen])

  // Listens on the window because focus leaves the panel when a clicked suggestion disappears.
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close()
      }
    }

    window.addEventListener('keydown', closeOnEscape)

    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isOpen, close])
}
