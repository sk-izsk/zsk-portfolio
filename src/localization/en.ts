import { aboutEn } from '@components/about/localization/en'
import { commonEn } from '@components/common/localization/en'
import { contactEn } from '@components/contact/localization/en'
import { homeEn } from '@components/home/localization/en'
import { projectsEn } from '@components/projects/localization/en'
import { servicesEn } from '@components/services/localization/en'
import { blogEn } from '@components/blog/localization/en'
import { sidebarEn } from '@components/sidebar/localization/en'
import { skillsEn } from '@components/skills/localization/en'

const notFoundEn = {
  pageTitle: 'Page Not Found',
  title: 'Oops! Page Not Found',
  description: 'The page you are looking for does not exist or has been moved.',
  redirectButton: 'Go Back Home',
}

export const en = {
  about: aboutEn,
  blog: blogEn,
  common: commonEn,
  contact: contactEn,
  home: homeEn,
  notFound: notFoundEn,
  projects: projectsEn,
  sidebar: sidebarEn,
  services: servicesEn,
  skills: skillsEn,
} as const
