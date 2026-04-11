import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import { hyperTextChar, hyperTextContainer } from './hyperText.css'

interface HyperTextProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  text: string
  duration?: number
  delay?: number
  as?: ElementType
  animateOnLoad?: boolean
  animateOnHover?: boolean
  characterSet?: string[]
  renderCharacter?: (char: string, index: number) => ReactNode
}

const DEFAULT_CHARACTER_SET = Object.freeze('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''))

const getRandomInt = (max: number) => Math.floor(Math.random() * max)

export function HyperText({
  text,
  duration = 800,
  delay = 0,
  as: Component = 'div',
  animateOnLoad = true,
  animateOnHover = true,
  characterSet = DEFAULT_CHARACTER_SET as unknown as string[],
  renderCharacter,
  className,
  ...props
}: HyperTextProps) {
  const [displayText, setDisplayText] = useState<string[]>(text.split(''))
  const isAnimating = useRef(false)
  const iterations = text.length

  const triggerAnimation = () => {
    if (isAnimating.current) {
      return
    }
    isAnimating.current = true

    let currentIteration = 0

    const interval = setInterval(
      () => {
        setDisplayText((currentText) =>
          currentText.map((l, i) => {
            if (l === ' ') {
              return l
            }
            if (i < currentIteration) {
              return text[i]
            }
            return characterSet[getRandomInt(characterSet.length)]
          }),
        )

        currentIteration += 0.3

        if (currentIteration >= iterations) {
          clearInterval(interval)
          setDisplayText(text.split(''))
          isAnimating.current = false
        }
      },
      duration / (iterations * 4),
    )

    return interval
  }

  useEffect(() => {
    if (!animateOnLoad) {
      return
    }
    let interval: NodeJS.Timeout | undefined

    const timeout = setTimeout(() => {
      interval = triggerAnimation()
    }, delay)

    return () => {
      clearTimeout(timeout)
      if (interval) {
        clearInterval(interval)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, animateOnLoad, delay])

  return (
    <Component
      className={`${hyperTextContainer} ${className || ''}`}
      onMouseEnter={() => {
        if (animateOnHover) {
          triggerAnimation()
        }
      }}
      {...props}
    >
      {displayText.map((letter, i) => (
        <React.Fragment key={i}>
          {renderCharacter ? (
            renderCharacter(letter, i)
          ) : (
            <span className={hyperTextChar}>{letter}</span>
          )}
        </React.Fragment>
      ))}
    </Component>
  )
}
