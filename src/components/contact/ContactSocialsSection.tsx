import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faTelegram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import {
  faEnvelope,
  faGlobeEurope,
  faMapMarkerAlt,
  faPhone,
} from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { useTranslation } from '../../localization/localize'
import { useContactInfo, usePersonalInfo } from '../../stores/portfolioStore'
import { contactSubTitle, contactTitle } from './contact.css'
import { ContactSocialCard } from './ContactSocialCard'

interface ContactSocialItem {
  icon: IconDefinition
  title: string
  details: string
  url?: string
}

export const ContactSocialsSection: React.FC = () => {
  const { t } = useTranslation()
  const contact = useContactInfo()
  const personalInfo = usePersonalInfo()

  if (!contact || !personalInfo) {
    return null
  }

  const contactInfo: ContactSocialItem[] = [
    {
      icon: faPhone,
      title: t('contact.socials.call'),
      details: contact.phone,
    },
    {
      icon: faMapMarkerAlt,
      title: t('contact.socials.location'),
      details: `${personalInfo.location.city}, ${personalInfo.location.country}`,
    },
    {
      icon: faEnvelope,
      title: t('contact.socials.email'),
      details: contact.email,
      url: `mailto:${contact.email}`,
    },
    {
      icon: faGlobeEurope,
      title: t('contact.socials.website'),
      details: contact.social.website.label,
      url: contact.social.website.url,
    },
    {
      icon: faGithub,
      title: t('contact.socials.github'),
      details: contact.social.github.label,
      url: contact.social.github.url,
    },
    {
      icon: faLinkedin,
      title: t('contact.socials.linkedin'),
      details: contact.social.linkedin.label,
      url: contact.social.linkedin.url,
    },
    {
      icon: faTwitter,
      title: t('contact.socials.twitter'),
      details: contact.social.twitter.label,
      url: contact.social.twitter.url,
    },
    {
      icon: faInstagram,
      title: t('contact.socials.instagram'),
      details: contact.social.instagram.label,
      url: contact.social.instagram.url,
    },
    {
      icon: faTelegram,
      title: t('contact.socials.telegram'),
      details: contact.social.telegram.label,
      url: contact.social.telegram.url,
    },
  ]

  return (
    <>
      <h3 className={`${contactTitle} padd-15`}>{t('contact.socials.heading')}</h3>
      <h4 className={`${contactSubTitle} padd-15`}>{t('contact.socials.subHeading')}</h4>
      <div className="row">
        {contactInfo.map((item) => (
          <ContactSocialCard
            key={`${item.title}-${item.details}`}
            icon={item.icon}
            title={item.title}
            details={item.details}
            url={item.url}
          />
        ))}
      </div>
    </>
  )
}
