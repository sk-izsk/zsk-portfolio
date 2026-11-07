import { useTranslation } from '@localization/localize'
import { trackGaEvent, trackMixpanelEvent } from '@utils/analytics'

type Language = 'en' | 'fr'

export const useLanguageSwitch = () => {
  const { i18n } = useTranslation()
  const currentLanguage: Language = i18n.resolvedLanguage === 'fr' ? 'fr' : 'en'

  const changeLanguage = (language: Language) => {
    const label = language.toUpperCase()
    trackGaEvent('Language', 'language_switch_click', label)
    trackMixpanelEvent('language_switch_click', 'Language', label)
    void i18n.changeLanguage(language)
  }

  return { currentLanguage, changeLanguage }
}
