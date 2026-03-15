import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import { resources, type AppLanguage } from "./index"

const LANGUAGE_STORAGE_KEY = "app-language"

const getInitialLanguage = (): AppLanguage => {
  const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY)
  return storedLanguage === "fr" ? "fr" : "en"
}

void i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: "en",
  defaultNS: "translation",
  interpolation: {
    escapeValue: false,
  },
})

i18n.on("languageChanged", (language) => {
  const nextLanguage: AppLanguage = language === "fr" ? "fr" : "en"
  localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage)
})

export default i18n
