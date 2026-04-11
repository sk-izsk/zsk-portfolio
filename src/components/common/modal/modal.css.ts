import { keyframes, style } from '@vanilla-extract/css'
import { vars } from '@styles/theme.css'

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
  width: 'min(50rem, 92vw)',
  height: 'auto',
  maxHeight: '84dvh',
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
  boxSizing: 'border-box',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  selectors: {
    '&::-webkit-scrollbar': { display: 'none' },
  },
  '@media': {
    'screen and (max-width: 768px)': {
      width: '94vw',
      minHeight: '17.88rem',
      height: '78dvh',
      maxHeight: '78dvh',
      borderRadius: 10,
    },
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
  justifyContent: 'space-between',
  alignItems: 'center',
  minHeight: '3.125rem',
  padding: '0 16px',
  position: 'sticky',
  bottom: 0,
  zIndex: 2,
  background: vars.color.background[900],
  borderRadius: '0 0 10px 10px',
  flexShrink: 0,
  '@media': {
    'screen and (max-width: 768px)': {
      minHeight: 'auto',
      padding: '8px 12px 10px',
      flexDirection: 'column',
      alignItems: 'stretch',
      gap: 8,
    },
  },
})

export const footerDemoGroup = style({
  display: 'flex',
  alignItems: 'center',
  minWidth: 0,
  '@media': {
    'screen and (max-width: 768px)': {
      width: '100%',
    },
  },
})

export const footerMainActions = style({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  '@media': {
    'screen and (max-width: 768px)': {
      width: '100%',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 8,
    },
  },
})

export const footerButton = style({
  '@media': {
    'screen and (max-width: 768px)': {
      width: '100%',
      minWidth: 0,
      padding: '7px 12px',
    },
  },
})

export const footerLinkButton = style({
  textDecoration: 'none',
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
  overflowX: 'hidden',
  minHeight: 0,
  overscrollBehavior: 'contain',
  padding: '12px 16px',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  selectors: {
    '&::-webkit-scrollbar': { display: 'none' },
  },
})

export const closeBtnTag = style({
  padding: '5px 10px',
  borderRadius: '999px',
  fontSize: '18px',
  fontWeight: 500,
  lineHeight: 1,
  height: '2.5rem',
  minWidth: '2.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: `${vars.color.skin}15`,
  color: vars.color.skin,
  border: `1px solid ${vars.color.skin}`,
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  marginLeft: 8,
  borderStyle: 'solid',
  borderWidth: 1,
  appearance: 'none',
  alignSelf: 'center',
  selectors: {
    '&:hover': {
      backgroundColor: vars.color.skin,
      color: 'white',
    },
  },
})

export const overlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 12,
  boxSizing: 'border-box',
  transform: 'translateZ(0)',
  backdropFilter: 'blur(2px)',
  WebkitBackdropFilter: 'blur(1px)',
  willChange: 'backdrop-filter',
  '@media': {
    'screen and (max-width: 768px)': {
      padding: 8,
    },
  },
})

export const title = style({
  fontSize: 22,
  fontWeight: 700,
  margin: 0,
  cursor: 'default',
  userSelect: 'text',
})

export const closeBtn = style({
  border: 'none',
  background: 'transparent',
  color: vars.color.text[900],
  fontSize: 24,
  cursor: 'pointer',
  marginLeft: 8,
  padding: 0,
  lineHeight: 1,
})

export const desc = style({
  marginBottom: 16,
  color: vars.color.text[700],
  fontSize: 16,
})

export const footerBtn = style({
  padding: '7px 18px',
  borderRadius: 6,
  border: 'none',
  background: '#eee',
  color: '#222',
  fontWeight: 500,
  fontSize: 15,
  cursor: 'pointer',
  transition: 'background 0.2s',
})

export const linkBtn = style({
  background: '#0078d4',
  color: '#fff',
  textDecoration: 'none',
})
