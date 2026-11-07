import { usePanelDismiss } from '@hooks/styleSwitcher/usePanelDismiss'
import { useGenie } from '@hooks/useGenie'
import { useTranslation } from '@localization/localize'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

const PANEL_GAP = 12

export const useStyleSwitcherPanel = () => {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const toggle = useCallback(() => setIsOpen((wasOpen) => !wasOpen), [])
  const close = useCallback(() => setIsOpen(false), [])

  // Before useGenie, which measures the panel. A new language changes the bar's width.
  useLayoutEffect(() => {
    const trigger = triggerRef.current
    const panel = panelRef.current

    if (trigger && panel) {
      const { bottom, right } = trigger.getBoundingClientRect()

      panel.style.top = `${bottom + PANEL_GAP}px`
      panel.style.right = `${document.documentElement.clientWidth - right}px`
      // Scrolls inside itself on a short screen, so the lower controls stay reachable.
      panel.style.maxHeight = `calc(100dvh - ${bottom + PANEL_GAP * 2}px)`
    }
  }, [isOpen, i18n.resolvedLanguage])

  useGenie(panelRef, triggerRef, isOpen)
  usePanelDismiss(isOpen, close, containerRef, panelRef)

  // The panel sits at the end of the page, so keyboard users would otherwise tab past it.
  useEffect(() => {
    const panel = panelRef.current

    if (isOpen) {
      panel?.focus({ preventScroll: true })
      return
    }

    if (panel?.contains(document.activeElement)) {
      triggerRef.current?.focus({ preventScroll: true })
    }
  }, [isOpen])

  return { isOpen, toggle, containerRef, triggerRef, panelRef }
}
