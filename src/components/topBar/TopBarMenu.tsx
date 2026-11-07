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

interface TopBarMenuProps {
  items: { id: string; label: string; icon: LucideIcon; path: string }[]
  activeId: string
  languages: React.ReactNode
}

export const TopBarMenu: React.FC<TopBarMenuProps> = ({ items, activeId, languages }) => {
  const { t } = useTranslation()
  const isOpen = useNavMenuStore((state) => state.isOpen)
  const close = useNavMenuStore((state) => state.close)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current

    if (!dialog) {
      return
    }

    if (isOpen && !dialog.open) {
      dialog.showModal()
    }

    if (!isOpen && dialog.open) {
      dialog.close()
    }
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
    >
      {isOpen ? (
        <>
          <div className={styles.menuTop}>
            {languages}
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
        </>
      ) : null}
    </dialog>
  )
}
