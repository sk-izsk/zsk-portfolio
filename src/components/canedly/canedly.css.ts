import { style } from '@vanilla-extract/css'
import { vars } from '@styles/theme.css'

export const floatingContainer = style({
  position: 'fixed',
  right: '24px',
  bottom: '24px',
  zIndex: 999,
  '@media': {
    '(max-width: 767px)': {
      right: '16px',
      bottom: '16px',
    },
  },
})

export const triggerButton = style({
  height: '52px',
  minWidth: '52px',
  border: 'none',
  borderRadius: '999px',
  cursor: 'pointer',
  color: '#ffffff',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  padding: '0 16px',
  width: 'fit-content',
  maxWidth: '90vw',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.22)',
  '@media': {
    '(max-width: 767px)': {
      width: '52px',
      padding: 0,
      gap: 0,
    },
  },
  selectors: {
    '&:focus-visible': {
      outline: '2px solid #ffffff',
      outlineOffset: '2px',
    },
  },
})

export const triggerIcon = style({
  display: 'none',
  width: '18px',
  height: '18px',
  flexShrink: 0,
  '@media': {
    '(max-width: 767px)': {
      display: 'inline-block',
    },
  },
})

export const triggerLabelDesktop = style({
  whiteSpace: 'nowrap',
  fontSize: '14px',
  fontWeight: 600,
  '@media': {
    '(max-width: 767px)': {
      display: 'none',
    },
  },
})

export const triggerColor1 = style({
  background: '#ec1839',
})

export const triggerColor2 = style({
  background: '#fa5b0f',
})

export const triggerColor3 = style({
  background: '#37b182',
})

export const triggerColor5 = style({
  background: '#f021b2',
})

export const triggerColor7 = style({
  background: '#daa520',
})

export const triggerColor9 = style({
  background: '#00bfff',
})

export const modalLoadingState = style({
  position: 'fixed',
  right: '24px',
  bottom: '92px',
  zIndex: 999,
  padding: '12px 16px',
  borderRadius: '16px',
  background: vars.color.background[100],
  color: vars.color.text[700],
  border: `1px solid ${vars.color.background[50]}`,
  boxShadow: '0 20px 50px rgba(15, 23, 42, 0.16)',
})
