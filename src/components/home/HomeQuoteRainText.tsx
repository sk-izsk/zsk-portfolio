import { homeQuoteChar, homeQuoteSrOnly } from '@components/home/home.css'
import React from 'react'

interface HomeQuoteRainTextProps {
  text: string
}

export const HomeQuoteRainText: React.FC<HomeQuoteRainTextProps> = ({ text }) => (
  <>
    {/* Screen readers would otherwise spell out the letters the rain needs as spans. */}
    <span className={homeQuoteSrOnly}>{text}</span>
    <span aria-hidden="true">
      {text.split(' ').map((word, wordIndex) => (
        // Words repeat and the list never reorders, so the position is the identity.
        <React.Fragment key={`${word}-${wordIndex}`}>
          {word.split('').map((char, charIndex) => (
            <span key={charIndex} className={homeQuoteChar}>
              {char}
            </span>
          ))}{' '}
        </React.Fragment>
      ))}
    </span>
  </>
)
