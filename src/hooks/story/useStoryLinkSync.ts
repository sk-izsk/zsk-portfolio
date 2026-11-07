import { findActiveIndex, getStoryIndex, getStoryTops, STORY_PATHS } from '@utils/storyScroll'
import { useEffect, type RefObject } from 'react'
import { useNavigate } from 'react-router'

// Scrolling updates the link in place.
export const useStoryLinkSync = (
  storyRef: RefObject<HTMLDivElement | null>,
  isAutoScrolling: RefObject<boolean>,
) => {
  const navigate = useNavigate()

  useEffect(() => {
    let frameId = 0
    let tops = getStoryTops(storyRef.current)

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
      tops = getStoryTops(storyRef.current)
      schedule()
    })

    Array.from(storyRef.current?.children ?? []).forEach((page) => resizes.observe(page))
    window.addEventListener('scroll', schedule, { passive: true })

    return () => {
      cancelAnimationFrame(frameId)
      resizes.disconnect()
      window.removeEventListener('scroll', schedule)
    }
  }, [navigate, storyRef, isAutoScrolling])
}
