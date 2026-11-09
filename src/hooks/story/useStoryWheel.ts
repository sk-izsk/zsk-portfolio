import { storyCardQuery } from '@components/story/story.css'
import { getStoryTops } from '@utils/storyScroll'
import { getWheelLanding } from '@utils/storyWheel'
import { useEffect, type RefObject } from 'react'

const LINE_PX = 16
// The beat the page holds before it starts to rise, and how long a smooth scroll takes to land.
const GATE_PAUSE_MS = 380
const SETTLE_MS = 450

// A notched mouse wheel reports whole notches of 120. Trackpads and touch scroll smoothly on
// their own, and are left alone.
const isNotchedWheel = (event: WheelEvent & { wheelDeltaY?: number }) => {
  const notch = event.wheelDeltaY ?? 0

  return event.deltaX === 0 && (event.deltaMode === 1 || (notch !== 0 && notch % 120 === 0))
}

// Whether something under the pointer, like a chat or a list, should take the wheel itself.
const isScrolledInside = (event: WheelEvent) => {
  let element = event.target instanceof Element ? event.target : null

  while (element && element !== document.documentElement) {
    const { overflowY } = getComputedStyle(element)
    const canScroll = /auto|scroll/.test(overflowY) && element.scrollHeight > element.clientHeight
    const atEdge =
      event.deltaY < 0
        ? element.scrollTop <= 0
        : element.scrollTop + element.clientHeight >= element.scrollHeight - 1

    if (canScroll && !atEdge) {
      return true
    }

    element = element.parentElement
  }

  return false
}

/**
 * With a mouse wheel, the next page waits a beat where it would start to rise, and then rises
 * in softer steps. Without this each notch throws it over the page before it.
 */
export const useStoryWheel = (storyRef: RefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    let target = 0
    let lockedUntil = 0
    let settlesAt = 0

    // The browser's own smooth scroll runs with the page's scrolling, so the sticky pages and
    // what is tied to them stay in step. A tween moving it from script would trail behind.
    const stop = () => {
      if (performance.now() < settlesAt) {
        settlesAt = 0
        window.scrollTo({ top: window.scrollY, behavior: 'instant' })
      }
    }

    const onWheel = (event: WheelEvent) => {
      if (
        event.ctrlKey ||
        !window.matchMedia(storyCardQuery).matches ||
        !isNotchedWheel(event) ||
        isScrolledInside(event)
      ) {
        return
      }

      // The beat after hitting a gate swallows the wheel, which is the resistance.
      if (performance.now() < lockedUntil) {
        event.preventDefault()
        return
      }

      const from = performance.now() < settlesAt ? target : window.scrollY
      const delta = event.deltaMode === 1 ? event.deltaY * LINE_PX : event.deltaY
      const tops = getStoryTops(storyRef.current)
      const gates = tops.slice(1).map((top) => top - window.innerHeight)
      const landing = getWheelLanding(from, delta, gates, window.innerHeight)

      if (!landing) {
        stop()
        return
      }

      event.preventDefault()

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight

      target = Math.min(Math.max(landing.to, 0), maxScroll)

      if (landing.isGate) {
        lockedUntil = performance.now() + GATE_PAUSE_MS
      }

      settlesAt = performance.now() + SETTLE_MS
      window.scrollTo({ top: target, behavior: 'smooth' })
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    // Anything else that moves the page, like the keys, a link or the scrollbar, takes over.
    window.addEventListener('keydown', stop)
    window.addEventListener('pointerdown', stop)

    return () => {
      stop()
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', stop)
      window.removeEventListener('pointerdown', stop)
    }
  }, [storyRef])
}
