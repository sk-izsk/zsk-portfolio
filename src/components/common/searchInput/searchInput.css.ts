import { style } from '@vanilla-extract/css'
import { vars } from '@styles/theme.css'

const skinTint = (percent: number) =>
  `color-mix(in srgb, ${vars.color.skin} ${percent}%, transparent)`

// Matches the tag picker's field button so the toolbar reads as one row.
export const field = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  height: '44px',
  padding: '0 14px',
  borderRadius: '10px',
  border: `1px solid ${vars.color.skin}`,
  background: vars.color.background[100],
  cursor: 'text',
  transition: 'box-shadow 0.2s ease',
  selectors: {
    '&:focus-within': {
      boxShadow: `0 0 0 3px ${skinTint(25)}`,
    },
  },
})

export const icon = style({
  flexShrink: 0,
  color: vars.color.text[700],
})

export const input = style({
  flex: 1,
  minWidth: 0,
  height: '100%',
  border: 'none',
  outline: 'none',
  padding: 0,
  background: 'transparent',
  color: vars.color.text[900],
  fontFamily: vars.font.family.primary,
  fontSize: '15px',
  selectors: {
    '&::placeholder': {
      color: vars.color.text[700],
    },
    '&::-webkit-search-cancel-button': {
      cursor: 'pointer',
    },
  },
})
