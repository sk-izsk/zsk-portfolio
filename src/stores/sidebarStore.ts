import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type SidebarStore = {
  isCollapsed: boolean
  toggleCollapsed: () => void
}

// Remembered between visits, so a visitor who prefers the icon column keeps it.
export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set) => ({
      isCollapsed: false,
      toggleCollapsed: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
    }),
    { name: 'zsk-sidebar' },
  ),
)
