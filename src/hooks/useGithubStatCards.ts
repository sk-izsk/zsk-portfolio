import type { GithubStatCardProps } from '@components/about/github/GithubStatCard'
import { useTranslation } from '@localization/localize'
import { buildContributionStreakStats, type ContributionYearData } from '@utils/githubHighlights'
import { buildContributionInsights } from '@utils/githubInsights'
import { useMemo } from 'react'

/** The streak and activity insight cards for the selected year, worded in the current language. */
export const useGithubStatCards = (
  yearData: ContributionYearData | null,
): GithubStatCardProps[] => {
  const { t, i18n } = useTranslation()
  const locale = i18n.resolvedLanguage === 'fr' ? 'fr-FR' : 'en-US'

  return useMemo(() => {
    const streak = yearData ? buildContributionStreakStats(yearData) : null
    const insights = yearData ? buildContributionInsights(yearData, locale) : null
    const contributions = (count: number) => t('about.github.insights.contributions', { count })

    return [
      {
        title: t('about.github.cards.streak'),
        unavailableText: t('about.github.streakUnavailable'),
        metrics: streak && [
          {
            label: t('about.github.streak.current'),
            value: `${streak.currentStreak} ${t('about.github.streak.days')}`,
          },
          {
            label: t('about.github.streak.longest'),
            value: `${streak.longestStreak} ${t('about.github.streak.days')}`,
          },
          { label: t('about.github.streak.activeDays'), value: streak.activeDays },
          { label: t('about.github.streak.contributions'), value: streak.totalContributions },
        ],
      },
      {
        title: t('about.github.cards.insights'),
        unavailableText: t('about.github.insightsUnavailable'),
        metrics: insights && [
          {
            label: t('about.github.insights.busiestMonth'),
            value: insights.busiestMonth.label,
            detail: contributions(insights.busiestMonth.count),
          },
          {
            label: t('about.github.insights.busiestWeekday'),
            value: insights.busiestWeekday.label,
            detail: contributions(insights.busiestWeekday.count),
          },
          {
            label: t('about.github.insights.bestDay'),
            value: insights.bestDay.label,
            detail: contributions(insights.bestDay.count),
          },
          {
            label: t('about.github.insights.perActiveDay'),
            value: insights.averagePerActiveDay,
            detail: t('about.github.insights.average'),
          },
        ],
      },
    ]
  }, [yearData, locale, t])
}
