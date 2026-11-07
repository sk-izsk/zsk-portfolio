import { vars } from '@styles/theme.css'
import { keyframes, style } from '@vanilla-extract/css'

const canAnimate = '(prefers-reduced-motion: no-preference)'
const phone = '(max-width: 767px)'
const curve = 'cubic-bezier(0.22, 1, 0.36, 1)'
// Settles slightly past its target, which reads as a soft spring.
const spring = 'cubic-bezier(0.34, 1.4, 0.64, 1)'

export const TRIGGER_HEIGHT = 52
export const TRIGGER_OFFSET = 24
const TRIGGER_OFFSET_PHONE = 16
// The trigger's fill leaves this much of the turning ring showing around it.
const RING_WIDTH = 2
const MOTION_SHAPE = `450ms ${spring}`

const ringTurn = keyframes({
  '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
  '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
})

const glowPulse = keyframes({
  '0%': { opacity: 0.45, transform: 'scale(1)' },
  '100%': { opacity: 0, transform: 'scale(1.3, 1.8)' },
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

// Pulses behind the pill. The close button is a different shape, so it goes without.
export const glow = style({
  position: 'absolute',
  inset: 0,
  borderRadius: '999px',
  background: vars.color.skin,
  opacity: 0,
  pointerEvents: 'none',
  '@media': {
    [canAnimate]: {
      animation: `${glowPulse} 2400ms ease-out infinite`,
    },
  },
  selectors: {
    '[data-open] > &': {
      display: 'none',
    },
  },
})

// Soft shadows under the button. They live apart from it because its clipped shape would cut
// them off, and each shape has its own so the swap only fades two layers.
const buttonShadow = style({
  position: 'absolute',
  top: '8px',
  bottom: '-8px',
  right: 0,
  borderRadius: '999px',
  background: `color-mix(in srgb, ${vars.color.skin} 45%, transparent)`,
  filter: 'blur(10px)',
  pointerEvents: 'none',
  '@media': {
    [canAnimate]: {
      transition: 'opacity 300ms ease-out',
    },
  },
})

export const shadowPill = style([
  buttonShadow,
  {
    left: 0,
    selectors: {
      '[data-open] > &': {
        opacity: 0,
      },
    },
  },
])

export const shadowCircle = style([
  buttonShadow,
  {
    width: `${TRIGGER_HEIGHT}px`,
    opacity: 0,
    selectors: {
      '[data-open] > &': {
        opacity: 1,
      },
    },
  },
])

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
  // The button keeps its pill width and only shows its round end when it is the close button,
  // so it can open from right to left without any layout changing.
  clipPath: 'inset(0 0 0 0 round 999px)',
  fontFamily: 'inherit',
  fontSize: '16px',
  lineHeight: '24px',
  fontWeight: 600,
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  '@media': {
    [canAnimate]: {
      transition: `transform 300ms ${spring}, clip-path ${MOTION_SHAPE}`,
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
      clipPath: `inset(0 0 0 calc(100% - ${TRIGGER_HEIGHT}px) round 999px)`,
    },
    // Drawn inside the button, because its clipped shape would cut off an outline outside it.
    '&:focus-visible': {
      outline: '2px solid #fff',
      outlineOffset: '-6px',
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

const hiddenInCloseShape = {
  '@media': {
    [canAnimate]: {
      transition: 'opacity 200ms ease-out',
    },
  },
  selectors: {
    '[data-open] > &': {
      opacity: 0,
    },
  },
}

export const triggerIcon = style({
  flexShrink: 0,
  ...hiddenInCloseShape,
  '@media': {
    [canAnimate]: {
      transition: 'opacity 200ms ease-out',
      animation: `${twinkle} 4s ${curve} infinite`,
    },
  },
})

export const triggerLabel = style(hiddenInCloseShape)

export const triggerClose = style({
  position: 'absolute',
  right: `${(TRIGGER_HEIGHT - 22) / 2}px`,
  top: `${(TRIGGER_HEIGHT - 22) / 2}px`,
  opacity: 0,
  transform: 'rotate(-90deg) scale(0.6)',
  '@media': {
    [canAnimate]: {
      transition: `opacity 200ms ease-out, transform ${MOTION_SHAPE}`,
    },
  },
  selectors: {
    '[data-open] > &': {
      opacity: 1,
      transform: 'rotate(0deg) scale(1)',
    },
  },
})
