import {
  homeHeadline,
  homeImg,
  homeScene,
  homeStage,
  pinnedSceneQuery,
} from '@components/home/home.css'
import { STORY_BRACKET_SIZE } from '@components/story/story.css'
import { currentPage } from '@components/topBar/topBar.css'
import { useNavScrambleStore } from '@stores/navScrambleStore'
import {
  getLandedHold,
  getSpotAt,
  HOME_SCENE_BEATS,
  type FrameHold,
  type FrameSpot,
  type FrameStop,
} from '@utils/storyFrame'
import { getPageTops, STORY_PATHS } from '@utils/storyScroll'
import gsap from 'gsap'
import { useEffect, type RefObject } from 'react'

const FOLLOW_SECONDS = 0.45
const LINK_OUTSET = 2
const LINK_BRACKET = 12
const LABEL_OUTSET = 6
const PHOTO_BRACKET_INSET_X = 20
const PHOTO_BRACKET_OUTSET_Y = 40
const HEADLINE_OUTSET = 16
const STAGE_INSET = 64
// Leaves the floating top bar clear when the brackets open to the edges of the stage.
const STAGE_TOP_INSET = 112

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
): FrameSpot => ({
  left: left - outset,
  top: top - outset,
  right: left + width + outset,
  bottom: top + height + outset,
  size,
})

const frameAroundRect = (rect: DOMRect, outset: number) =>
  frameAround(rect.left, rect.top, rect.width, rect.height, outset, LINK_BRACKET)

// Where the frame rests while a page is read: around its link, or the page name on a phone.
const getRestSpot = (path: string): (() => FrameSpot) => {
  const link = document.querySelector<HTMLElement>(`header nav a[href="${path}"]`)

  if (link?.offsetParent) {
    const spot = frameAroundRect(link.getBoundingClientRect(), LINK_OUTSET)

    return () => spot
  }

  const label = document.querySelector(`.${currentPage}`)

  return () => {
    const range = document.createRange()

    if (label) {
      range.selectNodeContents(label)
    }

    return frameAroundRect(range.getBoundingClientRect(), LABEL_OUTSET)
  }
}

const getHomeStops = (story: HTMLElement, leavesAt: number): FrameStop[] => {
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
  }
  const sceneScroll = scene.offsetHeight - window.innerHeight
  const beat = (at: number) => (at / HOME_SCENE_BEATS.length) * sceneScroll

  return [
    { at: 0, spot: () => photoSpot },
    { at: beat(HOME_SCENE_BEATS.headlineArrive), spot: () => headlineSpot },
    { at: beat(HOME_SCENE_BEATS.headlineLeave), spot: () => headlineSpot },
    { at: beat(HOME_SCENE_BEATS.stageArrive), spot: () => stageSpot },
    { at: leavesAt, spot: () => stageSpot },
  ]
}

const getStops = (story: HTMLElement, pages: HTMLElement[]) => {
  const tops = getPageTops(
    0,
    pages.map((page) => page.offsetHeight),
  )
  const { innerHeight } = window
  const stops: FrameStop[] = []
  const holds: FrameHold[] = []

  // The frame moves as a page rises into view, landing as it becomes the current page.
  const travelFor = (index: number) => {
    const pageTop = tops[index] ?? 0

    return { setsOffAt: pageTop - innerHeight, landsAt: pageTop - innerHeight / 2 }
  }

  const homeStops = getHomeStops(story, travelFor(1).setsOffAt)

  stops.push(...homeStops)

  // Without the home scene, as on phones, the frame starts on Home's own place in the bar.
  if (homeStops.length === 0) {
    stops.push({ at: 0, spot: getRestSpot(STORY_PATHS[0] ?? '/') })
  }

  holds.push({
    from: 0,
    to: travelFor(1).setsOffAt,
    path: homeStops.length === 0 ? (STORY_PATHS[0] ?? '/') : null,
  })

  pages.slice(1).forEach((_, offset) => {
    const index = offset + 1
    const path = STORY_PATHS[index] ?? '/'
    const { setsOffAt, landsAt } = travelFor(index)
    const previous = stops[stops.length - 1]

    if (previous && previous.at !== setsOffAt) {
      stops.push({ at: setsOffAt, spot: previous.spot })
    }

    stops.push({ at: landsAt, spot: getRestSpot(path) })
    holds.push({
      from: landsAt,
      to: index + 1 < pages.length ? travelFor(index + 1).setsOffAt : Infinity,
      path,
    })
  })

  return { stops, holds }
}

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
    const moves = [
      { x: follow(start, 'x'), y: follow(start, 'y'), corner: 'start' },
      { x: follow(end, 'x'), y: follow(end, 'y'), corner: 'end' },
    ] as const
    const scales = [
      follow(start, 'scaleX'),
      follow(start, 'scaleY'),
      follow(end, 'scaleX'),
      follow(end, 'scaleY'),
    ]
    const pages = Array.from(story.children) as HTMLElement[]

    let stops: FrameStop[] = []
    let holds: FrameHold[] = []
    let lastLandedPath: string | null | undefined
    let frameId = 0
    let isPlaced = false

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

      if (!spot) {
        return
      }

      // The first placement jumps there, so the frame does not fly in from the page's corner.
      const go = (move: (value: number, from?: number) => unknown, value: number) => {
        move(value, isPlaced ? undefined : value)
      }

      moves.forEach(({ x, y, corner }) => {
        go(x, corner === 'start' ? spot.left : spot.right - spot.size)
        go(y, corner === 'start' ? spot.top : spot.bottom - spot.size)
      })
      scales.forEach((scale) => go(scale, spot.size / STORY_BRACKET_SIZE))

      if (!isPlaced) {
        isPlaced = true
        frame.style.opacity = '1'
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
