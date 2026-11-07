import { usePanelDismiss } from '@hooks/styleSwitcher/usePanelDismiss'
import { useGenie } from '@hooks/useGenie'
import { useTranslation } from '@localization/localize'
import { useCallback, useLayoutEffect, useRef, useState } from 'react'

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
    }
  }, [isOpen, i18n.resolvedLanguage])

  useGenie(panelRef, triggerRef, isOpen)
  usePanelDismiss(isOpen, close, containerRef, panelRef)

  return { isOpen, toggle, containerRef, triggerRef, panelRef }
}
