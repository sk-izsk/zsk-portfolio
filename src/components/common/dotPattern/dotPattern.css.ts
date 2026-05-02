import { style } from '@vanilla-extract/css'
import { vars } from '@styles/theme.css'

export const dotPatternContainer = style({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: '0',
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
  zIndex: -1,
  fill: vars.color.skin,
  transition: 'opacity 0.3s ease',
  maskImage: 'radial-gradient(ellipse at center, white, transparent 82%)',
  WebkitMaskImage: 'radial-gradient(ellipse at center, white, transparent 82%)',
  '@media': {
    '(max-width: 1199px)': {
      left: 0,
    },
  },
})

export const dotPatternLight = style({
  opacity: 0.22,
})

export const dotPatternDark = style({
  opacity: 0.4,
})
