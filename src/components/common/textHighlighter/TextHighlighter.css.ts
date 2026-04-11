import { globalStyle, keyframes, style } from '@vanilla-extract/css'
import { vars } from '../../../styles/theme.css'
import {
  darkColor1Theme,
  darkColor2Theme,
  darkColor3Theme,
  darkColor5Theme,
  darkColor7Theme,
  darkColor9Theme,
} from '../../../styles/themes.css'

const squiggleMask =
  'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 240 28%27 preserveAspectRatio=%27none%27%3E%3Cpath d=%27M2 18 C20 10 38 24 56 16 C74 8 92 22 110 15 C128 9 146 23 164 16 C182 9 200 21 218 14 C226 12 232 14 238 13%27 fill=%27none%27 stroke=%27black%27 stroke-width=%276%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27/%3E%3C/svg%3E")'

// Deepen light/pastel skins so all theme colors (not only blue) read with similar prominence.
const skinMarkerRich = `color-mix(in srgb, ${vars.color.skin} 82%, black)`

const darkThemeSelector = [
  darkColor1Theme,
  darkColor2Theme,
  darkColor3Theme,
  darkColor5Theme,
  darkColor7Theme,
  darkColor9Theme,
]
  .map((themeClass) => `body.${themeClass}`)
  .join(', ')

const markerReveal = keyframes({
  '0%': {
    backgroundSize: '0% 68%',
  },
  '100%': {
    backgroundSize: '100% 68%',
  },
})

const underlineMainDraw = keyframes({
  '0%': {
    opacity: 0,
    transform: 'scaleX(0.1) translateY(1px)',
  },
  '100%': {
    opacity: 0.95,
    transform: 'scaleX(1) translateY(0px)',
  },
})

const underlineSecondDraw = keyframes({
  '0%': {
    opacity: 0,
    transform: 'scaleX(0.1) translateY(1px)',
  },
  '100%': {
    opacity: 0.62,
    transform: 'scaleX(1) translateY(0px)',
  },
})

export const highlighterRoot = style({
  position: 'relative',
  display: 'inline',
  isolation: 'isolate',
  lineHeight: 1.2,
})

export const highlighterText = style({
  position: 'relative',
  zIndex: 1,
  display: 'inline',
  paddingInline: '0.03em',
})

export const highlight = style({
  borderRadius: '0.2em',
  WebkitBoxDecorationBreak: 'clone',
  boxDecorationBreak: 'clone',
  backgroundImage: `
    linear-gradient(
      color-mix(in srgb, ${skinMarkerRich} 36%, transparent),
      color-mix(in srgb, ${skinMarkerRich} 36%, transparent)
    ),
    linear-gradient(
      color-mix(in srgb, ${vars.color.skin} 20%, transparent),
      color-mix(in srgb, ${vars.color.skin} 20%, transparent)
    )
  `,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: '0 88%, 0 84%',
  backgroundSize: '100% 68%, 100% 56%',
  animation: `${markerReveal} 420ms cubic-bezier(0.22, 1, 0.36, 1) both`,
  paddingInline: '0.06em',
})

export const underline = style({
  '::before': {
    content: '""',
    position: 'absolute',
    left: '-0.03em',
    right: '-0.03em',
    bottom: '-0.12em',
    height: '0.3em',
    background: vars.color.skin,
    opacity: 0,
    WebkitMaskImage: squiggleMask,
    maskImage: squiggleMask,
    WebkitMaskSize: '100% 100%',
    maskSize: '100% 100%',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    transformOrigin: 'left center',
    animation: `${underlineSecondDraw} 600ms cubic-bezier(0.22, 1, 0.36, 1) 120ms both`,
    zIndex: -1,
  },
  '::after': {
    content: '""',
    position: 'absolute',
    left: '-0.01em',
    right: '-0.05em',
    bottom: '-0.09em',
    height: '0.28em',
    background: vars.color.skin,
    opacity: 0,
    WebkitMaskImage: squiggleMask,
    maskImage: squiggleMask,
    WebkitMaskSize: '100% 100%',
    maskSize: '100% 100%',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    transformOrigin: 'left center',
    animation: `${underlineMainDraw} 520ms cubic-bezier(0.22, 1, 0.36, 1) both`,
    zIndex: -1,
  },
})

globalStyle(`.${highlight}`, {
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animation: 'none',
    },
  },
})

globalStyle(`${darkThemeSelector} .${highlight}`, {
  backgroundImage: `
    linear-gradient(
      color-mix(in srgb, ${skinMarkerRich} 74%, transparent),
      color-mix(in srgb, ${skinMarkerRich} 74%, transparent)
    ),
    linear-gradient(
      color-mix(in srgb, ${vars.color.skin} 42%, transparent),
      color-mix(in srgb, ${vars.color.skin} 42%, transparent)
    )
  `,
  backgroundPosition: '0 88%, 0 84%',
  backgroundSize: '100% 70%, 100% 58%',
})

globalStyle(`.${underline}::before`, {
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animation: 'none',
      opacity: 0.72,
    },
  },
})

globalStyle(`.${underline}::after`, {
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animation: 'none',
      opacity: 0.95,
    },
  },
})

globalStyle(`.${underline}`, {
  '@media': {
    '(max-width: 767px)': {
      display: 'inline',
    },
  },
})

globalStyle(`.${underline}::before`, {
  '@media': {
    '(max-width: 767px)': {
      display: 'none',
    },
  },
})

globalStyle(`.${underline}::after`, {
  '@media': {
    '(max-width: 767px)': {
      display: 'none',
    },
  },
})

globalStyle(`.${underline} .${highlighterText}`, {
  '@media': {
    '(max-width: 767px)': {
      WebkitBoxDecorationBreak: 'clone',
      boxDecorationBreak: 'clone',
      paddingBottom: '0.1em',
      textDecorationLine: 'underline',
      textDecorationStyle: 'wavy',
      textDecorationColor: vars.color.skin,
      textDecorationThickness: '2px',
      textUnderlineOffset: '0.15em',
    },
  },
})
