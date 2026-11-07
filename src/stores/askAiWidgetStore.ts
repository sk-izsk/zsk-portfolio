import { create } from 'zustand'

type AskAiWidgetStore = {
  isOpen: boolean
  // The button stops asking for attention once the chat has been opened.
  hasOpened: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

export const useAskAiWidgetStore = create<AskAiWidgetStore>((set) => ({
  isOpen: false,
  hasOpened: false,
  open: () => set({ isOpen: true, hasOpened: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen, hasOpened: true })),
}))
