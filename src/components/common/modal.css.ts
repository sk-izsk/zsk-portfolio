import { keyframes, style } from '@vanilla-extract/css'
import { vars } from '../../styles/theme.css'

const slideUp = keyframes({
  '0%': { transform: 'translateY(100vh)', opacity: 0 },
  '100%': { transform: 'translateY(0)', opacity: 1 },
})

const slideDown = keyframes({
  '0%': { transform: 'translateY(0)', opacity: 1 },
  '100%': { transform: 'translateY(100vh)', opacity: 0 },
})

const fadeIn = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

const fadeOut = keyframes({
  '0%': { opacity: 1 },
  '100%': { opacity: 0 },
})

export const modalAnimateIn = style({
  animation: `${slideUp} 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
})

export const modalAnimateOut = style({
  animation: `${slideDown} 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
})

export const overlayAnimateIn = style({
  animation: `${fadeIn} 0.4s ease forwards`,
})

export const overlayAnimateOut = style({
  animation: `${fadeOut} 0.3s ease forwards`,
})

export const modal = style({
  background: vars.color.background[900],
  color: vars.color.text[900],
  borderRadius: 12,
  border: `2px solid ${vars.color.skin}`,
  width: '50rem',
  maxWidth: '90vw',
  minHeight: '17.88rem',
  maxHeight: '90vh',
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  selectors: {
    '&::-webkit-scrollbar': { display: 'none' },
  },
})

export const titleRowSticky = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minHeight: '3.125rem',
  padding: '0 16px',
  position: 'sticky',
  top: 0,
  zIndex: 2,
  background: vars.color.background[900],
  borderRadius: '10px 10px 0 0',
  flexShrink: 0,
})

export const highlights = style({
  paddingLeft: 20,
  marginBottom: 18,
  color: vars.color.text[900],
  fontSize: 15,
  lineHeight: 1.6,
  listStyleType: 'disc',
  listStylePosition: 'inside',
})

export const footerSticky = style({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: 12,
  minHeight: '3.125rem',
  padding: '0 16px',
  position: 'sticky',
  bottom: 0,
  zIndex: 2,
  background: vars.color.background[900],
  borderRadius: '0 0 10px 10px',
  flexShrink: 0,
})

export const divider = style({
  width: '100%',
  height: 1,
  background: 'var(--divider-color, rgba(0,0,0,0.08))',
  margin: 0,
  border: 'none',
  display: 'block',
  padding: 0,
})

export const modalBody = style({
  flex: 1,
  overflowY: 'auto',
  padding: '12px 16px',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  selectors: {
    '&::-webkit-scrollbar': { display: 'none' },
  },
})
