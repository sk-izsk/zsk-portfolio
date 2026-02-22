import { useTitle } from "ahooks"
import React from "react"
import { usePortfolio, usePortfolioStore } from "../../stores/portfolioStore"
import {
  portfolioContainer,
  portfolioImg,
  portfolioImgImg,
  portfolioItem,
  portfolioItemInner,
} from "./portfolio.css"

const Portfolio: React.FC = () => {
  const portfolio = usePortfolio()
  const loading = usePortfolioStore((state) => state.loading)
  const error = usePortfolioStore((state) => state.error)

  useTitle("Portfolio - ZSK Portfolio")

  if (loading) {
    return (
      <section className="portfolio section active" id="portfolio">
        <div className={`container ${portfolioContainer}`}>
          <div className="loading">Loading...</div>
        </div>
      </section>
    )
  }

  if (error || !portfolio) {
    return (
      <section className="portfolio section active" id="portfolio">
        <div className={`container ${portfolioContainer}`}>
          <div className="error">Error loading data</div>
        </div>
      </section>
    )
  }

  return (
    <section className="portfolio section active" id="portfolio">
      <div className={`container ${portfolioContainer}`}>
        <div className="row">
          <div className="section-title padd-15">
            <h2>Portfolio</h2>
          </div>
        </div>
        <div className="row">
          {portfolio?.photos?.map((item: any, index: number) => (
            <div key={index} className={`${portfolioItem} padd-15`}>
              <div className={portfolioItemInner}>
                <div className={portfolioImg}>
                  <img
                    src={item.url}
                    alt={item.alt}
                    className={portfolioImgImg}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
