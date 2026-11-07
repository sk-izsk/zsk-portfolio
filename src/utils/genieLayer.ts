import { genieLayer, genieRow } from '@components/common/genie/genie.css'
import { getGenieKeyframes, type GeniePoint } from '@utils/genie'

const ROWS = 24
const ROWS_PHONE = 16
const PHONE_MAX_WIDTH = 767
const FRAMES = 24
const OPEN_MS = 560
const CLOSE_MS = 480
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

const buildRows = (panel: HTMLElement, box: DOMRect, rowCount: number, scrollSelector?: string) => {
  const rowHeight = box.height / rowCount
  const scrollTop = scrollSelector ? (panel.querySelector(scrollSelector)?.scrollTop ?? 0) : 0
  const draft = panel.querySelector('textarea')?.value ?? ''
  const rows = Array.from({ length: rowCount }, (_, index) =>
    buildRow(panel, box, rowHeight * index, rowHeight),
  )
  const layer = document.createElement('div')
  layer.className = genieLayer
  layer.setAttribute('aria-hidden', 'true')

  rows.forEach(({ row }) => layer.append(row))
  document.body.append(layer)

  // Cloning leaves these behind, and they would make the chat jump when the rows take over.
  rows.forEach(({ clone }) => {
    const messages = scrollSelector ? clone.querySelector(scrollSelector) : null
    const input = clone.querySelector('textarea')

    if (messages) {
      messages.scrollTop = scrollTop
    }
    if (input) {
      input.value = draft
    }
  })

  return { layer, rows }
}

// Always the right end of the button, where it is round. That is where the close icon sits,
// so the window returns to exactly where it came from whatever shape the button has.
const getButtonEnd = (trigger: HTMLElement): GeniePoint => {
  const button = trigger.getBoundingClientRect()

  return { x: button.right - button.height / 2, y: button.top + button.height / 2 }
}

/**
 * Pours a window into its button and back, like the macOS genie effect. The window is sliced
 * into rows of clones that squeeze separately, using only composited transforms, so the real
 * window never has to be warped and the animation does not depend on the main thread.
 * Returns a function that stops it early.
 */
export const playGenie = (
  panel: HTMLElement,
  trigger: HTMLElement,
  isOpening: boolean,
  onFinished: () => void,
  scrollSelector?: string,
) => {
  const box = panel.getBoundingClientRect()
  const buttonEnd = getButtonEnd(trigger)
  const rowCount = window.innerWidth <= PHONE_MAX_WIDTH ? ROWS_PHONE : ROWS
  const { layer, rows } = buildRows(panel, box, rowCount, scrollSelector)

  // The real window stays out of sight until the rows have finished forming it.
  panel.style.opacity = '0'

  const animations = rows.map(({ row }, index) =>
    row.animate(getGenieKeyframes(box, buttonEnd, index, rowCount, FRAMES), {
      duration: isOpening ? OPEN_MS : CLOSE_MS,
      direction: isOpening ? 'reverse' : 'normal',
      easing: 'linear',
      fill: 'both',
    }),
  )

  const cleanUp = () => {
    layer.remove()
    panel.style.opacity = ''
  }

  void Promise.all(animations.map((animation) => animation.finished)).then(
    () => {
      cleanUp()
      onFinished()
    },
    // Cancelled by the next toggle, whose stop already removed these rows.
    () => undefined,
  )

  return () => {
    animations.forEach((animation) => animation.cancel())
    cleanUp()
  }
}
