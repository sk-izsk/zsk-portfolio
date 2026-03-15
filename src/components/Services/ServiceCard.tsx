import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
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

export type ServiceIconName =
  | "code"
  | "palette"
  | "chart-line"
  | "mobile-alt"
  | "search"
  | "bullhorn"
  | "cubes"

interface ServiceCardProps {
  id: number
  title: string
  description: string
  icon: ServiceIconName
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  title,
  description,
  icon,
}) => {
  return (
    <div key={id} className={`${serviceItem} padd-15`}>
      <div className={serviceItemInner}>
        <div className={`${serviceIcon} ${serviceItemInnerHover}`}>
          <FontAwesomeIcon
            className={`${serviceIconFA} ${serviceIconFAHover}`}
            icon={icon}
          />
        </div>
        <h4 className={serviceH4}>{title}</h4>
        <p className={serviceP}>{description}</p>
      </div>
    </div>
  )
}
