import { describe, expect, it } from 'vitest'
import { getTranslationPath, mergePortfolioData } from '../../src/services/api'

const common = {
  personalInfo: {
    resume_link: '/resume.pdf',
    location: { city: 'Paris', country: 'France' },
    avatar: { primary: '/images/avatar.png', alt: 'avatar' },
    languages: ['English', 'French'],
    birthday: '1994-01-01',
    availability: ['Remote'],
  },
  contact: {
    email: 'hello@example.com',
    phone: '+33',
    social: {
      github: { label: 'GitHub', url: 'https://github.com/example' },
    },
  },
  skills: {
    technical: [],
    categories: {
      frontend: [],
      backend: [],
      languages: [],
      tools: [],
      testing: [],
      learning: [],
    },
  },
  projectsBase: [
    {
      id: 1,
      url: 'https://example.com',
      category: 'frontend',
      tags: ['react'],
      publishDate: '2026-01-01',
    },
  ],
  experienceBase: [
    {
      id: 1,
      company: 'Example Inc',
      position: 'Engineer',
      duration: '2022-2026',
    },
  ],
  educationBase: [
    {
      id: 1,
      duration: '2012-2016',
    },
  ],
  servicesBase: [
    {
      id: 1,
      icon: 'fa-code',
    },
  ],
}

const translations = {
  personalInfo: {
    name: 'John Doe',
    title: 'Developer',
    greeting: 'Hello',
    profession: 'Frontend Developer',
    bio: 'Bio',
    detailedBio: 'Detailed Bio',
  },
  education: [
    {
      id: 1,
      degree: 'BSc Computer Science',
      description: 'University details',
    },
  ],
  experience: [
    {
      id: 1,
      description: 'Built features',
      highlights: ['A', 'B'],
    },
  ],
  services: [
    {
      id: 1,
      title: 'Web Development',
      description: 'Service description',
    },
  ],
  projects: [
    {
      id: 1,
      title: 'Portfolio',
      excerpt: 'Project excerpt',
      shortDescription: 'Project short description',
      highlights: ['React', 'TypeScript'],
    },
  ],
}

describe('getTranslationPath', () => {
  it('returns the english translation file by default', () => {
    expect(getTranslationPath('en')).toBe('portfolio-data-translations-en.json')
  })

  it('returns the french translation file for fr', () => {
    expect(getTranslationPath('fr')).toBe('portfolio-data-translations-fr.json')
  })
})

describe('mergePortfolioData', () => {
  it('merges common and translation data into portfolio format', () => {
    const merged = mergePortfolioData(common, translations)

    expect(merged.personalInfo.name).toBe('John Doe')
    expect(merged.personalInfo.resume_link).toBe('/resume.pdf')
    expect(merged.services[0]?.icon).toBe('fa-code')
    expect(merged.projects[0]?.title).toBe('Portfolio')
    expect(merged.projects[0]?.publishDate).toBe('2026-01-01')
  })
})
