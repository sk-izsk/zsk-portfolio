import { describe, expect, it } from 'vitest'
import { getDropFrame } from '@utils/matrixRainDrop'

const drop = { startAt: 100, fallMs: 500 }

describe('getDropFrame', () => {
  it('waits for its start time', () => {
    const frame = getDropFrame(drop, 50)

    expect(frame.hasStarted).toBe(false)
    expect(frame.showsHead).toBe(false)
    expect(frame.fall).toBe(0)
  })

  it('falls until it reaches the letter', () => {
    const frame = getDropFrame(drop, 350)

    expect(frame.fall).toBe(0.5)
    expect(frame.showsHead).toBe(true)
    expect(frame.hasLanded).toBe(false)
    expect(frame.trailAlpha).toBe(1)
  })

  it('flickers in place, then lands the letter lit', () => {
    expect(getDropFrame(drop, 650).hasLanded).toBe(false)

    const landed = getDropFrame(drop, 800)

    expect(landed.fall).toBe(1)
    expect(landed.showsHead).toBe(false)
    expect(landed.hasLanded).toBe(true)
    expect(landed.isLit).toBe(true)
  })

  it('finishes with the trail gone and the letter settled', () => {
    const frame = getDropFrame(drop, 5000)

    expect(frame.isDone).toBe(true)
    expect(frame.isLit).toBe(false)
    expect(frame.trailAlpha).toBe(0)
  })
})
