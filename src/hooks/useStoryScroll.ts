import { findActiveIndex, getPageTops, getStoryIndex, STORY_PATHS } from '@utils/storyScroll'
import { useEffect, useLayoutEffect, useRef, type RefObject } from 'react'
import { useLocation, useNavigate, useNavigationType } from 'react-router'

const GLIDE_TIMEOUT_MS = 1600
const SETTLE_MS = 1500
const SETTLE_STEP_MS = 100
const USER_SCROLL_EVENTS = ['wheel', 'touchstart', 'keydown'] as const

const getTops = (story: HTMLElement | null) => {
  if (!story) {
    return []
  }

  const heights = Array.from(story.children, (page) => (page as HTMLElement).offsetHeight)

  return getPageTops(story.getBoundingClientRect().top + window.scrollY, heights)
}

/**
 * Keeps the address bar and the scroll position in step:
 * scrolling updates the link in place, and following a link glides to its page.
 */
export const useStoryScroll = (
  storyRef: RefObject<HTMLDivElement | null>,
  isEveryPageLoaded: boolean,
) => {
  const location = useLocation()
  const navigationType = useNavigationType()
  const navigate = useNavigate()
  const lastKey = useRef(location.key)
  const lastPathname = useRef(location.pathname)
  const lastSearch = useRef(location.search)
  const isAutoScrolling = useRef(getStoryIndex(location.pathname) > 0)
  const endGlide = useRef<() => void>(() => undefined)

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
      isAutoScrolling.current = false
    }

    const intervalId = window.setInterval(() => {
      const tops = getTops(storyRef.current)
      window.scrollTo(0, tops[getStoryIndex(window.location.pathname)] ?? 0)
    }, SETTLE_STEP_MS)
    const timeoutId = window.setTimeout(stop, SETTLE_MS)

    USER_SCROLL_EVENTS.forEach((name) => {
      window.addEventListener(name, stop, { passive: true })
    })

    return stop
  }, [isEveryPageLoaded, storyRef])

  useEffect(() => {
    if (location.key === lastKey.current) {
      return
    }

    lastKey.current = location.key

    // A project filter writes to the query, which must not move the page out from under it.
    const isOnlyQueryChange =
      location.pathname === lastPathname.current && location.search !== lastSearch.current

    lastPathname.current = location.pathname
    lastSearch.current = location.search

    if (isOnlyQueryChange || (navigationType === 'REPLACE' && location.state?.fromScroll)) {
      return
    }

    endGlide.current()
    isAutoScrolling.current = true

    const finish = () => {
      window.clearTimeout(timeoutId)
      window.removeEventListener('scrollend', finish)
      endGlide.current = () => undefined
      isAutoScrolling.current = false
    }

    const timeoutId = window.setTimeout(finish, GLIDE_TIMEOUT_MS)
    window.addEventListener('scrollend', finish)
    endGlide.current = finish

    const canGlide = window.matchMedia('(prefers-reduced-motion: no-preference)').matches

    window.scrollTo({
      top: getTops(storyRef.current)[getStoryIndex(location.pathname)] ?? 0,
      behavior: canGlide ? 'smooth' : 'auto',
    })
  }, [location.key, location.pathname, location.search, location.state, navigationType, storyRef])

  useEffect(() => () => endGlide.current(), [])

  useEffect(() => {
    let frameId = 0
    let tops = getTops(storyRef.current)

    const syncLink = () => {
      frameId = 0

      if (isAutoScrolling.current) {
        return
      }

      const line = window.scrollY + window.innerHeight / 2
      const index = findActiveIndex(tops, line)

      if (index !== getStoryIndex(window.location.pathname)) {
        // Keeps the query, so a project filter survives scrolling past its page and back.
        void navigate(
          { pathname: STORY_PATHS[index] ?? '/', search: window.location.search },
          {
            replace: true,
            preventScrollReset: true,
            state: { fromScroll: true },
          },
        )
      }
    }

    const schedule = () => {
      frameId ||= requestAnimationFrame(syncLink)
    }

    // Heights only change on a resize, so they are not read again on every scroll.
    const resizes = new ResizeObserver(() => {
      tops = getTops(storyRef.current)
      schedule()
    })

    Array.from(storyRef.current?.children ?? []).forEach((page) => resizes.observe(page))
    window.addEventListener('scroll', schedule, { passive: true })

    return () => {
      cancelAnimationFrame(frameId)
      resizes.disconnect()
      window.removeEventListener('scroll', schedule)
    }
  }, [navigate, storyRef])
}
