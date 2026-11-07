import { playGenie } from '@utils/genieLayer'
import { canAnimate } from '@utils/motion'
import { useLayoutEffect, useRef, type RefObject } from 'react'

// Plays the genie each time `isOpen` changes. `onSettled` runs once the window has finished.
export const useGenie = (
  panelRef: RefObject<HTMLElement | null>,
  triggerRef: RefObject<HTMLElement | null>,
  isOpen: boolean,
  onSettled?: (isOpen: boolean) => void,
  scrollSelector?: string,
) => {
  const wasOpen = useRef(isOpen)

  useLayoutEffect(() => {
    const panel = panelRef.current
    const trigger = triggerRef.current

    if (wasOpen.current === isOpen) {
      return
    }

    wasOpen.current = isOpen

    if (!panel || !trigger || !canAnimate()) {
      onSettled?.(isOpen)
      return
    }

    return playGenie(panel, trigger, isOpen, () => onSettled?.(isOpen), scrollSelector)
  }, [panelRef, triggerRef, isOpen, scrollSelector, onSettled])
}
