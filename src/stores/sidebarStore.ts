import { create } from 'zustand'

type SidebarStore = {
  isOpen: boolean
  isDesktopCollapsed: boolean
  toggle: () => void
  close: () => void
  toggleDesktopCollapsed: () => void
}

const getInitialDesktopCollapsed = () => {
  if (typeof window === 'undefined') {
    return false
  }

  return window.localStorage.getItem('portfolio-sidebar-collapsed') === 'true'
}

export const useSidebarStore = create<SidebarStore>((set, get) => ({
  isOpen: false,
  isDesktopCollapsed: getInitialDesktopCollapsed(),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  close: () => set({ isOpen: false }),
  toggleDesktopCollapsed: () => {
    const nextValue = !get().isDesktopCollapsed

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('portfolio-sidebar-collapsed', String(nextValue))
    }

    set({ isDesktopCollapsed: nextValue })
  },
}))
