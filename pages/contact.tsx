import { PageSeo } from '../src/components/common/PageSeo'
import ContactScreen from '../src/screens/ContactScreen'
import { getPortfolioPageStaticProps } from '../src/services/portfolioStaticProps'

const ContactPage = () => {
  return (
    <>
      <PageSeo
        title="Contact"
        description="Get in touch through professional social links, email, and contact details."
        path="/contact"
      />
      <ContactScreen />
    </>
  )
}

export const getStaticProps = getPortfolioPageStaticProps

export default ContactPage
