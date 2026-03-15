import React from "react"
import { home, homeInfo, homeRow } from "../components/home/home.css"
import { HomeDetailBio } from "../components/home/HomeDetailBio"
import { HomeDownloadCv } from "../components/home/HomeDownloadCv"
import { HomeImageContainer } from "../components/home/HomeImageContainer"
import { HomeTitleAnimated } from "../components/home/HomeTitleAnimated"
import { Screen } from "../components/Screen"
import {
  usePortfolioError,
  usePortfolioLoading,
} from "../stores/portfolioStore"

const HomeScreen: React.FC = () => {
  const loading = usePortfolioLoading()
  const error = usePortfolioError()

  return (
    <Screen
      sectionId="home"
      sectionClassName={home}
      isLoading={loading}
      isError={Boolean(error)}
      pageTitle="Home"
    >
      <div className={`row ${homeRow}`}>
        <div className={`${homeInfo} padd-15`}>
          <HomeTitleAnimated />
          <HomeDetailBio />
          <HomeDownloadCv />
        </div>
        <HomeImageContainer />
      </div>
    </Screen>
  )
}

export default HomeScreen
