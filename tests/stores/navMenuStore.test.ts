import { beforeEach, describe, expect, it } from 'vitest'
import { useNavMenuStore } from '@stores/navMenuStore'

describe('navMenuStore', () => {
  beforeEach(() => {
    useNavMenuStore.setState({ isOpen: false })
  })

  it('starts closed', () => {
    expect(useNavMenuStore.getState().isOpen).toBe(false)
  })

  it('toggle opens the menu when closed', () => {
    useNavMenuStore.getState().toggle()
    expect(useNavMenuStore.getState().isOpen).toBe(true)
  })

  it('toggle closes the menu when open', () => {
    useNavMenuStore.setState({ isOpen: true })
    useNavMenuStore.getState().toggle()
    expect(useNavMenuStore.getState().isOpen).toBe(false)
  })

  it('close sets isOpen to false', () => {
    useNavMenuStore.setState({ isOpen: true })
    useNavMenuStore.getState().close()
    expect(useNavMenuStore.getState().isOpen).toBe(false)
  })
})
