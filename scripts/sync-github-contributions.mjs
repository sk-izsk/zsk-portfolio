import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const outputDirectory = path.join(projectRoot, 'public', 'github-contributions')
const usernames = ['sk-izsk']
const startYear = 2018
const levelToContributionCount = [0, 2, 6, 12, 20]

const getCalendarRangeForYear = (selectedYear) => {
  return {
    startDate: new Date(Date.UTC(selectedYear, 0, 1)),
    endDate: new Date(Date.UTC(selectedYear, 11, 31)),
  }
}

const formatDate = (date) => date.toISOString().slice(0, 10)

const readExistingArchive = async (username) => {
  try {
    const filePath = path.join(outputDirectory, `${username}.json`)
    const file = await readFile(filePath, 'utf8')
    return JSON.parse(file)
  } catch {
    return null
  }
}

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

const syncUserArchive = async (username) => {
  const currentYear = new Date().getFullYear()
  const existingArchive = await readExistingArchive(username)
  const years = { ...(existingArchive?.years ?? {}) }
  let fetchedAnyYear = false

  for (let year = startYear; year <= currentYear; year += 1) {
    try {
      years[String(year)] = await fetchYearData(username, year)
      fetchedAnyYear = true
    } catch (error) {
      if (!years[String(year)]) {
        throw error
      }
    }
  }

  if (!fetchedAnyYear && existingArchive) {
    return existingArchive
  }

  return {
    generatedAt: new Date().toISOString(),
    username,
    years,
  }
}

const main = async () => {
  await mkdir(outputDirectory, { recursive: true })

  for (const username of usernames) {
    const archive = await syncUserArchive(username)
    const outputPath = path.join(outputDirectory, `${username}.json`)
    await writeFile(outputPath, `${JSON.stringify(archive, null, 2)}\n`, 'utf8')
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
