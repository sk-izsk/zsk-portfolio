import { vars } from '@styles/theme.css'
import { keyframes, style } from '@vanilla-extract/css'

const canAnimate = '(prefers-reduced-motion: no-preference)'
const phone = '(max-width: 767px)'
const curve = 'cubic-bezier(0.22, 1, 0.36, 1)'
// Settles slightly past its target, which reads as a soft spring.
const spring = 'cubic-bezier(0.34, 1.4, 0.64, 1)'

const TRIGGER_HEIGHT = 52
const TRIGGER_OFFSET = 24
const TRIGGER_OFFSET_PHONE = 16
const PANEL_GAP = 20
// The trigger's fill leaves this much of the turning ring showing around it.
const RING_WIDTH = 2

const ringTurn = keyframes({
  '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
  '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
})

const glowPulse = keyframes({
  '0%': { opacity: 0.5, transform: 'scale(1)' },
  '70%, 100%': { opacity: 0, transform: 'scale(1.35, 1.7)' },
})

const twinkle = keyframes({
  '0%, 82%, 100%': { transform: 'rotate(0deg) scale(1)' },
  '88%': { transform: 'rotate(18deg) scale(1.3)' },
  '94%': { transform: 'rotate(-8deg) scale(0.95)' },
})

const teaserSlide = keyframes({
  '0%': { opacity: 0, transform: 'translateY(8px) scale(0.96)' },
  '6%, 92%': { opacity: 1, transform: 'translateY(0) scale(1)' },
  '100%': { opacity: 0, transform: 'translateY(8px) scale(0.96)' },
})

const closeTurn = keyframes({
  '0%': { opacity: 0, transform: 'rotate(-90deg) scale(0.6)' },
  '100%': { opacity: 1, transform: 'rotate(0deg) scale(1)' },
})

export const panel = style({
  position: 'fixed',
  right: `${TRIGGER_OFFSET}px`,
  bottom: `${TRIGGER_OFFSET + TRIGGER_HEIGHT + PANEL_GAP}px`,
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
  '@media': {
    [phone]: {
      inset: 0,
      width: '100vw',
      height: '100dvh',
      borderRadius: 0,
      border: 'none',
    },
  },
  selectors: {
    '&[data-open]': {
      visibility: 'visible',
    },
  },
})

// useGenie fills this with the rows of the window while it opens or closes.
export const genieLayer = style({
  position: 'fixed',
  inset: 0,
  zIndex: 950,
  pointerEvents: 'none',
})

export const genieRow = style({
  position: 'absolute',
  overflow: 'hidden',
  willChange: 'transform, opacity',
})

export const triggerWrap = style({
  position: 'fixed',
  right: `${TRIGGER_OFFSET}px`,
  bottom: `${TRIGGER_OFFSET}px`,
  zIndex: 951,
  '@media': {
    [phone]: {
      right: `${TRIGGER_OFFSET_PHONE}px`,
      bottom: `${TRIGGER_OFFSET_PHONE}px`,
      selectors: {
        // The open chat fills a phone screen and has its own close button. Hidden rather than
        // removed, because the genie still needs to know where the button is.
        '&[data-open]': {
          visibility: 'hidden',
        },
      },
    },
  },
})

export const teaser = style({
  position: 'absolute',
  right: 0,
  bottom: `calc(100% + 12px)`,
  width: 'max-content',
  maxWidth: 'min(260px, calc(100vw - 48px))',
  padding: '8px 12px',
  border: `1px solid color-mix(in srgb, ${vars.color.skin} 40%, transparent)`,
  borderRadius: '16px 16px 4px 16px',
  fontFamily: 'inherit',
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: 500,
  textAlign: 'left',
  color: vars.color.text[900],
  background: vars.color.background[100],
  boxShadow: '0 12px 32px rgba(15, 23, 42, 0.18)',
  cursor: 'pointer',
  transformOrigin: '100% 100%',
  opacity: 0,
  '@media': {
    [canAnimate]: {
      animation: `${teaserSlide} 6000ms ${curve} both`,
    },
    '(prefers-reduced-motion: reduce)': {
      display: 'none',
    },
  },
})

// Pulses behind the button until the chat has been opened once.
export const glow = style({
  position: 'absolute',
  inset: 0,
  borderRadius: '999px',
  background: vars.color.skin,
  opacity: 0,
  pointerEvents: 'none',
  '@media': {
    [canAnimate]: {
      animation: `${glowPulse} 2400ms ${curve} infinite`,
    },
  },
  selectors: {
    '[data-opened-before] > &': {
      display: 'none',
    },
  },
})

export const trigger = style({
  position: 'relative',
  isolation: 'isolate',
  overflow: 'hidden',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  height: `${TRIGGER_HEIGHT}px`,
  padding: '0 20px',
  border: 'none',
  borderRadius: '999px',
  color: '#fff',
  background: vars.color.skin,
  boxShadow: `0 8px 24px color-mix(in srgb, ${vars.color.skin} 50%, transparent)`,
  fontFamily: 'inherit',
  fontSize: '16px',
  lineHeight: '24px',
  fontWeight: 600,
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  '@media': {
    [canAnimate]: {
      transition: `transform 300ms ${spring}`,
    },
  },
  selectors: {
    '&:hover': {
      transform: 'scale(1.05)',
    },
    '&:active': {
      transform: 'scale(0.98)',
    },
    '&[data-open]': {
      width: `${TRIGGER_HEIGHT}px`,
      padding: 0,
    },
  },
})

// A band of colors circling the button's edge, turned as one layer so it costs no repaints.
export const ring = style({
  position: 'absolute',
  left: '50%',
  top: '50%',
  zIndex: -2,
  width: '200%',
  aspectRatio: '1',
  background: `conic-gradient(#ff6ec7, #7aa2ff, #5de0e6, ${vars.color.skin}, #ffd36e, #ff6ec7)`,
  transform: 'translate(-50%, -50%)',
  willChange: 'transform',
  '@media': {
    [canAnimate]: {
      animation: `${ringTurn} 3s linear infinite`,
      selectors: {
        '[data-opened-before] > &': {
          animationDuration: '8s',
        },
      },
    },
  },
})

export const fill = style({
  position: 'absolute',
  inset: `${RING_WIDTH}px`,
  zIndex: -1,
  borderRadius: 'inherit',
  background: vars.color.skin,
})

export const triggerIcon = style({
  flexShrink: 0,
  '@media': {
    [canAnimate]: {
      animation: `${twinkle} 4s ${curve} infinite`,
    },
  },
  selectors: {
    '[data-open] > &': {
      display: 'none',
    },
  },
})

export const triggerLabel = style({
  selectors: {
    '[data-open] > &': {
      display: 'none',
    },
  },
})

export const triggerClose = style({
  display: 'none',
  selectors: {
    '[data-open] > &': {
      display: 'block',
    },
  },
  '@media': {
    [canAnimate]: {
      animation: `${closeTurn} 450ms ${spring} both`,
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
