import { currentPage } from '@components/topBar/topBar.css'
import type { FrameSpot } from '@utils/storyFrame'

const LINK_OUTSET = 2
const LINK_BRACKET = 12
const LABEL_OUTSET = 6

// Layout offsets, which unlike rects ignore the transforms these elements animate with.
export const offsetWithin = (element: HTMLElement, ancestor: HTMLElement) => {
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

export const frameAround = (
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
export const getRestSpot = (path: string): (() => FrameSpot) => {
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
