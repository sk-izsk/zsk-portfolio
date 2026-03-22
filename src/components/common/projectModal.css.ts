import { style } from '@vanilla-extract/css'
import { vars } from '../../styles/theme.css'

export const modal = style({
  background: vars.color.background[900],
  color: vars.color.text[900],
  borderRadius: 12,
  border: `2px solid ${vars.color.skin}`,
  width: '50rem',
  maxWidth: '90vw',
  minHeight: '17.88rem',
  maxHeight: '43rem',
  // boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'auto',
  /* Hide scrollbar for all browsers */
  scrollbarWidth: 'none' /* Firefox */,
  msOverflowStyle: 'none' /* IE and Edge */,
  selectors: {
    '&::-webkit-scrollbar': {
      display: 'none' /* Chrome, Safari, Opera */,
    },
  },
})

export const titleRowSticky = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '3.125rem',
  minHeight: '3.125rem',
  maxHeight: '3.125rem',
  marginBottom: 8,
  position: 'sticky',
  top: 0,
  zIndex: 2,
  background: vars.color.background[900],
  color: vars.color.text[900],
  // paddingTop: 4,
  // paddingBottom: 4,
})

export const highlights = style({
  paddingLeft: 20,
  marginBottom: 18,
  color: vars.color.text[900],
  fontSize: 15,
  lineHeight: 1.6,
  listStyleType: 'disc',
  listStylePosition: 'inside',
})

export const footerSticky = style({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 12,
  height: '3.125rem',
  minHeight: '3.125rem',
  maxHeight: '3.125rem',
  position: 'sticky',
  bottom: 0,
  zIndex: 2,
  background: vars.color.background[900],
  color: vars.color.text[900],
  marginTop: 12,
})

export const divider = style({
  width: '100%',
  height: 1,
  background: 'var(--divider-color, rgba(0,0,0,0.08))',
  margin: 0,
  border: 'none',
  display: 'block',
  padding: 0,
})
