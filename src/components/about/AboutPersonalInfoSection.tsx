import dayjs from 'dayjs'
import React from 'react'
import { useTranslation } from '../../localization/localize'
import { useContactInfo, usePersonalInfo } from '../../stores/portfolioStore'
import { Button } from '../common/button/Button'
import {
  btnMargin,
  buttons,
  buttonsCompactTop,
  infoItem,
  infoItemP,
  infoItemSpan,
  infoItemSpanLink,
  personalInfoSection,
} from './about.css'
import { trackGaEvent, trackMixpanelEvent } from '../../utils/analytics'

export const AboutPersonalInfoSection: React.FC = () => {
  const { t, i18n } = useTranslation()
  const personalInfo = usePersonalInfo()
  const contact = useContactInfo()

  if (!personalInfo || !contact) {
    return null
  }

  const birthday = dayjs(personalInfo.birthday)
  const ageInYears = dayjs().diff(birthday, 'year')

  const personalInfoData = [
    {
      label: t('about.info.birthday'),
      value: birthday.isValid()
        ? new Date(personalInfo.birthday).toLocaleDateString(
            i18n.resolvedLanguage === 'fr' ? 'fr-FR' : 'en-US',
            {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            },
          )
        : t('about.info.notAvailable'),
    },
    { label: t('about.info.age'), value: ageInYears },
    {
      label: t('about.info.website'),
      value: contact.social.website.label,
      href: contact.social.website.url,
      openInNewTab: true,
    },
    {
      label: t('about.info.email'),
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    { label: t('about.info.phone'), value: contact.phone },
    { label: t('about.info.city'), value: personalInfo.location.city },
    {
      label: t('about.info.availability'),
      value: personalInfo.availability.join(', '),
    },
    {
      label: t('about.info.languages'),
      value: personalInfo.languages.join(', '),
    },
  ]

  return (
    <div className="row">
      <div className={`${personalInfoSection} padd-15`}>
        <div className="row">
          {personalInfoData.map((item) => (
            <div key={item.label} className={`${infoItem} padd-15`}>
              <p className={infoItemP}>
                {item.label} :{' '}
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.openInNewTab ? '_blank' : undefined}
                    rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
                    className={infoItemSpanLink}
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className={infoItemSpan}>{item.value}</span>
                )}
              </p>
            </div>
          ))}
        </div>
        <div className={`${buttons} ${buttonsCompactTop}`}>
          <Button
            as="a"
            href={personalInfo.resume_link}
            variant="primary"
            size="large"
            className={btnMargin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackGaEvent('About', 'download_cv_click', 'Download CV')
              trackMixpanelEvent('download_cv_click', 'About', 'Download CV')
            }}
          >
            {t('about.actions.downloadCv')}
          </Button>
          <Button
            as="a"
            href="#contact"
            variant="secondary"
            size="large"
            className={`hire-me ${btnMargin}`}
            onClick={() => {
              trackGaEvent('About', 'hire_me_click', 'Hire Me')
              trackMixpanelEvent('hire_me_click', 'About', 'Hire Me')
            }}
          >
            {t('about.actions.hireMe')}
          </Button>
        </div>
      </div>
    </div>
  )
}
