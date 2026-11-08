import { vars } from '@styles/theme.css'
import { keyframes, style } from '@vanilla-extract/css'

const pulse = keyframes({
  '0%': { boxShadow: `0 0 0 0 color-mix(in srgb, ${vars.color.skin} 45%, transparent)` },
  '70%': { boxShadow: `0 0 0 7px color-mix(in srgb, ${vars.color.skin} 0%, transparent)` },
  '100%': { boxShadow: `0 0 0 0 color-mix(in srgb, ${vars.color.skin} 0%, transparent)` },
})

// Marks the availability row as "open to work" without breaking the plain label : value style.
export const availabilityDot = style({
  display: 'inline-block',
  width: '8px',
  height: '8px',
  marginRight: '8px',
  borderRadius: '999px',
  background: vars.color.skin,
  verticalAlign: 'middle',
  animation: `${pulse} 2s ease-out infinite`,
  '@media': {
    '(prefers-reduced-motion: reduce)': { animation: 'none' },
  },
})
