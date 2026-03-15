import { style } from '@vanilla-extract/css'
import { vars } from '../../styles/theme.css'

export const tag = style({
  padding: '5px 10px',
  borderRadius: '999px',
  fontSize: '12px',
  fontWeight: 500,
  lineHeight: 1.2,
  backgroundColor: `${vars.color.skin}15`,
  color: vars.color.skin,
  border: `1px solid ${vars.color.skin}`,
  transition: 'all 0.3s ease',
  cursor: 'default',
  ':hover': {
    backgroundColor: vars.color.skin,
    color: 'white',
  },
})
