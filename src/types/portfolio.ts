// Types for portfolio data structure

export type TextMark = 'none' | 'underline' | 'highlight'

export interface RichTextSegment {
  text: string
  mark?: TextMark
}

export interface PersonalInfo {
  name: string
  title: string
  greeting: string
  profession: string
  resume_link: string
  location: {
    city: string
    country: string
  }
  bio: string
  bioSegments?: RichTextSegment[]
  detailedBio: string
  detailedBioSegments?: RichTextSegment[]
  avatar: {
    primary: string
    alt: string
  }
  languages: string[]
  birthday: string
  availability: string[]
}

export interface ContactInfo {
  email: string
  phone: string
  social: {
    [key: string]: {
      label: string
      url: string
    }
  }
}

export interface Skill {
  name: string
  level: number
  category: 'frontend' | 'backend' | 'language' | 'tools' | 'testing'
}

export interface SkillCategories {
  frontend: string[]
  backend: string[]
  languages: string[]
  tools: string[]
  testing: string[]
  learning: string[]
}

export interface Skills {
  technical: Skill[]
  categories: SkillCategories
}

export interface Education {
  degree: string
  duration: string
  description: string
}

export interface Experience {
  company: string
  position: string
  duration: string
  description: string
  highlights: string[]
}

export interface Service {
  id: number
  title: string
  icon: string
  description: string
}

export type ProjectType = 'full-stack' | 'frontend' | 'backend' | 'library' | 'misc'

export type ProjectFilterType = 'all' | ProjectType

export interface Project {
  id: number
  title: string
  url?: string
  demo_link?: string
  projectTypes: ProjectType[]
  excerpt: string
  shortDescription: string
  highlights: string[]
  category: string
  tags: string[]
  publishDate: string
}

export interface PortfolioData {
  personalInfo: PersonalInfo
  contact: ContactInfo
  skills: Skills
  education: Education[]
  experience: Experience[]
  services: Service[]
  projects: Project[]
}
