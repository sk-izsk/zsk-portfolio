import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { usePortfolioData } from "../hooks/usePortfolioData"

interface ServicesProps {
  isActive: boolean
}

const Services: React.FC<ServicesProps> = ({ isActive }) => {
  const { loading, data, error } = usePortfolioData()

  if (loading) {
    return (
      <section
        className={`service section ${isActive ? "active" : ""}`}
        id="service"
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
        className={`service section ${isActive ? "active" : ""}`}
        id="service"
      >
        <div className="container">
          <div className="error">Error loading data</div>
        </div>
      </section>
    )
  }

  return (
    <section
      className={`service section ${isActive ? "active" : ""}`}
      id="service"
    >
      <div className="container">
        <div className="row">
          <div className="section-title padd-15">
            <h2>Services</h2>
          </div>
        </div>
        <div className="row">
          {data.services.map((service) => (
            <div key={service.id} className="service-item padd-15">
              <div className="service-item-inner">
                <div className="icon">
                  <FontAwesomeIcon
                    icon={
                      service.icon.replace("fa-", "") as
                        | "code"
                        | "palette"
                        | "chart-line"
                        | "mobile-alt"
                        | "search"
                        | "bullhorn"
                    }
                  />
                </div>
                <h4>{service.title}</h4>
                <p>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
