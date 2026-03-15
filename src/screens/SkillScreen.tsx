import React from "react"
import { Screen } from "../components/Screen"
import { SkillsRate } from "../components/skills/SkillsRate"
import { SkillsTag } from "../components/skills/SkillsTag"
import {
  usePortfolioError,
  usePortfolioLoading,
} from "../stores/portfolioStore"

const SkillScreen: React.FC = () => {
  const loading = usePortfolioLoading()
  const error = usePortfolioError()

  return (
    <Screen
      sectionId="portfolio"
      isLoading={loading}
      isError={Boolean(error)}
      title="Skills"
    >
      <SkillsRate />
      <SkillsTag />
    </Screen>
  )
}

export default SkillScreen
