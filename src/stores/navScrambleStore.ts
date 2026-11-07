import { create } from 'zustand'

type NavScrambleStore = {
  // How many times the frame has landed on each link, which replays that link's scramble.
  landings: Record<string, number>
  scramble: (path: string) => void
}

export const useNavScrambleStore = create<NavScrambleStore>((set) => ({
  landings: {},
  scramble: (path) =>
    set((state) => ({
      landings: { ...state.landings, [path]: (state.landings[path] ?? 0) + 1 },
    })),
}))
