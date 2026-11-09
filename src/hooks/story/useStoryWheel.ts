import { storyCardQuery } from '@components/story/story.css'
import { getStoryTops } from '@utils/storyScroll'
import { getWheelLanding } from '@utils/storyWheel'
import gsap from 'gsap'
import { useEffect, type RefObject } from 'react'

const LINE_PX = 16
// The beat the page holds before it starts to rise, and how long a step takes to settle.
const GATE_PAUSE_MS = 380
const GATE_GLIDE_S = 0.22
const STEP_GLIDE_S = 0.5

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
    const position = { y: 0 }
    let target = 0
    let lockedUntil = 0
    let tween: gsap.core.Tween | null = null

    const stop = () => {
      tween?.kill()
      tween = null
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

      const from = tween?.isActive() ? target : window.scrollY
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

      stop()
      position.y = window.scrollY
      tween = gsap.to(position, {
        y: target,
        duration: landing.isGate ? GATE_GLIDE_S : STEP_GLIDE_S,
        ease: 'power3.out',
        overwrite: true,
        onUpdate: () => window.scrollTo(0, position.y),
      })
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
