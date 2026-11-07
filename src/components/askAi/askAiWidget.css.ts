import { vars } from '@styles/theme.css'
import { keyframes, style } from '@vanilla-extract/css'

const canAnimate = '(prefers-reduced-motion: no-preference)'
const phone = '(max-width: 767px)'
const curve = 'cubic-bezier(0.22, 1, 0.36, 1)'
// Settles slightly past its target, which reads as a soft spring.
const spring = 'cubic-bezier(0.34, 1.4, 0.64, 1)'

const TRIGGER_SIZE = 52
const TRIGGER_OFFSET = 24
const TRIGGER_OFFSET_PHONE = 16
const PANEL_GAP = 20

// The panel grows out of the button, so its reveal is centered on the button's middle.
const buttonCenterX = `calc(100% - ${TRIGGER_SIZE / 2}px)`
const buttonCenterY = `calc(100% + ${TRIGGER_SIZE / 2 + PANEL_GAP}px)`
const phoneButtonCenterX = `calc(100% - ${TRIGGER_OFFSET_PHONE + TRIGGER_SIZE / 2}px)`
const phoneButtonCenterY = `calc(100% - ${TRIGGER_OFFSET_PHONE + TRIGGER_SIZE / 2}px)`

const ringTurn = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

const pulse = keyframes({
  '0%': { opacity: 0.45, transform: 'scale(1)' },
  '70%, 100%': { opacity: 0, transform: 'scale(1.7)' },
})

const hintSlide = keyframes({
  '0%': { opacity: 0, transform: 'translateX(16px)' },
  '8%, 88%': { opacity: 1, transform: 'translateX(0)' },
  '100%': { opacity: 0, transform: 'translateX(16px)' },
})

export const panel = style({
  position: 'fixed',
  right: `${TRIGGER_OFFSET}px`,
  bottom: `${TRIGGER_OFFSET + TRIGGER_SIZE + PANEL_GAP}px`,
  zIndex: 950,
  display: 'flex',
  width: 'min(440px, calc(100vw - 48px))',
  height: 'min(680px, calc(100dvh - 128px))',
  padding: '12px',
  borderRadius: '24px',
  border: `1px solid color-mix(in srgb, ${vars.color.text[700]} 16%, transparent)`,
  background: vars.color.background[900],
  boxShadow: '0 32px 64px rgba(15, 23, 42, 0.24)',
  outline: 'none',
  visibility: 'hidden',
  opacity: 0,
  transformOrigin: '100% 100%',
  transform: 'scale(0.92)',
  clipPath: `circle(${TRIGGER_SIZE / 2}px at ${buttonCenterX} ${buttonCenterY})`,
  '@media': {
    [canAnimate]: {
      transition: `clip-path 450ms ${curve}, transform 450ms ${curve}, opacity 300ms ease-out, visibility 0ms linear 450ms`,
      selectors: {
        // Springs open, and shows at once. The delay above only keeps it visible while closing.
        '&[data-open]': {
          transition: `clip-path 600ms ${curve}, transform 600ms ${spring}, opacity 200ms ease-out, visibility 0ms`,
        },
      },
    },
    [phone]: {
      inset: 0,
      width: '100vw',
      height: '100dvh',
      borderRadius: 0,
      border: 'none',
      clipPath: `circle(${TRIGGER_SIZE / 2}px at ${phoneButtonCenterX} ${phoneButtonCenterY})`,
    },
  },
  selectors: {
    '&[data-open]': {
      visibility: 'visible',
      opacity: 1,
      transform: 'scale(1)',
      clipPath: `circle(150% at ${buttonCenterX} ${buttonCenterY})`,
    },
  },
})

export const triggerWrap = style({
  position: 'fixed',
  right: `${TRIGGER_OFFSET}px`,
  bottom: `${TRIGGER_OFFSET}px`,
  zIndex: 951,
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  '@media': {
    [phone]: {
      right: `${TRIGGER_OFFSET_PHONE}px`,
      bottom: `${TRIGGER_OFFSET_PHONE}px`,
      selectors: {
        // The open panel fills a phone screen and has its own close button.
        '&[data-open]': {
          display: 'none',
        },
      },
    },
  },
})

export const hint = style({
  padding: '8px 12px',
  borderRadius: '999px',
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: 500,
  whiteSpace: 'nowrap',
  color: vars.color.text[900],
  background: vars.color.background[100],
  boxShadow: '0 12px 32px rgba(15, 23, 42, 0.18)',
  pointerEvents: 'none',
  opacity: 0,
  '@media': {
    [canAnimate]: {
      animation: `${hintSlide} 6000ms ${curve} 2500ms both`,
    },
    '(prefers-reduced-motion: reduce)': {
      display: 'none',
    },
  },
})

export const trigger = style({
  position: 'relative',
  isolation: 'isolate',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: `${TRIGGER_SIZE}px`,
  height: `${TRIGGER_SIZE}px`,
  padding: 0,
  border: 'none',
  borderRadius: '999px',
  color: '#fff',
  background: vars.color.skin,
  boxShadow: `0 8px 24px color-mix(in srgb, ${vars.color.skin} 45%, transparent)`,
  cursor: 'pointer',
  '@media': {
    [canAnimate]: {
      transition: `transform 300ms ${spring}`,
      selectors: {
        '&::before': {
          animation: `${ringTurn} 3s linear infinite`,
        },
        '&::after': {
          animation: `${pulse} 2400ms ${curve} infinite`,
        },
        // Calms down once the chat has been opened, so it stops asking for attention.
        '&[data-opened-before]::before': {
          animationDuration: '8s',
        },
        '&[data-opened-before]::after': {
          animation: 'none',
        },
      },
    },
  },
  selectors: {
    '&:hover': {
      transform: 'scale(1.08)',
    },
    '&:active': {
      transform: 'scale(0.98)',
    },
    // A slow ring of light circling the button.
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: '-4px',
      zIndex: -1,
      borderRadius: 'inherit',
      background: `conic-gradient(${vars.color.skin}, transparent 35%, ${vars.color.skin} 65%, transparent)`,
      filter: 'blur(4px)',
    },
    // A soft ripple that draws the eye until the chat has been opened once.
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      zIndex: -2,
      borderRadius: 'inherit',
      background: vars.color.skin,
      opacity: 0,
    },
    '&[data-open]::before': {
      opacity: 0,
    },
  },
})

export const triggerIconOpen = style({
  position: 'absolute',
  '@media': {
    [canAnimate]: {
      transition: `transform 450ms ${spring}, opacity 200ms ease-out`,
    },
  },
  selectors: {
    '[data-open] > &': {
      opacity: 0,
      transform: 'rotate(90deg) scale(0.6)',
    },
  },
})

export const triggerIconClose = style({
  position: 'absolute',
  opacity: 0,
  transform: 'rotate(-90deg) scale(0.6)',
  '@media': {
    [canAnimate]: {
      transition: `transform 450ms ${spring}, opacity 200ms ease-out`,
    },
  },
  selectors: {
    '[data-open] > &': {
      opacity: 1,
      transform: 'rotate(0deg) scale(1)',
    },
  },
})

export const closeButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '36px',
  height: '36px',
  flexShrink: 0,
  padding: 0,
  borderRadius: '999px',
  border: `1px solid color-mix(in srgb, ${vars.color.text[700]} 24%, transparent)`,
  background: 'transparent',
  color: vars.color.text[900],
  cursor: 'pointer',
  transition: 'background-color 300ms ease-out',
  ':hover': {
    backgroundColor: vars.color.background[50],
  },
  ':active': {
    transform: 'scale(0.98)',
  },
})
