import { create } from "zustand"
import type { PortfolioData } from "../types/portfolio"

interface PortfolioStore {
  // State
  data: PortfolioData | null
  loading: boolean
  error: string | null

  // Actions
  setData: (data: PortfolioData) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  // Initial state
  data: null,
  loading: false,
  error: null,

  // Actions
  setData: (data) => set({ data, loading: false, error: null }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error, loading: false }),
  reset: () => set({ data: null, loading: false, error: null }),
}))

// Selector hooks for specific data sections to avoid unnecessary re-renders
export const usePersonalInfo = () =>
  usePortfolioStore((state) => state.data?.personalInfo)

export const useContactInfo = () =>
  usePortfolioStore((state) => state.data?.contact)

export const useSkills = () => usePortfolioStore((state) => state.data?.skills)

export const useEducation = () =>
  usePortfolioStore((state) => state.data?.education)

export const useExperience = () =>
  usePortfolioStore((state) => state.data?.experience)

export const useServices = () =>
  usePortfolioStore((state) => state.data?.services)

export const useBlog = () => usePortfolioStore((state) => state.data?.blog)

// Loading state selectors
export const usePortfolioLoading = () =>
  usePortfolioStore((state) => state.loading)

export const usePortfolioError = () => usePortfolioStore((state) => state.error)
