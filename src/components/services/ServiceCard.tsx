import type { LucideIcon } from 'lucide-react'
import type { PropsWithChildren } from 'react'
import React from 'react'
import {
  serviceH4,
  serviceIcon,
  serviceIconFA,
  serviceIconFAHover,
  serviceItem,
  serviceItemInner,
  serviceItemInnerHover,
  serviceP,
} from '@components/services/services.css'
import { cx } from '@utils/cn'

type ServiceCardRootProps = PropsWithChildren

interface ServiceCardIconProps {
  icon: LucideIcon
}

type ServiceCardTitleProps = PropsWithChildren

type ServiceCardBodyProps = PropsWithChildren

type ServiceCardCompound = React.FC<ServiceCardRootProps> & {
  Icon: React.FC<ServiceCardIconProps>
  Title: React.FC<ServiceCardTitleProps>
  Body: React.FC<ServiceCardBodyProps>
}

const ServiceCardRoot: React.FC<ServiceCardRootProps> = ({ children }) => {
  return (
    <div className={cx(serviceItem, 'padd-15')}>
      <div className={serviceItemInner}>{children}</div>
    </div>
  )
}

const ServiceCardIcon: React.FC<ServiceCardIconProps> = ({ icon }) => {
  const Icon = icon

  return (
    <div className={cx(serviceIcon, serviceItemInnerHover)}>
      <Icon className={cx(serviceIconFA, serviceIconFAHover)} size={40} />
    </div>
  )
}

const ServiceCardTitle: React.FC<ServiceCardTitleProps> = ({ children }) => {
  return <h4 className={serviceH4}>{children}</h4>
}

const ServiceCardBody: React.FC<ServiceCardBodyProps> = ({ children }) => {
  return <p className={serviceP}>{children}</p>
}

export const ServiceCard: ServiceCardCompound = Object.assign(ServiceCardRoot, {
  Icon: ServiceCardIcon,
  Title: ServiceCardTitle,
  Body: ServiceCardBody,
})
