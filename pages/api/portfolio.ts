import type { NextApiRequest, NextApiResponse } from 'next'
import type { AppLanguage } from '../../src/localization'
import { getPortfolioData } from '../../src/services/portfolio.server'

const toLanguage = (value: string | string[] | undefined): AppLanguage => {
  if (typeof value === 'string' && value.toLowerCase() === 'fr') {
    return 'fr'
  }
  return 'en'
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const language = toLanguage(req.query.language)
    const data = await getPortfolioData(language)

    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
    res.status(200).json(data)
  } catch {
    res.status(500).json({ message: 'Failed to load portfolio data' })
  }
}
