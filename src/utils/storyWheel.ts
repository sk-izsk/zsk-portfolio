// A mouse wheel jumps a fixed distance per notch, so the next page would slam over the last one.
// Inside the stretch where a page rises, each notch moves this share of its distance.
export const WHEEL_DAMPING = 0.6

export interface WheelLanding {
  to: number
  // The step ran into the point where the next page starts to rise, and stops there.
  isGate: boolean
}

// Where a wheel step from `from` should land, or null to leave it to the browser.
// `gates` are the scroll positions where a page's end meets the bottom of the screen.
export const getWheelLanding = (
  from: number,
  delta: number,
  gates: number[],
  height: number,
): WheelLanding | null => {
  const isRising = gates.some((gate) =>
    delta > 0 ? from >= gate && from < gate + height : from > gate && from <= gate + height,
  )
  const to = from + (isRising ? delta * WHEEL_DAMPING : delta)
  const gate = gates.find((at) => (from < at && to >= at) || (from > at && to <= at))

  if (gate !== undefined) {
    return { to: gate, isGate: true }
  }

  return isRising ? { to, isGate: false } : null
}
