import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import type { Project } from '../../types/portfolio'
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

const ProjectModal: ModalCompound = ({ project: _project, open, onClose, children }) => {
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
    if (!open) {
      return
    }
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open, onClose])

  if (!open || !modalRoot) {
    return null
  }

  return createPortal(
    <div style={styles.overlay}>
      <div ref={ref} style={styles.modal}>
        {children}
      </div>
    </div>,
    modalRoot,
  )
}

ProjectModal.Title = ({
  children,
  onClose,
}: {
  children: React.ReactNode
  onClose: () => void
}) => (
  <div style={styles.titleRow}>
    <h2 style={styles.title}>{children}</h2>
    <button
      style={styles.closeBtn}
      aria-label="Close"
      onClick={(e) => {
        e.stopPropagation()
        onClose()
      }}
    >
      ×
    </button>
  </div>
)

ProjectModal.Description = ({ children }: { children: React.ReactNode }) => (
  <div style={styles.desc}>{children}</div>
)

ProjectModal.Highlights = ({ children }: { children: React.ReactNode }) => (
  <ul style={styles.highlights}>{children}</ul>
)

ProjectModal.Footer = ({ link, onClose }) => (
  <div style={styles.footer}>
    <button style={styles.footerBtn} onClick={onClose}>
      Close
    </button>
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      style={{ ...styles.footerBtn, ...styles.linkBtn }}
    >
      Project Link
    </a>
  </div>
)

const styles: { [k: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0,0,0,0.35)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    background: '#fff',
    borderRadius: 12,
    width: 420,
    maxWidth: '90vw',
    minHeight: 220,
    maxHeight: 520,
    boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
    padding: 28,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'auto',
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 700,
    margin: 0,
  },
  highlights: {
    paddingLeft: 20,
    marginBottom: 18,
    color: '#444',
    fontSize: 15,
    lineHeight: 1.6,
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 'auto',
  },
  footerBtn: {
    padding: '7px 18px',
    borderRadius: 6,
    border: 'none',
    background: '#eee',
    color: '#222',
    fontWeight: 500,
    fontSize: 15,
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  linkBtn: {
    background: '#0078d4',
    color: '#fff',
    textDecoration: 'none',
  },
}

export { ProjectModal }
