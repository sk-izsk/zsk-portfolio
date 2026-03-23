import { style } from '@vanilla-extract/css'
import { vars } from '../../styles/theme.css'
export const divider = style({
  width: '100%',
  height: 1,
  background: vars.color.skin,
  borderRadius: 1,
  marginLeft: 0,
  marginRight: 0,
  marginTop: 8,
  marginBottom: 8,
  border: 'none',
  transition: 'background 0.3s',
})

export const dividerVertical = style({
  width: 2,
  height: 32,
  background: vars.color.skin,
  borderRadius: 1,
  margin: '0 16px',
  alignSelf: 'center',
  flexShrink: 0,
  transition: 'background 0.3s',
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
  // Always use a semi-opaque background for fallback
  background: 'rgba(0,0,0,0.65)',
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  // Guarantee both properties for all browsers and production builds
  backdropFilter: 'blur(2px)',
  WebkitBackdropFilter: 'blur(1px)',
  // For Safari and iOS, force hardware acceleration for blur
  willChange: 'backdrop-filter',
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
