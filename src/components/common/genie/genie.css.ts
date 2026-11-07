import { style } from '@vanilla-extract/css'

// playGenie fills this with the rows of the window while it opens or closes.
export const genieLayer = style({
  position: 'fixed',
  inset: 0,
  zIndex: 950,
  pointerEvents: 'none',
})

export const genieRow = style({
  position: 'absolute',
  overflow: 'hidden',
  willChange: 'transform, opacity',
})
