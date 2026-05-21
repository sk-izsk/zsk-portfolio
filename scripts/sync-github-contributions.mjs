import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const outputDirectory = path.join(projectRoot, 'public', 'github-contributions')
const usernames = ['sk-izsk']
const startYear = 2018
const levelToContributionCount = [0, 2, 6, 12, 20]

const getCalendarRangeForYear = (selectedYear) => ({
  startDate: new Date(Date.UTC(selectedYear, 0, 1)),
  endDate: new Date(Date.UTC(selectedYear, 11, 31)),
})

const formatDate = (date) => date.toISOString().slice(0, 10)

const parseGithubCalendar = (html) => {
  const dayMatches = html.matchAll(/data-date="([^"]+)"[^>]*data-level="([^"]+)"/g)
  const days = []

  for (const match of dayMatches) {
    const date = match[1]
    const level = Number(match[2] ?? 0)

    days.push({
      date,
      contributionCount: levelToContributionCount[level] ?? 0,
    })
  }

  return days
}

const fetchGithubCalendarYear = async (username, year) => {
  const response = await fetch(`https://github.com/users/${username}/contributions?to=${year}-12-31`)

  if (!response.ok) {
    throw new Error(`GitHub calendar request failed for ${username} ${year}: ${response.status}`)
  }

  const html = await response.text()
  return parseGithubCalendar(html)
}

const readExistingYearData = async (username, year) => {
  try {
    const filePath = path.join(outputDirectory, username, `${year}.json`)
    const file = await readFile(filePath, 'utf8')
    return JSON.parse(file)
  } catch {
    return null
  }
}

const fetchYearData = async (username, year) => {
  const { startDate, endDate } = getCalendarRangeForYear(year)
  const from = formatDate(startDate)
  const to = formatDate(endDate)
  const days = (await fetchGithubCalendarYear(username, year))
    .filter((item) => item.date >= from && item.date <= to)
    .sort((left, right) => left.date.localeCompare(right.date))

  return {
    startDate: from,
    endDate: to,
    days,
  }
}

const syncUserDirectory = async (username) => {
  const currentYear = new Date().getFullYear()
  const userDirectory = path.join(outputDirectory, username)
  const years = []

  await mkdir(userDirectory, { recursive: true })

  for (let year = startYear; year <= currentYear; year += 1) {
    const yearKey = String(year)
    years.push(yearKey)

    try {
      const yearData = await fetchYearData(username, year)
      await writeFile(path.join(userDirectory, `${year}.json`), `${JSON.stringify(yearData, null, 2)}\n`)
    } catch (error) {
      const existingYearData = await readExistingYearData(username, year)

      if (!existingYearData) {
        throw error
      }
    }
  }

  const yearIndex = {
    generatedAt: new Date().toISOString(),
    username,
    years,
  }

  await writeFile(path.join(userDirectory, 'index.json'), `${JSON.stringify(yearIndex, null, 2)}\n`)
}

const main = async () => {
  await mkdir(outputDirectory, { recursive: true })

  for (const username of usernames) {
    await rm(path.join(outputDirectory, `${username}.json`), { force: true })
    await syncUserDirectory(username)
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
