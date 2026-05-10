import { aboutFr } from '@components/about/localization/fr'
import { commonFr } from '@components/common/localization/fr'
import { contactFr } from '@components/contact/localization/fr'
import { homeFr } from '@components/home/localization/fr'
import { projectsFr } from '@components/projects/localization/fr'
import { servicesFr } from '@components/services/localization/fr'
import { blogFr } from '@components/blog/localization/fr'
import { sidebarFr } from '@components/sidebar/localization/fr'
import { skillsFr } from '@components/skills/localization/fr'

const notFoundFr = {
  pageTitle: 'Page Introuvable',
  title: 'Oups ! Page introuvable',
  description: "La page que vous recherchez n'existe pas ou a été déplacée.",
  redirectButton: "Retour à l'accueil",
}

export const fr = {
  about: aboutFr,
  blog: blogFr,
  common: commonFr,
  contact: contactFr,
  home: homeFr,
  notFound: notFoundFr,
  projects: projectsFr,
  sidebar: sidebarFr,
  services: servicesFr,
  skills: skillsFr,
} as const
