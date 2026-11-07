import { keyframes, style } from '@vanilla-extract/css'
import { vars } from '@styles/theme.css'

const canAnimate = '(prefers-reduced-motion: no-preference)'

// The scene needs room for the whole hero, and the full top bar's width.
// Everything else gets the plain stacked layout.
export const pinnedSceneQuery = `${canAnimate} and (min-width: 1100px) and (min-height: 700px)`
export const flowSceneQuery = `${canAnimate} and (max-width: 1099px), ${canAnimate} and (max-height: 699px)`

const homeRise = keyframes({
  '0%': { opacity: 0, transform: 'translateY(24px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
})

const riseIn = (delay: number) => ({
  '@media': {
    [canAnimate]: {
      // Backwards only: holding the end state would override the scroll scene's fade afterwards.
      animation: `${homeRise} 700ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms backwards`,
    },
  },
})

const cueBob = keyframes({
  '0%, 100%': { transform: 'translateY(0)' },
  '50%': { transform: 'translateY(4px)' },
})

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

export const homeScene = style({
  position: 'relative',
  '@media': {
    [pinnedSceneQuery]: {
      height: '340vh',
      // Cancels the .section .container top padding so the stage sticks from the first pixel.
      marginTop: '-96px',
    },
  },
})

export const homeStage = style({
  '@media': {
    [pinnedSceneQuery]: {
      position: 'sticky',
      top: 0,
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      paddingTop: '48px',
    },
  },
})

export const homeRow = style({
  alignItems: 'center',
  width: '100%',
  minHeight: 'calc(100vh - 140px)',
  '@media': {
    '(max-width: 991px)': {
      alignItems: 'flex-start',
      minHeight: 'auto',
    },
    [pinnedSceneQuery]: {
      minHeight: 'auto',
    },
  },
})

export const homeInfo = style({
  flex: '0 0 60%',
  maxWidth: '60%',
  '@media': {
    '(max-width: 991px)': {
      flex: '0 0 100%',
      maxWidth: '100%',
      marginBottom: '32px',
    },
  },
})

export const homeEyebrow = style({
  fontSize: '18px',
  lineHeight: '28px',
  fontWeight: 500,
  marginBottom: '16px',
  color: vars.color.text[700],
  ...riseIn(150),
})

export const helloName = style({
  fontFamily: vars.font.family.script,
  fontSize: '30px',
  fontWeight: 700,
  color: vars.color.skin,
})

export const homeHeadline = style({
  width: 'fit-content',
  maxWidth: '680px',
  marginBottom: '24px',
  fontSize: '30px',
  lineHeight: '36px',
  fontWeight: 600,
  letterSpacing: '-0.03em',
  textWrap: 'balance',
  backgroundImage: `linear-gradient(90deg, ${vars.color.text[900]}, ${vars.color.text[700]})`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  '@media': {
    ...riseIn(210)['@media'],
    '(min-width: 768px)': {
      fontSize: '36px',
      lineHeight: '40px',
    },
    '(min-width: 1400px)': {
      fontSize: '48px',
      lineHeight: '52px',
    },
  },
})

export const homeInfoP = style({
  maxWidth: '680px',
  fontSize: '18px',
  lineHeight: '28px',
  marginBottom: '40px',
  color: vars.color.text[700],
  textWrap: 'pretty',
  ...riseIn(270),
})

export const homeActions = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '24px',
  ...riseIn(330),
})

export const homeQuoteShelf = style({
  marginTop: '64px',
  '@media': {
    [pinnedSceneQuery]: {
      position: 'absolute',
      inset: 0,
      margin: 0,
      padding: '128px 112px 96px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '40px',
      textAlign: 'center',
      pointerEvents: 'none',
    },
  },
})

export const homeTagline = style({
  maxWidth: '860px',
  fontSize: '30px',
  lineHeight: '36px',
  fontWeight: 600,
  letterSpacing: '-0.02em',
  color: vars.color.text[900],
  textWrap: 'balance',
  '@media': {
    '(min-width: 1400px)': {
      fontSize: '48px',
      lineHeight: '52px',
    },
    '(min-width: 768px) and (max-width: 1399px)': {
      fontSize: '36px',
      lineHeight: '40px',
    },
  },
})

export const homeTaglineWord = style({})

export const homeShelfQuote = style({
  marginTop: '24px',
  '@media': {
    [pinnedSceneQuery]: {
      marginTop: 0,
      maxWidth: '680px',
    },
  },
})

export const homeScrollCue = style({
  display: 'none',
  '@media': {
    [pinnedSceneQuery]: {
      position: 'absolute',
      left: '50%',
      bottom: '24px',
      transform: 'translateX(-50%)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 12px',
      borderRadius: '999px',
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 500,
      color: vars.color.text[700],
      whiteSpace: 'nowrap',
    },
  },
})

export const homeScrollCueIcon = style({
  color: vars.color.skin,
  '@media': {
    [canAnimate]: {
      animation: `${cueBob} 1600ms cubic-bezier(0.45, 0, 0.55, 1) infinite`,
    },
  },
})

export const homeQuoteBottom = style({
  width: '100%',
  display: 'flex',
  alignItems: 'flex-start',
  animation: `${quoteDrift} 9s ease-in-out infinite`,
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animation: 'none',
    },
  },
})

export const homeQuoteBottomBody = style({
  display: 'grid',
  gap: '12px',
  width: 'min(100%, 860px)',
  gridTemplateColumns: 'minmax(0, 1fr)',
})

export const homeQuoteText = style({
  position: 'relative',
  margin: 0,
  fontSize: '18px',
  lineHeight: '28px',
  color: vars.color.text[700],
  textWrap: 'balance',
  letterSpacing: '0.01em',
})

export const homeQuoteSrOnly = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  clipPath: 'inset(50%)',
  whiteSpace: 'nowrap',
})

// Each letter lands lit in the theme color, then cools to the text color.
export const homeQuoteChar = style({
  transition: 'color 900ms ease-out, text-shadow 900ms ease-out',
  selectors: {
    '&[data-lit]': {
      color: vars.color.skin,
      textShadow: `0 0 12px ${vars.color.skin}`,
      transition: 'none',
    },
  },
})

// Reaches above the text, where the rain starts. Its color is the one the rain is drawn in.
export const homeQuoteRain = style({
  position: 'absolute',
  left: 0,
  color: vars.color.skin,
  pointerEvents: 'none',
})

export const homeQuoteMark = style({
  color: vars.color.skin,
  fontSize: '1.8em',
  lineHeight: 0,
  fontWeight: 700,
  opacity: 0.95,
  verticalAlign: '-0.18em',
})

export const homeQuoteAuthor = style({
  fontSize: '14px',
  lineHeight: '20px',
  color: vars.color.text[700],
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
})

export const homeQuoteAuthorHighlight = style({
  color: vars.color.skin,
  fontWeight: 700,
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
      marginTop: '32px',
    },
  },
})

export const homeImgImg = style({
  borderRadius: '4px',
  maxHeight: '100%',
  maxWidth: '100%',
  width: 'auto',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
})

export const homeBracket = style({
  position: 'absolute',
  width: '80px',
  height: '80px',
  borderColor: vars.color.skin,
  borderStyle: 'solid',
  borderWidth: 0,
  pointerEvents: 'none',
  zIndex: 1,
  willChange: 'transform',
  '@media': {
    '(max-width: 991px)': {
      width: '64px',
      height: '64px',
    },
    // During the scene these are drawn by the story's traveling frame instead.
    [pinnedSceneQuery]: {
      display: 'none',
    },
  },
})

export const homeBracketStart = style({
  borderLeftWidth: '10px',
  borderTopWidth: '10px',
  left: '20px',
  top: '-40px',
  '@media': {
    '(max-width: 991px)': {
      borderLeftWidth: '8px',
      borderTopWidth: '8px',
      left: '12px',
      top: '-32px',
    },
  },
})

export const homeBracketEnd = style({
  borderRightWidth: '10px',
  borderBottomWidth: '10px',
  right: '20px',
  bottom: '-40px',
  '@media': {
    '(max-width: 991px)': {
      borderRightWidth: '8px',
      borderBottomWidth: '8px',
      right: '12px',
      bottom: '-32px',
    },
  },
})
