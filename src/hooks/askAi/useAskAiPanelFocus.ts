import { useEffect, useRef, type RefObject } from 'react'

export const useAskAiPanelFocus = (
  panelRef: RefObject<HTMLElement | null>,
  triggerRef: RefObject<HTMLElement | null>,
  isOpen: boolean,
  isCloseShape: boolean,
  close: () => void,
) => {
  const owesFocus = useRef(false)

  useEffect(() => {
    const panel = panelRef.current

    if (isOpen) {
      owesFocus.current = false
      panel?.focus({ preventScroll: true })
      return
    }

    // Closing hides what had focus, so keyboard users continue from the button that opened it.
    if (panel?.contains(document.activeElement)) {
      owesFocus.current = true
      triggerRef.current?.focus({ preventScroll: true })
    }
  }, [panelRef, triggerRef, isOpen])

  // On a phone the button stays hidden until the chat has closed, so that first try cannot land.
  useEffect(() => {
    const trigger = triggerRef.current

    if (isCloseShape || !owesFocus.current) {
      return
    }

    owesFocus.current = false

    if (document.activeElement !== trigger && document.activeElement === document.body) {
      trigger?.focus({ preventScroll: true })
    }
  }, [triggerRef, isCloseShape])

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
