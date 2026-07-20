import { style } from '@vanilla-extract/css'
import { vars } from '@styles/theme.css'

export const root = style({
  color: 'inherit',
})

export const inlineRoot = style({
  color: 'inherit',
})

export const paragraph = style({
  margin: 0,
})

export const code = style({
  display: 'inline-block',
  padding: '0.06rem 0.34rem',
  borderRadius: 5,
  background: `color-mix(in srgb, ${vars.color.background[100]} 82%, ${vars.color.background[50]} 18%)`,
  border: `1px solid color-mix(in srgb, ${vars.color.background[50]} 78%, ${vars.color.skin} 22%)`,
  color: `color-mix(in srgb, ${vars.color.skin} 70%, ${vars.color.text[900]} 30%)`,
  fontFamily: '"JetBrains Mono", monospace',
  fontSize: '0.95em',
  lineHeight: 1.4,
  whiteSpace: 'break-spaces',
  wordBreak: 'break-word',
})

export const codeBlock = style({
  margin: 0,
  padding: '0.9rem 1rem',
  borderRadius: 12,
  background: vars.color.background[100],
  border: `1px solid ${vars.color.background[50]}`,
  color: vars.color.text[900],
  overflowX: 'auto',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  fontFamily: '"JetBrains Mono", monospace',
  fontSize: '0.95em',
  lineHeight: 1.6,
})
