export type ThemePalette = {
  skin: string
  background: string
  surface: string
  border: string
  text: string
  textMuted: string
  emptyCell: string
  quoteBackground: string
}

export type QuoteItem = {
  text: string
  author: string
}

export type ContributionDay = {
  date: string
  contributionCount: number
}

export type ContributionYearData = {
  startDate: string
  endDate: string
  days: ContributionDay[]
}

export type ContributionYearIndex = {
  generatedAt: string
  username: string
  years: string[]
}

export type ContributionStreakStats = {
  currentStreak: number
  longestStreak: number
  activeDays: number
  totalContributions: number
}

export type ContributionLayout = {
  contentWidth: number
  monthLabels: Array<{ key: string; label: string; x: number }>
  dayLabels: Array<{ key: string; label: string; y: number }>
}

type ContributionGraphMetrics = {
  cellSize: number
  gap: number
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

export const skinByColor = {
  'color-1': '#ec1839',
  'color-2': '#fa5b0f',
  'color-3': '#37b182',
  'color-5': '#f021b2',
  'color-7': '#daa520',
  'color-9': '#00bfff',
} as const

export const DEV_QUOTES: QuoteItem[] = [
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

export const toParamColor = (hex: string) => hex.replace('#', '')

export const getPaletteFromTheme = (
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

export const getContributionShades = (palette: ThemePalette, isDarkMode: boolean) => {
  const blendTarget = isDarkMode ? '#ffffff' : '#0f172a'

  return [
    mixHex(palette.skin, blendTarget, isDarkMode ? 0.12 : 0.05),
    mixHex(palette.skin, blendTarget, isDarkMode ? 0.22 : 0.16),
    mixHex(palette.skin, blendTarget, isDarkMode ? 0.34 : 0.28),
    mixHex(palette.skin, blendTarget, isDarkMode ? 0.46 : 0.4),
  ]
}

export const getCalendarRangeForYear = (selectedYear: number) => ({
  startDate: new Date(Date.UTC(selectedYear, 0, 1)),
  endDate: new Date(Date.UTC(selectedYear, 11, 31)),
})

export const getContributionRange = (selectedYear: number, yearData?: ContributionYearData) => {
  if (!yearData) {
    return getCalendarRangeForYear(selectedYear)
  }

  return {
    startDate: new Date(`${yearData.startDate}T00:00:00Z`),
    endDate: new Date(`${yearData.endDate}T00:00:00Z`),
  }
}

const getGraphMetrics = (isCompact: boolean): ContributionGraphMetrics =>
  isCompact
    ? {
        cellSize: 9,
        gap: 2,
      }
    : {
        cellSize: 13,
        gap: 3,
      }

export const buildContributionLayout = (
  selectedYear: number,
  isCompact: boolean,
  yearData?: ContributionYearData,
): ContributionLayout => {
  const { cellSize, gap } = getGraphMetrics(isCompact)
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

  let cursor = new Date(Date.UTC(selectedYear, 0, 1))
  while (cursor <= endDate) {
    const weekIndex = Math.floor(
      (cursor.getTime() - firstGridDate.getTime()) / (7 * 24 * 60 * 60 * 1000),
    )

    monthLabels.push({
      key: cursor.toISOString().slice(0, 7),
      label: monthFormatter.format(cursor),
      x: Math.max(0, weekIndex) * colWidth,
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

export const buildContributionCalendarSvg = (
  contributionDays: ContributionDay[],
  selectedYear: number,
  palette: ThemePalette,
  isDarkMode: boolean,
  isCompact: boolean,
  yearData?: ContributionYearData,
) => {
  const { cellSize, gap } = getGraphMetrics(isCompact)
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

export const buildContributionStreakStats = (
  yearData: ContributionYearData,
  now = new Date(),
): ContributionStreakStats => {
  const today = now.toISOString().slice(0, 10)
  const streakEndDate = today < yearData.endDate ? today : yearData.endDate
  let longestStreak = 0
  let runningStreak = 0
  let currentStreak = 0
  let activeDays = 0
  let totalContributions = 0

  for (const day of yearData.days) {
    const isActive = day.contributionCount > 0

    if (isActive) {
      runningStreak += 1
      activeDays += 1
      totalContributions += day.contributionCount
      longestStreak = Math.max(longestStreak, runningStreak)
    } else {
      runningStreak = 0
    }

    if (day.date <= streakEndDate) {
      currentStreak = runningStreak
    }
  }

  return {
    currentStreak,
    longestStreak,
    activeDays,
    totalContributions,
  }
}

export const getGithubUsername = (githubUrl?: string): string | null => {
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
