import { style } from '@vanilla-extract/css'
import { vars } from '@styles/theme.css'

export const projectGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 300px))',
  justifyContent: 'start',
  justifyItems: 'stretch',
  gap: '30px',
  '@media': {
    '(max-width: 991px)': {
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 280px))',
    },
    '(max-width: 767px)': {
      gridTemplateColumns: '1fr',
      justifyItems: 'center',
    },
  },
})

export const projectHeading = style({
  flex: '0 0 100%',
  maxWidth: '100%',
})

export const projectToolbar = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '20px',
  marginBottom: '40px',
  '@media': {
    '(max-width: 767px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '16px',
    },
  },
})

export const projectFilter = style({
  width: '100%',
  maxWidth: '300px',
  flexShrink: 0,
  '@media': {
    '(max-width: 767px)': {
      width: 'min(300px, 100%)',
      margin: '0 auto',
    },
  },
})

export const projectFilterBar = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  width: '100%',
  justifyContent: 'flex-end',
  '@media': {
    '(max-width: 767px)': {
      flexDirection: 'column',
      alignItems: 'stretch',
    },
  },
})

export const projectFilterControl = style({
  width: '100%',
  maxWidth: '300px',
  flexShrink: 0,
  '@media': {
    '(max-width: 767px)': {
      width: 'min(300px, 100%)',
      maxWidth: '100%',
      margin: '0 auto',
    },
  },
})

export const projectItem = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '300px',
  height: '100%',
  margin: 0,
  '@media': {
    '(max-width: 767px)': {
      maxWidth: 'min(300px, 100%)',
    },
  },
})

export const projectItemInner = style({
  backgroundColor: vars.color.background[100],
  border: `1px solid ${vars.color.background[50]}`,
  borderRadius: '22px',
  padding: '30px 10px',
  textAlign: 'center',
  boxShadow: '0 18px 42px rgba(15, 23, 42, 0.07)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  minHeight: '700px',
  ':hover': {
    transform: 'translateY(-6px)',
    boxShadow: '0 24px 56px rgba(15, 23, 42, 0.12)',
  },
  '@media': {
    '(max-width: 991px)': {
      minHeight: '660px',
    },
    '(max-width: 767px)': {
      minHeight: '620px',
    },
  },
})

export const projectImage = style({
  marginBottom: '20px',
})

export const projectImageImg = style({
  width: '100%',
  borderRadius: '16px',
  display: 'block',
  margin: '0 auto 20px',
  transition: 'all 0.3s ease',
})

export const projectImageImgHover = style({
  selectors: {
    [`${projectItemInner}:hover &`]: {
      transform: 'scale(1.05)',
      borderRadius: '10px',
    },
  },
})

export const projectInfo = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  alignItems: 'center',
  paddingBottom: '15px',
})

export const projectInfoText = style({
  fontSize: '14px',
  color: vars.color.text[700],
  margin: 0,
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
})

export const projectInfoIcon = style({
  color: vars.color.skin,
  paddingRight: '2px',
})

export const projectTitle = style({
  fontSize: '18px',
  marginBottom: '15px',
  color: vars.color.text[900],
  fontWeight: 700,
  textTransform: 'capitalize',
  lineHeight: 1.5,
  minHeight: '81px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
})

export const projectContent = style({
  fontSize: '16px',
  color: vars.color.text[700],
  lineHeight: '25px',
  marginBottom: '15px',
  flex: 1,
  minHeight: '225px',
  maxHeight: '225px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 9,
  WebkitBoxOrient: 'vertical',
  position: 'relative',
  paddingBottom: '0',
  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: '56px',
      pointerEvents: 'none',
      background: `linear-gradient(180deg, transparent 0%, ${vars.color.background[100]} 100%)`,
    },
  },
})

export const projectTags = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  justifyContent: 'center',
  marginTop: 'auto',
  marginBottom: '18px',
})

export const projectActions = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  minHeight: '30px',
})

export const projectActionsSplit = style({
  justifyContent: 'space-between',
})

export const projectActionsCenter = style({
  justifyContent: 'center',
})

export const projectTag = style({
  padding: '5px 10px',
  borderRadius: '999px',
  fontSize: '12px',
  fontWeight: 500,
  lineHeight: 1.2,
  backgroundColor: vars.color.skin + '15',
  color: vars.color.skin,
  border: `1px solid ${vars.color.skin}`,
  transition: 'all 0.3s ease',
  cursor: 'default',
  ':hover': {
    backgroundColor: vars.color.skin,
    color: 'white',
  },
})

export const projectLink = style({
  fontSize: '16px',
  color: vars.color.skin,
  lineHeight: '25px',
  textDecoration: 'none',
  cursor: 'pointer',
})
