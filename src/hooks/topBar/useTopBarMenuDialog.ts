import { sidebarQuery } from '@components/sidebar/sidebar.css'
import { useNavMenuStore } from '@stores/navMenuStore'
import { canAnimate } from '@utils/motion'
import { useEffect, useRef, type MouseEvent, type SyntheticEvent } from 'react'

const SLIDE_KEYFRAMES = [{ transform: 'translateX(100%)' }, { transform: 'translateX(0)' }]
const SLIDE_TIMING = { duration: 400, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }

const slideIn = (dialog: HTMLDialogElement) => {
  if (!dialog.open) {
    dialog.showModal()
  }

  if (!canAnimate()) {
    return
  }

  const animation = dialog.animate(SLIDE_KEYFRAMES, SLIDE_TIMING)

  return () => animation.cancel()
}

const slideOut = (dialog: HTMLDialogElement) => {
  if (!dialog.open) {
    return
  }

  if (!canAnimate()) {
    dialog.close()
    return
  }

  // Slides back out the way it came, and only then leaves the page.
  const animation = dialog.animate(SLIDE_KEYFRAMES, {
    ...SLIDE_TIMING,
    direction: 'reverse',
    fill: 'forwards',
  })
  animation.onfinish = () => dialog.close()

  return () => animation.cancel()
}

export const useTopBarMenuDialog = () => {
  const isOpen = useNavMenuStore((state) => state.isOpen)
  const close = useNavMenuStore((state) => state.close)
  const toggle = useNavMenuStore((state) => state.toggle)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current

    if (dialog) {
      return isOpen ? slideIn(dialog) : slideOut(dialog)
    }
  }, [isOpen])

  // The menu only exists without the sidebar, so it must not outlive a resize that brings it in.
  useEffect(() => {
    const hasSidebar = window.matchMedia(sidebarQuery)
    const closeWithSidebar = () => {
      if (hasSidebar.matches) {
        close()
      }
    }

    hasSidebar.addEventListener('change', closeWithSidebar)

    return () => hasSidebar.removeEventListener('change', closeWithSidebar)
  }, [close])

  // The page ignores taps until the slide out ends, so a quick tap to reopen lands here.
  // Not on a link, where a double tap means going to that page.
  const handleDialogClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (!isOpen && !(event.target as Element).closest('a')) {
      toggle()
    }
  }

  // Escape would close it on the spot, skipping the slide out.
  const handleDialogCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault()
    close()
  }

  return { dialogRef, close, handleDialogClick, handleDialogCancel }
}
