import { style } from '@vanilla-extract/css'
import { vars } from '@styles/theme.css'

export const aside = style({
  width: '272px',
  height: '100%',
  background: `linear-gradient(180deg, ${vars.color.background[100]} 0%, ${vars.color.background[50]} 100%)`,
  position: 'fixed',
  left: 0,
  top: 0,
  padding: '24px 18px 24px 20px',
  zIndex: 30,
  display: 'flex',
  flexDirection: 'column',
  gap: '28px',
  borderRight: `1px solid ${vars.color.background[50]}`,
  boxShadow: '0 24px 48px rgba(15, 23, 42, 0.08)',
  backdropFilter: 'blur(18px)',
  transition: 'width 0.35s ease, padding 0.35s ease, left 0.35s ease, transform 0.35s ease',
  '@media': {
    '(max-width: 1199px)': {
      left: '-100%',
      width: 'min(320px, 86vw)',
      padding: '28px 18px 24px 18px',
      zIndex: 1000,
    },
  },
})

export const asideOpen = style({
  '@media': {
    '(max-width: 1199px)': {
      left: 0,
    },
  },
})

export const asideCollapsed = style({
  '@media': {
    '(min-width: 1200px)': {
      width: '96px',
      paddingLeft: '14px',
      paddingRight: '14px',
    },
  },
})

export const logo = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  paddingTop: '10px',
  paddingRight: '56px',
})

export const logoCollapsed = style({
  paddingRight: 0,
  alignItems: 'center',
})

export const logoA = style({
  color: vars.color.text[700],
  fontWeight: 700,
  padding: '14px 18px',
  fontSize: '28px',
  letterSpacing: '4px',
  position: 'relative',
  alignSelf: 'flex-start',
  '::before': {
    content: '""',
    position: 'absolute',
    width: '16px',
    height: '16px',
    borderBottom: `4px solid ${vars.color.skin}`,
    borderLeft: `4px solid ${vars.color.skin}`,
    bottom: 0,
    left: 0,
  },
  '::after': {
    content: '""',
    position: 'absolute',
    width: '16px',
    height: '16px',
    borderTop: `4px solid ${vars.color.skin}`,
    borderRight: `4px solid ${vars.color.skin}`,
    top: 0,
    right: 0,
  },
})

export const logoACompact = style({
  alignSelf: 'center',
  fontSize: '24px',
  letterSpacing: '2px',
  paddingLeft: '16px',
  paddingRight: '16px',
})

export const logoSpan = style({
  fontFamily: vars.font.family.script,
  fontSize: '38px',
})

export const languageSwitcher = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  paddingLeft: '18px',
})

export const languageSwitcherHidden = style({
  display: 'none',
})

export const languageButton = style({
  border: 'none',
  background: 'transparent',
  color: vars.color.text[700],
  fontSize: '13px',
  fontWeight: 700,
  textTransform: 'uppercase',
  cursor: 'pointer',
  padding: 0,
  letterSpacing: '0.08em',
})

export const languageButtonActive = style({
  color: vars.color.skin,
})

export const languageDivider = style({
  color: vars.color.text[700],
  fontSize: '13px',
  fontWeight: 600,
})

export const navToggler = style({
  position: 'absolute',
  top: '20px',
  right: '18px',
  height: '42px',
  width: '42px',
  border: `1px solid ${vars.color.background[50]}`,
  borderRadius: '14px',
  background: vars.color.background[100],
  color: vars.color.text[900],
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'transform 0.25s ease, background 0.25s ease, color 0.25s ease, border-color 0.25s ease',
  selectors: {
    '&:hover': {
      transform: 'translateY(-1px)',
      color: vars.color.skin,
      borderColor: vars.color.skin,
    },
  },
  '@media': {
    '(max-width: 1199px)': {
      position: 'fixed',
      top: '20px',
      left: '20px',
      right: 'auto',
      zIndex: 1001,
      boxShadow: '0 20px 40px rgba(15, 23, 42, 0.14)',
    },
  },
})

export const navTogglerOpen = style({
  '@media': {
    '(max-width: 1199px)': {
      left: 'calc(min(320px, 86vw) - 62px)',
    },
  },
})

export const nav = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  marginTop: '12px',
})

export const navLi = style({
  display: 'block',
})

export const navA = style({
  fontSize: '16px',
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
  color: vars.color.text[900],
  padding: '14px 16px',
  textDecoration: 'none',
  lineHeight: 1.2,
  borderRadius: '18px',
  border: `1px solid transparent`,
  transition: 'background 0.25s ease, color 0.25s ease, border-color 0.25s ease, transform 0.25s ease',
  selectors: {
    '&:hover': {
      transform: 'translateX(2px)',
      background: vars.color.background[900],
      borderColor: vars.color.background[50],
    },
  },
})

export const navACompact = style({
  justifyContent: 'center',
  paddingLeft: '12px',
  paddingRight: '12px',
})

export const navAActive = style({
  color: vars.color.skin,
  background: vars.color.skin + '12',
  borderColor: vars.color.skin + '45',
})

export const navAI = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: '18px',
  height: '18px',
})

export const navLabel = style({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})

export const navLabelHidden = style({
  display: 'none',
})
