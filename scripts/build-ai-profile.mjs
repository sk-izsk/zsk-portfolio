import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'))

const common = readJson('public/portfolio-data-common.json')
const en = readJson('public/portfolio-data-translations-en.json')

const byId = (items) => new Map(items.map((item) => [item.id, item]))

const projectBase = byId(common.projectsBase)
const blogBase = byId(common.blogBase)
const experienceBase = byId(common.experienceBase)
const educationBase = byId(common.educationBase)

const aiProfile = {
  identity: {
    name: en.personalInfo.name,
    title: en.personalInfo.title,
    profession: en.personalInfo.profession,
    location: common.personalInfo.location,
    languages: common.personalInfo.languages,
    availability: common.personalInfo.availability,
    resume: common.personalInfo.resume_link,
  },
  summary: {
    short: en.personalInfo.bio,
    detailed: en.personalInfo.detailedBio,
  },
  contact: common.contact,
  skills: common.skills,
  education: en.education.map((item) => ({
    degree: item.degree,
    duration: educationBase.get(item.id)?.duration ?? '',
    description: item.description,
  })),
  experience: en.experience.map((item) => {
    const base = experienceBase.get(item.id)
    return {
      company: base?.company ?? '',
      position: base?.position ?? '',
      duration: base?.duration ?? '',
      description: item.description,
      highlights: item.highlights,
    }
  }),
  services: en.services,
  projects: en.projects.map((item) => {
    const base = projectBase.get(item.id)
    return {
      title: item.title,
      url: base?.url ?? '',
      demo: base?.demo_link ?? '',
      category: base?.category ?? '',
      tags: base?.tags ?? [],
      publishDate: base?.publishDate ?? '',
      excerpt: item.excerpt,
      description: item.shortDescription,
      highlights: item.highlights,
    }
  }),
  blog: en.blog.map((item) => {
    const base = blogBase.get(item.id)
    return {
      title: item.title,
      url: base?.url ?? '',
      category: base?.category ?? '',
      tags: base?.tags ?? [],
      publishDate: base?.publishDate ?? '',
      excerpt: item.excerpt,
      description: item.shortDescription,
      highlights: item.highlights,
    }
  }),
  assistantRules: [
    'Answer only about Zeeshan Shaikh Murshed and his professional profile.',
    'Use only facts contained in this JSON.',
    'If information is missing, say the portfolio does not include that detail.',
    'For unrelated questions, politely redirect the user to ask about Zeeshan work.',
  ],
}

fs.writeFileSync(
  path.join(root, 'public/resume-ai-profile.json'),
  `${JSON.stringify(aiProfile, null, 2)}\n`,
)
