import { style } from '@vanilla-extract/css'
import { vars } from '@styles/theme.css'

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

export const infoItemSpanLink = style({
  fontWeight: 400,
  color: vars.color.skin,
  marginLeft: '4px',
  display: 'inline-block',
  textDecoration: 'none',
  cursor: 'pointer',
})

export const buttons = style({
  marginTop: '30px',
})

export const buttonsCompactTop = style({
  marginTop: '24px',
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

export const githubStatsSection = style([
  {
    flex: '0 0 100%',
    maxWidth: '100%',
    marginTop: '36px',
    display: 'flex',
    flexDirection: 'column',
    gap: '22px',
  },
])

export const githubStatsHeader = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: '16px',
  marginBottom: '2px',
  '@media': {
    '(max-width: 767px)': {
      flexDirection: 'column',
      alignItems: 'stretch',
    },
  },
})

export const githubStatsEyebrow = style({
  margin: 0,
  fontSize: '13px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: vars.color.skin,
  fontWeight: 700,
})

export const githubStatsTitle = style({
  margin: '6px 0 0',
  fontSize: '24px',
  lineHeight: 1.2,
  color: vars.color.text[900],
})

export const githubStatsDescription = style({
  margin: '8px 0 0',
  fontSize: '14px',
  lineHeight: '22px',
  color: vars.color.text[700],
})

export const githubStatsLink = style({
  flexShrink: 0,
  alignSelf: 'flex-start',
})

export const githubStatsGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '18px',
})

export const githubStatsBottomGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '18px',
  '@media': {
    '(max-width: 991px)': {
      gridTemplateColumns: '1fr',
    },
  },
})

export const githubStatsCard = style({
  background: vars.color.background[100],
  border: `1px solid ${vars.color.background[50]}`,
  borderRadius: '18px',
  padding: '18px',
  boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)',
})

export const githubStatsCardTitle = style({
  margin: '0 0 12px',
  fontSize: '16px',
  lineHeight: 1.4,
  color: vars.color.text[900],
})

export const githubStatsMedia = style({
  width: '100%',
  overflow: 'hidden',
  borderRadius: '14px',
  background: vars.color.background[100],
})

export const githubStatsImageLink = style({
  display: 'block',
  textDecoration: 'none',
})

export const githubStatsImage = style({
  display: 'block',
  width: '100%',
  height: 'auto',
  borderRadius: '12px',
})

export const githubStatsInlineSvg = style({
  width: '100%',
  lineHeight: 0,
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

export const progressInWidth = Array.from({ length: 101 }, (_, value) =>
  style({
    width: `${value}%`,
  }),
)

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
  display: 'flex',
  alignItems: 'center',
  lineHeight: 1.4,
})

export const timelineDateIcon = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: '14px',
  height: '14px',
  marginRight: '8px',
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

export const readMoreTrigger = style({
  marginTop: '12px',
  display: 'flex',
  justifyContent: 'flex-start',
})
