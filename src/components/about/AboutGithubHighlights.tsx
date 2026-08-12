import { githubStatsGrid } from '@components/about/about.css'
import { GithubContributionCard } from '@components/about/github/GithubContributionCard'
import { GithubHighlightsHeader } from '@components/about/github/GithubHighlightsHeader'
import { GithubSupplementaryCards } from '@components/about/github/GithubSupplementaryCards'
import { useGithubContributionData } from '@hooks/useGithubContributionData'
import { useTranslation } from '@localization/localize'
import { useContactInfo } from '@stores/portfolioStore'
import { useThemeStore } from '@stores/themeStore'
import {
  buildContributionCalendarSvg,
  buildContributionLayout,
  type ContributionDay,
  getContributionShades,
  getGithubUsername,
  getPaletteFromTheme,
} from '@utils/githubHighlights'
import React, { useMemo, useState } from 'react'

const EMPTY_CONTRIBUTION_DAYS: ContributionDay[] = []

export const AboutGithubHighlights: React.FC = () => {
  const { t } = useTranslation()
  const contact = useContactInfo()
  const isDarkMode = useThemeStore((state) => state.isDarkMode)
  const currentColor = useThemeStore((state) => state.currentColor)
  const githubUrl = contact?.social.github?.url
  const githubUsername = getGithubUsername(githubUrl)
  const [selectedYear, setSelectedYear] = useState(String(new Date().getFullYear()))

  const { isGraphLoading, graphError, isMobileGraph, selectedYearData, yearOptions } =
    useGithubContributionData(githubUsername, selectedYear)

  if (!githubUrl || !githubUsername) {
    return null
  }

  const selectedYearNumber = Number(selectedYear)
  const palette = getPaletteFromTheme(isDarkMode, currentColor)
  const contributionColors = getContributionShades(palette, isDarkMode)
  const contributionDays = selectedYearData?.days ?? EMPTY_CONTRIBUTION_DAYS
  const contributionLayout = useMemo(
    () => buildContributionLayout(selectedYearNumber, isMobileGraph, selectedYearData ?? undefined),
    [selectedYearNumber, isMobileGraph, selectedYearData],
  )
  const contributionGraphSvg = useMemo(
    () =>
      buildContributionCalendarSvg(
        contributionDays,
        selectedYearNumber,
        palette,
        isDarkMode,
        isMobileGraph,
        selectedYearData ?? undefined,
      ),
    [
      contributionDays,
      selectedYearNumber,
      palette,
      isDarkMode,
      isMobileGraph,
      selectedYearData,
    ],
  )
  return (
    <>
      <GithubHighlightsHeader
        eyebrow={t('about.github.eyebrow')}
        title={t('about.github.title')}
        description={t('about.github.description')}
        profileLabel={t('about.github.profileLink')}
        githubUrl={githubUrl}
      />
      <div className={githubStatsGrid}>
        <GithubContributionCard
          title={t('about.github.cards.contributions')}
          picker={{
            selectedYear,
            yearOptions,
            yearSelectorLabel: t('about.github.yearSelector'),
            onYearChange: setSelectedYear,
          }}
          status={{
            isLoading: isGraphLoading,
            hasError: graphError,
            loadingText: t('about.github.loadingYear', { year: selectedYearNumber }),
            errorText: t('about.github.loadFailed'),
          }}
          graph={{
            contributionLayout,
            contributionGraphSvg,
            contributionColors,
            emptyCellColor: palette.emptyCell,
            isMobileGraph,
          }}
        />
      </div>
      <GithubSupplementaryCards
        streakTitle={t('about.github.cards.streak')}
        streakUnavailableText={t('about.github.streakUnavailable')}
      />
    </>
  )
}
