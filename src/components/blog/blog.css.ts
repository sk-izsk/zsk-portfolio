import { style } from '@vanilla-extract/css'
import { vars } from '@styles/theme.css'

export const blogContent = style({
  flex: '0 0 100%',
  maxWidth: '100%',
})

export const blogGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 320px))',
  gap: '30px',
  alignItems: 'stretch',
  justifyContent: 'start',
  justifyItems: 'stretch',
  '@media': {
    '(max-width: 991px)': {
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 300px))',
    },
    '(max-width: 767px)': {
      gridTemplateColumns: '1fr',
      justifyItems: 'center',
    },
  },
})

export const blogState = style({
  minHeight: '30vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  color: vars.color.text[700],
  fontSize: '16px',
  borderRadius: '18px',
  border: `1px solid ${vars.color.background[50]}`,
  background: vars.color.background[100],
  padding: '32px 24px',
})

export const blogStateError = style({
  color: vars.color.skin,
})

export const blogCard = style({
  position: 'relative',
  width: '100%',
  maxWidth: '320px',
  minHeight: '100%',
  borderRadius: '22px',
  overflow: 'hidden',
  background: vars.color.background[100],
  border: `1px solid ${vars.color.background[50]}`,
  boxShadow: '0 18px 42px rgba(15, 23, 42, 0.07)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      background: `linear-gradient(180deg, ${vars.color.skin}10 0%, transparent 32%, transparent 100%)`,
      pointerEvents: 'none',
    },
    '&:hover': {
      transform: 'translateY(-6px)',
      boxShadow: '0 24px 56px rgba(15, 23, 42, 0.12)',
    },
    '&:focus-within': {
      boxShadow: '0 24px 56px rgba(15, 23, 42, 0.12)',
    },
  },
})

export const blogCardInner = style({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100%',
})

export const blogCover = style({
  position: 'relative',
  aspectRatio: '16 / 9',
  width: '100%',
  overflow: 'hidden',
  background: `linear-gradient(135deg, ${vars.color.skin}18 0%, ${vars.color.background[50]} 100%)`,
})

export const blogCoverImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
  transition: 'transform 0.45s ease',
  selectors: {
    [`${blogCard}:hover &`]: {
      transform: 'scale(1.05)',
    },
  },
})

export const blogCoverPlaceholder = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'flex-start',
  padding: '24px',
  background: `radial-gradient(circle at top right, ${vars.color.skin}22 0%, transparent 45%), linear-gradient(135deg, ${vars.color.background[50]} 0%, ${vars.color.background[100]} 100%)`,
})

export const blogCoverPlaceholderText = style({
  color: vars.color.text[900],
  fontSize: '13px',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  fontWeight: 700,
})

export const blogBody = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
  padding: '24px',
  flex: 1,
})

export const blogMeta = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '12px',
  alignItems: 'center',
  color: vars.color.text[700],
  fontSize: '13px',
  letterSpacing: '0.02em',
})

export const blogMetaItem = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
})

export const blogMetaIcon = style({
  color: vars.color.skin,
  flexShrink: 0,
})

export const blogTitle = style({
  color: vars.color.text[900],
  fontSize: '24px',
  lineHeight: 1.35,
  fontWeight: 700,
  minHeight: '98px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  '@media': {
    '(max-width: 767px)': {
      minHeight: 'auto',
    },
  },
})

export const blogExcerpt = style({
  color: vars.color.text[700],
  fontSize: '16px',
  lineHeight: 1.75,
  marginBottom: '15px',
  flex: 1,
  minHeight: '170px',
  maxHeight: '170px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 6,
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
      height: '52px',
      pointerEvents: 'none',
      background: `linear-gradient(180deg, transparent 0%, ${vars.color.background[100]} 100%)`,
    },
  },
  '@media': {
    '(max-width: 767px)': {
      minHeight: 'auto',
      maxHeight: 'none',
    },
  },
})

export const blogTags = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
})

export const blogFooter = style({
  marginTop: 'auto',
  paddingTop: '2px',
  position: 'relative',
  zIndex: 2,
})

export const blogReadMore = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  color: vars.color.skin,
  fontSize: '15px',
  fontWeight: 600,
  textDecoration: 'none',
  selectors: {
    '&:focus-visible': {
      outline: `2px solid ${vars.color.skin}`,
      outlineOffset: '4px',
      borderRadius: '6px',
    },
  },
})

export const blogReadMoreIcon = style({
  transition: 'transform 0.25s ease',
  selectors: {
    [`${blogCard}:hover &`]: {
      transform: 'translateX(3px) translateY(-3px)',
    },
  },
})
