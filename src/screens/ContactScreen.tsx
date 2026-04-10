import React from 'react'
import { ContactFormSection } from '../components/contact/ContactFormSection'
import { ContactSocialsSection } from '../components/contact/ContactSocialsSection'
import { Screen } from '../components/Screen'
import { useAnalytics } from '../hooks/useAnalytics'
import { useTranslation } from '../localization/localize'
import { usePortfolioError, usePortfolioLoading } from '../stores/portfolioStore'

const ContactScreen: React.FC = () => {
  const loading = usePortfolioLoading()
  const error = usePortfolioError()
  const { t } = useTranslation()
  useAnalytics()

  return (
    <Screen
      sectionId="contact"
      isLoading={loading}
      isError={Boolean(error)}
      title={t('contact.title')}
      description={t('contact.seoDescription')}
      canonical="/contact"
    >
      <ContactSocialsSection />
      <ContactFormSection />
    </Screen>
  )
}

export default ContactScreen
