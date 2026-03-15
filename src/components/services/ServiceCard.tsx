import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { PropsWithChildren } from "react"
import React from "react"
import {
  serviceH4,
  serviceIcon,
  serviceIconFA,
  serviceIconFAHover,
  serviceItem,
  serviceItemInner,
  serviceItemInnerHover,
  serviceP,
} from "./services.css"

type ServiceCardRootProps = PropsWithChildren

interface ServiceCardIconProps {
  icon: IconDefinition
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
    <div className={`${serviceItem} padd-15`}>
      <div className={serviceItemInner}>{children}</div>
    </div>
  )
}

const ServiceCardIcon: React.FC<ServiceCardIconProps> = ({ icon }) => {
  return (
    <div className={`${serviceIcon} ${serviceItemInnerHover}`}>
      <FontAwesomeIcon
        className={`${serviceIconFA} ${serviceIconFAHover}`}
        icon={icon}
      />
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
