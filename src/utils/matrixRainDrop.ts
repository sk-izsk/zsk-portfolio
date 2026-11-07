const GLYPHS = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789'
const TRAIL_LENGTH = 6
const GLYPH_SWAP_CHANCE = 0.08

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

export interface Drop extends DropTiming {
  char: HTMLElement
  x: number
  y: number
  glyphs: string[]
  isLit: boolean
}

interface DropColors {
  head: string
  trail: string
}

type DropFrame = ReturnType<typeof getDropFrame>

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

// `box` is the text's position on the page, and `headroom` how far above it the rain starts.
export const createDrop = (char: HTMLElement, box: DOMRect, headroom: number): Drop => {
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
}

// Shows the real letter once its column has landed, lit for a moment.
export const updateDropLetter = (drop: Drop, frame: DropFrame) => {
  if (frame.hasLanded && drop.char.style.visibility === 'hidden') {
    drop.char.style.visibility = ''
    drop.char.dataset.lit = ''
    drop.isLit = true
  }

  if (drop.isLit && !frame.isLit) {
    delete drop.char.dataset.lit
    drop.isLit = false
  }
}

export const drawDrop = (
  context: CanvasRenderingContext2D,
  drop: Drop,
  frame: DropFrame,
  fontSize: number,
  colors: DropColors,
) => {
  if (!frame.hasStarted || frame.trailAlpha === 0) {
    return
  }

  drop.glyphs = drop.glyphs.map((glyph) =>
    Math.random() < GLYPH_SWAP_CHANCE ? randomGlyph() : glyph,
  )

  const headY = drop.y * frame.fall

  context.fillStyle = colors.trail
  for (let step = 1; step <= TRAIL_LENGTH; step += 1) {
    context.globalAlpha = (1 - step / (TRAIL_LENGTH + 1)) * frame.trailAlpha
    context.fillText(drop.glyphs[step] ?? '', drop.x, headY - step * fontSize)
  }

  if (frame.showsHead) {
    context.globalAlpha = 1
    context.fillStyle = colors.head
    context.fillText(drop.glyphs[0] ?? '', drop.x, headY)
  }
}
