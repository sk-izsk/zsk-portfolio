import { createDrop, drawDrop, getDropFrame, updateDropLetter } from '@utils/matrixRainDrop'

const HEADROOM_LINES = 7
const MAX_DPR = 2

const createRainCanvas = (element: HTMLElement, className: string, headroom: number) => {
  const box = element.getBoundingClientRect()
  const dpr = Math.min(window.devicePixelRatio, MAX_DPR)
  const canvas = document.createElement('canvas')

  canvas.className = className
  canvas.setAttribute('aria-hidden', 'true')
  canvas.width = box.width * dpr
  canvas.height = (box.height + headroom) * dpr
  canvas.style.top = `${-headroom}px`
  canvas.style.width = `${box.width}px`
  canvas.style.height = `${box.height + headroom}px`
  element.append(canvas)

  return { canvas, box, dpr }
}

/**
 * Hides `chars` and rains them back in, each down its own column of changing glyphs. The rain is
 * drawn on a canvas that only exists while it plays, so it adds nothing to the page at rest.
 */
export const createMatrixRain = (
  element: HTMLElement,
  chars: HTMLElement[],
  canvasClassName: string,
) => {
  let frameId = 0
  let hasPlayed = false
  let canvas: HTMLCanvasElement | null = null

  const stop = () => {
    cancelAnimationFrame(frameId)
    canvas?.remove()
    canvas = null
  }

  const setHidden = (isHidden: boolean) => {
    chars.forEach((char) => {
      char.style.visibility = isHidden ? 'hidden' : ''
      delete char.dataset.lit
    })
  }

  const play = () => {
    if (hasPlayed) {
      return
    }

    hasPlayed = true

    const styles = getComputedStyle(element)
    const fontSize = parseFloat(styles.fontSize)
    const headroom = fontSize * HEADROOM_LINES
    const rain = createRainCanvas(element, canvasClassName, headroom)
    const { box, dpr } = rain

    canvas = rain.canvas

    const context = canvas.getContext('2d')

    if (!context) {
      stop()
      setHidden(false)
      return
    }

    const colors = { head: styles.color, trail: getComputedStyle(canvas).color }

    context.scale(dpr, dpr)
    context.font = `${styles.fontWeight} ${fontSize}px ${styles.fontFamily}, monospace`
    context.textAlign = 'center'
    context.textBaseline = 'middle'

    const drops = chars.map((char) => createDrop(char, box, headroom))
    const startedAt = performance.now()

    const draw = (now: number) => {
      const elapsed = now - startedAt
      let isRaining = false

      context.clearRect(0, 0, box.width, box.height + headroom)

      for (const drop of drops) {
        const frame = getDropFrame(drop, elapsed)

        isRaining ||= !frame.isDone
        updateDropLetter(drop, frame)
        drawDrop(context, drop, frame, fontSize, colors)
      }

      if (isRaining) {
        frameId = requestAnimationFrame(draw)
      } else {
        stop()
      }
    }

    frameId = requestAnimationFrame(draw)
  }

  const reset = () => {
    stop()
    hasPlayed = false
    setHidden(true)
  }

  const destroy = () => {
    stop()
    setHidden(false)
  }

  return { play, reset, destroy }
}
