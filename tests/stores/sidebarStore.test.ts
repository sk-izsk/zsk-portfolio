import { beforeEach, describe, expect, it } from 'vitest'
import { useSidebarStore } from '@stores/sidebarStore'

describe('sidebarStore', () => {
  beforeEach(() => {
    useSidebarStore.setState({ isOpen: false })
  })

  it('starts closed', () => {
    expect(useSidebarStore.getState().isOpen).toBe(false)
  })

  it('toggle opens the sidebar when closed', () => {
    useSidebarStore.getState().toggle()
    expect(useSidebarStore.getState().isOpen).toBe(true)
  })

  it('toggle closes the sidebar when open', () => {
    useSidebarStore.setState({ isOpen: true })
    useSidebarStore.getState().toggle()
    expect(useSidebarStore.getState().isOpen).toBe(false)
  })

  it('close sets isOpen to false', () => {
    useSidebarStore.setState({ isOpen: true })
    useSidebarStore.getState().close()
    expect(useSidebarStore.getState().isOpen).toBe(false)
  })
})
