import { vars } from '@styles/theme.css'
import { keyframes, style } from '@vanilla-extract/css'

const canAnimate = '(prefers-reduced-motion: no-preference)'
const curve = 'cubic-bezier(0.22, 1, 0.36, 1)'

// Keep in step with the 1100px scene breakpoint in the story and home styles.
export const fullBarQuery = '(min-width: 1100px)'
const compactBarQuery = '(max-width: 1099px)'

const linkRise = keyframes({
  '0%': { opacity: 0, transform: 'translateY(24px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
})

const closeTurn = keyframes({
  '0%': { opacity: 0, transform: 'rotate(-90deg)' },
  '100%': { opacity: 1, transform: 'rotate(0deg)' },
})

export const bar = style({
  position: 'fixed',
  top: '16px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 900,
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  maxWidth: 'calc(100vw - 32px)',
  padding: '8px 8px 8px 16px',
  borderRadius: '999px',
  border: `1px solid color-mix(in srgb, ${vars.color.text[900]} 14%, transparent)`,
  // Light caught along the top edge and bouncing off the bottom, which is what reads as glass.
  boxShadow: [
    '0 16px 40px rgba(15, 23, 42, 0.16)',
    'inset 0 1px 0 rgba(255, 255, 255, 0.45)',
    'inset 0 -1px 0 rgba(255, 255, 255, 0.12)',
  ].join(', '),
  '@media': {
    [compactBarQuery]: {
      width: 'calc(100vw - 32px)',
      justifyContent: 'space-between',
    },
    '(prefers-reduced-transparency: reduce)': {
      background: vars.color.background[100],
    },
  },
  selectors: {
    // The frosted body. On its own layer so the bar's contents stay crisp above it.
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      zIndex: -1,
      borderRadius: 'inherit',
      background: `color-mix(in srgb, ${vars.color.background[100]} 55%, transparent)`,
      backdropFilter: 'blur(20px) saturate(180%)',
    },
  },
})

export const logo = style({
  flexShrink: 0,
  fontSize: '16px',
  lineHeight: '24px',
  fontWeight: 600,
  letterSpacing: '0.04em',
  color: vars.color.text[900],
  borderRadius: '8px',
  whiteSpace: 'nowrap',
})

export const logoInitial = style({
  fontFamily: vars.font.family.script,
  fontSize: '24px',
  color: vars.color.skin,
})

export const links = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  '@media': {
    [compactBarQuery]: {
      display: 'none',
    },
  },
})

export const link = style({
  display: 'block',
  padding: '8px 12px',
  borderRadius: '999px',
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: 500,
  whiteSpace: 'nowrap',
  color: vars.color.text[900],
  transition: 'color 300ms ease-out, background-color 300ms ease-out',
  ':hover': {
    backgroundColor: `color-mix(in srgb, ${vars.color.text[900]} 8%, transparent)`,
  },
  ':active': {
    transform: 'scale(0.98)',
  },
})

export const linkActive = style({
  color: vars.color.skin,
  ':hover': {
    backgroundColor: 'transparent',
  },
})

export const currentPage = style({
  flex: 1,
  textAlign: 'center',
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: 500,
  color: vars.color.text[700],
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  '@media': {
    [fullBarQuery]: {
      display: 'none',
    },
  },
})

export const controls = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  flexShrink: 0,
})

export const languages = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '12px',
  lineHeight: '16px',
  color: vars.color.text[700],
})

export const language = style({
  border: 'none',
  background: 'transparent',
  color: vars.color.text[700],
  font: 'inherit',
  fontWeight: 600,
  padding: '4px',
  borderRadius: '4px',
  cursor: 'pointer',
})

export const languageActive = style({
  color: vars.color.skin,
})

const roundButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  flexShrink: 0,
  borderRadius: '999px',
  border: `1px solid color-mix(in srgb, ${vars.color.skin} 40%, transparent)`,
  background: 'transparent',
  color: vars.color.skin,
  cursor: 'pointer',
  transition: 'background-color 300ms ease-out',
  ':hover': {
    backgroundColor: `color-mix(in srgb, ${vars.color.skin} 8%, transparent)`,
  },
  ':active': {
    transform: 'scale(0.98)',
  },
})

export const languageMenu = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  '@media': {
    [compactBarQuery]: {
      display: 'none',
    },
  },
})

export const languageMenuButton = style([roundButton])

const languageMenuIn = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-8px) scale(0.96)' },
  '100%': { opacity: 1, transform: 'translateY(0) scale(1)' },
})

export const languageMenuPanel = style({
  position: 'absolute',
  top: 'calc(100% + 12px)',
  right: 0,
  display: 'grid',
  gap: '4px',
  minWidth: '128px',
  padding: '8px',
  borderRadius: '16px',
  border: `1px solid color-mix(in srgb, ${vars.color.text[900]} 14%, transparent)`,
  background: vars.color.background[100],
  boxShadow: '0 16px 40px rgba(15, 23, 42, 0.16)',
  transformOrigin: '100% 0',
  '@media': {
    [canAnimate]: {
      animation: `${languageMenuIn} 300ms ${curve} both`,
    },
  },
})

export const languageMenuOption = style({
  padding: '8px 12px',
  border: 'none',
  borderRadius: '8px',
  background: 'transparent',
  color: vars.color.text[900],
  fontFamily: 'inherit',
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: 500,
  textAlign: 'left',
  cursor: 'pointer',
  transition: 'background-color 300ms ease-out',
  ':hover': {
    backgroundColor: `color-mix(in srgb, ${vars.color.text[900]} 8%, transparent)`,
  },
})

export const menuButton = style([
  roundButton,
  {
    '@media': {
      [fullBarQuery]: {
        display: 'none',
      },
    },
  },
])

export const menu = style({
  width: '100vw',
  maxWidth: '100vw',
  height: '100dvh',
  maxHeight: '100dvh',
  margin: 0,
  padding: '24px',
  border: 'none',
  color: vars.color.text[900],
  background: `color-mix(in srgb, ${vars.color.background[900]} 92%, transparent)`,
  backdropFilter: 'blur(24px)',
  selectors: {
    '&::backdrop': {
      background: 'transparent',
    },
    '&[open]': {
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
    },
  },
})

export const menuTop = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '16px',
})

export const menuClose = style([
  roundButton,
  {
    '@media': {
      [canAnimate]: {
        animation: `${closeTurn} 500ms ${curve} both`,
      },
    },
  },
])

export const menuLinks = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  flex: 1,
  overflowY: 'auto',
})

export const menuLink = style({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  padding: '12px',
  borderRadius: '16px',
  fontSize: '24px',
  lineHeight: '32px',
  fontWeight: 600,
  color: vars.color.text[900],
  '@media': {
    [canAnimate]: {
      animation: `${linkRise} 500ms ${curve} both`,
    },
  },
})

export const menuLinkActive = style({
  color: vars.color.skin,
  backgroundColor: `color-mix(in srgb, ${vars.color.skin} 12%, transparent)`,
})
