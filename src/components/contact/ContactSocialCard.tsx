import type { LucideIcon } from 'lucide-react'
import React from 'react'
import {
  contactInfoIcon,
  contactInfoIconFa,
  contactInfoItem,
  contactInfoItemH4,
  contactInfoItemLink,
  contactInfoItemP,
  contactInfoItemPLink,
} from '@components/contact/contact.css'
import { cx } from '@utils/cn'

interface ContactSocialCardProps {
  icon: LucideIcon
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
  const Icon = icon
  const openInNewTab = typeof url === 'string' && /^https?:\/\//.test(url)
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!url || openInNewTab) {
      return
    }

    event.preventDefault()
    window.location.href = url
  }

  const inner = (
    <>
      <div className={contactInfoIcon}>
        <Icon className={contactInfoIconFa} size={25} />
      </div>
      <h4 className={contactInfoItemH4}>{title}</h4>
      <p className={url ? contactInfoItemPLink : contactInfoItemP}>{details}</p>
    </>
  )

  if (url) {
    return (
      <a
        href={url}
        onClick={handleClick}
        target={openInNewTab ? '_blank' : undefined}
        rel={openInNewTab ? 'noopener noreferrer' : undefined}
        className={cx(contactInfoItem, contactInfoItemLink, 'padd-15')}
      >
        {inner}
      </a>
    )
  }

  return <div className={cx(contactInfoItem, 'padd-15')}>{inner}</div>
}
