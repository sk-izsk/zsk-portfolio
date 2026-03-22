import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from '../../localization/localize'
import type { Project } from '../../types/portfolio'
import { Button } from './Button'
import { Divider } from './Divider'
import * as modalStyles from './projectModal.css'
import * as modalExtra from './projectModalExtra.css'

const modalRoot = typeof window !== 'undefined' ? document.body : null

interface ProjectModalProps {
  project: Project
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

type ModalCompound = React.FC<ProjectModalProps> & {
  Title: React.FC<{ children: React.ReactNode; onClose: () => void }>
  Body: React.FC<{ children: React.ReactNode }>
  Description: React.FC<{ children: React.ReactNode }>
  Highlights: React.FC<{ children: React.ReactNode }>
  Footer: React.FC<{ link: string; onClose: () => void }>
}

export const ProjectModal: ModalCompound = ({ open, onClose, children }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  useEffect(() => {
    if (!open) return
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open, onClose])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open || !modalRoot) return null

  return createPortal(
    <div className={modalExtra.overlay}>
      <div ref={ref} className={modalStyles.modal}>
        {children}
      </div>
    </div>,
    modalRoot,
  )
}

ProjectModal.Title = ({ children }) => (
  <>
    <div className={modalStyles.titleRowSticky}>
      <h2 className={modalExtra.title}>{children}</h2>
    </div>
    <Divider />
  </>
)

ProjectModal.Body = ({ children }) => <div className={modalStyles.modalBody}>{children}</div>

ProjectModal.Description = ({ children }) => <div className={modalExtra.desc}>{children}</div>

ProjectModal.Highlights = ({ children }) => <ul className={modalStyles.highlights}>{children}</ul>

ProjectModal.Footer = ({ link, onClose }) => {
  const { t } = useTranslation()
  return (
    <>
      <Divider />
      <div className={modalStyles.footerSticky}>
        <Button
          variant="secondary"
          size="medium"
          style={{ marginRight: 12 }}
          onClick={onClose}
          type="button"
        >
          {t('common.modal.close')}
        </Button>
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
      </div>
    </>
  )
}
