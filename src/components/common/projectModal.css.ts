import { style } from '@vanilla-extract/css'
import { vars } from '../../styles/theme.css'

export const modal = style({
  background: vars.color.background[900],
  color: vars.color.text[900],
  borderRadius: 12,
  width: '43.75rem',
  maxWidth: '90vw',
  minHeight: '17.88rem',
  maxHeight: '42.25rem',
  boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
  padding: 28,
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'auto',
})

export const titleRowSticky = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 12,
  position: 'sticky',
  top: 0,
  zIndex: 2,
  background: vars.color.background[900],
  color: vars.color.text[900],
  paddingTop: 8,
  paddingBottom: 8,
  boxShadow: '0 2px 8px 0 rgba(0,0,0,0.03)',
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
  gap: 12,
  position: 'sticky',
  bottom: 0,
  zIndex: 2,
  background: vars.color.background[900],
  color: vars.color.text[900],
  paddingTop: 12,
  paddingBottom: 12,
  marginTop: 'auto',
  boxShadow: '0 -2px 8px 0 rgba(0,0,0,0.03)',
})

export const divider = style({
  width: '100%',
  height: 1,
  background: 'var(--divider-color, rgba(0,0,0,0.08))',
  margin: '8px 0 12px 0',
  border: 'none',
})
