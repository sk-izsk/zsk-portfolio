import type { PortfolioData } from '@app-types/portfolio'
import type { AppLanguage } from '@localization/index'
import ky from 'ky'

declare const __APP_VERSION__: string

interface PortfolioCommonData {
  personalInfo: {
    resume_link: string
    location: { city: string; country: string }
    avatar: { primary: string; alt: string }
    languages: string[]
    birthday: string
    availability: string[]
  }
  contact: PortfolioData['contact']
  skills: PortfolioData['skills']
  projectsBase: Array<{
    id: number
    url: string
    demo_link?: string
    projectTypes: PortfolioData['projects'][number]['projectTypes']
    category: string
    tags: string[]
    publishDate: string
  }>
  blogBase: Array<{
    id: number
    url: string
    blogTypes: PortfolioData['blog'][number]['blogTypes']
    category: string
    tags: string[]
    publishDate: string
  }>
  experienceBase: Array<{
    id: number
    company: string
    position: string
    duration: string
  }>
  educationBase: Array<{
    id: number
    duration: string
  }>
}

interface PortfolioTranslations {
  personalInfo: {
    name: string
    title: string
    greeting: string
    profession: string
    bio: string
    bioSegments?: PortfolioData['personalInfo']['bioSegments']
    detailedBio: string
    detailedBioSegments?: PortfolioData['personalInfo']['detailedBioSegments']
  }
  education: Array<{
    id: number
    degree: string
    description: string
  }>
  experience: Array<{
    id: number
    description: string
    highlights: string[]
  }>
  services: Array<{
    id: number
    title: string
    description: string
  }>
  projects: Array<{
    id: number
    title: string
    excerpt: string
    shortDescription: string
    highlights: string[]
  }>
  blog: Array<{
    id: number
    title: string
    excerpt: string
    shortDescription: string
    highlights: string[]
  }>
}

const mergePortfolioData = (
  common: PortfolioCommonData,
  translations: PortfolioTranslations,
): PortfolioData => {
  const educationMap = new Map(common.educationBase.map((base) => [base.id, base]))
  const experienceMap = new Map(common.experienceBase.map((base) => [base.id, base]))
  const projectsMap = new Map(common.projectsBase.map((base) => [base.id, base]))
  const blogMap = new Map(common.blogBase.map((base) => [base.id, base]))

  return {
    personalInfo: {
      name: translations.personalInfo.name,
      title: translations.personalInfo.title,
      greeting: translations.personalInfo.greeting,
      profession: translations.personalInfo.profession,
      bio: translations.personalInfo.bio,
      bioSegments: translations.personalInfo.bioSegments,
      detailedBio: translations.personalInfo.detailedBio,
      detailedBioSegments: translations.personalInfo.detailedBioSegments,
      ...common.personalInfo,
    },
    contact: common.contact,
    skills: common.skills,
    education: translations.education.map((trans) => {
      const base = educationMap.get(trans.id)
      return {
        degree: trans.degree,
        duration: base?.duration || '',
        description: trans.description,
      }
    }),
    experience: translations.experience.map((trans) => {
      const base = experienceMap.get(trans.id)
      return {
        company: base?.company || '',
        position: base?.position || '',
        duration: base?.duration || '',
        description: trans.description,
        highlights: trans.highlights,
      }
    }),
    services: translations.services.map((trans) => ({
      id: trans.id,
      title: trans.title,
      description: trans.description,
    })),
    projects: translations.projects.map((trans) => {
      const base = projectsMap.get(trans.id)
      return {
        id: trans.id,
        ...(base?.url ? { url: base.url } : {}),
        ...(base?.demo_link ? { demo_link: base.demo_link } : {}),
        projectTypes: base?.projectTypes?.length ? base.projectTypes : ['misc'],
        title: trans.title,
        excerpt: trans.excerpt,
        shortDescription: trans.shortDescription,
        highlights: trans.highlights,
        category: base?.category || '',
        tags: base?.tags || [],
        publishDate: base?.publishDate || '',
      }
    }),
    blog: translations.blog.map((trans) => {
      const base = blogMap.get(trans.id)
      return {
        id: trans.id,
        url: base?.url || '',
        blogTypes: base?.blogTypes?.length ? base.blogTypes : ['architecture'],
        title: trans.title,
        excerpt: trans.excerpt,
        shortDescription: trans.shortDescription,
        highlights: trans.highlights,
        category: base?.category || '',
        tags: base?.tags || [],
        publishDate: base?.publishDate || '',
      }
    }),
  }
}

/**
 * API client for portfolio data
 */
export const portfolioApi = {
  getPortfolioData: async (language: AppLanguage): Promise<PortfolioData> => {
    const translationPath =
      language === 'fr'
        ? 'portfolio-data-translations-fr.json'
        : 'portfolio-data-translations-en.json'

    const [common, translations] = await Promise.all([
      ky
        .get('portfolio-data-common.json', {
          searchParams: { v: __APP_VERSION__ },
          cache: 'no-store',
        })
        .json<PortfolioCommonData>(),
      ky
        .get(translationPath, {
          searchParams: { v: __APP_VERSION__ },
          cache: 'no-store',
        })
        .json<PortfolioTranslations>(),
    ])

    return mergePortfolioData(common, translations)
  },
}

export const queryKeys = {
  portfolioData: (language: AppLanguage) => ['portfolio-data', language] as const,
}
