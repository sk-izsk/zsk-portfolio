import { beforeEach, describe, expect, it, vi } from 'vitest'
import { portfolioApi, queryKeys } from '../../src/services/api'
import { mockPortfolioData } from '../helpers/mockPortfolioData'

// Mock the ky HTTP client
vi.mock('ky', () => ({
  default: {
    get: vi.fn(() => ({
      json: vi.fn(),
    })),
  },
}))

describe('portfolioApi', () => {
  beforeEach(() => vi.clearAllMocks())

  it('requests the English JSON file by default', async () => {
    const ky = (await import('ky')).default
    const jsonMock = vi.fn().mockResolvedValue(mockPortfolioData)
    vi.mocked(ky.get).mockReturnValue({ json: jsonMock } as never)

    await portfolioApi.getPortfolioData('en')

    expect(ky.get).toHaveBeenCalledWith('portfolio-data.json')
  })

  it('requests the French JSON file for the fr locale', async () => {
    const ky = (await import('ky')).default
    const jsonMock = vi.fn().mockResolvedValue(mockPortfolioData)
    vi.mocked(ky.get).mockReturnValue({ json: jsonMock } as never)

    await portfolioApi.getPortfolioData('fr')

    expect(ky.get).toHaveBeenCalledWith('portfolio-data-fr.json')
  })

  it('returns the parsed portfolio data', async () => {
    const ky = (await import('ky')).default
    const jsonMock = vi.fn().mockResolvedValue(mockPortfolioData)
    vi.mocked(ky.get).mockReturnValue({ json: jsonMock } as never)

    const result = await portfolioApi.getPortfolioData('en')

    expect(result).toEqual(mockPortfolioData)
  })
})

describe('queryKeys', () => {
  it('returns a stable key tuple for the given language', () => {
    expect(queryKeys.portfolioData('en')).toEqual(['portfolio-data', 'en'])
    expect(queryKeys.portfolioData('fr')).toEqual(['portfolio-data', 'fr'])
  })
})
