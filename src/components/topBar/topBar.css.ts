import { vars } from '@styles/theme.css'
import { keyframes, style } from '@vanilla-extract/css'

const canAnimate = '(prefers-reduced-motion: no-preference)'
const curve = 'cubic-bezier(0.22, 1, 0.36, 1)'

// Keep in step with the 1100px scene breakpoint in the story and home styles.
export const fullBarQuery = '(min-width: 1100px)'
const compactBarQuery = '(max-width: 1099px)'

export const GLASS_FILTER_ID = 'top-bar-glass'

const linkRise = keyframes({
  '0%': { opacity: 0, transform: 'translateX(48px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
})

const closeTurn = keyframes({
  '0%': { opacity: 0, transform: 'rotate(-90deg)' },
  '100%': { opacity: 1, transform: 'rotate(0deg)' },
})

export const bar = style({
  position: 'fixed',
  top: '16px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 900,
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  maxWidth: 'calc(100vw - 32px)',
  padding: '8px 8px 8px 16px',
  borderRadius: '999px',
  border: '1px solid rgba(255, 255, 255, 0.4)',
  // Keeps the labels readable over whatever scrolls behind the clear glass.
  textShadow: `0 0 8px ${vars.color.background[100]}`,
  // Light caught along the top edge and bouncing off the bottom, which is what reads as glass.
  boxShadow: [
    '0 12px 32px rgba(15, 23, 42, 0.14)',
    'inset 0 1px 1px rgba(255, 255, 255, 0.7)',
    'inset 0 -1px 1px rgba(255, 255, 255, 0.25)',
    'inset 0 0 12px rgba(255, 255, 255, 0.12)',
  ].join(', '),
  '@media': {
    [compactBarQuery]: {
      width: 'calc(100vw - 32px)',
      justifyContent: 'space-between',
    },
    '(prefers-reduced-transparency: reduce)': {
      background: vars.color.background[100],
    },
  },
  selectors: {
    // The glass body, on its own layer so the bar's contents stay crisp above it. Browsers
    // without the lens below get more blur instead, which is plain frosted glass.
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      zIndex: -1,
      borderRadius: 'inherit',
      background: `color-mix(in srgb, ${vars.color.background[100]} 35%, transparent)`,
      backdropFilter: 'blur(10px) saturate(170%)',
    },
    // Set by useGlassLens: nearly clear in the middle, with the background bent around the rim.
    '&[data-lens]::before': {
      background: `color-mix(in srgb, ${vars.color.background[100]} 28%, transparent)`,
      backdropFilter: `url(#${GLASS_FILTER_ID}) blur(3px) saturate(170%)`,
    },
    // A soft sheen from above, brightest at the top edge.
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      zIndex: -1,
      borderRadius: 'inherit',
      background:
        'linear-gradient(180deg, rgba(255, 255, 255, 0.3), transparent 45%, rgba(255, 255, 255, 0.08))',
      pointerEvents: 'none',
    },
  },
})

export const glassFilter = style({
  position: 'absolute',
  width: 0,
  height: 0,
})

export const logo = style({
  flexShrink: 0,
  fontSize: '16px',
  lineHeight: '24px',
  fontWeight: 600,
  letterSpacing: '0.04em',
  color: vars.color.text[900],
  borderRadius: '8px',
  whiteSpace: 'nowrap',
})

export const logoInitial = style({
  fontFamily: vars.font.family.script,
  fontSize: '24px',
  color: vars.color.skin,
})

export const links = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  '@media': {
    [compactBarQuery]: {
      display: 'none',
    },
  },
})

export const link = style({
  display: 'block',
  padding: '8px 12px',
  borderRadius: '999px',
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: 500,
  whiteSpace: 'nowrap',
  color: vars.color.text[900],
  transition: 'color 300ms ease-out, background-color 300ms ease-out',
  ':hover': {
    backgroundColor: `color-mix(in srgb, ${vars.color.text[900]} 8%, transparent)`,
  },
  ':active': {
    transform: 'scale(0.98)',
  },
})

export const linkActive = style({
  color: vars.color.skin,
  ':hover': {
    backgroundColor: 'transparent',
  },
})

export const currentPage = style({
  flex: 1,
  textAlign: 'center',
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: 500,
  color: vars.color.text[700],
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  '@media': {
    [fullBarQuery]: {
      display: 'none',
    },
  },
})

export const controls = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  flexShrink: 0,
})

const roundButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  flexShrink: 0,
  borderRadius: '999px',
  border: `1px solid color-mix(in srgb, ${vars.color.skin} 40%, transparent)`,
  background: 'transparent',
  color: vars.color.skin,
  cursor: 'pointer',
  transition: 'background-color 300ms ease-out',
  ':hover': {
    backgroundColor: `color-mix(in srgb, ${vars.color.skin} 8%, transparent)`,
  },
  ':active': {
    transform: 'scale(0.98)',
  },
})

export const menuButton = style([
  roundButton,
  {
    '@media': {
      [fullBarQuery]: {
        display: 'none',
      },
    },
  },
])

export const menu = style({
  width: '100vw',
  maxWidth: '100vw',
  height: '100dvh',
  maxHeight: '100dvh',
  margin: 0,
  padding: '24px',
  border: 'none',
  color: vars.color.text[900],
  // Solid, because a blur over the whole page would repaint on every frame of the slide.
  background: vars.color.background[900],
  selectors: {
    '&::backdrop': {
      background: 'transparent',
    },
    '&[open]': {
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
    },
  },
})

export const menuTop = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '16px',
})

export const menuClose = style([
  roundButton,
  {
    '@media': {
      [canAnimate]: {
        animation: `${closeTurn} 500ms ${curve} both`,
      },
    },
  },
])

export const menuLinks = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  flex: 1,
  overflowY: 'auto',
})

export const menuLink = style({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  padding: '12px',
  borderRadius: '16px',
  fontSize: '24px',
  lineHeight: '32px',
  fontWeight: 600,
  color: vars.color.text[900],
  '@media': {
    [canAnimate]: {
      animation: `${linkRise} 500ms ${curve} both`,
    },
  },
})

export const menuLinkActive = style({
  color: vars.color.skin,
  backgroundColor: `color-mix(in srgb, ${vars.color.skin} 12%, transparent)`,
})
