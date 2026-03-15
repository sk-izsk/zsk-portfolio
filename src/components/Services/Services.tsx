import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useTitle } from "ahooks"
import React from "react"
import {
  usePortfolioError,
  usePortfolioLoading,
  useServices,
} from "../../stores/portfolioStore"
import Screen from "../Screen/Screen"
import {
  serviceContainer,
  serviceH4,
  serviceIcon,
  serviceIconFA,
  serviceIconFAHover,
  serviceItem,
  serviceItemInner,
  serviceItemInnerHover,
  serviceP,
  serviceRow,
} from "./services.css"

const Services: React.FC = () => {
  const services = useServices()
  const loading = usePortfolioLoading()
  const error = usePortfolioError()

  // Update page title
  useTitle("Services - ZSK Portfolio")

  const hasError = Boolean(error || !services)

  return (
    <section className="service section active" id="service">
      <div className={`container ${serviceContainer}`}>
        <Screen isLoading={loading} isError={hasError}>
          {services && (
            <>
              <div className="row">
                <div className="section-title padd-15">
                  <h2>Services</h2>
                </div>
              </div>
              <div className={`row ${serviceRow}`}>
                {services.map((service) => (
                  <div key={service.id} className={`${serviceItem} padd-15`}>
                    <div className={serviceItemInner}>
                      <div
                        className={`${serviceIcon} ${serviceItemInnerHover}`}
                      >
                        <FontAwesomeIcon
                          className={`${serviceIconFA} ${serviceIconFAHover}`}
                          icon={
                            service.icon.replace("fa-", "") as
                              | "code"
                              | "palette"
                              | "chart-line"
                              | "mobile-alt"
                              | "search"
                              | "bullhorn"
                              | "cubes"
                          }
                        />
                      </div>
                      <h4 className={serviceH4}>{service.title}</h4>
                      <p className={serviceP}>{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </Screen>
      </div>
    </section>
  )
}

export default Services
