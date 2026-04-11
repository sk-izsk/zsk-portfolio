import type { LucideIcon } from 'lucide-react'
import {
  Briefcase,
  Camera,
  GitBranch,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react'
import React from 'react'
import { useTranslation } from '@localization/localize'
import { useContactInfo, usePersonalInfo } from '@stores/portfolioStore'
import { contactSubTitle, contactTitle } from '@components/contact/contact.css'
import { ContactSocialCard } from '@components/contact/ContactSocialCard'

interface ContactSocialItem {
  icon: LucideIcon
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
      icon: Phone,
      title: t('contact.socials.call'),
      details: contact.phone,
    },
    {
      icon: MapPin,
      title: t('contact.socials.location'),
      details: `${personalInfo.location.city}, ${personalInfo.location.country}`,
    },
    {
      icon: Mail,
      title: t('contact.socials.email'),
      details: contact.email,
      url: `mailto:${contact.email}`,
    },
    {
      icon: Globe,
      title: t('contact.socials.website'),
      details: contact.social.website.label,
      url: contact.social.website.url,
    },
    {
      icon: GitBranch,
      title: t('contact.socials.github'),
      details: contact.social.github.label,
      url: contact.social.github.url,
    },
    {
      icon: Briefcase,
      title: t('contact.socials.linkedin'),
      details: contact.social.linkedin.label,
      url: contact.social.linkedin.url,
    },
    {
      icon: MessageCircle,
      title: t('contact.socials.twitter'),
      details: contact.social.twitter.label,
      url: contact.social.twitter.url,
    },
    {
      icon: Camera,
      title: t('contact.socials.instagram'),
      details: contact.social.instagram.label,
      url: contact.social.instagram.url,
    },
    {
      icon: Send,
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
