// Types for portfolio data structure

type TextMark = 'none' | 'underline' | 'highlight'

interface RichTextSegment {
  text: string
  mark?: TextMark
}

interface PersonalInfo {
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

interface ContactInfo {
  email: string
  phone: string
  social: {
    [key: string]: {
      label: string
      url: string
    }
  }
}

interface Skill {
  name: string
  level: number
  category: 'frontend' | 'backend' | 'language' | 'tools' | 'testing'
}

interface SkillCategories {
  frontend: string[]
  backend: string[]
  languages: string[]
  tools: string[]
  testing: string[]
  learning: string[]
}

interface Skills {
  technical: Skill[]
  categories: SkillCategories
}

interface Education {
  degree: string
  duration: string
  description: string
}

interface Experience {
  company: string
  position: string
  duration: string
  description: string
  highlights: string[]
}

interface Service {
  id: number
  title: string
  description: string
}

type ProjectType = 'full-stack' | 'frontend' | 'backend' | 'library' | 'ai-skill' | 'misc'

export type ProjectFilterType = 'all' | ProjectType

type BlogType = 'frontend' | 'backend' | 'architecture' | 'state-management'

export type BlogFilterType = 'all' | BlogType

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

export interface BlogPost {
  id: number
  title: string
  url: string
  blogTypes: BlogType[]
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
  blog: BlogPost[]
}
