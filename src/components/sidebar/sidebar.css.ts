import { vars } from '@styles/theme.css'
import { style } from '@vanilla-extract/css'

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

export const mobileBackdrop = style({
  display: 'none',
  '@media': {
    '(max-width: 1199px)': {
      display: 'block',
      position: 'fixed',
      inset: 0,
      background: 'rgba(15, 23, 42, 0.32)',
      zIndex: 999,
      border: 'none',
      margin: 0,
      padding: 0,
      cursor: 'pointer',
    },
  },
})

export const asideContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '28px',
  width: '100%',
  height: '100%',
  '@media': {
    '(max-width: 767px)': {
      maxWidth: '360px',
      margin: '0 auto',
    },
  },
})

export const logo = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px',
  paddingTop: '10px',
})

export const logoA = style({
  color: vars.color.text[700],
  fontWeight: 700,
  padding: '14px 18px',
  fontSize: '28px',
  letterSpacing: '4px',
  position: 'relative',
  alignSelf: 'center',
  textAlign: 'center',
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

export const logoSpan = style({
  fontFamily: vars.font.family.script,
  fontSize: '38px',
})

export const languageSwitcher = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
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
  display: 'none',
  '@media': {
    '(max-width: 1199px)': {
      display: 'inline-flex',
      position: 'fixed',
      top: '20px',
      left: '20px',
      height: '46px',
      width: '46px',
      border: `1px solid ${vars.color.skin}66`,
      borderRadius: '14px',
      background: vars.color.background[100],
      color: vars.color.skin,
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      zIndex: 1001,
      boxShadow: '0 20px 40px rgba(15, 23, 42, 0.14)',
      transition:
        'transform 0.25s ease, background 0.25s ease, color 0.25s ease, border-color 0.25s ease',
      selectors: {
        '&:hover': {
          background: vars.color.skin + '10',
          borderColor: vars.color.skin,
        },
      },
    },
  },
})

export const navTogglerHidden = style({
  '@media': {
    '(max-width: 1199px)': {
      opacity: 0,
      visibility: 'hidden',
      pointerEvents: 'none',
      transform: 'translateY(-8px)',
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
  transition:
    'background 0.25s ease, color 0.25s ease, border-color 0.25s ease, transform 0.25s ease',
  selectors: {
    '&:hover': {
      transform: 'translateX(2px)',
      background: vars.color.background[900],
      borderColor: vars.color.background[50],
    },
  },
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
