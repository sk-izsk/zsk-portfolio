import { vars } from '@styles/theme.css'
import { globalStyle, keyframes, style } from '@vanilla-extract/css'

const pulse = keyframes({
  '0%, 80%, 100%': {
    opacity: 0.35,
    transform: 'translateY(0)',
  },
  '40%': {
    opacity: 1,
    transform: 'translateY(-3px)',
  },
})

export const askAiContainer = style({
  maxWidth: '1040px',
})

export const shell = style({
  height: 'calc(100vh - 170px)',
  minHeight: '620px',
  display: 'grid',
  gridTemplateRows: 'auto minmax(0, 1fr)',
  gap: '16px',
  '@media': {
    '(max-width: 1199px)': {
      height: 'auto',
      minHeight: 'calc(100dvh - 150px)',
    },
  },
})

export const hero = style({
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gap: '14px',
  alignItems: 'center',
  padding: '12px 16px',
  border: `1px solid ${vars.color.background[50]}`,
  borderRadius: '8px',
  background: `linear-gradient(135deg, ${vars.color.background[100]} 0%, ${vars.color.background[900]} 100%)`,
  '@media': {
    '(max-width: 767px)': {
      gridTemplateColumns: '1fr',
      padding: '12px',
    },
  },
})

export const eyebrow = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  color: vars.color.skin,
  fontSize: '13px',
  fontWeight: 700,
  textTransform: 'uppercase',
  marginBottom: '4px',
})

export const heroTitle = style({
  color: vars.color.text[900],
  fontSize: '20px',
  lineHeight: 1.15,
  fontWeight: 800,
  marginBottom: '4px',
})

export const heroBody = style({
  color: vars.color.text[700],
  maxWidth: '620px',
  fontSize: '13px',
  lineHeight: 1.45,
})

export const meter = style({
  minWidth: '120px',
  padding: '8px 10px',
  borderRadius: '8px',
  border: `1px solid ${vars.color.skin}55`,
  background: vars.color.skin + '12',
  color: vars.color.text[900],
})

export const meterLabel = style({
  color: vars.color.text[700],
  fontSize: '12px',
  fontWeight: 700,
  textTransform: 'uppercase',
})

export const meterValue = style({
  display: 'block',
  color: vars.color.skin,
  fontSize: '22px',
  fontWeight: 800,
  lineHeight: 1,
  marginTop: '6px',
})

export const meterReset = style({
  display: 'block',
  color: vars.color.text[700],
  fontSize: '11px',
  lineHeight: 1.3,
  marginTop: '6px',
})

export const chatPanel = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  minHeight: 0,
  border: `1px solid ${vars.color.background[50]}`,
  borderRadius: '8px',
  background: vars.color.background[100],
  overflow: 'hidden',
})

export const healthOverlay = style({
  position: 'absolute',
  inset: 0,
  zIndex: 2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: vars.color.background[100] + 'ee',
  backdropFilter: 'blur(4px)',
})

export const healthBox = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',
  color: vars.color.text[900],
  border: `1px solid ${vars.color.skin}55`,
  borderRadius: '8px',
  background: vars.color.background[900],
  padding: '14px 16px',
  fontWeight: 700,
})

export const spin = style({
  animation: `${pulse} 0.9s ease-in-out infinite`,
})

export const messages = style({
  flex: 1,
  minHeight: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
  padding: '22px',
  overflowY: 'auto',
  '@media': {
    '(max-width: 767px)': {
      padding: '16px',
    },
  },
})

globalStyle(`${messages}::-webkit-scrollbar`, {
  width: '10px',
})

globalStyle(`${messages}::-webkit-scrollbar-track`, {
  background: vars.color.background[100],
})

globalStyle(`${messages}::-webkit-scrollbar-thumb`, {
  background: vars.color.skin,
  borderRadius: '999px',
  border: `3px solid ${vars.color.background[100]}`,
})

globalStyle(`${messages}::-webkit-scrollbar-thumb:hover`, {
  background: vars.color.skin,
})

globalStyle(`${messages}`, {
  scrollbarColor: `${vars.color.skin} ${vars.color.background[100]}`,
  scrollbarWidth: 'thin',
})

export const emptyState = style({
  margin: 'auto',
  maxWidth: '620px',
  textAlign: 'center',
  color: vars.color.text[700],
})

export const emptyTitle = style({
  color: vars.color.text[900],
  fontSize: '24px',
  fontWeight: 800,
  marginBottom: '8px',
})

export const promptGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '10px',
  marginTop: '22px',
  '@media': {
    '(max-width: 767px)': {
      gridTemplateColumns: '1fr',
    },
  },
})

export const promptButton = style({
  minHeight: '52px',
  border: `1px solid ${vars.color.background[50]}`,
  borderRadius: '8px',
  background: vars.color.background[900],
  color: vars.color.text[900],
  cursor: 'pointer',
  padding: '12px 14px',
  textAlign: 'left',
  font: 'inherit',
  transition: 'border-color 0.2s ease, color 0.2s ease, transform 0.2s ease',
  ':hover': {
    borderColor: vars.color.skin,
    color: vars.color.skin,
    transform: 'translateY(-1px)',
  },
})

export const messageRow = style({
  display: 'flex',
  gap: '12px',
  alignItems: 'flex-start',
})

export const messageRowUser = style({
  flexDirection: 'row-reverse',
})

export const avatar = style({
  flex: '0 0 34px',
  width: '34px',
  height: '34px',
  borderRadius: '8px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: vars.color.skin,
  color: '#fff',
})

export const userAvatar = style({
  background: vars.color.background[50],
  color: vars.color.text[900],
})

export const bubble = style({
  maxWidth: 'min(720px, calc(100% - 46px))',
  color: vars.color.text[700],
})

export const userBubble = style({
  textAlign: 'right',
})

export const messageMeta = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  color: vars.color.text[700],
  fontSize: '12px',
  marginBottom: '5px',
})

export const messageMetaUser = style({
  justifyContent: 'flex-end',
})

export const messageText = style({
  display: 'inline-block',
  padding: '13px 15px',
  borderRadius: '8px',
  background: vars.color.background[900],
  color: vars.color.text[900],
  lineHeight: 1.65,
  whiteSpace: 'pre-wrap',
  overflowWrap: 'anywhere',
})

export const assistantText = style({
  border: `1px solid ${vars.color.background[50]}`,
})

export const userText = style({
  background: vars.color.skin,
  color: '#fff',
})

globalStyle(`${messageText}::selection`, {
  background: vars.color.skin,
  color: '#fff',
})

globalStyle(`${messageMeta}::selection`, {
  background: vars.color.skin,
  color: '#fff',
})

export const sourceDetails = style({
  marginTop: '8px',
  color: vars.color.text[700],
  fontSize: '13px',
})

export const sourceSummary = style({
  cursor: 'pointer',
  color: vars.color.skin,
  fontWeight: 700,
})

export const sourceList = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginTop: '8px',
})

export const sourceTag = style({
  border: `1px solid ${vars.color.background[50]}`,
  borderRadius: '999px',
  padding: '4px 9px',
  color: vars.color.text[700],
})

export const typing = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '15px',
  borderRadius: '8px',
  border: `1px solid ${vars.color.background[50]}`,
  background: vars.color.background[900],
})

export const typingDot = style({
  width: '7px',
  height: '7px',
  borderRadius: '999px',
  background: vars.color.skin,
  animation: `${pulse} 1.15s ease-in-out infinite`,
})

export const typingDotDelayOne = style({
  animationDelay: '0.15s',
})

export const typingDotDelayTwo = style({
  animationDelay: '0.3s',
})

export const composer = style({
  display: 'grid',
  gridTemplateColumns: '1fr 48px',
  gap: '10px',
  padding: '14px',
  borderTop: `1px solid ${vars.color.background[50]}`,
  background: vars.color.background[900],
})

export const input = style({
  width: '100%',
  height: '48px',
  lineHeight: '20px',
  border: `1px solid ${vars.color.background[50]}`,
  borderRadius: '8px',
  background: vars.color.background[100],
  color: vars.color.text[900],
  resize: 'none',
  overflow: 'hidden',
  padding: '13px 14px',
  font: 'inherit',
  ':focus': {
    borderColor: vars.color.skin,
  },
})

export const sendButton = style({
  width: '48px',
  height: '48px',
  border: 'none',
  borderRadius: '8px',
  background: vars.color.skin,
  color: '#fff',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'transform 0.2s ease, opacity 0.2s ease',
  ':hover': {
    transform: 'translateY(-1px)',
  },
  ':disabled': {
    cursor: 'not-allowed',
    opacity: 0.55,
    transform: 'none',
  },
})

export const status = style({
  minHeight: '20px',
  color: vars.color.text[700],
  fontSize: '13px',
  padding: '0 14px 14px',
  background: vars.color.background[900],
})
