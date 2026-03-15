import React from "react"
import { ContactFormSection } from "../components/contact/ContactFormSection"
import { ContactSocialsSection } from "../components/contact/ContactSocialsSection"
import { Screen } from "../components/Screen"
import {
  usePortfolioError,
  usePortfolioLoading,
} from "../stores/portfolioStore"

const ContactScreen: React.FC = () => {
  const loading = usePortfolioLoading()
  const error = usePortfolioError()

  return (
    <Screen
      sectionId="contact"
      isLoading={loading}
      isError={Boolean(error)}
      title="Contact Me"
    >
      <ContactSocialsSection />
      <ContactFormSection />
    </Screen>
  )
}

export default ContactScreen
