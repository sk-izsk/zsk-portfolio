import { canAnimate } from '@utils/motion'
import { getStoryIndex, getStoryTops } from '@utils/storyScroll'
import { useEffect, useRef, type RefObject } from 'react'
import { useLocation, useNavigationType } from 'react-router'

const GLIDE_TIMEOUT_MS = 1600

// Following a link glides to its page.
export const useStoryLinkGlide = (
  storyRef: RefObject<HTMLDivElement | null>,
  setAutoScrolling: (value: boolean) => void,
) => {
  const location = useLocation()
  const navigationType = useNavigationType()
  const lastKey = useRef(location.key)
  const lastPathname = useRef(location.pathname)
  const lastSearch = useRef(location.search)
  const endGlide = useRef<() => void>(() => undefined)

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

    // Back and Forward restore the reading position, which a glide would throw away.
    if (navigationType === 'POP') {
      return
    }

    setAutoScrolling(true)

    const finish = () => {
      window.clearTimeout(timeoutId)
      window.removeEventListener('scrollend', finish)
      endGlide.current = () => undefined
      setAutoScrolling(false)
    }

    const timeoutId = window.setTimeout(finish, GLIDE_TIMEOUT_MS)
    window.addEventListener('scrollend', finish)
    endGlide.current = finish

    window.scrollTo({
      top: getStoryTops(storyRef.current)[getStoryIndex(location.pathname)] ?? 0,
      behavior: canAnimate() ? 'smooth' : 'auto',
    })
  }, [
    location.key,
    location.pathname,
    location.search,
    location.state,
    navigationType,
    storyRef,
    setAutoScrolling,
  ])

  useEffect(() => () => endGlide.current(), [])
}
