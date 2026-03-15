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
  border: 'none',
  borderRadius: '999px',
  cursor: 'pointer',
  color: '#ffffff',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  padding: '0 16px',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.22)',
  transition: 'width 380ms ease, transform 260ms ease',
  transformOrigin: 'right center',
  overflow: 'hidden',
  selectors: {
    '&:focus-visible': {
      outline: '2px solid #ffffff',
      outlineOffset: '2px',
    },
    '&:hover': {
      transform: 'translateY(-1px)',
    },
  },
})

export const triggerCollapsed = style({
  width: '52px',
  padding: 0,
  gap: 0,
  justifyContent: 'center',
})

export const triggerExpanded = style({
  width: 'fit-content',
  maxWidth: '90vw',
  justifyContent: 'flex-start',
})

export const triggerIcon = style({
  fontSize: '18px',
  flexShrink: 0,
})

export const triggerLabel = style({
  whiteSpace: 'nowrap',
  fontSize: '14px',
  fontWeight: 600,
  opacity: 0,
  transform: 'translateX(8px)',
  maxWidth: 0,
  transition: 'opacity 260ms ease, transform 360ms ease, max-width 360ms ease',
})

export const triggerLabelVisible = style({
  opacity: 1,
  transform: 'translateX(0)',
  maxWidth: '230px',
})
