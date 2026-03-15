import type { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import {
  contactInfoIcon,
  contactInfoIconFa,
  contactInfoItem,
  contactInfoItemH4,
  contactInfoItemLink,
  contactInfoItemP,
} from "./contact.css"

interface ContactSocialCardProps {
  icon: IconProp
  title: string
  details: string
  url?: string
}

export const ContactSocialCard: React.FC<ContactSocialCardProps> = ({
  icon,
  title,
  details,
  url,
}) => {
  const inner = (
    <>
      <div className={contactInfoIcon}>
        <FontAwesomeIcon icon={icon} className={contactInfoIconFa} />
      </div>
      <h4 className={contactInfoItemH4}>{title}</h4>
      <p className={contactInfoItemP}>{details}</p>
    </>
  )

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${contactInfoItem} ${contactInfoItemLink} padd-15`}
      >
        {inner}
      </a>
    )
  }

  return <div className={`${contactInfoItem} padd-15`}>{inner}</div>
}