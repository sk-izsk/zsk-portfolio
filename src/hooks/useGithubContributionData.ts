import { useEffect, useMemo, useState } from 'react'

import type { ContributionYearData, ContributionYearIndex } from '@utils/githubHighlights'

type UseGithubContributionDataResult = {
  isGraphLoading: boolean
  graphError: boolean
  isMobileGraph: boolean
  selectedYearData: ContributionYearData | null
  yearOptions: string[]
}

export const useGithubContributionData = (
  githubUsername: string | null,
  selectedYear: string,
): UseGithubContributionDataResult => {
  const [yearIndex, setYearIndex] = useState<ContributionYearIndex | null>(null)
  const [selectedYearData, setSelectedYearData] = useState<ContributionYearData | null>(null)
  const [isGraphLoading, setIsGraphLoading] = useState(true)
  const [graphError, setGraphError] = useState(false)
  const [isMobileGraph, setIsMobileGraph] = useState(false)

  const yearOptions = useMemo(() => {
    if (yearIndex) {
      return [...yearIndex.years].sort((left, right) => Number(right) - Number(left))
    }

    const currentYear = new Date().getFullYear()
    return Array.from({ length: currentYear - 2018 + 1 }, (_, index) => String(currentYear - index))
  }, [yearIndex])

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return
    }

    const mediaQuery = window.matchMedia('(max-width: 767px)')
    const syncMobileGraph = (event?: MediaQueryList | MediaQueryListEvent) => {
      setIsMobileGraph(event?.matches ?? mediaQuery.matches)
    }

    syncMobileGraph(mediaQuery)
    mediaQuery.addEventListener('change', syncMobileGraph)

    return () => {
      mediaQuery.removeEventListener('change', syncMobileGraph)
    }
  }, [])

  useEffect(() => {
    if (!githubUsername) {
      return
    }

    let cancelled = false

    const loadYearIndex = async () => {
      try {
        const response = await fetch(`/github-contributions/${githubUsername}/index.json`, {
          cache: 'no-store',
        })

        if (!response.ok) {
          throw new Error(`Contribution year index request failed: ${response.status}`)
        }

        const raw = (await response.json()) as ContributionYearIndex

        if (!cancelled) {
          setYearIndex(raw)
        }
      } catch {
        if (!cancelled) {
          setYearIndex(null)
          setGraphError(true)
          setIsGraphLoading(false)
        }
      }
    }

    void loadYearIndex()

    return () => {
      cancelled = true
    }
  }, [githubUsername])

  useEffect(() => {
    if (!githubUsername) {
      return
    }

    let cancelled = false

    const loadSelectedYear = async () => {
      setIsGraphLoading(true)
      setGraphError(false)

      try {
        const response = await fetch(
          `/github-contributions/${githubUsername}/${selectedYear}.json`,
          { cache: 'no-store' },
        )

        if (!response.ok) {
          throw new Error(`Contribution year request failed: ${response.status}`)
        }

        const raw = (await response.json()) as ContributionYearData

        if (!cancelled) {
          setSelectedYearData(raw)
          setGraphError(false)
        }
      } catch {
        if (!cancelled) {
          setSelectedYearData(null)
          setGraphError(true)
        }
      } finally {
        if (!cancelled) {
          setIsGraphLoading(false)
        }
      }
    }

    void loadSelectedYear()

    return () => {
      cancelled = true
    }
  }, [githubUsername, selectedYear])

  return {
    isGraphLoading,
    graphError,
    isMobileGraph,
    selectedYearData,
    yearOptions,
  }
}
