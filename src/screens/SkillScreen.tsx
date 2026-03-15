import React from "react"
import { Screen } from "../components/Screen"
import { SkillsRate } from "../components/skills/SkillsRate"
import { SkillsTag } from "../components/skills/SkillsTag"
import { skillsContainer } from "../components/skills/skills.css"
import {
  usePortfolioError,
  usePortfolioLoading,
  useSkills,
} from "../stores/portfolioStore"

const SkillScreen: React.FC = () => {
  const skillsData = useSkills()
  const loading = usePortfolioLoading()
  const error = usePortfolioError()

  return (
    <section className="portfolio section active" id="portfolio">
      <div className={`container ${skillsContainer}`}>
        <Screen
          isLoading={loading}
          isError={Boolean(error || !skillsData)}
          title="Skills"
        >
          <SkillsRate />
          <SkillsTag />
        </Screen>
      </div>
    </section>
  )
}

export default SkillScreen
