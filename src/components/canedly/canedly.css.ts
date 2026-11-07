import { style } from '@vanilla-extract/css'
import { vars } from '@styles/theme.css'

export const bookMeetingButton = style({
  gap: '8px',
})

export const modalLoadingState = style({
  position: 'fixed',
  right: '24px',
  bottom: '92px',
  zIndex: 999,
  padding: '12px 16px',
  borderRadius: '16px',
  background: vars.color.background[100],
  color: vars.color.text[700],
  border: `1px solid ${vars.color.background[50]}`,
  boxShadow: '0 20px 50px rgba(15, 23, 42, 0.16)',
})
