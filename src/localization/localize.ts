import { createI18n } from 'zsk-react-i18n'
import { resources } from './index'

const localize = createI18n({
  resources,
  defaultLanguage: 'en',
  fallbackLanguage: 'en',
  localStorageKey: 'app-language',
})

export const {
  LocalizeProvider,
  useAppTranslation,
  changeLanguage,
  getLanguage,
  isSupportedLanguage,
} = localize
