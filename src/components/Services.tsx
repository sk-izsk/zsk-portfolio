import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useTitle } from "ahooks"
import React from "react"
import {
  usePortfolioError,
  usePortfolioLoading,
  useServices,
} from "../stores/portfolioStore"

const Services: React.FC = () => {
  const services = useServices()
  const loading = usePortfolioLoading()
  const error = usePortfolioError()

  // Update page title
  useTitle("Services - ZSK Portfolio")

  if (loading) {
    return (
      <section className="service section active" id="service">
        <div className="container">
          <div className="loading">Loading...</div>
        </div>
      </section>
    )
  }

  if (error || !services) {
    return (
      <section className="service section active" id="service">
        <div className="container">
          <div className="error">Error loading data</div>
        </div>
      </section>
    )
  }

  return (
    <section className="service section active" id="service">
      <div className="container">
        <div className="row">
          <div className="section-title padd-15">
            <h2>Services</h2>
          </div>
        </div>
        <div className="row">
          {services.map((service) => (
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
