import { sidebarQuery } from '@components/sidebar/sidebar.css'
import { vars } from '@styles/theme.css'
import { style } from '@vanilla-extract/css'

// The phone and tablet bar. Desktop has the sidebar instead.
export const bar = style({
  position: 'fixed',
  top: '16px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 900,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
  width: 'calc(100vw - 32px)',
  padding: '8px 8px 8px 16px',
  borderRadius: '999px',
  border: '1px solid rgba(255, 255, 255, 0.4)',
  // Keeps the labels readable over whatever scrolls behind the glass.
  textShadow: `0 0 8px ${vars.color.background[100]}`,
  // Light caught along the top edge and bouncing off the bottom, which is what reads as glass.
  boxShadow: [
    '0 12px 32px rgba(15, 23, 42, 0.14)',
    'inset 0 1px 1px rgba(255, 255, 255, 0.7)',
    'inset 0 -1px 1px rgba(255, 255, 255, 0.25)',
    'inset 0 0 12px rgba(255, 255, 255, 0.12)',
  ].join(', '),
  '@media': {
    [sidebarQuery]: {
      display: 'none',
    },
    '(prefers-reduced-transparency: reduce)': {
      background: vars.color.background[100],
    },
  },
  selectors: {
    // The glass body, on its own layer so the bar's contents stay crisp above it.
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      zIndex: -1,
      borderRadius: 'inherit',
      background: `color-mix(in srgb, ${vars.color.background[100]} 35%, transparent)`,
      backdropFilter: 'blur(10px) saturate(170%)',
    },
    // A soft sheen from above, brightest at the top edge.
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      zIndex: -1,
      borderRadius: 'inherit',
      background:
        'linear-gradient(180deg, rgba(255, 255, 255, 0.3), transparent 45%, rgba(255, 255, 255, 0.08))',
      pointerEvents: 'none',
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
})

export const controls = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  flexShrink: 0,
})

export const roundButton = style({
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
