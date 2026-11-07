import { getStoryPages } from '@utils/storyScroll'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, type RefObject } from 'react'

const REFRESH_DELAY_MS = 200

// Pages stick when their end reaches the bottom of the screen, which depends on their height.
export const useStoryStickyOffsets = (storyRef: RefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    const story = storyRef.current

    if (!story) {
      return
    }

    const pages = getStoryPages(story)
    let refreshTimer = 0

    const measure = () => {
      pages.forEach((page) => {
        page.style.setProperty(
          '--stick-top',
          `${Math.min(0, window.innerHeight - page.offsetHeight)}px`,
        )
      })
      window.clearTimeout(refreshTimer)
      refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), REFRESH_DELAY_MS)
    }

    const resizes = new ResizeObserver(measure)
    pages.forEach((page) => resizes.observe(page))
    window.addEventListener('resize', measure, { passive: true })

    return () => {
      window.clearTimeout(refreshTimer)
      resizes.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [storyRef])
}
