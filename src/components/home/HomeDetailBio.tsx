import React from 'react'
import { usePersonalInfo } from '../../stores/portfolioStore'
import { TextHighlighter } from '../common/TextHighlighter'
import { homeInfoP } from './home.css'

const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export const HomeDetailBio: React.FC = () => {
  const personalInfo = usePersonalInfo()

  if (!personalInfo) {
    return null
  }

  const underlinePhrases = ['Frontend Engineer', 'Ingenieur logiciel']
  const highlightPhrases = [
    'Expanding into full-stack system design',
    'En pleine expansion vers le design de systemes full-stack',
  ]
  const underlineRegex = new RegExp(`^(?:${underlinePhrases.map(escapeRegExp).join('|')})$`, 'i')
  const highlightRegex = new RegExp(`^(?:${highlightPhrases.map(escapeRegExp).join('|')})$`, 'i')

  const segments = personalInfo.bio.split(
    new RegExp(`(${[...underlinePhrases, ...highlightPhrases].map(escapeRegExp).join('|')})`, 'gi'),
  )

  return (
    <p className={homeInfoP}>
      {segments.map((segment, index) => {
        if (underlineRegex.test(segment)) {
          return (
            <TextHighlighter key={`${segment}-${index}`} action="underline">
              {segment}
            </TextHighlighter>
          )
        }

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
  )
}
