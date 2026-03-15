import React from "react"
import { AboutPersonalInfoSection } from "../components/about/AboutPersonalInfoSection"
import { AboutPersonalIntro } from "../components/about/AboutPersonalIntro"
import { ActivitiesSection } from "../components/about/ActivitiesSection"
import { aboutContent } from "../components/about/about.css"
import { Screen } from "../components/Screen"
import {
  usePortfolioError,
  usePortfolioLoading,
} from "../stores/portfolioStore"

const AboutScreen: React.FC = () => {
  const loading = usePortfolioLoading()
  const error = usePortfolioError()

  return (
    <section className="about section active" id="about">
      <div className="container">
        <Screen isLoading={loading} isError={Boolean(error)} title="About Me">
          <div className="row">
            <div className={`${aboutContent} padd-15`}>
              <AboutPersonalIntro />
              <AboutPersonalInfoSection />
              <ActivitiesSection />
            </div>
          </div>
        </Screen>
      </div>
    </section>
  )
}

export default AboutScreen
