import React, { useEffect, useRef, useState } from 'react'
import {
  reducedMotionReveal,
  revealRoot,
  revealWord,
  revealWordGhost,
  revealWordText,
  revealWordVisible,
} from './TextReveal.css'

interface TextRevealProps {
  children: string
  className?: string
}

export const TextReveal: React.FC<TextRevealProps> = ({ children, className }) => {
  const rootRef = useRef<HTMLSpanElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const words = children.trim().split(/\s+/)

  useEffect(() => {
    const element = rootRef.current

    if (!element) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px',
      },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <span ref={rootRef} className={[revealRoot, className].filter(Boolean).join(' ')}>
      {words.map((word, index) => {
        const textClasses = [
          revealWordText,
          reducedMotionReveal,
          isVisible ? revealWordVisible : '',
        ]
          .filter(Boolean)
          .join(' ')

        return (
          <span key={`${word}-${index}`} className={revealWord}>
            <span aria-hidden="true" className={revealWordGhost}>
              {word}
            </span>
            <span className={textClasses} style={{ transitionDelay: `${index * 28}ms` }}>
              {word}
            </span>
          </span>
        )
      })}
    </span>
  )
}
