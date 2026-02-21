import React from "react"
import { usePortfolioData } from "../hooks/usePortfolioData"

interface PortfolioProps {
  isActive: boolean
}

const Portfolio: React.FC<PortfolioProps> = ({ isActive }) => {
  const { loading, data, error } = usePortfolioData()

  if (loading) {
    return (
      <section
        className={`portfolio section ${isActive ? "active" : ""}`}
        id="portfolio"
      >
        <div className="container">
          <div className="loading">Loading...</div>
        </div>
      </section>
    )
  }

  if (error || !data) {
    return (
      <section
        className={`portfolio section ${isActive ? "active" : ""}`}
        id="portfolio"
      >
        <div className="container">
          <div className="error">Error loading data</div>
        </div>
      </section>
    )
  }

  return (
    <section
      className={`portfolio section ${isActive ? "active" : ""}`}
      id="portfolio"
    >
      <div className="container">
        <div className="row">
          <div className="section-title padd-15">
            <h2>Portfolio</h2>
          </div>
        </div>
        <div className="row">
          <div className="portfolio-heading padd-15">
            <h2>My Last Projects :</h2>
          </div>
        </div>
        <div className="row">
          {data.portfolio.photos.map((item) => (
            <div key={item.id} className="portfolio-item padd-15">
              <div className="portfolio-item-inner shadow-dark">
                <div className="portfolio-img">
                  <img src={item.url} alt={item.alt || "Portfolio item"} />
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
