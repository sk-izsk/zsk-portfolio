import React from "react"
import { aboutContent } from "../components/about/about.css"
import { AboutPersonalInfoSection } from "../components/about/AboutPersonalInfoSection"
import { AboutPersonalIntro } from "../components/about/AboutPersonalIntro"
import { ActivitiesSection } from "../components/about/ActivitiesSection"
import { Screen } from "../components/Screen"
import {
  usePortfolioError,
  usePortfolioLoading,
} from "../stores/portfolioStore"

const AboutScreen: React.FC = () => {
  const loading = usePortfolioLoading()
  const error = usePortfolioError()

  return (
    <Screen
      sectionId="about"
      isLoading={loading}
      isError={Boolean(error)}
      title="About Me"
    >
      <div className="row">
        <div className={`${aboutContent} padd-15`}>
          <AboutPersonalIntro />
          <AboutPersonalInfoSection />
          <ActivitiesSection />
        </div>
      </div>
    </Screen>
  )
}

export default AboutScreen
