import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import type { Project } from '../../types/portfolio'

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
  Description: React.FC<{ children: React.ReactNode }>
  Highlights: React.FC<{ children: React.ReactNode }>
  Footer: React.FC<{ link: string; onClose: () => void }>
}

const ProjectModal: ModalCompound = ({ open, onClose, children }) => {
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

ProjectModal.Title = ({ children, onClose }) => (
  <>
    <div className={modalStyles.titleRowSticky}>
      <h2 className={modalExtra.title}>{children}</h2>
      <button
        className={modalExtra.closeBtnTag}
        aria-label="Close"
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
      >
        ×
      </button>
    </div>
    <Divider />
  </>
)

ProjectModal.Description = ({ children }) => <div className={modalExtra.desc}>{children}</div>

ProjectModal.Highlights = ({ children }) => <ul className={modalStyles.highlights}>{children}</ul>

ProjectModal.Footer = ({ link, onClose }) => (
  <>
    <Divider />
    <div className={modalStyles.footerSticky}>
      <button
        className={modalExtra.closeBtnTag}
        style={{ marginRight: 12 }}
        onClick={onClose}
        type="button"
      >
        Close
      </button>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="btn"
        style={{ textDecoration: 'none' }}
      >
        Project Link
      </a>
    </div>
  </>
)

export { ProjectModal }
