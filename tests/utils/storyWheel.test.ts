import { describe, expect, it } from 'vitest'
import { getWheelLanding, WHEEL_DAMPING } from '@utils/storyWheel'

const gates = [1000, 3000]
const height = 800

describe('getWheelLanding', () => {
  it('leaves ordinary reading to the browser', () => {
    expect(getWheelLanding(200, 100, gates, height)).toBeNull()
    expect(getWheelLanding(1900, 100, gates, height)).toBeNull()
  })

  it('stops at the point where the next page starts to rise, in both directions', () => {
    expect(getWheelLanding(950, 100, gates, height)).toEqual({ to: 1000, isGate: true })
    expect(getWheelLanding(1010, -100, gates, height)).toEqual({ to: 1000, isGate: true })
  })

  it('moves a shorter step while the page rises', () => {
    expect(getWheelLanding(1000, 100, gates, height)).toEqual({
      to: 1000 + 100 * WHEEL_DAMPING,
      isGate: false,
    })
    expect(getWheelLanding(1500, -100, gates, height)).toEqual({
      to: 1500 - 100 * WHEEL_DAMPING,
      isGate: false,
    })
  })

  it('is done with the rise once the page has docked', () => {
    expect(getWheelLanding(1800, 100, gates, height)).toBeNull()
  })
})
