import { style } from '@vanilla-extract/css'
import { vars } from '../../../styles/theme.css'

export const root = style({
  position: 'relative',
  width: '100%',
})

export const trigger = style({
  width: '100%',
  minHeight: '44px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
  padding: '10px 14px',
  borderRadius: '10px',
  border: `1px solid ${vars.color.skin}`,
  background: vars.color.background[100],
  color: vars.color.text[900],
  cursor: 'pointer',
  textAlign: 'left',
  fontSize: '15px',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
  selectors: {
    '&:focus-visible': {
      boxShadow: `0 0 0 3px ${vars.color.skin}25`,
    },
  },
})

export const triggerOpen = style({
  boxShadow: `0 0 0 3px ${vars.color.skin}18`,
})

export const triggerLabel = style({
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

export const chevron = style({
  flexShrink: 0,
  color: vars.color.skin,
  transition: 'transform 0.2s ease',
})

export const chevronOpen = style({
  transform: 'rotate(180deg)',
})

export const menu = style({
  position: 'absolute',
  top: 'calc(100% + 8px)',
  left: 0,
  right: 0,
  zIndex: 20,
  display: 'grid',
  gap: '6px',
  padding: '8px',
  borderRadius: '12px',
  border: `1px solid ${vars.color.skin}`,
  background: vars.color.background[100],
  boxShadow: '0 16px 32px rgba(15, 23, 42, 0.16)',
})

export const option = style({
  width: '100%',
  minHeight: '38px',
  padding: '8px 12px',
  border: 'none',
  borderRadius: '8px',
  background: 'transparent',
  color: vars.color.text[900],
  textAlign: 'left',
  cursor: 'pointer',
  fontSize: '14px',
  transition: 'background-color 0.2s ease, color 0.2s ease',
  selectors: {
    '&:hover': {
      background: `${vars.color.skin}14`,
    },
    '&:focus-visible': {
      background: `${vars.color.skin}14`,
    },
  },
})

export const optionSelected = style({
  background: vars.color.skin,
  color: '#ffffff',
  selectors: {
    '&:hover': {
      background: vars.color.skin,
    },
    '&:focus-visible': {
      background: vars.color.skin,
    },
  },
})
