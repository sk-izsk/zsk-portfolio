import type { ContributionYearData } from '@utils/githubHighlights'

type Peak = { label: string; count: number }

export type ContributionInsights = {
  busiestMonth: Peak
  busiestWeekday: Peak
  bestDay: Peak
  averagePerActiveDay: number
}

const peakOf = (totals: Map<string, number>): Peak =>
  [...totals].reduce<Peak>(
    (best, [label, count]) => (count > best.count ? { label, count } : best),
    { label: '', count: 0 },
  )

const addTo = (totals: Map<string, number>, key: string, count: number) =>
  totals.set(key, (totals.get(key) ?? 0) + count)

/** Busiest month and weekday, best single day and the average per active day, or null with no activity. */
export const buildContributionInsights = (
  yearData: ContributionYearData,
  locale: string,
): ContributionInsights | null => {
  const month = new Intl.DateTimeFormat(locale, { month: 'long', timeZone: 'UTC' })
  const weekday = new Intl.DateTimeFormat(locale, { weekday: 'long', timeZone: 'UTC' })
  const shortDate = new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })
  const byMonth = new Map<string, number>()
  const byWeekday = new Map<string, number>()
  let bestDay: Peak = { label: '', count: 0 }
  let activeDays = 0
  let total = 0

  for (const { date, contributionCount: count } of yearData.days) {
    if (count === 0) {
      continue
    }

    const day = new Date(`${date}T00:00:00Z`)
    addTo(byMonth, month.format(day), count)
    addTo(byWeekday, weekday.format(day), count)
    if (count > bestDay.count) {
      bestDay = { label: shortDate.format(day), count }
    }
    activeDays += 1
    total += count
  }

  if (!activeDays) {
    return null
  }

  return {
    busiestMonth: peakOf(byMonth),
    busiestWeekday: peakOf(byWeekday),
    bestDay,
    averagePerActiveDay: Math.round((total / activeDays) * 10) / 10,
  }
}
