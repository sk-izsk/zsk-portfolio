import type { LucideIcon } from 'lucide-react'
import {
  Briefcase,
  Code,
  Cuboid,
  Laptop,
  LineChart,
  Megaphone,
  MessageCircle,
  Palette,
  Search,
  Server,
  Smartphone,
} from 'lucide-react'
import React from 'react'
import { Screen } from '@components/Screen'
import { ServiceCard } from '@components/services/ServiceCard'
import { serviceRow } from '@components/services/services.css'
import { useAnalytics } from '@hooks/useAnalytics'
import { useTranslation } from '@localization/localize'
import { usePortfolioError, usePortfolioLoading, useServices } from '@stores/portfolioStore'

const serviceIconMap: Record<string, LucideIcon> = {
  code: Code,
  'laptop-code': Laptop,
  server: Server,
  comments: MessageCircle,
  palette: Palette,
  'chart-line': LineChart,
  'mobile-alt': Smartphone,
  search: Search,
  bullhorn: Megaphone,
  cubes: Cuboid,
  briefcase: Briefcase,
}

const toServiceIcon = (rawIcon: string): LucideIcon => {
  const normalized = rawIcon.replace('fa-', '')
  return serviceIconMap[normalized] ?? Code
}

const ServiceScreen: React.FC = () => {
  const services = useServices()
  const loading = usePortfolioLoading()
  const error = usePortfolioError()
  const { t } = useTranslation()
  useAnalytics()

  return (
    <Screen
      sectionId="service"
      isLoading={loading}
      isError={Boolean(error || !services)}
      title={t('services.title')}
      description={t('services.seoDescription')}
      canonical="/services"
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
