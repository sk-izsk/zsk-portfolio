import { vars } from '@styles/theme.css'
import { keyframes, style } from '@vanilla-extract/css'

const grow = keyframes({
  '0%, 40%, 100%': { transform: 'scaleY(0.4)' },
  '20%': { transform: 'scaleY(1)' },
})

export const bars = style({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  height: '80px',
})

export const bar = style({
  width: '10px',
  height: '100%',
  borderRadius: '2px',
  background: vars.color.skin,
  animation: `${grow} 1.2s ease-in-out infinite`,
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animation: 'none',
      transform: 'scaleY(0.6)',
    },
  },
})
