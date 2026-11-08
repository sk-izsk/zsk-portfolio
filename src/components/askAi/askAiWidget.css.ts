import { TRIGGER_HEIGHT, TRIGGER_OFFSET } from '@components/askAi/askAiTrigger.css'
import { vars } from '@styles/theme.css'
import { globalStyle, style } from '@vanilla-extract/css'

const phone = '(max-width: 767px)'
const PANEL_GAP = 20

export const panel = style({
  position: 'fixed',
  right: `${TRIGGER_OFFSET}px`,
  bottom: `${TRIGGER_OFFSET + TRIGGER_HEIGHT + PANEL_GAP}px`,
  zIndex: 950,
  display: 'flex',
  width: 'min(520px, calc(100vw - 48px))',
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

// Same as the phone menu: the page behind a chat that fills the screen must not scroll.
globalStyle(`html:has(${panel}[data-open])`, {
  '@media': {
    [phone]: {
      overflow: 'hidden',
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
