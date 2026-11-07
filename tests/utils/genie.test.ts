import { describe, expect, it } from 'vitest'
import { getGenieKeyframes } from '@utils/genie'

const box = { left: 100, top: 100, width: 400, height: 600 }
const target = { x: 480, y: 800 }
const ROWS = 20
const FRAMES = 20

const translateX = (keyframe: Keyframe) =>
  Number(/translate\((-?[\d.]+)px/.exec(String(keyframe.transform))?.[1])

describe('getGenieKeyframes', () => {
  it('starts every row at rest', () => {
    const [first] = getGenieKeyframes(box, target, 5, ROWS, FRAMES)

    expect(first?.transform).toBe('translate(0px, 0px) scale(1, 1)')
    expect(first?.opacity).toBe(1)
  })

  it('ends every row collapsed on the target and faded out', () => {
    for (const row of [0, 10, ROWS - 1]) {
      const last = getGenieKeyframes(box, target, row, ROWS, FRAMES).at(-1)
      const rowCenterY = box.top + (box.height / ROWS) * (row + 0.5)

      expect(last?.transform).toBe(
        `translate(${target.x - 300}px, ${target.y - rowCenterY}px) scale(0.04, 0.001)`,
      )
      expect(last?.opacity).toBe(0)
    }
  })

  it('keeps neighboring rows touching, so no gaps open while it squeezes', () => {
    const rowHeight = box.height / ROWS
    const parse = (keyframe: Keyframe) => {
      const match = /translate\(.*?px, (-?[\d.e-]+)px\) scale\(.*?, ([\d.]+)\)/.exec(
        String(keyframe.transform),
      )

      return { y: Number(match?.[1]), scaleY: Number(match?.[2]) }
    }
    const edges = (row: number, frame: number) => {
      const { y, scaleY } = parse(getGenieKeyframes(box, target, row, ROWS, FRAMES)[frame]!)
      const center = box.top + rowHeight * (row + 0.5) + y

      return { top: center - (rowHeight * scaleY) / 2, bottom: center + (rowHeight * scaleY) / 2 }
    }

    for (let row = 0; row < ROWS - 1; row += 1) {
      expect(edges(row, 10).bottom).toBeCloseTo(edges(row + 1, 10).top, 0)
    }
  })

  it('sends the rows nearest the target first, which is what curves the window', () => {
    const middleFrame = FRAMES / 2
    const nearest = getGenieKeyframes(box, target, ROWS - 1, ROWS, FRAMES)[middleFrame]!
    const farthest = getGenieKeyframes(box, target, 0, ROWS, FRAMES)[middleFrame]!

    expect(translateX(nearest)).toBeGreaterThan(translateX(farthest))
  })

  it('sends the top rows first when the target is above the window', () => {
    const above = { x: 480, y: 20 }
    const middleFrame = FRAMES / 2
    const nearest = getGenieKeyframes(box, above, 0, ROWS, FRAMES)[middleFrame]!
    const farthest = getGenieKeyframes(box, above, ROWS - 1, ROWS, FRAMES)[middleFrame]!

    expect(translateX(nearest)).toBeGreaterThan(translateX(farthest))
  })
})
