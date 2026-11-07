import { create } from 'zustand'

// waiting: not reached, so the letters stay hidden. raining: each new quote rains in.
// resting: scrolled past or no scene running, so the quote is plain text and draws nothing.
type QuoteRainPhase = 'waiting' | 'raining' | 'resting'

type QuoteRainStore = {
  phase: QuoteRainPhase
  setPhase: (phase: QuoteRainPhase) => void
}

export const useQuoteRainStore = create<QuoteRainStore>((set) => ({
  phase: 'resting',
  setPhase: (phase) => set({ phase }),
}))
