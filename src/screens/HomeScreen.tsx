import React from "react"
import { home, homeInfo, homeRow } from "../components/home/home.css"
import { HomeDetailBio } from "../components/home/HomeDetailBio"
import { HomeDownloadCv } from "../components/home/HomeDownloadCv"
import { HomeImageContainer } from "../components/home/HomeImageContainer"
import { HomeTitleAnimated } from "../components/home/HomeTitleAnimated"
import { Screen } from "../components/Screen"
import {
  usePersonalInfo,
  usePortfolioError,
  usePortfolioLoading,
} from "../stores/portfolioStore"

const HomeScreen: React.FC = () => {
  const personalInfo = usePersonalInfo()
  const loading = usePortfolioLoading()
  const error = usePortfolioError()

  return (
    <section className={`${home} section active`} id="home">
      <div className="container">
        <Screen
          isLoading={loading}
          isError={Boolean(error || !personalInfo)}
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
      </div>
    </section>
  )
}

export default HomeScreen
