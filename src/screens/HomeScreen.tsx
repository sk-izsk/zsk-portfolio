import { useTitle } from "ahooks"
import React from "react"
import { HomeDetailBio } from "../components/Home/HomeDetailBio"
import { HomeDownloadCv } from "../components/Home/HomeDownloadCv"
import { HomeImageContainer } from "../components/Home/HomeImageContainer"
import { HomeTitleAnimated } from "../components/Home/HomeTitleAnimated"
import { home, homeInfo, homeRow } from "../components/Home/home.css"
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

  useTitle("Home - ZSK Portfolio")

  return (
    <section className={`${home} section active`} id="home">
      <div className="container">
        <Screen isLoading={loading} isError={Boolean(error || !personalInfo)}>
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
