import { style } from '@vanilla-extract/css'
import { vars } from '../../styles/theme.css'

export const revealRoot = style({
  display: 'inline',
})

export const revealWord = style({
  position: 'relative',
  display: 'inline-block',
  marginRight: '0.22em',
})

export const revealWordGhost = style({
  position: 'absolute',
  inset: 0,
  color: vars.color.text[700],
  opacity: 0.18,
  pointerEvents: 'none',
  userSelect: 'none',
})

export const revealWordText = style({
  position: 'relative',
  color: vars.color.text[900],
  opacity: 0.18,
  transform: 'translateY(0.16em)',
  filter: 'blur(1px)',
  transition: 'opacity 320ms ease, transform 320ms ease, filter 320ms ease',
})

export const revealWordVisible = style({
  opacity: 1,
  transform: 'translateY(0px)',
  filter: 'blur(0px)',
})

export const reducedMotionReveal = style({
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      opacity: 1,
      transform: 'none',
      filter: 'none',
      transition: 'none',
    },
  },
})
