const GLYPHS = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789'
const TRAIL_LENGTH = 6
const HEADROOM_LINES = 7
const GLYPH_SWAP_CHANCE = 0.08
const MAX_DPR = 2

const LAST_START_MS = 1400
const MIN_FALL_MS = 600
const MAX_FALL_MS = 1000
// The head flickers in the letter's place this long before the letter appears.
const LOCK_MS = 160
const TRAIL_FADE_MS = 420
const LIT_MS = 160

interface DropTiming {
  startAt: number
  fallMs: number
}

interface Drop extends DropTiming {
  char: HTMLElement
  x: number
  y: number
  glyphs: string[]
  isLit: boolean
}

const randomGlyph = () => GLYPHS.charAt(Math.floor(Math.random() * GLYPHS.length))

const randomBetween = (min: number, max: number) => min + Math.random() * (max - min)

/** Where one column of rain is at `elapsed` ms. */
export const getDropFrame = ({ startAt, fallMs }: DropTiming, elapsed: number) => {
  const sinceStart = elapsed - startAt
  const sinceArrival = sinceStart - fallMs

  return {
    hasStarted: sinceStart >= 0,
    fall: Math.min(Math.max(sinceStart / fallMs, 0), 1),
    showsHead: sinceStart >= 0 && sinceArrival < LOCK_MS,
    hasLanded: sinceArrival >= LOCK_MS,
    isLit: sinceArrival >= LOCK_MS && sinceArrival < LOCK_MS + LIT_MS,
    trailAlpha: sinceArrival <= 0 ? 1 : Math.max(1 - sinceArrival / TRAIL_FADE_MS, 0),
    isDone: sinceArrival >= Math.max(TRAIL_FADE_MS, LOCK_MS + LIT_MS),
  }
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

    const box = element.getBoundingClientRect()
    const styles = getComputedStyle(element)
    const fontSize = parseFloat(styles.fontSize)
    const headroom = fontSize * HEADROOM_LINES
    const dpr = Math.min(window.devicePixelRatio, MAX_DPR)

    canvas = document.createElement('canvas')
    canvas.className = canvasClassName
    canvas.setAttribute('aria-hidden', 'true')
    canvas.width = box.width * dpr
    canvas.height = (box.height + headroom) * dpr
    canvas.style.top = `${-headroom}px`
    canvas.style.width = `${box.width}px`
    canvas.style.height = `${box.height + headroom}px`
    element.append(canvas)

    const context = canvas.getContext('2d')

    if (!context) {
      stop()
      setHidden(false)
      return
    }

    const trailColor = getComputedStyle(canvas).color
    context.scale(dpr, dpr)
    context.font = `${styles.fontWeight} ${fontSize}px ${styles.fontFamily}, monospace`
    context.textAlign = 'center'
    context.textBaseline = 'middle'

    const drops: Drop[] = chars.map((char) => {
      const rect = char.getBoundingClientRect()

      return {
        char,
        x: rect.left + rect.width / 2 - box.left,
        y: rect.top + rect.height / 2 - box.top + headroom,
        startAt: randomBetween(0, LAST_START_MS),
        fallMs: randomBetween(MIN_FALL_MS, MAX_FALL_MS),
        glyphs: Array.from({ length: TRAIL_LENGTH + 1 }, randomGlyph),
        isLit: false,
      }
    })

    const startedAt = performance.now()

    const draw = (now: number) => {
      const elapsed = now - startedAt
      let isRaining = false

      context.clearRect(0, 0, box.width, box.height + headroom)

      for (const drop of drops) {
        const frame = getDropFrame(drop, elapsed)

        if (!frame.isDone) {
          isRaining = true
        }

        if (frame.hasLanded && drop.char.style.visibility === 'hidden') {
          drop.char.style.visibility = ''
          drop.char.dataset.lit = ''
          drop.isLit = true
        }

        if (drop.isLit && !frame.isLit) {
          delete drop.char.dataset.lit
          drop.isLit = false
        }

        if (!frame.hasStarted || frame.trailAlpha === 0) {
          continue
        }

        drop.glyphs = drop.glyphs.map((glyph) =>
          Math.random() < GLYPH_SWAP_CHANCE ? randomGlyph() : glyph,
        )

        const headY = drop.y * frame.fall

        context.fillStyle = trailColor
        for (let step = 1; step <= TRAIL_LENGTH; step += 1) {
          context.globalAlpha = (1 - step / (TRAIL_LENGTH + 1)) * frame.trailAlpha
          context.fillText(drop.glyphs[step] ?? '', drop.x, headY - step * fontSize)
        }

        if (frame.showsHead) {
          context.globalAlpha = 1
          context.fillStyle = styles.color
          context.fillText(drop.glyphs[0] ?? '', drop.x, headY)
        }
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
