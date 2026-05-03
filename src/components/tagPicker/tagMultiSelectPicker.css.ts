import { keyframes, style } from '@vanilla-extract/css'
import { vars } from '@styles/theme.css'

const skinTint = (percent: number) => `color-mix(in srgb, ${vars.color.skin} ${percent}%, transparent)`

const bob = keyframes({
  '0%': { transform: 'translate(-50%, 0)' },
  '50%': { transform: 'translate(-50%, 4px)' },
  '100%': { transform: 'translate(-50%, 0)' },
})

export const root = style({
  position: 'relative',
  width: '100%',
  vars: {
    '--tag-picker-row-height': '44px',
  },
})

export const fieldButton = style({
  width: '100%',
  minHeight: '44px',
  height: '44px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
  padding: '7px 14px',
  borderRadius: '10px',
  border: `1px solid ${vars.color.skin}`,
  background: vars.color.background[100],
  color: vars.color.text[900],
  cursor: 'pointer',
  textAlign: 'left',
  overflow: 'hidden',
  fontFamily: vars.font.family.primary,
  fontSize: '15px',
  lineHeight: 1.35,
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
  selectors: {
    '&:focus-visible': {
      boxShadow: `0 0 0 3px ${skinTint(25)}`,
    },
  },
})

export const fieldButtonOpen = style({
  boxShadow: `0 0 0 3px ${skinTint(18)}`,
})

export const fieldInner = style({
  minWidth: 0,
  flex: 1,
  overflow: 'hidden',
})

export const placeholderText = style({
  display: 'block',
  color: vars.color.text[700],
  fontSize: '15px',
  lineHeight: 1.35,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})

export const selectedChipRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  minWidth: 0,
  overflow: 'hidden',
})

export const selectedChip = style({
  minWidth: 0,
  flexShrink: 1,
  cursor: 'default',
})

export const selectedChipSummary = style({
  flexShrink: 0,
})

export const selectedChipLabel = style({
  maxWidth: '86px',
})

export const selectedChipRemove = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: '14px',
  height: '14px',
  marginLeft: '6px',
  borderRadius: '999px',
  color: vars.color.skin,
  transition: 'background-color 0.2s ease, color 0.2s ease',
  selectors: {
    '&:hover': {
      background: `${vars.color.skin}18`,
    },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.skin}`,
      outlineOffset: '2px',
    },
  },
})

export const chevron = style({
  flexShrink: 0,
  color: vars.color.skin,
  transition: 'transform 0.2s ease',
})

export const chevronOpen = style({
  transform: 'rotate(180deg)',
})

export const panel = style({
  position: 'absolute',
  top: 'calc(100% + 8px)',
  left: 0,
  right: 0,
  zIndex: 20,
  display: 'grid',
  gap: '8px',
  padding: '8px',
  borderRadius: '12px',
  border: `1px solid ${vars.color.skin}`,
  background: vars.color.background[100],
  boxShadow: '0 16px 32px rgba(15, 23, 42, 0.16)',
})

export const searchRow = style({
  position: 'relative',
  minHeight: '38px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '0 12px',
  marginBottom: '4px',
  borderRadius: '8px',
  border: `1px solid ${skinTint(40)}`,
  background: skinTint(8),
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
  selectors: {
    '&:focus-within': {
      borderColor: skinTint(70),
      background: skinTint(10),
      boxShadow: `0 0 0 3px ${skinTint(18)}`,
    },
  },
})

export const searchIcon = style({
  flexShrink: 0,
  color: vars.color.text[700],
  alignSelf: 'center',
  display: 'block',
})

export const input = style({
  minWidth: 0,
  width: '100%',
  border: 'none',
  outline: 'none',
  padding: 0,
  background: 'transparent',
  color: vars.color.text[900],
  fontFamily: vars.font.family.primary,
  fontSize: '15px',
  fontWeight: 500,
  lineHeight: '38px',
  selectors: {
    '&::placeholder': {
      color: vars.color.text[700],
    },
    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.72,
    },
  },
})

export const resultsViewport = style({
  position: 'relative',
  overflowY: 'auto',
  overflowX: 'hidden',
  minHeight: '0',
  paddingBottom: '6px',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  selectors: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
})

export const resultsContent = style({
  display: 'grid',
  gap: '4px',
})

export const option = style({
  minHeight: 'var(--tag-picker-row-height)',
  width: '100%',
  padding: '10px 12px',
  border: 'none',
  borderRadius: '8px',
  background: 'transparent',
  color: vars.color.text[900],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '10px',
  textAlign: 'left',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease, color 0.2s ease, opacity 0.2s ease',
  selectors: {
    '&:hover': {
      background: skinTint(12),
    },
    '&:focus-visible': {
      background: skinTint(12),
      outline: 'none',
    },
  },
})

export const optionSelected = style({
  background: skinTint(16),
  color: vars.color.text[900],
  selectors: {
    '&:hover': {
      background: skinTint(16),
    },
    '&:focus-visible': {
      background: skinTint(16),
    },
  },
})

export const optionDisabled = style({
  opacity: 0.5,
  cursor: 'not-allowed',
})

export const optionLabel = style({
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontSize: '15px',
  fontWeight: 500,
})

export const optionCheck = style({
  flexShrink: 0,
  color: vars.color.skin,
})

export const emptyState = style({
  minHeight: 'var(--tag-picker-row-height)',
  display: 'flex',
  alignItems: 'center',
  padding: '10px 12px',
  color: vars.color.text[700],
  fontSize: '14px',
})

export const scrollCue = style({
  position: 'absolute',
  left: '50%',
  bottom: '12px',
  width: '34px',
  height: '34px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '999px',
  border: `1px solid ${skinTint(34)}`,
  background: `radial-gradient(circle at 30% 25%, ${skinTint(24)} 0%, ${skinTint(18)} 55%, ${skinTint(12)} 100%)`,
  color: vars.color.skin,
  boxShadow: `0 8px 18px rgba(15, 23, 42, 0.14), inset 0 1px 0 ${skinTint(10)}`,
  backdropFilter: 'blur(6px)',
  transition: 'opacity 0.18s ease, transform 0.18s ease, background-color 0.2s ease, border-color 0.2s ease',
  selectors: {
    '&:hover': {
      background: `radial-gradient(circle at 30% 25%, ${skinTint(30)} 0%, ${skinTint(22)} 55%, ${skinTint(16)} 100%)`,
      borderColor: skinTint(42),
    },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.skin}`,
      outlineOffset: '2px',
    },
  },
})

export const scrollCueVisible = style({
  opacity: 1,
  pointerEvents: 'auto',
  animation: `${bob} 1.6s ease-in-out infinite`,
})

export const scrollCueHidden = style({
  opacity: 0,
  pointerEvents: 'none',
  transform: 'translate(-50%, 4px) scale(0.94)',
})

export const scrollCueReducedMotion = style({
  animation: 'none',
})
