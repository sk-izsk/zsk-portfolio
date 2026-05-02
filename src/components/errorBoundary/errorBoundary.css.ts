import { vars } from '@styles/theme.css'
import { style } from '@vanilla-extract/css'

export const errorContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100dvh',
  backgroundColor: '#f6f5fb',
  color: '#302e4d',
  fontFamily: '"JetBrains Mono", monospace',
  textAlign: 'center',
  padding: '20px 16px',
})

export const errorHeading = style({
  color: vars.color.skin,
  marginBottom: '1rem',
})

export const errorPre = style({
  margin: '20px 0',
  color: '#3e3b5f',
  width: 'min(42rem, 100%)',
  whiteSpace: 'pre-wrap',
  overflowWrap: 'anywhere',
  wordBreak: 'break-word',
  fontFamily: 'monospace',
  padding: '1rem',
  backgroundColor: '#ebe8f3',
  borderRadius: '8px',
  maxHeight: '38dvh',
  overflowY: 'auto',
  lineHeight: 1.5,
})

export const errorHint = style({
  color: '#504e70',
  maxWidth: '42rem',
  marginBottom: '16px',
  fontSize: '14px',
})

export const errorButton = style({
  padding: '12px 24px',
  backgroundColor: vars.color.skin,
  color: '#ffffff',
  border: 'none',
  cursor: 'pointer',
  fontWeight: 'bold',
  borderRadius: '4px',
  transition: 'opacity 0.2s ease',
  minWidth: '220px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '4px',
  ':hover': {
    opacity: 0.8,
  },
  '@media': {
    '(max-width: 767px)': {
      width: 'min(22rem, 90vw)',
    },
  },
})
