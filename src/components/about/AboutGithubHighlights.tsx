import {
  githubContributionDayLabel,
  githubContributionDays,
  githubContributionFrame,
  githubStatsBottomGrid,
  githubStatsCard,
  githubStatsCardHeader,
  githubStatsCardTitle,
  githubContributionImage,
  githubContributionLegend,
  githubContributionLegendSwatch,
  githubContributionLegendSwatches,
  githubContributionLoading,
  githubContributionMonthLabel,
  githubContributionMonths,
  githubContributionPanel,
  githubStatsDescription,
  githubStatsEyebrow,
  githubStatsGrid,
  githubStatsHeader,
  githubStatsLink,
  githubStatsMedia,
  githubStatsSelect,
  githubQuoteAuthor,
  githubQuoteBox,
  githubQuoteText,
  githubStatsTitle,
} from '@components/about/about.css'
import { Button } from '@components/common/button/Button'
import { useTranslation } from '@localization/localize'
import { useContactInfo } from '@stores/portfolioStore'
import { useThemeStore } from '@stores/themeStore'
import React, { useEffect, useMemo, useState } from 'react'

type ThemePalette = {
  skin: string
  background: string
  surface: string
  border: string
  text: string
  textMuted: string
  emptyCell: string
  quoteBackground: string
}

type QuoteItem = {
  text: string
  author: string
}

type ContributionLayout = {
  contentWidth: number
  monthLabels: Array<{ key: string; label: string; x: number }>
  dayLabels: Array<{ key: string; label: string; y: number }>
}

type ContributionDay = {
  date: string
  contributionCount: number
}

type ContributionYearData = {
  startDate: string
  endDate: string
  days: ContributionDay[]
}

type ContributionArchive = {
  generatedAt: string
  username: string
  years: Record<string, ContributionYearData>
}

const DEFAULT_LIGHT_PALETTE: ThemePalette = {
  skin: '#37b182',
  background: '#f2f2fc',
  surface: '#fdf9ff',
  border: '#e8dfec',
  text: '#302e4d',
  textMuted: '#504e70',
  emptyCell: '#e8dfec',
  quoteBackground: '#ffffff',
}

const DEFAULT_DARK_PALETTE: ThemePalette = {
  skin: '#37b182',
  background: '#151515',
  surface: '#222222',
  border: '#393939',
  text: '#ffffff',
  textMuted: '#e9e9e9',
  emptyCell: '#393939',
  quoteBackground: '#1b1b1b',
}

const skinByColor = {
  'color-1': '#ec1839',
  'color-2': '#fa5b0f',
  'color-3': '#37b182',
  'color-5': '#f021b2',
  'color-7': '#daa520',
  'color-9': '#00bfff',
} as const

const hexToRgb = (hex: string) => {
  const normalized = hex.replace('#', '')
  const safeHex =
    normalized.length === 3
      ? normalized
          .split('')
          .map((value) => value + value)
          .join('')
      : normalized

  const numeric = Number.parseInt(safeHex, 16)

  return {
    r: (numeric >> 16) & 255,
    g: (numeric >> 8) & 255,
    b: numeric & 255,
  }
}

const rgbToHex = ({ r, g, b }: { r: number; g: number; b: number }) =>
  `#${[r, g, b]
    .map((value) => Math.max(0, Math.min(255, Math.round(value))).toString(16).padStart(2, '0'))
    .join('')}`

const mixHex = (baseHex: string, targetHex: string, amount: number) => {
  const base = hexToRgb(baseHex)
  const target = hexToRgb(targetHex)

  return rgbToHex({
    r: base.r + (target.r - base.r) * amount,
    g: base.g + (target.g - base.g) * amount,
    b: base.b + (target.b - base.b) * amount,
  })
}

const toParamColor = (hex: string) => hex.replace('#', '')

const getPaletteFromTheme = (
  isDarkMode: boolean,
  currentColor: keyof typeof skinByColor,
): ThemePalette => {
  const base = isDarkMode ? DEFAULT_DARK_PALETTE : DEFAULT_LIGHT_PALETTE
  const skin = skinByColor[currentColor] ?? DEFAULT_LIGHT_PALETTE.skin

  return {
    ...base,
    skin,
    emptyCell: mixHex(base.surface, base.border, isDarkMode ? 0.78 : 0.52),
    quoteBackground: mixHex(base.surface, base.background, isDarkMode ? 0.2 : 0.06),
  }
}

const DEV_QUOTES: QuoteItem[] = [
  {
    text: 'Simplicity is prerequisite for reliability.',
    author: 'Edsger W. Dijkstra',
  },
  {
    text: 'Programs must be written for people to read, and only incidentally for machines to execute.',
    author: 'Harold Abelson',
  },
  {
    text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    author: 'Martin Fowler',
  },
  {
    text: 'The most disastrous thing that you can ever learn is your first programming language.',
    author: 'Alan Kay',
  },
  {
    text: 'First, solve the problem. Then, write the code.',
    author: 'John Johnson',
  },
]

const getContributionShades = (palette: ThemePalette, isDarkMode: boolean) => {
  const blendTarget = isDarkMode ? '#ffffff' : '#0f172a'

  return [
    mixHex(palette.skin, blendTarget, isDarkMode ? 0.12 : 0.05),
    mixHex(palette.skin, blendTarget, isDarkMode ? 0.22 : 0.16),
    mixHex(palette.skin, blendTarget, isDarkMode ? 0.34 : 0.28),
    mixHex(palette.skin, blendTarget, isDarkMode ? 0.46 : 0.4),
  ]
}

const getRollingRangeForYear = (selectedYear: number) => {
  const today = new Date()
  const month = today.getMonth()
  const day = today.getDate()
  const endDate = new Date(Date.UTC(selectedYear, month + 1, 0))
  endDate.setUTCDate(Math.min(day, endDate.getUTCDate()))

  const startDate = new Date(endDate)
  startDate.setUTCDate(endDate.getUTCDate() - 364)

  return { startDate, endDate }
}

const getContributionRange = (selectedYear: number, yearData?: ContributionYearData) => {
  if (!yearData) {
    return getRollingRangeForYear(selectedYear)
  }

  return {
    startDate: new Date(`${yearData.startDate}T00:00:00Z`),
    endDate: new Date(`${yearData.endDate}T00:00:00Z`),
  }
}

const buildContributionLayout = (
  selectedYear: number,
  yearData?: ContributionYearData,
): ContributionLayout => {
  const cellSize = 13
  const gap = 3
  const colWidth = cellSize + gap
  const rowHeight = cellSize + gap
  const { startDate, endDate } = getContributionRange(selectedYear, yearData)
  const firstGridDate = new Date(startDate)
  firstGridDate.setUTCDate(firstGridDate.getUTCDate() - firstGridDate.getUTCDay())
  const lastGridDate = new Date(endDate)
  lastGridDate.setUTCDate(lastGridDate.getUTCDate() + (6 - lastGridDate.getUTCDay()))
  const totalDays =
    Math.floor((lastGridDate.getTime() - firstGridDate.getTime()) / (24 * 60 * 60 * 1000)) + 1
  const totalWeeks = Math.ceil(totalDays / 7)
  const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'UTC' })
  const monthLabels: Array<{ key: string; label: string; x: number }> = []

  let cursor = new Date(Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), 1))
  while (cursor <= endDate) {
    const weekIndex = Math.floor(
      (cursor.getTime() - firstGridDate.getTime()) / (7 * 24 * 60 * 60 * 1000),
    )

    monthLabels.push({
      key: cursor.toISOString().slice(0, 7),
      label: monthFormatter.format(cursor),
      x: Math.max(0, weekIndex) * colWidth + cellSize / 2,
    })

    cursor = new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth() + 1, 1))
  }

  return {
    contentWidth: totalWeeks * colWidth,
    monthLabels,
    dayLabels: [
      { key: 'mon', label: 'Mon', y: rowHeight * 1 + cellSize / 2 },
      { key: 'wed', label: 'Wed', y: rowHeight * 3 + cellSize / 2 },
      { key: 'fri', label: 'Fri', y: rowHeight * 5 + cellSize / 2 },
    ],
  }
}

const buildContributionCalendarSvg = (
  contributionDays: ContributionDay[],
  selectedYear: number,
  palette: ThemePalette,
  isDarkMode: boolean,
  yearData?: ContributionYearData,
) => {
  const cellSize = 13
  const gap = 3
  const colWidth = cellSize + gap
  const rowHeight = cellSize + gap
  const { startDate, endDate } = getContributionRange(selectedYear, yearData)
  const firstGridDate = new Date(startDate)
  firstGridDate.setUTCDate(firstGridDate.getUTCDate() - firstGridDate.getUTCDay())
  const lastGridDate = new Date(endDate)
  lastGridDate.setUTCDate(lastGridDate.getUTCDate() + (6 - lastGridDate.getUTCDay()))
  const totalDays =
    Math.floor((lastGridDate.getTime() - firstGridDate.getTime()) / (24 * 60 * 60 * 1000)) + 1
  const totalWeeks = Math.ceil(totalDays / 7)
  const width = totalWeeks * colWidth
  const height = 7 * rowHeight
  const countsByDate = new Map(contributionDays.map((day) => [day.date, day.contributionCount]))
  const shades = [palette.emptyCell, ...getContributionShades(palette, isDarkMode)]
  const cells: string[] = []

  for (let weekIndex = 0; weekIndex < totalWeeks; weekIndex += 1) {
    const weekDate = new Date(firstGridDate)
    weekDate.setUTCDate(firstGridDate.getUTCDate() + weekIndex * 7)

    for (let dayIndex = 0; dayIndex < 7; dayIndex += 1) {
      const currentDate = new Date(weekDate)
      currentDate.setUTCDate(weekDate.getUTCDate() + dayIndex)
      const isoDate = currentDate.toISOString().slice(0, 10)
      const count = countsByDate.get(isoDate) ?? 0
      const shadeIndex =
        count === 0 ? 0 : count >= 12 ? 4 : count >= 8 ? 3 : count >= 4 ? 2 : 1

      cells.push(
        `<rect x="${weekIndex * colWidth}" y="${dayIndex * rowHeight}" width="${cellSize}" height="${cellSize}" rx="2" ry="2" fill="${shades[shadeIndex]}" />`,
      )
    }
  }

  return `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMinYMin meet" role="img" aria-label="GitHub contribution heatmap"><g>${cells.join(
    '',
  )}</g></svg>`
}

const getGithubUsername = (githubUrl?: string): string | null => {
  if (!githubUrl) {
    return null
  }

  try {
    const { pathname } = new URL(githubUrl)
    const username = pathname.split('/').filter(Boolean)[0]
    return username || null
  } catch {
    return null
  }
}

export const AboutGithubHighlights: React.FC = () => {
  const { t } = useTranslation()
  const contact = useContactInfo()
  const isDarkMode = useThemeStore((state) => state.isDarkMode)
  const currentColor = useThemeStore((state) => state.currentColor)
  const githubUrl = contact?.social.github?.url
  const githubUsername = getGithubUsername(githubUrl)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedQuote] = useState<QuoteItem>(() => {
    const index = Math.floor(Math.random() * DEV_QUOTES.length)
    return DEV_QUOTES[index] ?? DEV_QUOTES[0]
  })
  const [contributionArchive, setContributionArchive] = useState<ContributionArchive | null>(null)
  const [isGraphLoading, setIsGraphLoading] = useState(true)
  const [graphError, setGraphError] = useState(false)

  if (!githubUrl || !githubUsername) {
    return null
  }

  const yearOptions = useMemo(() => {
    if (contributionArchive) {
      return Object.keys(contributionArchive.years)
        .map(Number)
        .sort((left, right) => right - left)
    }

    const currentYear = new Date().getFullYear()
    return Array.from({ length: currentYear - 2018 + 1 }, (_, index) => currentYear - index)
  }, [contributionArchive])

  const palette = getPaletteFromTheme(isDarkMode, currentColor)
  const contributionColors = getContributionShades(palette, isDarkMode)
  const selectedYearData = contributionArchive?.years[String(selectedYear)]
  const contributionDays = selectedYearData?.days ?? []
  const contributionLayout = useMemo(
    () => buildContributionLayout(selectedYear, selectedYearData),
    [selectedYear, selectedYearData],
  )
  const contributionGraphSvg = useMemo(
    () =>
      buildContributionCalendarSvg(
        contributionDays,
        selectedYear,
        palette,
        isDarkMode,
        selectedYearData,
      ),
    [contributionDays, selectedYear, palette, isDarkMode, selectedYearData],
  )
  const streakStatsUrl = `https://streak-stats.demolab.com?user=${githubUsername}&hide_border=true&background=${toParamColor(
    palette.surface,
  )}&border=${toParamColor(palette.border)}&stroke=${toParamColor(
    palette.border,
  )}&ring=${toParamColor(palette.skin)}&fire=${toParamColor(
    palette.skin,
  )}&currStreakNum=${toParamColor(palette.skin)}&sideNums=${toParamColor(
    palette.skin,
  )}&currStreakLabel=${toParamColor(palette.skin)}&sideLabels=${toParamColor(
    palette.text,
  )}&dates=${toParamColor(palette.textMuted)}&excludeDaysLabel=${toParamColor(
    palette.textMuted,
  )}&locale=en`

  useEffect(() => {
    let cancelled = false

    const loadContributionArchive = async () => {
      setIsGraphLoading(true)
      setGraphError(false)

      try {
        const response = await fetch(`/github-contributions/${githubUsername}.json`, {
          cache: 'no-store',
        })

        if (!response.ok) {
          throw new Error(`Contribution archive request failed: ${response.status}`)
        }

        const raw = (await response.json()) as ContributionArchive

        if (cancelled) {
          return
        }

        setContributionArchive(raw)
        setGraphError(false)
      } catch {
        if (!cancelled) {
          setContributionArchive(null)
          setGraphError(true)
        }
      } finally {
        if (!cancelled) {
          setIsGraphLoading(false)
        }
      }
    }

    void loadContributionArchive()

    return () => {
      cancelled = true
    }
  }, [githubUsername])

  return (
    <>
      <div className={githubStatsHeader}>
        <div>
          <p className={githubStatsEyebrow}>{t('about.github.eyebrow')}</p>
          <h3 className={githubStatsTitle}>{t('about.github.title')}</h3>
          <p className={githubStatsDescription}>{t('about.github.description')}</p>
        </div>
        <Button
          as="a"
          href={githubUrl}
          variant="secondary"
          size="small"
          className={githubStatsLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('about.github.profileLink')}
        </Button>
      </div>
      <div className={githubStatsGrid}>
        <article className={githubStatsCard}>
          <div className={githubStatsCardHeader}>
            <h4 className={githubStatsCardTitle}>{t('about.github.cards.contributions')}</h4>
            <select
              className={githubStatsSelect}
              value={selectedYear}
              onChange={(event) => setSelectedYear(Number(event.target.value))}
              aria-label={t('about.github.yearSelector')}
            >
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className={githubStatsMedia}>
            <div className={githubContributionPanel}>
              {isGraphLoading ? (
                <div className={githubContributionLoading}>
                  {t('about.github.loadingYear', { year: selectedYear })}
                </div>
              ) : null}
              {graphError ? (
                <div className={githubContributionLoading}>{t('about.github.loadFailed')}</div>
              ) : (
                <div
                  className={githubContributionFrame}
                  style={{ width: `${contributionLayout.contentWidth + 34}px` }}
                >
                  <div className={githubContributionMonths}>
                    {contributionLayout.monthLabels.map((month) => (
                      <span
                        key={month.key}
                        className={githubContributionMonthLabel}
                        style={{ left: `${month.x}px` }}
                      >
                        {month.label}
                      </span>
                    ))}
                  </div>
                  <div className={githubContributionDays}>
                    {contributionLayout.dayLabels.map((day) => (
                      <span
                        key={day.key}
                        className={githubContributionDayLabel}
                        style={{ top: `${day.y}px` }}
                      >
                        {day.label}
                      </span>
                    ))}
                  </div>
                  <div
                    className={githubContributionImage}
                    dangerouslySetInnerHTML={{ __html: contributionGraphSvg }}
                  />
                  <div className={githubContributionLegend}>
                    <span>Less</span>
                    <div className={githubContributionLegendSwatches}>
                      {[palette.emptyCell, ...contributionColors].map((shade, index) => (
                        <span
                          key={`${shade}-${index}`}
                          className={githubContributionLegendSwatch}
                          style={{ backgroundColor: shade }}
                        />
                      ))}
                    </div>
                    <span>More</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </article>
      </div>
      <div className={githubStatsBottomGrid}>
        {[
          {
            title: t('about.github.cards.streak'),
            href: githubUrl,
            imageUrl: streakStatsUrl,
            alt: t('about.github.alt.streak', { username: githubUsername }),
          },
          {
            title: t('about.github.cards.quote'),
            href: githubUrl,
            quote: selectedQuote,
          },
        ].map((card) => (
          <article key={card.title} className={githubStatsCard}>
            <h4 className={githubStatsCardTitle}>{card.title}</h4>
            {'imageUrl' in card ? (
              <div className={githubStatsMedia}>
                <img src={card.imageUrl} alt={card.alt} loading="lazy" decoding="async" />
              </div>
            ) : (
              <div className={githubQuoteBox}>
                <p className={githubQuoteText}>&ldquo;{card.quote.text}&rdquo;</p>
                <p className={githubQuoteAuthor}>- {card.quote.author}</p>
              </div>
            )}
          </article>
        ))}
      </div>
    </>
  )
}
