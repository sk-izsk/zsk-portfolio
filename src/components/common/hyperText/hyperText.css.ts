import { style } from '@vanilla-extract/css'

export const hyperTextContainer = style({
  // Removed inline-flex to restore baseline layout
})

export const hyperTextChar = style({
  display: 'inline-block',
  whiteSpace: 'pre', // Preserves spaces accurately
})
