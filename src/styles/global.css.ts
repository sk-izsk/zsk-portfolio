import { vars } from '@styles/theme.css'
import { globalStyle, keyframes } from '@vanilla-extract/css'

const slideSection = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translate3d(28px, 0, 0)',
  },
  '100%': {
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
  },
})

globalStyle('html:has(dialog[open])', {
  overflow: 'hidden',
})

// Global reset
globalStyle('*', {
  margin: 0,
  padding: 0,
  outline: 'none',
  textDecoration: 'none',
  boxSizing: 'border-box',
})

globalStyle('body', {
  lineHeight: 1.5,
  fontSize: '16px',
  fontFamily: vars.font.family.primary,
  margin: 0,
  background: vars.color.background[900],
  overflowX: 'clip',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
})

// Doubled to outrank single-class `outline: none` rules around the app.
globalStyle(':focus-visible:focus-visible', {
  outline: `2px solid ${vars.color.skin}`,
  outlineOffset: '2px',
})

globalStyle('.main-container', {
  minHeight: '100vh',
  background: vars.color.background[900],
})

globalStyle('.main-content', {
  minHeight: '100vh',
})

globalStyle('.skip-link', {
  position: 'fixed',
  top: '16px',
  left: '16px',
  zIndex: 3000,
  padding: '8px 12px',
  borderRadius: '8px',
  background: vars.color.skin,
  color: '#fff',
  transform: 'translateY(-200%)',
})

globalStyle('.skip-link:focus', {
  transform: 'translateY(0)',
  outline: `2px solid ${vars.color.text[900]}`,
  outlineOffset: '2px',
})

globalStyle('::before, ::after', {
  boxSizing: 'border-box',
})

globalStyle('ul', {
  listStyle: 'none',
})

globalStyle('[data-content-protected="true"]', {
  WebkitTouchCallout: 'none',
  WebkitUserSelect: 'none',
  userSelect: 'none',
})

globalStyle(
  [
    '[data-content-protected="true"] input',
    '[data-content-protected="true"] textarea',
    '[data-content-protected="true"] select',
    '[data-content-protected="true"] option',
    '[data-content-protected="true"] [contenteditable="true"]',
    '[data-content-protected="true"] [data-content-protection-ignore="true"]',
  ].join(', '),
  {
    WebkitUserSelect: 'text',
    userSelect: 'text',
  },
)

// Section styles
globalStyle('.section', {
  background: vars.color.background[900],
  minHeight: '100svh',
  display: 'block',
  padding: '0 32px',
  position: 'relative',
  overflowX: 'clip',
  isolation: 'isolate',
  '@media': {
    '(max-width: 1099px)': {
      padding: '0 20px 48px',
    },
  },
})

globalStyle('.section::before', {
  content: '""',
  position: 'absolute',
  inset: '40px auto auto -120px',
  width: '340px',
  height: '340px',
  borderRadius: '999px',
  background: `radial-gradient(circle, color-mix(in srgb, ${vars.color.skin} 9%, transparent) 0%, transparent 72%)`,
  pointerEvents: 'none',
  zIndex: -2,
})

globalStyle('.section::after', {
  content: '""',
  position: 'absolute',
  inset: 'auto -110px 60px auto',
  width: '360px',
  height: '360px',
  borderRadius: '999px',
  background: `radial-gradient(circle, color-mix(in srgb, ${vars.color.skin} 7%, transparent) 0%, transparent 74%)`,
  pointerEvents: 'none',
  zIndex: -2,
})

globalStyle('.section.back-section', {
  zIndex: 1,
})

globalStyle('.section.active', {
  zIndex: 2,
  opacity: 1,
  animation: `${slideSection} 0.45s cubic-bezier(0.22, 1, 0.36, 1)`,
})

globalStyle('.hidden', {
  display: 'none !important',
})

globalStyle('.padd-15', {
  paddingLeft: '15px',
  paddingRight: '15px',
})

globalStyle('.container', {
  maxWidth: '1180px',
  width: '100%',
  margin: 'auto',
})

globalStyle('.section .container', {
  // Clears the floating top bar.
  paddingTop: '96px',
  paddingBottom: '84px',
})

globalStyle('.screen-container', {
  paddingBottom: '40px',
})

globalStyle('.screen-state', {
  minHeight: '40vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  fontSize: '16px',
  color: vars.color.text[700],
})

globalStyle('.screen-state--error', {
  color: vars.color.skin,
  fontWeight: 600,
})

globalStyle('.section-title', {
  flex: '0 0 100%',
  maxWidth: '100%',
  marginBottom: '60px',
})

globalStyle('.section-title h2', {
  fontSize: 'clamp(36px, 4vw, 54px)',
  color: vars.color.text[900],
  fontWeight: 700,
  position: 'relative',
  letterSpacing: '-0.03em',
  lineHeight: 1,
})

globalStyle('.section-title h2::before', {
  content: '""',
  height: '4px',
  width: '56px',
  background: vars.color.skin,
  position: 'absolute',
  left: 0,
  top: 'calc(100% + 10px)',
})

globalStyle('.section-title h2::after', {
  content: '""',
  height: '4px',
  width: '28px',
  background: vars.color.skin,
  position: 'absolute',
  left: 0,
  top: 'calc(100% + 22px)',
})

globalStyle('.row', {
  display: 'flex',
  flexWrap: 'wrap',
  marginLeft: '-15px',
  marginRight: '-15px',
  position: 'relative',
})

globalStyle('.btn', {
  fontSize: '16px',
  fontWeight: 500,
  padding: '12px 35px',
  color: 'white',
  borderRadius: '40px',
  display: 'inline-block',
  whiteSpace: 'nowrap',
  border: 'none',
  background: vars.color.skin,
  transition: 'all 0.3s ease',
  cursor: 'pointer',
})

globalStyle('.btn:hover', {
  transform: 'translateY(-1px)',
})

globalStyle('.shadow-dark', {
  boxShadow: '0 0 20px rgba(48, 46, 77, 0.15)',
})

// Page loader styles
globalStyle('.page-loader', {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: vars.color.background[900],
  zIndex: 9999,
})

globalStyle('.page-loader .loading', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
})
