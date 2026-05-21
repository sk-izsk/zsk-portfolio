import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const outputDirectory = path.join(projectRoot, 'public', 'github-contributions')
const usernames = ['sk-izsk']
const startYear = 2018

const getRollingRangeForYear = (selectedYear) => {
  const today = new Date()
  const month = today.getMonth()
  const day = today.getDate()
  const endDate = new Date(Date.UTC(selectedYear, month + 1, 0))
  endDate.setUTCDate(Math.min(day, endDate.getUTCDate()))

  const startDate = new Date(endDate)
  startDate.setUTCDate(endDate.getUTCDate() - 364)

  return { startDate, endDate }
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

const fetchYearData = async (username, year) => {
  const { startDate, endDate } = getRollingRangeForYear(year)
  const from = formatDate(startDate)
  const to = formatDate(endDate)
  const response = await fetch(
    `https://github-commit-map.yzzi.icu/api/contributions/${username}?from=${from}&to=${to}`,
  )

  if (!response.ok) {
    throw new Error(`GitHub contribution sync failed for ${username} ${year}: ${response.status}`)
  }

  const payload = await response.json()
  const days = Array.isArray(payload?.contributions)
    ? payload.contributions
        .map((item) => ({
          date: typeof item?.date === 'string' ? item.date : '',
          contributionCount: typeof item?.count === 'number' ? item.count : 0,
        }))
        .filter((item) => item.date >= from && item.date <= to)
    : []

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
