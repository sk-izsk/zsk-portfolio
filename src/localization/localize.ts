import { defineLocalizeConfig, useAppTranslation as useTranslation } from 'zsk-react-i18n'
import { resources } from './index'

export const localizeConfig = defineLocalizeConfig({
  resources,
  defaultLanguage: 'en',
  fallbackLanguage: 'en',
  localStorageKey: 'app-language',
})

export { useTranslation }
