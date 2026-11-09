import { vars } from '@styles/theme.css'
import { globalStyle, style } from '@vanilla-extract/css'

const canAnimate = '(prefers-reduced-motion: no-preference)'

export const storyCardQuery = `${canAnimate} and (min-width: 1100px)`

export const STORY_CARD_RADIUS = 32

export const storyPage = style({
  position: 'relative',
  minHeight: '100svh',
  '@media': {
    // Each page sticks once its end is reached, so the next one rises over it like a card.
    // useStoryMotion sets the offset from the page height.
    [storyCardQuery]: {
      position: 'sticky',
      top: 'var(--stick-top, 0)',
      selectors: {
        // A shadow along the top edge only. One around a whole page is expensive to repaint.
        '&:not(:first-child)::before': {
          content: '""',
          position: 'absolute',
          left: 0,
          right: 0,
          top: '-32px',
          height: '32px',
          background: 'linear-gradient(transparent, rgba(15, 23, 42, 0.14))',
          pointerEvents: 'none',
        },
      },
    },
  },
})

export const storyPageInner = style({
  position: 'relative',
  minHeight: '100svh',
  overflow: 'clip',
  '@media': {
    [storyCardQuery]: {
      borderRadius: `${STORY_CARD_RADIUS}px ${STORY_CARD_RADIUS}px 0 0`,
    },
    // Without the card slide, a plain line marks where one page ends and the next begins.
    '(max-width: 1099px), (prefers-reduced-motion: reduce)': {
      borderTop: `1px solid color-mix(in srgb, ${vars.color.skin} 40%, transparent)`,
    },
  },
  selectors: {
    [`${storyPage}:first-child > &`]: {
      borderRadius: 0,
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

// One repeating dot background per page, far cheaper to paint than a masked SVG layer each.
globalStyle(`${storyPage} .section`, {
  backgroundImage: `radial-gradient(circle, color-mix(in srgb, ${vars.color.skin} 30%, transparent) 1.5px, transparent 1.5px)`,
  backgroundSize: '16px 16px',
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
