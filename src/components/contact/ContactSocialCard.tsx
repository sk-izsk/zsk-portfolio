import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import {
  contactInfoIcon,
  contactInfoIconFa,
  contactInfoItem,
  contactInfoItemH4,
  contactInfoItemLink,
  contactInfoItemP,
  contactInfoItemPLink,
} from './contact.css'

interface ContactSocialCardProps {
  icon: IconDefinition
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
  const openInNewTab = typeof url === 'string' && /^https?:\/\//.test(url)

  const inner = (
    <>
      <div className={contactInfoIcon}>
        <FontAwesomeIcon icon={icon} className={contactInfoIconFa} />
      </div>
      <h4 className={contactInfoItemH4}>{title}</h4>
      <p className={url ? contactInfoItemPLink : contactInfoItemP}>{details}</p>
    </>
  )

  if (url) {
    return (
      <a
        href={url}
        target={openInNewTab ? '_blank' : undefined}
        rel={openInNewTab ? 'noopener noreferrer' : undefined}
        className={`${contactInfoItem} ${contactInfoItemLink} padd-15`}
      >
        {inner}
      </a>
    )
  }

  return <div className={`${contactInfoItem} padd-15`}>{inner}</div>
}
