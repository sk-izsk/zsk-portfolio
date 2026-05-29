import { keyframes, style } from '@vanilla-extract/css'
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
    marginTop: '44px',
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  },
])

export const githubStatsHeader = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: '16px',
  marginBottom: '6px',
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
  gap: '24px',
})

export const githubStatsBottomGrid = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(320px, 580px)',
  justifyContent: 'start',
  gap: '24px',
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
  minWidth: 0,
  '@media': {
    '(max-width: 767px)': {
      padding: '16px',
    },
  },
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
  minWidth: 0,
})

export const githubStatsImage = style({
  display: 'block',
  width: '100%',
  height: 'auto',
  maxWidth: '100%',
})

export const githubContributionPanel = style({
  position: 'relative',
  borderRadius: '14px',
  background: vars.color.background[100],
  padding: '18px 16px 10px',
  minHeight: '178px',
  overflowX: 'auto',
  '@media': {
    '(max-width: 767px)': {
      padding: '12px 10px 8px',
      minHeight: '172px',
    },
  },
})

export const githubContributionSvg = style({
  display: 'block',
  width: '100%',
  minWidth: '880px',
  height: 'auto',
  '@media': {
    '(max-width: 767px)': {
      minWidth: '640px',
    },
  },
})

const githubLoadingPulse = keyframes({
  '0%': { opacity: 0.45 },
  '50%': { opacity: 0.95 },
  '100%': { opacity: 0.45 },
})

export const githubContributionLoading = style({
  position: 'absolute',
  inset: '18px 16px 10px',
  borderRadius: '14px',
  background: vars.color.background[100],
  border: `1px solid ${vars.color.background[50]}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: vars.color.text[700],
  fontSize: '14px',
  animation: `${githubLoadingPulse} 1.2s ease-in-out infinite`,
  '@media': {
    '(max-width: 767px)': {
      inset: '12px 10px 8px',
      fontSize: '12px',
    },
  },
})

export const githubContributionImage = style({
  display: 'block',
  width: '100%',
  minWidth: 0,
  height: 'auto',
})

export const githubContributionImageHidden = style({
  opacity: 0,
})

export const githubContributionFrame = style({
  position: 'relative',
  width: 'fit-content',
  minWidth: '100%',
  paddingTop: '28px',
  paddingLeft: '34px',
  '@media': {
    '(max-width: 767px)': {
      paddingTop: '20px',
      paddingLeft: '24px',
      minWidth: '560px',
    },
  },
})

export const githubContributionMonths = style({
  position: 'absolute',
  top: 0,
  left: '34px',
  right: 0,
  height: '20px',
  pointerEvents: 'none',
  '@media': {
    '(max-width: 767px)': {
      left: '24px',
      height: '16px',
    },
  },
})

export const githubContributionMonthLabel = style({
  position: 'absolute',
  top: 0,
  fontSize: '11px',
  lineHeight: 1,
  color: vars.color.text[700],
  whiteSpace: 'nowrap',
  '@media': {
    '(max-width: 767px)': {
      fontSize: '11px',
    },
  },
})

export const githubContributionDays = style({
  position: 'absolute',
  top: '28px',
  left: 0,
  width: '28px',
  pointerEvents: 'none',
  '@media': {
    '(max-width: 767px)': {
      top: '20px',
      width: '20px',
    },
  },
})

export const githubContributionDayLabel = style({
  position: 'absolute',
  right: 0,
  transform: 'translateY(-50%)',
  fontSize: '11px',
  lineHeight: 1,
  color: vars.color.text[700],
  whiteSpace: 'nowrap',
  '@media': {
    '(max-width: 767px)': {
      fontSize: '11px',
    },
  },
})

export const githubContributionLegend = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginTop: '10px',
  paddingLeft: '34px',
  fontSize: '11px',
  color: vars.color.text[700],
  '@media': {
    '(max-width: 767px)': {
      gap: '6px',
      marginTop: '8px',
      paddingLeft: '24px',
      fontSize: '11px',
    },
  },
})

export const githubContributionLegendSwatches = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
})

export const githubContributionLegendSwatch = style({
  width: '13px',
  height: '13px',
  borderRadius: '3px',
  border: `1px solid ${vars.color.background[50]}`,
  '@media': {
    '(max-width: 767px)': {
      width: '11px',
      height: '11px',
    },
  },
})

export const githubStatsCardHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '16px',
  marginBottom: '14px',
  '@media': {
    '(max-width: 767px)': {
      flexDirection: 'column',
      alignItems: 'stretch',
      marginBottom: '10px',
    },
  },
})

export const githubStatsSelect = style({
  alignSelf: 'flex-start',
  width: '140px',
  minWidth: '140px',
  '@media': {
    '(max-width: 767px)': {
      alignSelf: 'stretch',
      width: '100%',
      minWidth: '100%',
    },
  },
})

export const githubQuoteBox = style({
  borderRadius: '14px',
  padding: '22px 22px 18px',
  border: `2px solid ${vars.color.skin}`,
  background: vars.color.background[100],
  minHeight: '190px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minWidth: 0,
  '@media': {
    '(max-width: 767px)': {
      minHeight: 'auto',
      padding: '16px',
    },
  },
})

export const githubQuoteText = style({
  fontSize: '18px',
  lineHeight: 1.55,
  color: vars.color.text[900],
  fontStyle: 'italic',
  overflowWrap: 'anywhere',
  '@media': {
    '(max-width: 767px)': {
      fontSize: '15px',
      lineHeight: 1.45,
    },
  },
})

export const githubQuoteAuthor = style({
  marginTop: '20px',
  alignSelf: 'flex-end',
  color: vars.color.skin,
  fontSize: '16px',
  lineHeight: 1.4,
  maxWidth: '100%',
  overflowWrap: 'anywhere',
  textAlign: 'right',
  '@media': {
    '(max-width: 767px)': {
      marginTop: '14px',
      fontSize: '14px',
    },
  },
})

export const githubStatsImageLink = style({
  display: 'block',
  textDecoration: 'none',
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
