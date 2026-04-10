import React from 'react'
import { useTranslation } from '../../localization/localize'
import { usePersonalInfo } from '../../stores/portfolioStore'
import { TextHighlighter } from '../common/TextHighlighter'
import { aboutText, aboutTextH3, aboutTextP, aboutTextSpan } from './about.css'

export const AboutPersonalIntro: React.FC = () => {
  const { t } = useTranslation()
  const personalInfo = usePersonalInfo()

  if (!personalInfo) {
    return null
  }

  const highlightPatterns = [
    'Frontend Developer with over 6 years of experience',
    'successfully stepped into acting Lead and Product Owner(?: roles)?',
    "Developpeur Frontend avec plus de 6 ans d'experience",
    "j'ai occupe avec succes des roles de Lead et Product Owner par interim",
  ]
  const highlightRegex = new RegExp(`^(?:${highlightPatterns.join('|')})$`, 'i')
  const detailedBioSegments = personalInfo.detailedBio.split(
    new RegExp(`(${highlightPatterns.join('|')})`, 'i'),
  )

  return (
    <div className="row">
      <div className={`${aboutText} padd-15`}>
        <h3 className={aboutTextH3}>
          {t('about.introPrefix', { name: personalInfo.name })}{' '}
          <TextHighlighter action="underline" className={aboutTextSpan}>
            {personalInfo.title}
          </TextHighlighter>
        </h3>
        <p className={aboutTextP}>
          {detailedBioSegments.map((segment, index) => {
            if (highlightRegex.test(segment)) {
              return (
                <TextHighlighter key={`${segment}-${index}`} action="highlight">
                  {segment}
                </TextHighlighter>
              )
            }

            return <React.Fragment key={`${segment}-${index}`}>{segment}</React.Fragment>
          })}
        </p>
      </div>
    </div>
  )
}
