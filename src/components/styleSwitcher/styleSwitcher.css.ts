import { globalStyle, keyframes, style } from '@vanilla-extract/css'
import { vars } from '../../styles/theme.css'

const rotateAnimation = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
})

export const styleSwitcher = style({
  position: 'fixed',
  right: 0,
  top: '60px',
  padding: '15px',
  width: '200px',
  border: `1px solid ${vars.color.background[50]}`,
  background: vars.color.background[100],
  zIndex: 101,
  borderRadius: '5px',
  transition: 'all 0.3s ease',
  transform: 'translateX(100%)',
  '@media': {
    '(max-width: 767px)': {
      width: '180px',
      top: '20px',
      padding: '15px 20px',
    },
  },
})

export const styleSwitcherOpen = style({
  transform: 'translateX(-25px)',
})

export const sIcon = style({
  position: 'absolute',
  height: '40px',
  width: '40px',
  textAlign: 'center',
  fontSize: '20px',
  background: vars.color.background[100],
  color: vars.color.text[900],
  right: '100%',
  border: `1px solid ${vars.color.background[50]}`,
  marginRight: '25px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const styleSwitcherToggler = style([
  sIcon,
  {
    top: 0,
  },
])

export const dayNight = style([
  sIcon,
  {
    top: '55px',
  },
])

export const s_icon = style({
  fontSize: '16px',
  transition: 'all 0.3s ease',
})

export const settingsIcon = style({
  animation: `${rotateAnimation} 2s linear infinite`,
})

export const dayNightIcon = style({
  fontSize: '16px',
  color: vars.color.text[700],
})

export const heading = style({
  margin: '2px 0 8px',
  color: vars.color.text[700],
  fontSize: '16px',
  fontWeight: 600,
  textTransform: 'capitalize',
})

export const colors = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
})

export const colorItem = style({
  display: 'inline-block',
  height: '28px',
  width: '28px',
  borderRadius: '50%',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  selectors: {
    '&.color-1': {
      background: '#ec1839',
    },
    '&.color-2': {
      background: '#fa5b0f',
    },
    '&.color-3': {
      background: '#37b182',
    },
    '&.color-5': {
      background: '#f021b2',
    },
    '&.color-7': {
      background: '#daa520',
    },
    '&.color-9': {
      background: '#00bfff',
    },
    '&.active': {
      border: '2px solid #fff',
      boxShadow: '0 0 10px rgba(0,0,0,0.3)',
      transform: 'scale(1.1)',
    },
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
})

// Global hover styles using CSS custom properties for dynamic theme colors
globalStyle(`.${styleSwitcherToggler}:hover`, {
  color: `${vars.color.skin} !important`,
})

globalStyle(`.${dayNight}:hover`, {
  color: `${vars.color.skin} !important`,
})

globalStyle(`.${dayNight}:hover .${dayNightIcon}`, {
  color: `${vars.color.skin} !important`,
})
