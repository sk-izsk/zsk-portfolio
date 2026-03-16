import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faBullhorn,
  faChartLine,
  faCode,
  faComments,
  faCubes,
  faLaptopCode,
  faMobileAlt,
  faPalette,
  faSearch,
  faServer,
} from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Screen } from '../components/Screen'
import { ServiceCard } from '../components/services/ServiceCard'
import { serviceRow } from '../components/services/services.css'
import { usePortfolioError, usePortfolioLoading, useServices } from '../stores/portfolioStore'

const serviceIconMap: Record<string, IconDefinition> = {
  code: faCode,
  'laptop-code': faLaptopCode,
  server: faServer,
  comments: faComments,
  palette: faPalette,
  'chart-line': faChartLine,
  'mobile-alt': faMobileAlt,
  search: faSearch,
  bullhorn: faBullhorn,
  cubes: faCubes,
}

const toServiceIcon = (rawIcon: string): IconDefinition => {
  const normalized = rawIcon.replace('fa-', '')
  return serviceIconMap[normalized] ?? faCode
}

const ServiceScreen: React.FC = () => {
  const services = useServices()
  const loading = usePortfolioLoading()
  const error = usePortfolioError()
  const { t } = useTranslation()

  return (
    <Screen
      sectionId="service"
      isLoading={loading}
      isError={Boolean(error || !services)}
      title={t('services.title')}
    >
      {services && (
        <div className={`row ${serviceRow}`}>
          {services.map((service) => (
            <ServiceCard key={service.id}>
              <ServiceCard.Icon icon={toServiceIcon(service.icon)} />
              <ServiceCard.Title>{service.title}</ServiceCard.Title>
              <ServiceCard.Body>{service.description}</ServiceCard.Body>
            </ServiceCard>
          ))}
        </div>
      )}
    </Screen>
  )
}

export default ServiceScreen
