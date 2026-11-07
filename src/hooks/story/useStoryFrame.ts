import { currentPage } from '@components/topBar/topBar.css'
import { useNavScrambleStore } from '@stores/navScrambleStore'
import { canAnimate } from '@utils/motion'
import { getLandedHold, getSpotAt, type FrameHold, type FrameStop } from '@utils/storyFrame'
import { createFrameMover } from '@utils/storyFrameMover'
import { getStops } from '@utils/storyFrameStops'
import { getStoryPages } from '@utils/storyScroll'
import { useEffect, type RefObject } from 'react'

/**
 * Drives the one frame that travels the whole story: from the photo through the home scene up
 * into the nav bar, where it stays and moves from link to link as the pages change.
 */
export const useStoryFrame = (
  storyRef: RefObject<HTMLDivElement | null>,
  frameRef: RefObject<HTMLDivElement | null>,
  // Text changes resize the titles and links, so the stops rebuild per language.
  contentKey: string | undefined,
) => {
  useEffect(() => {
    const story = storyRef.current
    const frame = frameRef.current
    const start = frame?.children[0]
    const end = frame?.children[1]

    if (!story || !frame || !start || !end || !canAnimate()) {
      return
    }

    const moveTo = createFrameMover(frame, start, end)
    const pages = getStoryPages(story)

    let stops: FrameStop[] = []
    let holds: FrameHold[] = []
    let lastLandedPath: string | null | undefined
    let frameId = 0

    const update = () => {
      frameId = 0

      const spot = getSpotAt(stops, window.scrollY)
      const landed = getLandedHold(holds, window.scrollY)

      if (landed && landed.path !== lastLandedPath) {
        // Not on the first placement, which is the page loading rather than the frame arriving.
        if (landed.path && lastLandedPath !== undefined) {
          useNavScrambleStore.getState().scramble(landed.path)
        }

        lastLandedPath = landed.path
      }

      if (spot) {
        moveTo(spot)
      }
    }

    const schedule = () => {
      frameId ||= requestAnimationFrame(update)
    }

    const rebuild = () => {
      ;({ stops, holds } = getStops(story, pages))
      schedule()
    }

    rebuild()

    const resizes = new ResizeObserver(rebuild)
    pages.forEach((page) => resizes.observe(page))

    // The sidebar's links change size as it collapses and expands, and the frame follows them.
    const sidebar = document.querySelector('[data-story-nav]')

    if (sidebar) {
      resizes.observe(sidebar)
    }

    // On a phone the frame hugs the page name, which changes size without any scrolling.
    const labelChanges = new MutationObserver(schedule)
    const label = document.querySelector(`.${currentPage}`)

    if (label) {
      labelChanges.observe(label, { childList: true })
    }

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', rebuild, { passive: true })
    void document.fonts?.ready.then(rebuild)

    return () => {
      cancelAnimationFrame(frameId)
      resizes.disconnect()
      labelChanges.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', rebuild)
    }
  }, [storyRef, frameRef, contentKey])
}
