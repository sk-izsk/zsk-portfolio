import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown } from 'lucide-react'
import { useTranslation } from '@localization/localize'
import { Button } from '@components/common/button/Button'
import { Divider } from '@components/common/divider/Divider'
import * as modalStyles from '@components/common/modal/modal.css'
import { useScrollableOverflow } from '@hooks/useScrollableOverflow'
import { createCn } from '@utils/cn'

const modalRoot = typeof window !== 'undefined' ? document.body : null

interface ModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  contentProtected?: boolean
}

type ModalCompound = React.FC<ModalProps> & {
  Title: React.FC<{ children: React.ReactNode; onClose?: () => void }>
  Body: React.FC<{ children: React.ReactNode }>
  Description: React.FC<{ children: React.ReactNode }>
  Highlights: React.FC<{ children: React.ReactNode }>
  Footer: React.FC<{
    link?: string
    demoLink?: string
    linkLabel?: string
    demoLinkLabel?: string
    onClose: () => void
  }>
}
const cn = createCn(modalStyles)

export const Modal: ModalCompound = ({ open, onClose, children, contentProtected = false }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [shouldRender, setShouldRender] = useState(open)

  useEffect(() => {
    if (open) {
      setShouldRender(true)
    }
  }, [open])

  const handleAnimationEnd = () => {
    if (!open) {
      setShouldRender(false)
    }
  }

  useEffect(() => {
    if (!open) {
      return
    }

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKey)
    document.addEventListener('mousedown', handleClick)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.removeEventListener('mousedown', handleClick)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!shouldRender || !modalRoot) {
    return null
  }

  return createPortal(
    <div className={cn('overlay', { overlayAnimateIn: open, overlayAnimateOut: !open })}>
      <div
        ref={ref}
        className={cn('modal', { modalAnimateIn: open, modalAnimateOut: !open })}
        data-content-protected={contentProtected || undefined}
        onAnimationEnd={handleAnimationEnd}
      >
        {children}
      </div>
    </div>,
    modalRoot,
  )
}

Modal.Title = ({ children }) => (
  <>
    <div className={modalStyles.titleRowSticky}>
      <h2 className={modalStyles.title}>{children}</h2>
    </div>
    <Divider />
  </>
)

Modal.Body = ({ children }) => {
  const viewportRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const { hasMoreBelow } = useScrollableOverflow({
    isEnabled: true,
    viewportRef,
    contentRef,
    dependencies: [children],
  })

  const handleScrollCueClick = () => {
    const viewport = viewportRef.current

    if (!viewport) {
      return
    }

    viewport.scrollTo({
      top: viewport.scrollTop + Math.round(viewport.clientHeight * 0.7),
      behavior: 'smooth',
    })
  }

  return (
    <div className={modalStyles.modalBody} ref={viewportRef}>
      <div ref={contentRef}>{children}</div>
      <button
        type="button"
        aria-label="Scroll for more modal content"
        aria-hidden={!hasMoreBelow}
        data-visible={hasMoreBelow ? 'true' : 'false'}
        className={cn('scrollCue', {
          scrollCueVisible: hasMoreBelow,
          scrollCueHidden: !hasMoreBelow,
        })}
        onClick={handleScrollCueClick}
        tabIndex={hasMoreBelow ? 0 : -1}
      >
        <ChevronDown size={16} aria-hidden="true" />
      </button>
    </div>
  )
}

Modal.Description = ({ children }) => <div className={modalStyles.desc}>{children}</div>

Modal.Highlights = ({ children }) => <ul className={modalStyles.highlights}>{children}</ul>

Modal.Footer = ({ link, demoLink, linkLabel, demoLinkLabel, onClose }) => {
  const { t } = useTranslation()
  return (
    <>
      <Divider />
      <div className={modalStyles.footerSticky}>
        <div className={modalStyles.footerDemoGroup}>
          {demoLink && demoLink !== '' && (
            <Button
              as="a"
              href={demoLink}
              variant="primary"
              size="medium"
              className={cn('footerButton', 'footerLinkButton')}
              target="_blank"
              rel="noopener noreferrer"
            >
              {demoLinkLabel ?? t('common.modal.demoLink')}
            </Button>
          )}
        </div>
        <div className={modalStyles.footerMainActions}>
          <Button
            variant="secondary"
            size="medium"
            className={modalStyles.footerButton}
            onClick={onClose}
            type="button"
          >
            {t('common.modal.close')}
          </Button>
          {link && link !== '' && (
            <Button
              as="a"
              href={link}
              variant="primary"
              size="medium"
              className={cn('footerButton', 'footerLinkButton')}
              target="_blank"
              rel="noopener noreferrer"
            >
              {linkLabel ?? t('common.modal.projectLink')}
            </Button>
          )}
        </div>
      </div>
    </>
  )
}
