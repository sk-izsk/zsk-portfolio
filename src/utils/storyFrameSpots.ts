import { currentPage } from '@components/topBar/topBar.css'
import type { FrameSpot } from '@utils/storyFrame'

// Around a sidebar link's icon and text, with brackets that match the logo's corners.
const LINK_OUTSET = 10
const LINK_BRACKET = 16
const LABEL_OUTSET = 6
const LABEL_BRACKET = 12

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

const frameAroundRect = (rect: DOMRect, outset: number, size: number) =>
  frameAround(rect.left, rect.top, rect.width, rect.height, outset, size)

// The icon and text of a link, so the frame fits each label rather than the whole row. The
// label is clipped by the link while it narrows, so its end never goes past the link's padding.
const getLinkContentRect = (link: HTMLElement) => {
  const box = link.getBoundingClientRect()
  const icon = link.firstElementChild?.getBoundingClientRect() ?? box
  const labelElement = link.lastElementChild as HTMLElement | null
  const label = labelElement?.getBoundingClientRect() ?? box
  // From layout rather than the rect, because the label may still be sliding in when measured.
  const labelRight = labelElement
    ? box.left + labelElement.offsetLeft - link.offsetLeft + labelElement.offsetWidth
    : box.right
  const contentRight = box.right - parseFloat(getComputedStyle(link).paddingRight)
  const top = Math.min(icon.top, label.top)
  const right = Math.max(icon.right, Math.min(labelRight, contentRight))

  return new DOMRect(icon.left, top, right - icon.left, Math.max(icon.bottom, label.bottom) - top)
}

// Where the frame rests while a page is read: around its sidebar link, or the page name in the
// top bar when there is no sidebar.
export const getRestSpot = (path: string): (() => FrameSpot) => {
  const link = document.querySelector<HTMLElement>(`[data-story-link="${path}"]`)

  if (link?.offsetParent) {
    // Measured each time, so a late font or a label that is still sliding never leaves it stale.
    return () => frameAroundRect(getLinkContentRect(link), LINK_OUTSET, LINK_BRACKET)
  }

  const label = document.querySelector(`.${currentPage}`)

  return () => {
    const range = document.createRange()

    if (label) {
      range.selectNodeContents(label)
    }

    return frameAroundRect(range.getBoundingClientRect(), LABEL_OUTSET, LABEL_BRACKET)
  }
}
