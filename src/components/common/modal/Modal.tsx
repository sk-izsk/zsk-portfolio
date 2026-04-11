import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from '../../../localization/localize'
import { Button } from '../button/Button'
import { Divider } from '../divider/Divider'
import * as modalStyles from './modal.css'

const modalRoot = typeof window !== 'undefined' ? document.body : null

interface ModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

type ModalCompound = React.FC<ModalProps> & {
  Title: React.FC<{ children: React.ReactNode; onClose?: () => void }>
  Body: React.FC<{ children: React.ReactNode }>
  Description: React.FC<{ children: React.ReactNode }>
  Highlights: React.FC<{ children: React.ReactNode }>
  Footer: React.FC<{ link?: string; demoLink?: string; onClose: () => void }>
}

export const Modal: ModalCompound = ({ open, onClose, children }) => {
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
    <div
      className={`${modalStyles.overlay} ${open ? modalStyles.overlayAnimateIn : modalStyles.overlayAnimateOut}`}
    >
      <div
        ref={ref}
        className={`${modalStyles.modal} ${open ? modalStyles.modalAnimateIn : modalStyles.modalAnimateOut}`}
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

Modal.Body = ({ children }) => <div className={modalStyles.modalBody}>{children}</div>

Modal.Description = ({ children }) => <div className={modalStyles.desc}>{children}</div>

Modal.Highlights = ({ children }) => <ul className={modalStyles.highlights}>{children}</ul>

Modal.Footer = ({ link, demoLink, onClose }) => {
  const { t } = useTranslation()
  return (
    <>
      <Divider />
      <div className={modalStyles.footerSticky}>
        <div>
          {demoLink && demoLink !== '' && (
            <Button
              as="a"
              href={demoLink}
              variant="primary"
              size="medium"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              {t('common.modal.demoLink')}
            </Button>
          )}
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Button variant="secondary" size="medium" onClick={onClose} type="button">
            {t('common.modal.close')}
          </Button>
          {link && link !== '' && (
            <Button
              as="a"
              href={link}
              variant="primary"
              size="medium"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              {t('common.modal.projectLink')}
            </Button>
          )}
        </div>
      </div>
    </>
  )
}
