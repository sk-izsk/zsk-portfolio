import { getStoryIndex, getStoryTops } from '@utils/storyScroll'
import { useEffect, useLayoutEffect, type RefObject } from 'react'

const SETTLE_MS = 1500
const SETTLE_STEP_MS = 100
const USER_SCROLL_EVENTS = ['wheel', 'touchstart', 'keydown'] as const

export const useStoryDeepLink = (
  storyRef: RefObject<HTMLDivElement | null>,
  isEveryPageLoaded: boolean,
  setAutoScrolling: (value: boolean) => void,
) => {
  useLayoutEffect(() => {
    if (getStoryIndex(window.location.pathname) === 0) {
      window.scrollTo(0, 0)
    }
  }, [])

  // A deep link waits for the pages above it, which keep pushing it down while they load.
  useEffect(() => {
    if (!isEveryPageLoaded || getStoryIndex(window.location.pathname) === 0) {
      return
    }

    const stop = () => {
      window.clearInterval(intervalId)
      window.clearTimeout(timeoutId)
      USER_SCROLL_EVENTS.forEach((name) => window.removeEventListener(name, stop))
      setAutoScrolling(false)
    }

    const intervalId = window.setInterval(() => {
      const tops = getStoryTops(storyRef.current)
      window.scrollTo(0, tops[getStoryIndex(window.location.pathname)] ?? 0)
    }, SETTLE_STEP_MS)
    const timeoutId = window.setTimeout(stop, SETTLE_MS)

    USER_SCROLL_EVENTS.forEach((name) => {
      window.addEventListener(name, stop, { passive: true })
    })

    return stop
  }, [isEveryPageLoaded, storyRef, setAutoScrolling])
}
