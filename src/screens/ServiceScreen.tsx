import { Screen } from '@components/Screen'
import { ServiceCard } from '@components/services/ServiceCard'
import { serviceRow, serviceSeeAll } from '@components/services/services.css'
import { Button } from '@components/common/button/Button'
import { usePreview } from '@hooks/usePreview'
import { useAnalytics } from '@hooks/useAnalytics'
import { useTranslation } from '@localization/localize'
import { usePortfolioError, usePortfolioLoading, useServices } from '@stores/portfolioStore'
import type { LucideIcon } from 'lucide-react'
import {
  Briefcase,
  ClipboardList,
  Code,
  Cuboid,
  FileText,
  Headphones,
  Laptop,
  MessageCircle,
  Server,
  Smartphone,
} from 'lucide-react'
import React from 'react'
import { cx } from '@utils/cn'

const serviceIconById: Record<number, LucideIcon> = {
  1: Laptop,
  2: Server,
  3: Code,
  4: Smartphone,
  5: Cuboid,
  6: MessageCircle,
  7: Briefcase,
  8: ClipboardList,
  9: Headphones,
  10: FileText,
}

const toServiceIcon = (serviceId: number): LucideIcon => {
  return serviceIconById[serviceId] ?? Code
}

const PREVIEW_COUNT_PHONE = 4

const ServiceScreen: React.FC = () => {
  const services = useServices()
  const { visibleItems, hasMore, showAll } = usePreview(services ?? [], PREVIEW_COUNT_PHONE)
  const loading = usePortfolioLoading()
  const error = usePortfolioError()
  const { t } = useTranslation()
  useAnalytics()

  return (
    <Screen
      sectionId="service"
      contentProtected
      isLoading={loading}
      isError={Boolean(error || !services)}
      title={t('services.title')}
      description={t('services.seoDescription')}
      canonical="/services"
    >
      {services && (
        <div className={cx('row', serviceRow)}>
          {visibleItems.map((service) => (
            <ServiceCard key={service.id}>
              <ServiceCard.Icon icon={toServiceIcon(service.id)} />
              <ServiceCard.Title>{service.title}</ServiceCard.Title>
              <ServiceCard.Body>{service.description}</ServiceCard.Body>
            </ServiceCard>
          ))}
          {hasMore ? (
            <div className={serviceSeeAll}>
              <Button variant="secondary" size="large" onClick={showAll}>
                {t('services.seeAll', { count: services.length })}
              </Button>
            </div>
          ) : null}
        </div>
      )}
    </Screen>
  )
}

export default ServiceScreen
