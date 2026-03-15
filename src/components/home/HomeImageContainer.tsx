import React from "react"
import { usePersonalInfo } from "../../stores/portfolioStore"
import { homeImg, homeImgImg } from "./home.css"

export const HomeImageContainer: React.FC = () => {
  const personalInfo = usePersonalInfo()

  if (!personalInfo) {
    return null
  }

  return (
    <div className={`${homeImg} padd-15`}>
      <img
        className={homeImgImg}
        src={personalInfo.avatar.primary}
        alt={personalInfo.avatar.alt}
      />
    </div>
  )
}
