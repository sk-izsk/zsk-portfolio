import React from "react"
import { usePersonalInfo } from "../../stores/portfolioStore"
import { homeInfoP } from "./home.css"

export const HomeDetailBio: React.FC = () => {
  const personalInfo = usePersonalInfo()

  if (!personalInfo) {
    return null
  }

  return <p className={homeInfoP}>{personalInfo.bio}</p>
}
