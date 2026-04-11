import { style } from '@vanilla-extract/css'
import { vars } from '@styles/theme.css'

export const serviceRow = style({
  alignItems: 'stretch',
})

export const serviceItem = style({
  display: 'flex',
  marginBottom: '30px',
  flex: '0 0 33.33%',
  maxWidth: '33.33%',
  '@media': {
    '(max-width: 991px)': {
      flex: '0 0 50%',
      maxWidth: '50%',
    },
    '(max-width: 767px)': {
      flex: '0 0 100%',
      maxWidth: '100%',
    },
  },
})

export const serviceItemInner = style({
  background: vars.color.background[100],
  border: `1px solid ${vars.color.background[50]}`,
  borderRadius: '10px',
  padding: '30px 15px',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  transition: 'all 0.3s ease',
  ':hover': {
    boxShadow: '0 0 20px rgba(48, 46, 77, 0.15)',
  },
})

export const serviceIcon = style({
  height: '60px',
  width: '60px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 30px',
  transition: 'all 0.3s ease',
})

export const serviceIconFA = style({
  width: '40px',
  height: '40px',
  color: vars.color.skin,
  transition: 'all 0.3s ease',
})

export const serviceItemInnerHover = style({
  selectors: {
    [`${serviceItemInner}:hover &`]: {
      background: vars.color.skin,
    },
  },
})

export const serviceIconFAHover = style({
  selectors: {
    [`${serviceItemInner}:hover &`]: {
      transform: 'scale(0.625)',
      color: '#ffffff',
    },
  },
})

export const serviceH4 = style({
  fontSize: '18px',
  marginBottom: '15px',
  color: vars.color.text[900],
  fontWeight: 700,
  textTransform: 'capitalize',
})

export const serviceP = style({
  fontSize: '16px',
  color: vars.color.text[700],
  lineHeight: '25px',
  marginBottom: 0,
})
