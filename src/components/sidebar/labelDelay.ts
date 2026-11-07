import type { CSSProperties } from 'react'

const START_MS = 120
const STEP_MS = 40

// Waits for the sidebar to start opening, then brings the labels in from the top down.
export const getLabelDelayStyle = (index: number) =>
  ({ '--label-delay': `${START_MS + index * STEP_MS}ms` }) as CSSProperties
