import { style } from '@vanilla-extract/css'
import { vars } from '../../../styles/theme.css'

export const divider = style({
  width: '100%',
  height: 1,
  background: vars.color.skin,
  borderRadius: 1,
  marginLeft: 0,
  marginRight: 0,
  marginTop: 8,
  marginBottom: 8,
  border: 'none',
  transition: 'background 0.3s',
})

export const dividerVertical = style({
  width: 2,
  height: 32,
  background: vars.color.skin,
  borderRadius: 1,
  margin: '0 16px',
  alignSelf: 'center',
  flexShrink: 0,
  transition: 'background 0.3s',
})
