import {
  homeHeadline,
  homeImg,
  homeScene,
  homeStage,
  pinnedSceneQuery,
} from '@components/home/home.css'
import { STORY_BRACKET_SIZE } from '@components/story/storyFrame.css'
import { HOME_SCENE_BEATS, type FrameHold, type FrameSpot, type FrameStop } from '@utils/storyFrame'
import { frameAround, getRestSpot, offsetWithin } from '@utils/storyFrameSpots'
import { getPageTops, STORY_PATHS } from '@utils/storyScroll'

const PHOTO_BRACKET_INSET_X = 20
const PHOTO_BRACKET_OUTSET_Y = 40
const HEADLINE_OUTSET = 16
const STAGE_INSET = 64
// Leaves the top bar clear on widths that have the scene but not yet the sidebar.
const STAGE_TOP_INSET = 112

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

export const getStops = (story: HTMLElement, pages: HTMLElement[]) => {
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
