import { vars } from '@styles/theme.css'
import { keyframes, style } from '@vanilla-extract/css'

const rotateAnimation = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
})

export const styleSwitcher = style({
  position: 'fixed',
  right: '24px',
  top: '24px',
  zIndex: 120,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '12px',
  '@media': {
    '(max-width: 767px)': {
      right: '16px',
      top: '16px',
    },
  },
})

export const styleSwitcherTrigger = style({
  height: '48px',
  width: '48px',
  borderRadius: '16px',
  border: `1px solid ${vars.color.skin}66`,
  background: vars.color.background[100],
  color: vars.color.skin,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  boxShadow: '0 18px 45px rgba(15, 23, 42, 0.1)',
  transition: 'transform 0.25s ease, color 0.25s ease, border-color 0.25s ease',
  selectors: {
    '&:hover': {
      transform: 'translateY(-1px)',
      borderColor: vars.color.skin,
      background: vars.color.skin + '10',
    },
  },
})

export const styleSwitcherSpinIcon = style({
  width: '22px',
  height: '22px',
  animation: `${rotateAnimation} 2s linear infinite`,
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animation: 'none',
    },
  },
})

export const styleSwitcherPanel = style({
  width: 'min(280px, calc(100vw - 32px))',
  padding: '18px',
  borderRadius: '22px',
  border: `1px solid ${vars.color.background[50]}`,
  background: vars.color.background[100],
  boxShadow: '0 28px 70px rgba(15, 23, 42, 0.14)',
  opacity: 0,
  pointerEvents: 'none',
  transform: 'translateY(-8px) scale(0.98)',
  transition: 'opacity 0.22s ease, transform 0.22s ease',
})

export const styleSwitcherOpen = style({
  opacity: 1,
  pointerEvents: 'auto',
  transform: 'translateY(0) scale(1)',
})

export const panelEyebrow = style({
  color: vars.color.skin,
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  marginBottom: '6px',
})

export const panelHeading = style({
  color: vars.color.text[900],
  fontSize: '18px',
  fontWeight: 700,
  lineHeight: 1.3,
  marginBottom: '16px',
})

export const heading = style({
  margin: '0 0 10px',
  color: vars.color.text[700],
  fontSize: '13px',
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
})

export const colors = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  width: '100%',
  marginBottom: '18px',
})

export const colorItem = style({
  border: 'none',
  padding: 0,
  display: 'inline-block',
  height: '30px',
  width: '30px',
  borderRadius: '999px',
  cursor: 'pointer',
  transition: 'transform 0.22s ease, box-shadow 0.22s ease',
  selectors: {
    '&.color-1': {
      background: '#ec1839',
    },
    '&.color-2': {
      background: '#fa5b0f',
    },
    '&.color-3': {
      background: '#37b182',
    },
    '&.color-5': {
      background: '#f021b2',
    },
    '&.color-7': {
      background: '#daa520',
    },
    '&.color-9': {
      background: '#00bfff',
    },
    '&.active': {
      boxShadow: `0 0 0 3px ${vars.color.background[100]}, 0 0 0 5px ${vars.color.skin}`,
      transform: 'scale(1.04)',
    },
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
})

export const toggleGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '10px',
})

export const toggleButton = style({
  border: `1px solid ${vars.color.background[50]}`,
  borderRadius: '16px',
  background: vars.color.background[900],
  color: vars.color.text[900],
  padding: '12px 14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '10px',
  cursor: 'pointer',
  transition: 'border-color 0.22s ease, color 0.22s ease, transform 0.22s ease',
  selectors: {
    '&:hover': {
      transform: 'translateY(-1px)',
      borderColor: vars.color.skin,
      color: vars.color.skin,
    },
  },
})

export const toggleButtonActive = style({
  borderColor: vars.color.skin + '55',
  background: vars.color.skin + '12',
  color: vars.color.skin,
})

export const toggleButtonLabel = style({
  fontSize: '13px',
  fontWeight: 600,
})

export const toggleButtonIcon = style({
  width: '16px',
  height: '16px',
  flexShrink: 0,
})
