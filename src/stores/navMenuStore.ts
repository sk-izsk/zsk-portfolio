import { create } from 'zustand'

type NavMenuStore = {
  isOpen: boolean
  toggle: () => void
  close: () => void
}

export const useNavMenuStore = create<NavMenuStore>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  close: () => set({ isOpen: false }),
}))
