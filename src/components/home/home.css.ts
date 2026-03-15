import { globalStyle, style } from '@vanilla-extract/css'
import { vars } from '../../styles/theme.css'

export const home = style({
  minHeight: '100vh',
  display: 'flex',
  color: vars.color.text[900],
})

export const homeInfo = style({
  flex: '0 0 60%',
  maxWidth: '60%',
  '@media': {
    '(max-width: 991px)': {
      flex: '0 0 100%',
      maxWidth: '100%',
      marginBottom: '30px',
    },
  },
})

export const homeRow = style({
  alignItems: 'flex-start',
})

export const hello = style({
  fontSize: '28px',
  margin: '15px 0',
})

export const helloName = style({
  fontFamily: vars.font.family.script,
  fontSize: '30px',
  fontWeight: 700,
  color: vars.color.skin,
})

export const myProfession = style({
  fontSize: '30px',
  margin: '15px 0',
})

export const typing = style({
  color: vars.color.skin,
})

export const homeInfoP = style({
  fontSize: '20px',
  marginBottom: '70px',
  color: vars.color.text[700],
})

export const homeImg = style({
  flex: '0 0 40%',
  maxWidth: '40%',
  textAlign: 'center',
  position: 'relative',
  height: '500px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '@media': {
    '(max-width: 991px)': {
      flex: '0 0 100%',
      maxWidth: '100%',
      height: '300px',
      marginTop: '30px',
    },
  },
  '::before': {
    content: '""',
    position: 'absolute',
    height: '80px',
    width: '80px',
    borderLeft: `10px solid ${vars.color.skin}`,
    borderTop: `10px solid ${vars.color.skin}`,
    left: '20px',
    top: '-40px',
  },
  '::after': {
    content: '""',
    position: 'absolute',
    height: '80px',
    width: '80px',
    borderRight: `10px solid ${vars.color.skin}`,
    borderBottom: `10px solid ${vars.color.skin}`,
    right: '20px',
    bottom: '-40px',
  },
})

export const homeImgImg = style({
  borderRadius: '5px',
  maxHeight: '100%',
  maxWidth: '100%',
  width: 'auto',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
})

// Responsive styles for home image pseudo-elements
globalStyle(`.${homeImg}::before`, {
  '@media': {
    '(max-width: 991px)': {
      height: '60px !important',
      width: '60px !important',
      borderLeftWidth: '8px !important',
      borderTopWidth: '8px !important',
      left: '10px !important',
      top: '-30px !important',
    },
  },
})

globalStyle(`.${homeImg}::after`, {
  '@media': {
    '(max-width: 991px)': {
      height: '60px !important',
      width: '60px !important',
      borderRightWidth: '8px !important',
      borderBottomWidth: '8px !important',
      right: '10px !important',
      bottom: '-30px !important',
    },
  },
})
