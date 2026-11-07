import { roundButton } from '@components/topBar/topBar.css'
import { vars } from '@styles/theme.css'
import { keyframes, style } from '@vanilla-extract/css'

const canAnimate = '(prefers-reduced-motion: no-preference)'
const curve = 'cubic-bezier(0.22, 1, 0.36, 1)'

const linkRise = keyframes({
  '0%': { opacity: 0, transform: 'translateX(48px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
})

const closeTurn = keyframes({
  '0%': { opacity: 0, transform: 'rotate(-90deg)' },
  '100%': { opacity: 1, transform: 'rotate(0deg)' },
})

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
