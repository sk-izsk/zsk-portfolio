import { useTitle } from "ahooks"
import React from "react"
import { Screen } from "../components/Screen"
import {
  ServiceCard,
  type ServiceIconName,
} from "../components/Services/ServiceCard"
import {
  serviceContainer,
  serviceRow,
} from "../components/Services/services.css"
import {
  usePortfolioError,
  usePortfolioLoading,
  useServices,
} from "../stores/portfolioStore"

const serviceIconNames: ServiceIconName[] = [
  "code",
  "palette",
  "chart-line",
  "mobile-alt",
  "search",
  "bullhorn",
  "cubes",
]

const isServiceIconName = (value: string): value is ServiceIconName => {
  return serviceIconNames.includes(value as ServiceIconName)
}

const toServiceIconName = (rawIcon: string): ServiceIconName => {
  const normalized = rawIcon.replace("fa-", "")
  return isServiceIconName(normalized) ? normalized : "code"
}

const ServiceScreen: React.FC = () => {
  const services = useServices()
  const loading = usePortfolioLoading()
  const error = usePortfolioError()

  useTitle("Services - ZSK Portfolio")

  return (
    <section className="service section active" id="service">
      <div className={`container ${serviceContainer}`}>
        <Screen
          isLoading={loading}
          isError={Boolean(error || !services)}
          title="Services"
        >
          {services && (
            <div className={`row ${serviceRow}`}>
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  id={service.id}
                  title={service.title}
                  description={service.description}
                  icon={toServiceIconName(service.icon)}
                />
              ))}
            </div>
          )}
        </Screen>
      </div>
    </section>
  )
}

export default ServiceScreen
