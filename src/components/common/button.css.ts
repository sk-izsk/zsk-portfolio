import { style } from '@vanilla-extract/css'
import { vars } from '../../styles/theme.css'

export const button = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 500,
  border: 'none',
  borderRadius: 999,
  cursor: 'pointer',
  transition: 'all 0.2s',
  outline: 'none',
  textDecoration: 'none',
  userSelect: 'none',
  fontFamily: 'inherit',
  minHeight: '3.125rem',
  lineHeight: 1.2,
})

export const primary = style({
  background: vars.color.skin,
  color: '#fff',
  border: `1px solid ${vars.color.skin}`,
  ':hover': {
    background: vars.color.skin,
    opacity: 0.85,
  },
})

export const secondary = style({
  background: `${vars.color.skin}15`,
  color: vars.color.skin,
  border: `1px solid ${vars.color.skin}`,
  ':hover': {
    background: vars.color.skin,
    color: '#fff',
  },
})

export const link = style({
  background: 'transparent',
  color: vars.color.skin,
  border: 'none',
  textDecoration: 'underline',
  padding: 0,
  minWidth: 0,
  ':hover': {
    color: vars.color.skin,
    opacity: 0.7,
  },
})

export const small = style({
  fontSize: 13,
  padding: '4px 12px',
  minHeight: 28,
})

export const medium = style({
  fontSize: 15,
  padding: '7px 18px',
  minHeight: 36,
})

export const large = style({
  fontSize: 17,
  padding: '10px 28px',
  minHeight: 44,
})
