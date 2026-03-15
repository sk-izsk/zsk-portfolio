import { style } from '@vanilla-extract/css'
import { vars } from '../../styles/theme.css'

export const aboutContent = style({
  flex: '0 0 100%',
  maxWidth: '100%',
})

export const aboutText = style({
  flex: '0 0 100%',
  maxWidth: '100%',
})

export const aboutTextH3 = style({
  fontSize: '24px',
  marginBottom: '15px',
  fontWeight: 700,
  color: vars.color.text[900],
})

export const aboutTextSpan = style({
  color: vars.color.skin,
})

export const aboutTextP = style({
  fontSize: '16px',
  lineHeight: '25px',
  color: vars.color.text[700],
})

export const personalInfoSection = style({
  flex: '0 0 60%',
  maxWidth: '60%',
  marginTop: '40px',
  '@media': {
    '(max-width: 1199px)': {
      flex: '0 0 100%',
      maxWidth: '100%',
    },
  },
})

export const infoItem = style({
  flex: '0 0 50%',
  maxWidth: '50%',
  marginBottom: '30px',
  '@media': {
    '(max-width: 767px)': {
      flex: '0 0 100%',
      maxWidth: '100%',
    },
  },
})

export const infoItemP = style({
  fontWeight: 600,
  padding: '10px 0',
  fontSize: '16px',
  color: vars.color.text[900],
  borderBottom: `1px solid ${vars.color.background[50]}`,
})

export const infoItemSpan = style({
  fontWeight: 400,
  color: vars.color.text[700],
  marginLeft: '4px',
  display: 'inline-block',
})

export const buttons = style({
  marginTop: '30px',
})

export const btnMargin = style({
  marginRight: '15px',
  marginTop: '10px',
})

export const skills = style({
  flex: '0 0 40%',
  maxWidth: '40%',
  marginTop: '40px',
  '@media': {
    '(max-width: 1199px)': {
      flex: '0 0 100%',
      maxWidth: '100%',
      marginTop: '30px',
    },
  },
})

export const skillsItem = style({
  flex: '0 0 100%',
  maxWidth: '100%',
  marginBottom: '25px',
})

export const skillsItemH5 = style({
  lineHeight: '40px',
  fontWeight: 600,
  fontSize: '16px',
  color: vars.color.text[900],
  textTransform: 'capitalize',
  margin: 0,
})

export const progress = style({
  background: vars.color.background[50],
  height: '7px',
  borderRadius: '4px',
  width: '100%',
  position: 'relative',
})

export const progressIn = style({
  position: 'absolute',
  left: 0,
  top: 0,
  height: '100%',
  borderRadius: '4px',
  background: vars.color.skin,
})

export const skillPercent = style({
  position: 'absolute',
  right: 0,
  color: vars.color.text[900],
  top: '-40px',
  fontWeight: 400,
  lineHeight: '40px',
})

export const education = style({
  flex: '0 0 50%',
  maxWidth: '50%',
  marginTop: '30px',
  '@media': {
    '(max-width: 991px)': {
      flex: '0 0 100%',
      maxWidth: '100%',
    },
  },
})

export const experience = style({
  flex: '0 0 50%',
  maxWidth: '50%',
  marginTop: '30px',
  '@media': {
    '(max-width: 991px)': {
      flex: '0 0 100%',
      maxWidth: '100%',
    },
  },
})

export const title = style({
  fontSize: '24px',
  marginBottom: '30px',
  fontWeight: 700,
  color: vars.color.text[900],
})

export const timelineBox = style({
  flex: '0 0 100%',
  maxWidth: '100%',
})

export const timeline = style({
  background: vars.color.background[100],
  padding: '30px 15px',
  border: `1px solid ${vars.color.background[50]}`,
  borderRadius: '10px',
  width: '100%',
  position: 'relative',
})

export const timelineItem = style({
  position: 'relative',
  paddingLeft: '37px',
  paddingBottom: '50px',
  ':last-child': {
    paddingBottom: 0,
  },
  '::before': {
    content: '""',
    width: '1px',
    position: 'absolute',
    height: '100%',
    left: '7px',
    top: 0,
    backgroundColor: vars.color.skin,
  },
})

export const circleDot = style({
  position: 'absolute',
  left: 0,
  top: 0,
  height: '15px',
  width: '15px',
  borderRadius: '50%',
  backgroundColor: vars.color.skin,
})

export const timelineDate = style({
  fontSize: '14px',
  fontWeight: 400,
  marginBottom: '12px',
  color: vars.color.text[700],
})

export const timelineTitle = style({
  fontWeight: 700,
  fontSize: '18px',
  marginBottom: '15px',
  textTransform: 'capitalize',
  color: vars.color.text[900],
})

export const timelineText = style({
  lineHeight: '25px',
  fontSize: '16px',
  textAlign: 'justify',
  color: vars.color.text[700],
})
