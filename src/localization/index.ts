import { en } from '@localization/en'
import { fr } from '@localization/fr'

export const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
} as const

export type AppLanguage = keyof typeof resources
