import { useMediaQuery } from '@hooks/useMediaQuery'
import { useEffect, type RefObject } from 'react'

const PHONE_QUERY = '(max-width: 767px)'

// The chat fills a phone screen, so keyboards and screen readers must not reach what it covers.
export const useAskAiPhoneModal = (panelRef: RefObject<HTMLElement | null>, isOpen: boolean) => {
  const isPhone = useMediaQuery(PHONE_QUERY)

  useEffect(() => {
    const panel = panelRef.current

    if (!panel?.parentElement || !isOpen || !isPhone) {
      return
    }

    const covered = Array.from(panel.parentElement.children).filter(
      (element): element is HTMLElement => element !== panel && element instanceof HTMLElement,
    )

    covered.forEach((element) => {
      element.inert = true
    })

    return () => {
      covered.forEach((element) => {
        element.inert = false
      })
    }
  }, [panelRef, isOpen, isPhone])
}
