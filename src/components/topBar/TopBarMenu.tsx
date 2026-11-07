import * as styles from '@components/topBar/topBar.css'
import { useTranslation } from '@localization/localize'
import { useNavMenuStore } from '@stores/navMenuStore'
import { cx } from '@utils/cn'
import { X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router'

const LINK_STEP_MS = 60
const LINK_SEQUENCE_CAP_MS = 400
const SLIDE_KEYFRAMES = [{ transform: 'translateX(100%)' }, { transform: 'translateX(0)' }]
const SLIDE_TIMING = { duration: 400, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }

interface TopBarMenuProps {
  items: { id: string; label: string; icon: LucideIcon; path: string }[]
  activeId: string
}

export const TopBarMenu: React.FC<TopBarMenuProps> = ({ items, activeId }) => {
  const { t } = useTranslation()
  const isOpen = useNavMenuStore((state) => state.isOpen)
  const close = useNavMenuStore((state) => state.close)
  const toggle = useNavMenuStore((state) => state.toggle)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current

    if (!dialog) {
      return
    }

    const canAnimate = window.matchMedia('(prefers-reduced-motion: no-preference)').matches

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal()
      }

      if (!canAnimate) {
        return
      }

      const slideIn = dialog.animate(SLIDE_KEYFRAMES, SLIDE_TIMING)

      return () => slideIn.cancel()
    }

    if (!dialog.open) {
      return
    }

    if (!canAnimate) {
      dialog.close()
      return
    }

    // Slides back out the way it came, and only then leaves the page.
    const slideOut = dialog.animate(SLIDE_KEYFRAMES, {
      ...SLIDE_TIMING,
      direction: 'reverse',
      fill: 'forwards',
    })
    slideOut.onfinish = () => dialog.close()

    return () => slideOut.cancel()
  }, [isOpen])

  // The panel only exists for the compact bar, so it must not outlive a resize to the full one.
  useEffect(() => {
    const fullBar = window.matchMedia(styles.fullBarQuery)
    const closeOnFullBar = () => {
      if (fullBar.matches) {
        close()
      }
    }

    fullBar.addEventListener('change', closeOnFullBar)

    return () => fullBar.removeEventListener('change', closeOnFullBar)
  }, [close])

  return (
    <dialog
      ref={dialogRef}
      className={styles.menu}
      aria-label={t('topBar.toggle.open')}
      onClose={close}
      // The page ignores taps until the slide out ends, so a quick tap to reopen lands here.
      onClick={() => {
        if (!isOpen) {
          toggle()
        }
      }}
      onCancel={(event) => {
        // Escape would close it on the spot, skipping the slide out.
        event.preventDefault()
        close()
      }}
    >
      <div className={styles.menuTop}>
        <button
          className={styles.menuClose}
          type="button"
          onClick={close}
          aria-label={t('topBar.toggle.close')}
        >
          <X size={22} />
        </button>
      </div>
      <nav className={styles.menuLinks}>
        {items.map((item, index) => {
          const Icon = item.icon

          return (
            <Link
              key={item.id}
              to={item.path}
              onClick={close}
              aria-current={item.id === activeId ? 'page' : undefined}
              className={cx(styles.menuLink, item.id === activeId && styles.menuLinkActive)}
              style={{
                animationDelay: `${Math.min(index * LINK_STEP_MS, LINK_SEQUENCE_CAP_MS)}ms`,
              }}
            >
              <Icon size={22} aria-hidden="true" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </dialog>
  )
}
