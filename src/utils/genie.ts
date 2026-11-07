export interface GenieBox {
  left: number
  top: number
  width: number
  height: number
}

export interface GeniePoint {
  x: number
  y: number
}

// How far apart the rows are in time. Higher values pour the window out more slowly.
const ROW_SPREAD = 0.9
// A row narrows ahead of falling, which is what bends the window into a funnel.
const NARROW_LEAD = 1.7
const COLLAPSED_SCALE = 0.04
const MIN_ROW_SCALE = 0.001
const FADE_FROM = 0.92

const smoothstep = (progress: number) => progress * progress * (3 - 2 * progress)

const clamp = (value: number) => Math.min(Math.max(value, 0), 1)

const roundScale = (value: number) => Math.round(value * 1000) / 1000

/**
 * Keyframes for one horizontal row of a window being poured into `target`, from the window at
 * rest to fully collapsed. The rows nearest the target leave first, so together they curve.
 *
 * Rows are placed by their edges, and each spans from its top edge to the next row's. That keeps
 * the window one continuous surface however far it has squeezed, with no gaps between the rows.
 */
export const getGenieKeyframes = (
  box: GenieBox,
  target: GeniePoint,
  rowIndex: number,
  rowCount: number,
  frameCount: number,
): Keyframe[] => {
  const rowHeight = box.height / rowCount
  const rowCenterY = box.top + rowHeight * (rowIndex + 0.5)
  const offsetX = target.x - (box.left + box.width / 2)
  const isTargetAbove = target.y < box.top + box.height / 2

  const getProgress = (overall: number, position: number) =>
    clamp(overall * (1 + ROW_SPREAD) - (isTargetAbove ? position : 1 - position) * ROW_SPREAD)

  const getEdgeY = (overall: number, position: number) => {
    const restY = box.top + box.height * position

    return restY + (target.y - restY) * smoothstep(getProgress(overall, position))
  }

  return Array.from({ length: frameCount + 1 }, (_, frame) => {
    const overall = frame / frameCount
    const topEdge = getEdgeY(overall, rowIndex / rowCount)
    const bottomEdge = getEdgeY(overall, (rowIndex + 1) / rowCount)
    const narrow = smoothstep(
      clamp(getProgress(overall, (rowIndex + 0.5) / rowCount) * NARROW_LEAD),
    )
    const scaleX = roundScale(1 - narrow * (1 - COLLAPSED_SCALE))
    const scaleY = roundScale(Math.max((bottomEdge - topEdge) / rowHeight, MIN_ROW_SCALE))
    const translateY = (topEdge + bottomEdge) / 2 - rowCenterY
    const opacity = overall < FADE_FROM ? 1 : (1 - overall) / (1 - FADE_FROM)

    return {
      transform: `translate(${offsetX * narrow}px, ${translateY}px) scale(${scaleX}, ${scaleY})`,
      opacity,
    }
  })
}
