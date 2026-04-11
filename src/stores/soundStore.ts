import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SoundState {
  isSoundEnabled: boolean
  toggleSound: () => void
}

export const useSoundStore = create<SoundState>()(
  persist(
    (set) => ({
      isSoundEnabled: true,
      toggleSound: () => set((state) => ({ isSoundEnabled: !state.isSoundEnabled })),
    }),
    {
      name: 'sound-preference',
    },
  ),
)
