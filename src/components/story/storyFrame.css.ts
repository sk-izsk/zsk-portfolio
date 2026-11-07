import { vars } from '@styles/theme.css'
import { style } from '@vanilla-extract/css'

export const STORY_BRACKET_SIZE = 80

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
