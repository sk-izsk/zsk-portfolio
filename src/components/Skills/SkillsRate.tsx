import React from "react"
import { SkillsRateSection } from "./SkillsRateSection"

export const SkillsRate: React.FC = () => {
  return (
    <>
      <div className="row">
        <SkillsRateSection
          icon="laptop-code"
          titleText="Frontend Skills"
          category="frontend"
        />
        <SkillsRateSection
          icon="server"
          titleText="Backend Skills"
          category="backend"
        />
      </div>
      <div className="row">
        <SkillsRateSection
          icon="code"
          titleText="Programming Languages"
          category="language"
        />
        <SkillsRateSection
          icon="cog"
          titleText="Development Tools"
          category="tools"
        />
      </div>
    </>
  )
}