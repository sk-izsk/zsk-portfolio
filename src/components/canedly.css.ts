import { style } from '@vanilla-extract/css'

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
  fontSize: '18px',
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
