import { describe, expect, it } from 'vitest'
import { getSpotAt, type FrameSpot, type FrameStop } from '@utils/storyFrame'

const spot = (left: number, size = 80): FrameSpot => ({
  left,
  top: 0,
  right: left + 100,
  bottom: 100,
  size,
})

const stops: FrameStop[] = [
  { at: 100, spot: () => spot(0, 80) },
  { at: 200, spot: () => spot(100, 40) },
  { at: 300, spot: () => spot(100, 40) },
]

describe('getSpotAt', () => {
  it('has no spot without stops', () => {
    expect(getSpotAt([], 50)).toBeNull()
  })

  it('stays on the first and last stops outside their range', () => {
    expect(getSpotAt(stops, 0)?.left).toBe(0)
    expect(getSpotAt(stops, 999)?.left).toBe(100)
  })

  it('lands exactly on a stop', () => {
    expect(getSpotAt(stops, 200)).toEqual(spot(100, 40))
  })

  it('moves between stops, and holds between two equal ones', () => {
    expect(getSpotAt(stops, 150)).toMatchObject({ left: 50, size: 60 })
    expect(getSpotAt(stops, 250)?.left).toBe(100)
  })

  it('skips over stops at the same position without dividing by zero', () => {
    const doubled = [stops[0]!, { at: 100, spot: () => spot(50) }, stops[1]!]

    expect(Number.isFinite(getSpotAt(doubled, 150)?.left)).toBe(true)
  })

  it('lets a spot follow the scroll position', () => {
    const following: FrameStop[] = [
      { at: 0, spot: (scrollY) => spot(scrollY) },
      { at: 100, spot: (scrollY) => spot(scrollY) },
    ]

    expect(getSpotAt(following, 40)?.left).toBe(40)
  })
})
