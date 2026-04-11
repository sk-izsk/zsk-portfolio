import { style } from '@vanilla-extract/css'
import { vars } from '../../styles/theme.css'

export const errorContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: vars.color.background[100],
  color: vars.color.text[900],
  fontFamily: vars.font.family.primary,
  textAlign: 'center',
  padding: '20px',
})

export const errorHeading = style({
  color: vars.color.skin,
  marginBottom: '1rem',
})

export const errorPre = style({
  margin: '20px 0',
  color: vars.color.text[700],
  maxWidth: '600px',
  whiteSpace: 'pre-wrap',
  fontFamily: 'monospace',
  padding: '1rem',
  backgroundColor: vars.color.background[50],
  borderRadius: '8px',
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
  ':hover': {
    opacity: 0.8,
  },
})
