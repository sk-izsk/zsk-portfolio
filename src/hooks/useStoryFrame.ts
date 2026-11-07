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
import { getPageTops, STORY_PATHS } from '@utils/storyScroll'
import gsap from 'gsap'
import { useEffect, type RefObject } from 'react'

const TITLE_SELECTOR = '.section-title h2'
const FOLLOW_SECONDS = 0.45
// How far down the screen a title is when the frame lands on it, leaving the bar clear.
const TITLE_LANDING_TOP = 110
// How much further the page scrolls before the frame lifts from the title to the bar.
const TITLE_LIFT_SCROLL = 160
// How early the frame sets off to meet a title, in viewport heights.
const FLIGHT_VIEWPORTS = 0.7
const TITLE_OUTSET = 12
const TITLE_BRACKET = 36
const TITLE_BRACKET_COMPACT = 24
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
  const titleBracket = window.matchMedia(storyCardQuery).matches
    ? TITLE_BRACKET
    : TITLE_BRACKET_COMPACT
  const stops: FrameStop[] = []

  pages.forEach((page, index) => {
    const title = page.querySelector<HTMLElement>(TITLE_SELECTOR)

    if (!title) {
      return
    }

    const { left } = offsetWithin(title, document.body)
    const titleTop = (tops[index] ?? 0) + offsetWithin(title, page).top
    const { offsetWidth: width, offsetHeight: height } = title
    const landsAt = titleTop - TITLE_LANDING_TOP
    const setsOffAt = landsAt - window.innerHeight * FLIGHT_VIEWPORTS

    if (stops.length === 0) {
      stops.push(...getHomeStops(story, setsOffAt))
    }

    // Without the home scene, as on phones, the frame starts on Home's own place in the bar.
    if (stops.length === 0) {
      stops.push({ at: 0, spot: getRestSpot(STORY_PATHS[0] ?? '/') })
    }

    const previous = stops[stops.length - 1]

    if (previous && previous.at !== setsOffAt) {
      stops.push({ at: setsOffAt, spot: previous.spot })
    }

    stops.push(
      {
        at: landsAt,
        spot: (scrollY) =>
          frameAround(left, titleTop - scrollY, width, height, TITLE_OUTSET, titleBracket),
      },
      { at: landsAt + TITLE_LIFT_SCROLL, spot: getRestSpot(STORY_PATHS[index] ?? '/') },
    )
  })

  return stops
}

/**
 * Drives the one frame that travels the whole story: from the photo through the home scene,
 * then down onto each page's title as it arrives and up onto its link as the page is read.
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
    let frameId = 0
    let isPlaced = false

    const update = () => {
      frameId = 0

      const spot = getSpotAt(stops, window.scrollY)

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
      stops = getStops(story, pages)
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
