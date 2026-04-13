import { portfolioApi, queryKeys } from '@services/api'
import { mockPortfolioData } from '@tests/helpers/mockPortfolioData'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Mock the ky HTTP client
vi.mock('ky', () => ({
  default: {
    get: vi.fn(() => ({
      json: vi.fn(),
    })),
  },
}))

const makeCommonPayload = () => ({
  personalInfo: {
    resume_link: mockPortfolioData.personalInfo.resume_link,
    location: mockPortfolioData.personalInfo.location,
    avatar: mockPortfolioData.personalInfo.avatar,
    languages: mockPortfolioData.personalInfo.languages,
    birthday: mockPortfolioData.personalInfo.birthday,
    availability: mockPortfolioData.personalInfo.availability,
  },
  contact: mockPortfolioData.contact,
  skills: mockPortfolioData.skills,
  projectsBase: mockPortfolioData.projects.map((project) => ({
    id: project.id,
    url: project.url ?? '',
    demo_link: project.demo_link,
    projectTypes: project.projectTypes,
    category: project.category,
    tags: project.tags,
    publishDate: project.publishDate,
  })),
  experienceBase: mockPortfolioData.experience.map((experience, index) => ({
    id: index + 1,
    company: experience.company,
    position: experience.position,
    duration: experience.duration,
  })),
  educationBase: mockPortfolioData.education.map((education, index) => ({
    id: index + 1,
    duration: education.duration,
  })),
})

const makeTranslationsPayload = () => ({
  personalInfo: {
    name: mockPortfolioData.personalInfo.name,
    title: mockPortfolioData.personalInfo.title,
    greeting: mockPortfolioData.personalInfo.greeting,
    profession: mockPortfolioData.personalInfo.profession,
    bio: mockPortfolioData.personalInfo.bio,
    bioSegments: mockPortfolioData.personalInfo.bioSegments,
    detailedBio: mockPortfolioData.personalInfo.detailedBio,
    detailedBioSegments: mockPortfolioData.personalInfo.detailedBioSegments,
  },
  education: mockPortfolioData.education.map((education, index) => ({
    id: index + 1,
    degree: education.degree,
    description: education.description,
  })),
  experience: mockPortfolioData.experience.map((experience, index) => ({
    id: index + 1,
    description: experience.description,
    highlights: experience.highlights,
  })),
  services: mockPortfolioData.services.map((service) => ({
    id: service.id,
    title: service.title,
    description: service.description,
  })),
  projects: mockPortfolioData.projects.map((project) => ({
    id: project.id,
    title: project.title,
    excerpt: project.excerpt,
    shortDescription: project.shortDescription,
    highlights: project.highlights,
  })),
})

describe('portfolioApi', () => {
  beforeEach(() => vi.clearAllMocks())

  it('requests common + English translation files by default', async () => {
    const ky = (await import('ky')).default
    vi.mocked(ky.get)
      .mockReturnValueOnce({ json: vi.fn().mockResolvedValue(makeCommonPayload()) } as never)
      .mockReturnValueOnce({ json: vi.fn().mockResolvedValue(makeTranslationsPayload()) } as never)

    await portfolioApi.getPortfolioData('en')

    expect(ky.get).toHaveBeenCalledWith('portfolio-data-common.json')
    expect(ky.get).toHaveBeenCalledWith('portfolio-data-translations-en.json')
  })

  it('requests common + French translation files for fr locale', async () => {
    const ky = (await import('ky')).default
    vi.mocked(ky.get)
      .mockReturnValueOnce({ json: vi.fn().mockResolvedValue(makeCommonPayload()) } as never)
      .mockReturnValueOnce({ json: vi.fn().mockResolvedValue(makeTranslationsPayload()) } as never)

    await portfolioApi.getPortfolioData('fr')

    expect(ky.get).toHaveBeenCalledWith('portfolio-data-common.json')
    expect(ky.get).toHaveBeenCalledWith('portfolio-data-translations-fr.json')
  })

  it('returns merged portfolio data', async () => {
    const ky = (await import('ky')).default
    vi.mocked(ky.get)
      .mockReturnValueOnce({ json: vi.fn().mockResolvedValue(makeCommonPayload()) } as never)
      .mockReturnValueOnce({ json: vi.fn().mockResolvedValue(makeTranslationsPayload()) } as never)

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
