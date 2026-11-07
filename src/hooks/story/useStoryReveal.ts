import { getStoryPages } from '@utils/storyScroll'
import { useEffect, type RefObject } from 'react'

const REVEAL_LINE = '0px 0px -15% 0px'

// Marks each page the first time it is seen, which is what lets its content rise in.
export const useStoryReveal = (storyRef: RefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    const story = storyRef.current

    if (!story) {
      return
    }

    const pagesToReveal = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-seen', '')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: REVEAL_LINE },
    )

    getStoryPages(story).forEach((page) => pagesToReveal.observe(page))

    return () => pagesToReveal.disconnect()
  }, [storyRef])
}
