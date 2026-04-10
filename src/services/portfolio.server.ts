import { readFile } from 'node:fs/promises'
import path from 'node:path'
import type { AppLanguage } from '../localization'
import type { PortfolioCommonData, PortfolioTranslations } from './api'
import { getTranslationPath, mergePortfolioData } from './api'

const PUBLIC_DIR = path.join(process.cwd(), 'public')

const readJsonFile = async <T>(filename: string): Promise<T> => {
  const filePath = path.join(PUBLIC_DIR, filename)
  const raw = await readFile(filePath, 'utf-8')
  return JSON.parse(raw) as T
}

export const getPortfolioData = async (language: AppLanguage) => {
  const [common, translations] = await Promise.all([
    readJsonFile<PortfolioCommonData>('portfolio-data-common.json'),
    readJsonFile<PortfolioTranslations>(getTranslationPath(language)),
  ])

  return mergePortfolioData(common, translations)
}
