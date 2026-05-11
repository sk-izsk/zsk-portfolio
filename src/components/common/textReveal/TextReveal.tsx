import React, { useEffect, useRef, useState } from 'react'
import * as styles from '@components/common/textReveal/TextReveal.css'
import { createCn, raw } from '@utils/cn'

interface TextRevealProps {
  children: string
  className?: string
}
const cn = createCn(styles)

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
    <span ref={rootRef} className={cn('revealRoot', raw(className))}>
      {words.map((word, index) => {
        const delayClass = styles.revealDelay[Math.min(index, styles.revealDelay.length - 1)]
        const textClasses = cn(
          'revealWordText',
          'reducedMotionReveal',
          raw(delayClass),
          { revealWordVisible: isVisible },
        )

        return (
          <span key={`${word}-${index}`} className={styles.revealWord}>
            <span aria-hidden="true" className={styles.revealWordGhost}>
              {word}
            </span>
            <span className={textClasses}>{word}</span>
          </span>
        )
      })}
    </span>
  )
}
