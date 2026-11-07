import { vars } from '@styles/theme.css'
import { globalStyle, style } from '@vanilla-extract/css'

export const sidebarQuery = '(min-width: 1200px)'
// Hiding below the breakpoint, rather than showing above it, keeps the sidebar in tests, where
// media queries never match.
export const belowSidebarQuery = '(max-width: 1199px)'
const canAnimate = '(prefers-reduced-motion: no-preference)'
const curve = 'cubic-bezier(0.22, 1, 0.36, 1)'

const WIDTH = 272
const COLLAPSED_WIDTH = 88
const SLIDE_MS = 400
const LABEL_FADE_MS = 150

export const aside = style({
  position: 'fixed',
  left: 0,
  top: 0,
  zIndex: 30,
  display: 'flex',
  flexDirection: 'column',
  gap: '28px',
  width: `${WIDTH}px`,
  height: '100%',
  padding: '24px 18px 24px 20px',
  overflow: 'hidden',
  background: `linear-gradient(180deg, ${vars.color.background[100]} 0%, ${vars.color.background[50]} 100%)`,
  borderRight: `1px solid ${vars.color.background[50]}`,
  boxShadow: '0 24px 48px rgba(15, 23, 42, 0.08)',
  '@media': {
    [belowSidebarQuery]: {
      display: 'none',
    },
    [canAnimate]: {
      transition: `width ${SLIDE_MS}ms ${curve}`,
    },
  },
  selectors: {
    '&[data-collapsed]': {
      width: `${COLLAPSED_WIDTH}px`,
    },
  },
})

// The page sits beside the sidebar. It changes width at the end of collapsing and at the start of
// expanding, because resizing it along with the slide would lay out the whole story every frame.
globalStyle('.main-content', {
  '@media': {
    [sidebarQuery]: {
      paddingLeft: `${WIDTH}px`,
    },
  },
})

globalStyle('.main-container[data-sidebar-collapsed] .main-content', {
  '@media': {
    [sidebarQuery]: {
      paddingLeft: `${COLLAPSED_WIDTH}px`,
    },
    [`${sidebarQuery} and ${canAnimate}`]: {
      transition: `padding-left 1ms linear ${SLIDE_MS}ms`,
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

const bracketCorner = {
  content: '""',
  position: 'absolute',
  width: '16px',
  height: '16px',
} as const

export const logoLink = style({
  position: 'relative',
  padding: '14px 18px',
  fontSize: '28px',
  fontWeight: 700,
  letterSpacing: '4px',
  whiteSpace: 'nowrap',
  color: vars.color.text[700],
  '::before': {
    ...bracketCorner,
    bottom: 0,
    left: 0,
    borderBottom: `4px solid ${vars.color.skin}`,
    borderLeft: `4px solid ${vars.color.skin}`,
  },
  '::after': {
    ...bracketCorner,
    top: 0,
    right: 0,
    borderTop: `4px solid ${vars.color.skin}`,
    borderRight: `4px solid ${vars.color.skin}`,
  },
  '@media': {
    [canAnimate]: {
      transition: `padding ${SLIDE_MS}ms ${curve}`,
    },
  },
  selectors: {
    '[data-collapsed] &': {
      padding: '10px',
      letterSpacing: 0,
    },
  },
})

export const logoInitial = style({
  fontFamily: vars.font.family.script,
  fontSize: '38px',
})

// Hidden in the icon column, but still holding its place so the links below do not jump.
export const languages = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  '@media': {
    [canAnimate]: {
      transition: `opacity ${LABEL_FADE_MS}ms ease-out, visibility ${LABEL_FADE_MS}ms`,
    },
  },
  selectors: {
    '[data-collapsed] &': {
      opacity: 0,
      visibility: 'hidden',
    },
  },
})

export const languageButton = style({
  padding: 0,
  border: 'none',
  background: 'transparent',
  fontFamily: 'inherit',
  fontSize: '13px',
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: vars.color.text[700],
  cursor: 'pointer',
})

export const languageButtonActive = style({
  color: vars.color.skin,
})

export const languageDivider = style({
  fontSize: '13px',
  fontWeight: 600,
  color: vars.color.text[700],
})

export const nav = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  marginTop: '12px',
})

export const navLink = style({
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
  padding: '14px 16px',
  border: '1px solid transparent',
  borderRadius: '18px',
  overflow: 'hidden',
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: 1.2,
  whiteSpace: 'nowrap',
  color: vars.color.text[900],
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

// The traveling frame marks the current page, so the link itself only takes the theme color.
export const navLinkActive = style({
  color: vars.color.skin,
})

export const navIcon = style({
  flexShrink: 0,
  width: '18px',
  height: '18px',
})

// Labels follow the slide like the phone menu's links: in one after another as it opens, and out
// together before it closes. getLabelDelayStyle sets each one's turn.
export const navLabel = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  '@media': {
    [canAnimate]: {
      transition: `opacity 250ms ease-out, transform 250ms ${curve}`,
      transitionDelay: 'var(--label-delay, 0ms)',
    },
  },
  selectors: {
    '[data-collapsed] &': {
      opacity: 0,
      transform: 'translateX(-12px)',
      transitionDelay: '0ms',
      transitionDuration: `${LABEL_FADE_MS}ms`,
    },
  },
})

// Icon only, centered at the bottom. It takes the theme color while collapsed.
export const collapseButton = style([
  navLink,
  {
    alignSelf: 'center',
    marginTop: 'auto',
    background: 'none',
    color: vars.color.text[700],
    cursor: 'pointer',
    selectors: {
      '[data-collapsed] &': {
        color: vars.color.skin,
      },
    },
  },
])
