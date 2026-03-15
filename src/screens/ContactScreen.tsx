import { useTitle } from "ahooks"
import React from "react"
import { ContactFormSection } from "../components/Contact/ContactFormSection"
import { ContactSocialsSection } from "../components/Contact/ContactSocialsSection"
import { contactContainer } from "../components/Contact/contact.css"
import { Screen } from "../components/Screen"
import {
  usePortfolioError,
  usePortfolioLoading,
} from "../stores/portfolioStore"

const ContactScreen: React.FC = () => {
  const loading = usePortfolioLoading()
  const error = usePortfolioError()

  useTitle("Contact - ZSK Portfolio")

  return (
    <section className="contact section active" id="contact">
      <div className={`container ${contactContainer}`}>
        <Screen isLoading={loading} isError={Boolean(error)} title="Contact Me">
          <ContactSocialsSection />
          <ContactFormSection />
        </Screen>
      </div>
    </section>
  )
}

export default ContactScreen
