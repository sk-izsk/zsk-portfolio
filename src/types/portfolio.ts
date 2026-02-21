// Types for portfolio data structure

export interface PersonalInfo {
  name: string
  title: string
  greeting: string
  profession: string
  location: {
    city: string
    province: string
    country: string
    fullAddress: string
  }
  bio: string
  detailedBio: string
  avatar: {
    primary: string
    secondary: string
    alt: string
  }
  languages: string[]
  age: number
  birthday: string
  availability: {
    freelance: boolean
    fullTime: boolean
    remote: boolean
    status: string
  }
}

export interface ContactInfo {
  email: string
  phone: string
  social: {
    [key: string]: {
      label: string
      url: string
      icon: string
    }
  }
}

export interface Skill {
  name: string
  level: number
  category: "frontend" | "backend" | "language" | "tools" | "testing"
  color: string
  icon: string
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
  id: number
  institution: string
  degree: string
  location: string
  startDate: string
  endDate: string
  duration: string
  description: string
  skills: string[]
  type: string
}

export interface Experience {
  id: number
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  duration: string
  current: boolean
  type: "full-time" | "part-time" | "internship" | "freelance"
  description: string
  achievements: string[]
  technologies: string[]
}

export interface Service {
  id: number
  title: string
  icon: string
  description: string
  technologies: string[]
  features: string[]
}

export interface Testimonial {
  id: number
  name: string
  position: string
  company: string
  avatar: string
  rating: number
  text: string
  date: string
}

export interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  category: string
  tags: string[]
  publishDate: string
  readTime: string
  featured: boolean
  author: string
}

export interface PortfolioPhoto {
  id: number
  url: string
  alt: string
}

export interface Portfolio {
  photos: PortfolioPhoto[]
}

export interface Offering {
  name: string
  icon: string
  description: string
  offerings: string[]
}

export interface Offerings {
  frontend: Offering
  backend: Offering
}

export interface Meta {
  version: string
  lastUpdated: string
  description: string
  theme: {
    primaryColor: string
    secondaryColor: string
    darkMode: boolean
    colorSchemes: Array<{
      name: string
      value: string
    }>
  }
  seo: {
    title: string
    description: string
    keywords: string[]
  }
}

export interface PortfolioData {
  personalInfo: PersonalInfo
  contact: ContactInfo
  skills: Skills
  education: Education[]
  experience: Experience[]
  services: Service[]
  projects: PortfolioPhoto[] // Intentionally left empty, using PortfolioPhoto type for future compatibility
  testimonials: Testimonial[]
  blog: BlogPost[]
  portfolio: Portfolio
  offerings: Offerings
  meta: Meta
}

// Utility type for loading state
export interface DataLoadingState {
  loading: boolean
  data: PortfolioData | null
  error: string | null
}

// Hook types for React
export type UsePortfolioData = () => DataLoadingState
