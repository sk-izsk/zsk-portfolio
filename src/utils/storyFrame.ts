// A place for the frame to be, in viewport coordinates. `size` is the length of a bracket's arms.
export interface FrameSpot {
  left: number
  top: number
  right: number
  bottom: number
  size: number
}

// Where the frame belongs at a scroll position. A spot can depend on the scroll position
// when it follows something that scrolls with the page.
export interface FrameStop {
  at: number
  spot: (scrollY: number) => FrameSpot
}

// A stretch of scrolling where the frame sits still. `path` is the nav link it sits on, if any.
export interface FrameHold {
  from: number
  to: number
  path: string | null
}

// Beats of the home scene timeline, which the frame's first stops are timed against.
export const HOME_SCENE_BEATS = {
  headlineArrive: 1,
  headlineLeave: 1.4,
  stageArrive: 2.4,
  length: 5,
}

const smoothstep = (progress: number) => progress * progress * (3 - 2 * progress)

const mix = (from: number, to: number, amount: number) => from + (to - from) * amount

export const getSpotAt = (stops: FrameStop[], scrollY: number): FrameSpot | null => {
  const first = stops[0]
  const last = stops[stops.length - 1]

  if (!first || !last) {
    return null
  }

  if (scrollY <= first.at) {
    return first.spot(scrollY)
  }

  const nextIndex = stops.findIndex((stop) => stop.at > scrollY)
  const next = stops[nextIndex]
  const previous = stops[nextIndex - 1]

  if (!next || !previous) {
    return last.spot(scrollY)
  }

  const from = previous.spot(scrollY)
  const to = next.spot(scrollY)
  const amount = smoothstep((scrollY - previous.at) / (next.at - previous.at))

  return {
    left: mix(from.left, to.left, amount),
    top: mix(from.top, to.top, amount),
    right: mix(from.right, to.right, amount),
    bottom: mix(from.bottom, to.bottom, amount),
    size: mix(from.size, to.size, amount),
  }
}

export const getLandedHold = (holds: FrameHold[], scrollY: number) =>
  holds.find((hold) => scrollY >= hold.from && scrollY <= hold.to) ?? null
