import { vars } from '@styles/theme.css'
import { globalStyle, style } from '@vanilla-extract/css'

const canAnimate = '(prefers-reduced-motion: no-preference)'

export const storyCardQuery = `${canAnimate} and (min-width: 1100px)`

export const STORY_BRACKET_SIZE = 80

export const storyPage = style({
  position: 'relative',
  minHeight: '100svh',
  '@media': {
    // Each page sticks once its end is reached, so the next one rises over it like a card.
    // useStoryMotion sets the offset from the page height.
    [storyCardQuery]: {
      position: 'sticky',
      top: 'var(--stick-top, 0)',
    },
  },
})

export const storyPageInner = style({
  position: 'relative',
  minHeight: '100svh',
  overflow: 'clip',
  transformOrigin: '50% 100%',
  '@media': {
    [storyCardQuery]: {
      borderRadius: '32px 32px 0 0',
      boxShadow: '0 -24px 48px rgba(15, 23, 42, 0.16)',
    },
    // Without the card slide, a plain line marks where one page ends and the next begins.
    '(max-width: 1099px), (prefers-reduced-motion: reduce)': {
      borderTop: `1px solid color-mix(in srgb, ${vars.color.skin} 40%, transparent)`,
    },
  },
  selectors: {
    [`${storyPage}:first-child > &`]: {
      borderRadius: 0,
      boxShadow: 'none',
      borderTop: 'none',
    },
  },
})

export const storyPageDim = style({
  position: 'absolute',
  inset: 0,
  background: '#000',
  opacity: 0,
  pointerEvents: 'none',
  zIndex: 5,
})

export const storyDots = style({
  position: 'absolute',
  zIndex: -1,
})

// Pages rise in once when first seen. Home has its own scene, so it is left out.
const unseen = `${storyPage}:not(:first-child):not([data-seen]) .container > *`
const content = `${storyPage}:not(:first-child) .container > *`

globalStyle(content, {
  '@media': {
    [canAnimate]: {
      transition:
        'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 700ms cubic-bezier(0.22, 1, 0.36, 1)',
    },
  },
})

globalStyle(unseen, {
  '@media': {
    [canAnimate]: {
      opacity: 0,
      transform: 'translateY(32px)',
    },
  },
})

globalStyle(`${storyPage}:not(:first-child) .container > :nth-child(2)`, {
  transitionDelay: '100ms',
})

globalStyle(`${storyPage}:not(:first-child) .container > :nth-child(n + 3)`, {
  transitionDelay: '200ms',
})

// The one frame that travels the story. useStoryFrame moves it with transforms.
export const storyFrame = style({
  position: 'fixed',
  inset: 0,
  // Above the top bar, where it rests on a phone, and below the chat and modals.
  zIndex: 901,
  pointerEvents: 'none',
  opacity: 0,
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      display: 'none',
    },
  },
})

const storyBracket = style({
  position: 'absolute',
  left: 0,
  top: 0,
  width: `${STORY_BRACKET_SIZE}px`,
  height: `${STORY_BRACKET_SIZE}px`,
  borderColor: vars.color.skin,
  borderStyle: 'solid',
  borderWidth: 0,
  transformOrigin: '0 0',
  willChange: 'transform',
})

export const storyBracketStart = style([
  storyBracket,
  {
    borderLeftWidth: '10px',
    borderTopWidth: '10px',
  },
])

export const storyBracketEnd = style([
  storyBracket,
  {
    borderRightWidth: '10px',
    borderBottomWidth: '10px',
  },
])

// Each page's title stays under the bar while its page is read, on a soft glass backing
// so the content scrolling behind it stays out of the way. The frame replaces its underline.
globalStyle(`${storyPage} .section-title`, {
  '@media': {
    [storyCardQuery]: {
      position: 'sticky',
      top: '88px',
      zIndex: 4,
      width: 'fit-content',
      maxWidth: '100%',
      pointerEvents: 'none',
    },
  },
})

globalStyle(`${storyPage} .section-title h2`, {
  width: 'fit-content',
  '@media': {
    [storyCardQuery]: {
      transformOrigin: '0 0',
      isolation: 'isolate',
    },
  },
})

globalStyle(`${storyPage} .section-title h2::before`, {
  '@media': {
    [storyCardQuery]: {
      inset: '-8px -12px',
      top: '-8px',
      width: 'auto',
      height: 'auto',
      zIndex: -1,
      borderRadius: '12px',
      background: `color-mix(in srgb, ${vars.color.background[900]} 70%, transparent)`,
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
    },
  },
})

globalStyle(`${storyPage} .section-title h2::after`, {
  '@media': {
    [storyCardQuery]: {
      display: 'none',
    },
  },
})
