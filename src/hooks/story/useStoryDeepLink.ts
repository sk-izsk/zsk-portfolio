import { usePortfolioLoading } from '@stores/portfolioStore'
import { getStoryIndex, getStoryTops } from '@utils/storyScroll'
import { useEffect, useLayoutEffect, useRef, type RefObject } from 'react'

const SETTLE_MS = 1500
const SETTLE_STEP_MS = 100
const USER_SCROLL_EVENTS = ['wheel', 'touchstart', 'keydown'] as const

export const useStoryDeepLink = (
  storyRef: RefObject<HTMLDivElement | null>,
  isEveryPageLoaded: boolean,
  setAutoScrolling: (value: boolean) => void,
) => {
  const isPortfolioLoading = usePortfolioLoading()
  const isSettling = useRef(getStoryIndex(window.location.pathname) > 0)

  useLayoutEffect(() => {
    if (getStoryIndex(window.location.pathname) === 0) {
      window.scrollTo(0, 0)
    }
  }, [])

  // The visitor taking over ends it at any point, including while everything is still loading.
  useEffect(() => {
    if (!isSettling.current) {
      return
    }

    const removeListeners = () => {
      USER_SCROLL_EVENTS.forEach((name) => window.removeEventListener(name, takeOver))
    }

    const takeOver = () => {
      removeListeners()

      if (isSettling.current) {
        isSettling.current = false
        setAutoScrolling(false)
      }
    }

    USER_SCROLL_EVENTS.forEach((name) => {
      window.addEventListener(name, takeOver, { passive: true })
    })

    return removeListeners
  }, [setAutoScrolling])

  // A deep link waits for the pages above it and their data, which keep pushing it down.
  useEffect(() => {
    if (!isSettling.current || !isEveryPageLoaded || isPortfolioLoading) {
      return
    }

    const clearTimers = () => {
      window.clearInterval(intervalId)
      window.clearTimeout(timeoutId)
    }

    const finish = () => {
      clearTimers()

      if (isSettling.current) {
        isSettling.current = false
        setAutoScrolling(false)
      }
    }

    const intervalId = window.setInterval(() => {
      if (!isSettling.current) {
        clearTimers()
        return
      }

      const tops = getStoryTops(storyRef.current)
      window.scrollTo(0, tops[getStoryIndex(window.location.pathname)] ?? 0)
    }, SETTLE_STEP_MS)
    const timeoutId = window.setTimeout(finish, SETTLE_MS)

    return clearTimers
  }, [isEveryPageLoaded, isPortfolioLoading, storyRef, setAutoScrolling])
}
