import { genieLayer, genieRow } from '@components/askAi/askAiWidget.css'
import { getGenieKeyframes } from '@utils/genie'
import { useLayoutEffect, useRef, type RefObject } from 'react'

const ROWS = 24
const ROWS_PHONE = 16
const PHONE_MAX_WIDTH = 767
const FRAMES = 24
const OPEN_MS = 560
const CLOSE_MS = 480
const LANDING_MS = 300
// Rows overlap by this much, so no hairline shows between them while they move.
const ROW_OVERLAP_PX = 1

const buildRow = (panel: HTMLElement, box: DOMRect, rowTop: number, rowHeight: number) => {
  const row = document.createElement('div')
  row.className = genieRow
  row.style.left = `${box.left}px`
  row.style.top = `${box.top + rowTop}px`
  row.style.width = `${box.width}px`
  row.style.height = `${rowHeight + ROW_OVERLAP_PX}px`

  const clone = panel.cloneNode(true) as HTMLElement
  clone.removeAttribute('data-open')
  clone.inert = true
  clone.style.position = 'absolute'
  clone.style.inset = 'auto'
  clone.style.left = '0'
  clone.style.top = `${-rowTop}px`
  clone.style.width = `${box.width}px`
  clone.style.height = `${box.height}px`
  clone.style.opacity = '1'
  clone.style.visibility = 'visible'
  row.append(clone)

  return { row, clone }
}

/**
 * Pours a window into its button and back, like the macOS genie effect. The window is sliced
 * into rows of clones that squeeze separately, using only composited transforms, so the real
 * window never has to be warped and the animation does not depend on the main thread.
 */
export const useGenie = (
  panelRef: RefObject<HTMLElement | null>,
  triggerRef: RefObject<HTMLElement | null>,
  isOpen: boolean,
  scrollSelector: string,
) => {
  const wasOpen = useRef(isOpen)

  useLayoutEffect(() => {
    const panel = panelRef.current
    const trigger = triggerRef.current

    if (wasOpen.current === isOpen) {
      return
    }

    wasOpen.current = isOpen

    if (
      !panel ||
      !trigger ||
      !window.matchMedia('(prefers-reduced-motion: no-preference)').matches
    ) {
      return
    }

    const box = panel.getBoundingClientRect()
    const button = trigger.getBoundingClientRect()
    const buttonCenter = { x: button.left + button.width / 2, y: button.top + button.height / 2 }
    const rowCount = window.innerWidth <= PHONE_MAX_WIDTH ? ROWS_PHONE : ROWS
    const rowHeight = box.height / rowCount
    const layer = document.createElement('div')
    layer.className = genieLayer
    layer.setAttribute('aria-hidden', 'true')

    const scrollTop = panel.querySelector(scrollSelector)?.scrollTop ?? 0
    const draft = panel.querySelector('textarea')?.value ?? ''
    const rows = Array.from({ length: rowCount }, (_, index) =>
      buildRow(panel, box, rowHeight * index, rowHeight),
    )

    rows.forEach(({ row }) => layer.append(row))
    document.body.append(layer)

    // Cloning leaves these behind, and they would make the chat jump when the rows take over.
    rows.forEach(({ clone }) => {
      const messages = clone.querySelector(scrollSelector)
      const input = clone.querySelector('textarea')

      if (messages) {
        messages.scrollTop = scrollTop
      }
      if (input) {
        input.value = draft
      }
    })

    // The real window stays out of sight until the rows have finished forming it.
    panel.style.opacity = '0'

    const animations = rows.map(({ row }, index) =>
      row.animate(getGenieKeyframes(box, buttonCenter, index, rowCount, FRAMES), {
        duration: isOpen ? OPEN_MS : CLOSE_MS,
        direction: isOpen ? 'reverse' : 'normal',
        easing: 'linear',
        fill: 'both',
      }),
    )

    const finish = () => {
      layer.remove()
      panel.style.opacity = ''
    }

    void Promise.all(animations.map((animation) => animation.finished)).then(
      () => {
        finish()

        if (!isOpen) {
          trigger.animate(
            [{ transform: 'scale(1)' }, { transform: 'scale(1.14)' }, { transform: 'scale(1)' }],
            { duration: LANDING_MS, easing: 'cubic-bezier(0.34, 1.4, 0.64, 1)' },
          )
        }
      },
      // Cancelled by the next toggle, whose cleanup already removed these rows.
      () => undefined,
    )

    return () => {
      animations.forEach((animation) => animation.cancel())
      finish()
    }
  }, [panelRef, triggerRef, isOpen, scrollSelector])
}
