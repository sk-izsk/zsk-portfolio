import {
  homeHeadline,
  homeImg,
  homeScene,
  homeStage,
  pinnedSceneQuery,
} from '@components/home/home.css'
import { STORY_BRACKET_SIZE, storyCardQuery } from '@components/story/story.css'
import { currentPage } from '@components/topBar/topBar.css'
import { getSpotAt, HOME_SCENE_BEATS, type FrameSpot, type FrameStop } from '@utils/storyFrame'
import { getPageTops } from '@utils/storyScroll'
import gsap from 'gsap'
import { useEffect, type RefObject } from 'react'

const TITLE_SELECTOR = '.section-title h2'
const FOLLOW_SECONDS = 0.45
const TITLE_SHRINK_SCROLL = 200
const TITLE_STUCK_SCALE = 0.6
// Where a title sits at the top of its page, and once stuck under the bar. See story.css.ts.
const TITLE_TOP = 96
const TITLE_STUCK_TOP = 88
const TITLE_OUTSET = 16
const TITLE_STUCK_OUTSET = 10
const TITLE_BRACKET = 36
const TITLE_STUCK_BRACKET = 20
const PHOTO_BRACKET_INSET_X = 20
const PHOTO_BRACKET_OUTSET_Y = 40
const HEADLINE_OUTSET = 16
const STAGE_INSET = 64
// Leaves the floating top bar clear when the brackets open to the edges of the stage.
const STAGE_TOP_INSET = 112
const PHONE_BAR_OUTSET = 6
const PHONE_BAR_BRACKET = 12
const PHONE_TITLE_OUTSET = 10
const PHONE_TITLE_BRACKET = 24
const PHONE_TITLE_LANDING_TOP = 110
const PHONE_TITLE_HOLD_SCROLL = 160
const PHONE_FLIGHT_VIEWPORTS = 0.7

interface StuckTitle {
  element: HTMLElement
  pageTop: number
}

// Layout offsets, which unlike rects ignore the transforms these elements animate with.
const offsetWithin = (element: HTMLElement, ancestor: HTMLElement) => {
  let left = 0
  let top = 0
  let current: HTMLElement | null = element

  while (current && current !== ancestor) {
    left += current.offsetLeft
    top += current.offsetTop
    current = current.offsetParent as HTMLElement | null
  }

  return { left, top }
}

const frameAround = (
  left: number,
  top: number,
  width: number,
  height: number,
  outset: number,
  size: number,
  opacity = 1,
): FrameSpot => ({
  left: left - outset,
  top: top - outset,
  right: left + width + outset,
  bottom: top + height + outset,
  size,
  opacity,
})

const getPageSpots = (title: HTMLElement) => {
  const { left } = offsetWithin(title, document.body)
  const { offsetWidth: width, offsetHeight: height } = title

  return {
    full: frameAround(left, TITLE_TOP, width, height, TITLE_OUTSET, TITLE_BRACKET),
    stuck: frameAround(
      left,
      TITLE_STUCK_TOP,
      width * TITLE_STUCK_SCALE,
      height * TITLE_STUCK_SCALE,
      TITLE_STUCK_OUTSET,
      TITLE_STUCK_BRACKET,
    ),
  }
}

const getHomeStops = (story: HTMLElement, aboutEntersAt: number): FrameStop[] => {
  const scene = story.querySelector<HTMLElement>(`.${homeScene}`)
  const stage = story.querySelector<HTMLElement>(`.${homeStage}`)
  const photo = story.querySelector<HTMLElement>(`.${homeImg}`)
  const headline = story.querySelector<HTMLElement>(`.${homeHeadline}`)

  if (!scene || !stage || !photo || !headline || !window.matchMedia(pinnedSceneQuery).matches) {
    return []
  }

  const stageLeft = offsetWithin(stage, document.body).left
  const place = (element: HTMLElement) => {
    const { left, top } = offsetWithin(element, stage)

    return { left: stageLeft + left, top, width: element.offsetWidth, height: element.offsetHeight }
  }

  const photoBox = place(photo)
  const headlineBox = place(headline)
  const photoSpot: FrameSpot = {
    left: photoBox.left + PHOTO_BRACKET_INSET_X,
    top: photoBox.top - PHOTO_BRACKET_OUTSET_Y,
    right: photoBox.left + photoBox.width - PHOTO_BRACKET_INSET_X,
    bottom: photoBox.top + photoBox.height + PHOTO_BRACKET_OUTSET_Y,
    size: STORY_BRACKET_SIZE,
    opacity: 1,
  }
  const headlineSpot = frameAround(
    headlineBox.left,
    headlineBox.top,
    headlineBox.width,
    headlineBox.height,
    HEADLINE_OUTSET,
    STORY_BRACKET_SIZE,
  )
  const stageSpot: FrameSpot = {
    left: stageLeft + STAGE_INSET,
    top: STAGE_TOP_INSET,
    right: stageLeft + stage.offsetWidth - STAGE_INSET,
    bottom: window.innerHeight - STAGE_INSET,
    size: STORY_BRACKET_SIZE,
    opacity: 1,
  }
  const sceneScroll = scene.offsetHeight - window.innerHeight
  const beat = (at: number) => (at / HOME_SCENE_BEATS.length) * sceneScroll

  return [
    { at: 0, spot: () => photoSpot },
    { at: beat(HOME_SCENE_BEATS.headlineArrive), spot: () => headlineSpot },
    { at: beat(HOME_SCENE_BEATS.headlineLeave), spot: () => headlineSpot },
    { at: beat(HOME_SCENE_BEATS.stageArrive), spot: () => stageSpot },
    { at: aboutEntersAt, spot: () => stageSpot },
  ]
}

const getCardStops = (story: HTMLElement, pages: HTMLElement[]) => {
  const tops = getPageTops(
    0,
    pages.map((page) => page.offsetHeight),
  )
  const aboutEntersAt = (tops[1] ?? 0) - window.innerHeight
  const stops = getHomeStops(story, aboutEntersAt)
  const titles: StuckTitle[] = []

  pages.forEach((page, index) => {
    const title = page.querySelector<HTMLElement>(TITLE_SELECTOR)
    const pageTop = tops[index] ?? 0

    if (!title) {
      return
    }

    const { full, stuck } = getPageSpots(title)
    const nextEntersAt = (tops[index + 1] ?? Infinity) - window.innerHeight

    // Without the home scene, as on short screens, the frame fades in on its way to the first title.
    if (stops.length === 0) {
      stops.push({ at: aboutEntersAt, spot: () => ({ ...full, opacity: 0 }) })
    }

    stops.push(
      { at: pageTop, spot: () => full },
      { at: Math.min(pageTop + TITLE_SHRINK_SCROLL, nextEntersAt), spot: () => stuck },
    )

    if (Number.isFinite(nextEntersAt)) {
      stops.push({ at: nextEntersAt, spot: () => stuck })
    }

    titles.push({ element: title, pageTop })
  })

  return { stops, titles }
}

const getBarSpot = (label: Element | null): FrameSpot => {
  if (!label) {
    return { left: 0, top: 0, right: 0, bottom: 0, size: PHONE_BAR_BRACKET, opacity: 0 }
  }

  const range = document.createRange()
  range.selectNodeContents(label)
  const { left, top, width, height } = range.getBoundingClientRect()

  return frameAround(left, top, width, height, PHONE_BAR_OUTSET, PHONE_BAR_BRACKET)
}

// On a phone the frame rests around the page name in the bar, and visits each page's title.
const getPhoneStops = (pages: HTMLElement[]) => {
  const label = document.querySelector(`.${currentPage}`)
  const atBar = () => getBarSpot(label)
  const stops: FrameStop[] = [{ at: 0, spot: atBar }]

  pages.forEach((page) => {
    const title = page.querySelector<HTMLElement>(TITLE_SELECTOR)

    if (!title) {
      return
    }

    const { left, top } = offsetWithin(title, document.body)
    const { offsetWidth: width, offsetHeight: height } = title
    const landsAt = top - PHONE_TITLE_LANDING_TOP

    stops.push(
      { at: landsAt - window.innerHeight * PHONE_FLIGHT_VIEWPORTS, spot: atBar },
      {
        at: landsAt,
        spot: (scrollY) =>
          frameAround(left, top - scrollY, width, height, PHONE_TITLE_OUTSET, PHONE_TITLE_BRACKET),
      },
      { at: landsAt + PHONE_TITLE_HOLD_SCROLL, spot: atBar },
    )
  })

  return stops
}

/**
 * Drives the one frame that travels the whole story: from the photo through the home scene,
 * then onto each page's title, which it stays around until the next page takes over.
 */
export const useStoryFrame = (
  storyRef: RefObject<HTMLDivElement | null>,
  frameRef: RefObject<HTMLDivElement | null>,
  // Text changes resize the titles, so the stops rebuild per language.
  contentKey: string | undefined,
) => {
  useEffect(() => {
    const story = storyRef.current
    const frame = frameRef.current
    const start = frame?.children[0]
    const end = frame?.children[1]

    if (
      !story ||
      !frame ||
      !start ||
      !end ||
      !window.matchMedia('(prefers-reduced-motion: no-preference)').matches
    ) {
      return
    }

    const follow = (target: Element, property: 'x' | 'y' | 'scaleX' | 'scaleY') =>
      gsap.quickTo(target, property, { duration: FOLLOW_SECONDS, ease: 'power3.out' })
    const startX = follow(start, 'x')
    const startY = follow(start, 'y')
    const startScaleX = follow(start, 'scaleX')
    const startScaleY = follow(start, 'scaleY')
    const endX = follow(end, 'x')
    const endY = follow(end, 'y')
    const endScaleX = follow(end, 'scaleX')
    const endScaleY = follow(end, 'scaleY')
    const pages = Array.from(story.children) as HTMLElement[]

    let stops: FrameStop[] = []
    let titles: StuckTitle[] = []
    let frameId = 0

    const update = () => {
      frameId = 0

      const { scrollY } = window
      const spot = getSpotAt(stops, scrollY)

      if (spot) {
        const scale = spot.size / STORY_BRACKET_SIZE

        startX(spot.left)
        startY(spot.top)
        startScaleX(scale)
        startScaleY(scale)
        endX(spot.right - spot.size)
        endY(spot.bottom - spot.size)
        endScaleX(scale)
        endScaleY(scale)
        frame.style.opacity = String(spot.opacity)
      }

      titles.forEach(({ element, pageTop }) => {
        const shrink = Math.min(Math.max((scrollY - pageTop) / TITLE_SHRINK_SCROLL, 0), 1)
        const scale = 1 - shrink * (1 - TITLE_STUCK_SCALE)

        element.style.transform = `scale(${scale})`
      })
    }

    const schedule = () => {
      frameId ||= requestAnimationFrame(update)
    }

    const rebuild = () => {
      if (window.matchMedia(storyCardQuery).matches) {
        ;({ stops, titles } = getCardStops(story, pages))
      } else {
        stops = getPhoneStops(pages)
        titles.forEach(({ element }) => {
          element.style.transform = ''
        })
        titles = []
      }

      schedule()
    }

    rebuild()

    const resizes = new ResizeObserver(rebuild)
    pages.forEach((page) => resizes.observe(page))
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', rebuild, { passive: true })
    void document.fonts?.ready.then(rebuild)

    return () => {
      cancelAnimationFrame(frameId)
      resizes.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', rebuild)
    }
  }, [storyRef, frameRef, contentKey])
}
