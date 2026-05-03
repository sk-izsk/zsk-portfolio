import { beforeEach, describe, expect, it } from 'vitest'
import { useSoundStore } from '@stores/soundStore'

describe('soundStore', () => {
  beforeEach(() => {
    localStorage.clear()
    useSoundStore.setState({ isSoundEnabled: false })
  })

  it('defaults sound to off', () => {
    expect(useSoundStore.getState().isSoundEnabled).toBe(false)
  })

  it('toggleSound persists updated value', () => {
    useSoundStore.getState().toggleSound()

    expect(useSoundStore.getState().isSoundEnabled).toBe(true)
    expect(localStorage.getItem('sound-preference')).toContain('"isSoundEnabled":true')
  })
})
