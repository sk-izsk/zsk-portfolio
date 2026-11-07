import { SIDEBAR_SLIDE_MS } from '@components/sidebar/sidebar.css'
import { useSidebarStore } from '@stores/sidebarStore'
import { findActiveIndex, getStoryPages, getStoryTops } from '@utils/storyScroll'
import { useEffect, type RefObject } from 'react'

// A little past the slide, for the last layout to settle.
const HOLD_MS = SIDEBAR_SLIDE_MS + 150

/**
 * Keeps the reader's place while the sidebar slides. Wider pages are shorter, which would pull
 * everything up, and browsers do not correct for it because the pages are sticky.
 */
export const useStoryHoldPosition = (storyRef: RefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    let frameId = 0

    const hold = () => {
      const story = storyRef.current

      if (!story) {
        return
      }

      const tops = getStoryTops(story)
      const index = findActiveIndex(tops, window.scrollY)
      const page = getStoryPages(story)[index]

      if (!page) {
        return
      }

      // How far into the page the reader is, as a share of its height, so it survives rewrapping.
      const progress = (window.scrollY - (tops[index] ?? 0)) / page.offsetHeight
      const startedAt = performance.now()

      const follow = () => {
        const top = getStoryTops(story)[index] ?? 0

        window.scrollTo(0, top + progress * page.offsetHeight)

        if (performance.now() - startedAt < HOLD_MS) {
          frameId = requestAnimationFrame(follow)
        }
      }

      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(follow)
    }

    const unsubscribe = useSidebarStore.subscribe((state, previous) => {
      if (state.isCollapsed !== previous.isCollapsed) {
        hold()
      }
    })

    return () => {
      unsubscribe()
      cancelAnimationFrame(frameId)
    }
  }, [storyRef])
}
