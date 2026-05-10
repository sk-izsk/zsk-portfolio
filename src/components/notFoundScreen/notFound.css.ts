import { vars } from '@styles/theme.css'
import { style } from '@vanilla-extract/css'

export const notFoundContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
})

export const notFoundBanner = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: '40px 20px',
  color: vars.color.text[900],
})

export const notFoundCode = style({
  fontSize: '120px',
  fontWeight: 700,
  lineHeight: 1,
  marginBottom: '16px',
  color: vars.color.skin,
  opacity: 0.36,
})

export const notFoundTitle = style({
  fontSize: '32px',
  fontWeight: 700,
  marginBottom: '12px',
  color: 'inherit',
})

export const notFoundDescription = style({
  fontSize: '16px',
  marginBottom: '28px',
  maxWidth: '420px',
  lineHeight: 1.5,
  color: vars.color.text[700],
})
