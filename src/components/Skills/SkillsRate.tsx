import {
  faCode,
  faCog,
  faLaptopCode,
  faServer,
} from "@fortawesome/free-solid-svg-icons"
import React from "react"
import { SkillsRateSection } from "./SkillsRateSection"

export const SkillsRate: React.FC = () => {
  return (
    <>
      <div className="row">
        <SkillsRateSection
          icon={faLaptopCode}
          titleText="Frontend Skills"
          category="frontend"
        />
        <SkillsRateSection
          icon={faServer}
          titleText="Backend Skills"
          category="backend"
        />
      </div>
      <div className="row">
        <SkillsRateSection
          icon={faCode}
          titleText="Programming Languages"
          category="language"
        />
        <SkillsRateSection
          icon={faCog}
          titleText="Development Tools"
          category="tools"
        />
      </div>
    </>
  )
}
