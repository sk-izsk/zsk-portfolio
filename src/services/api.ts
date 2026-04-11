import ky from 'ky'
import type { AppLanguage } from '../localization'
import type { PortfolioData, ProjectType, RichTextSegment } from '../types/portfolio'

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
    projectType: ProjectType
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
  servicesBase: Array<{
    id: number
    icon: string
  }>
}

interface PortfolioTranslations {
  personalInfo: {
    name: string
    title: string
    greeting: string
    profession: string
    bio: string
    bioSegments?: RichTextSegment[]
    detailedBio: string
    detailedBioSegments?: RichTextSegment[]
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
}

/**
 * Merge common data with language-specific translations
 */
const mergePortfolioData = (
  common: PortfolioCommonData,
  translations: PortfolioTranslations,
): PortfolioData => {
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
    education: translations.education.map((trans) => ({
      degree: trans.degree,
      duration: common.educationBase.find((base) => base.id === trans.id)?.duration || '',
      description: trans.description,
    })),
    experience: translations.experience.map((trans) => ({
      company: common.experienceBase.find((base) => base.id === trans.id)?.company || '',
      position: common.experienceBase.find((base) => base.id === trans.id)?.position || '',
      duration: common.experienceBase.find((base) => base.id === trans.id)?.duration || '',
      description: trans.description,
      highlights: trans.highlights,
    })),
    services: translations.services.map((trans) => ({
      id: trans.id,
      title: trans.title,
      icon: common.servicesBase.find((base) => base.id === trans.id)?.icon || '',
      description: trans.description,
    })),
    projects: translations.projects.map((trans) => {
      const base = common.projectsBase.find((b) => b.id === trans.id)
      return {
        id: trans.id,
        url: base?.url || '',
        demo_link: base?.demo_link,
        projectType: base?.projectType || 'misc',
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
 * Simple API client for portfolio data
 */
export const portfolioApi = {
  getPortfolioData: async (language: AppLanguage): Promise<PortfolioData> => {
    const common = await ky.get('portfolio-data-common.json').json<PortfolioCommonData>()

    const translationPath =
      language === 'fr'
        ? 'portfolio-data-translations-fr.json'
        : 'portfolio-data-translations-en.json'
    const translations = await ky.get(translationPath).json<PortfolioTranslations>()

    return mergePortfolioData(common, translations)
  },
}

export const queryKeys = {
  portfolioData: (language: AppLanguage) => ['portfolio-data', language] as const,
}
