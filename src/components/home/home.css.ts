import { globalStyle, keyframes, style } from '@vanilla-extract/css'
import { vars } from '@styles/theme.css'

const quoteDrift = keyframes({
  '0%': { transform: 'translateY(0px)' },
  '50%': { transform: 'translateY(-3px)' },
  '100%': { transform: 'translateY(0px)' },
})

export const home = style({
  minHeight: '100vh',
  display: 'flex',
  color: vars.color.text[900],
})

export const homeInfo = style({
  flex: '0 0 60%',
  maxWidth: '60%',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '620px',
  '@media': {
    '(max-width: 991px)': {
      flex: '0 0 100%',
      maxWidth: '100%',
      minHeight: 'auto',
      marginBottom: '30px',
    },
  },
})

export const homeIntroBlock = style({
  marginTop: 'auto',
  paddingTop: '96px',
  '@media': {
    '(max-width: 991px)': {
      marginTop: 0,
      paddingTop: 0,
    },
  },
})

export const homeQuoteShelf = style({
  marginTop: 'auto',
  paddingTop: '88px',
  width: 'min(980px, calc(100% - 56px))',
  '@media': {
    '(max-width: 991px)': {
      paddingTop: '32px',
      width: '100%',
    },
  },
})

export const homeRow = style({
  alignItems: 'center',
  minHeight: 'calc(100vh - 140px)',
  '@media': {
    '(max-width: 991px)': {
      alignItems: 'flex-start',
      minHeight: 'auto',
    },
  },
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

export const homeQuoteBottom = style({
  width: '100%',
  minHeight: '160px',
  display: 'flex',
  alignItems: 'flex-start',
  animation: `${quoteDrift} 9s ease-in-out infinite`,
  '@media': {
    '(max-width: 991px)': {
      width: '100%',
      minHeight: 'auto',
    },
  },
})

export const homeQuoteBottomBody = style({
  display: 'grid',
  gap: '12px',
  width: 'min(100%, 860px)',
  paddingLeft: '18px',
  paddingRight: '18px',
  paddingTop: '6px',
  paddingBottom: '4px',
  borderLeft: `3px solid ${vars.color.skin}`,
  gridTemplateColumns: 'minmax(0, 1fr)',
  '@media': {
    '(max-width: 767px)': {
      paddingLeft: '14px',
      paddingRight: 0,
      width: '100%',
    },
  },
})

export const homeQuoteText = style({
  margin: 0,
  fontSize: '20px',
  lineHeight: 1.55,
  color: vars.color.text[900],
  maxWidth: '52ch',
  fontStyle: 'italic',
  letterSpacing: '0.01em',
  '@media': {
    '(max-width: 767px)': {
      fontSize: '17px',
      maxWidth: '100%',
    },
  },
})

export const homeQuoteMark = style({
  color: vars.color.skin,
  fontSize: '1.8em',
  lineHeight: 0,
  fontStyle: 'normal',
  fontWeight: 700,
  opacity: 0.95,
  verticalAlign: '-0.18em',
})

export const homeQuoteAuthor = style({
  fontSize: '14px',
  lineHeight: 1.5,
  color: vars.color.text[700],
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
})

export const homeQuoteAuthorHighlight = style({
  color: vars.color.skin,
  fontWeight: 700,
  fontStyle: 'normal',
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
