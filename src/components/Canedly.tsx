import { faComments } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react'
import { PopupModal } from 'react-calendly'
import { useTranslation } from 'react-i18next'
import { useThemeStore } from '../stores/themeStore'
import {
  floatingContainer,
  triggerButton,
  triggerCollapsed,
  triggerExpanded,
  triggerIcon,
  triggerLabel,
  triggerLabelVisible,
} from './canedly.css'

const colorThemes = {
  'color-1': '#ec1839',
  'color-2': '#fa5b0f',
  'color-3': '#37b182',
  'color-5': '#f021b2',
  'color-7': '#daa520',
  'color-9': '#00bfff',
} as const

const stripHexPrefix = (value: string) => value.replace(/^#/, '')

export const Canedly = () => {
  const { t } = useTranslation()
  const isDarkMode = useThemeStore((state) => state.isDarkMode)
  const currentColor = useThemeStore((state) => state.currentColor)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isPinned, setIsPinned] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const currentAccentColor =
    colorThemes[currentColor as keyof typeof colorThemes] ?? colorThemes['color-1']
  const rootElement = document.getElementById('root') ?? document.body
  const supportsHover = window.matchMedia('(hover: hover)').matches
  const isActive = isExpanded || isPinned
  const buttonText = t('common.calendly.cta')

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as Node

      if (!buttonRef.current?.contains(target)) {
        setIsPinned(false)
        setIsExpanded(false)
      }
    }

    document.addEventListener('mousedown', handleDocumentClick)

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick)
    }
  }, [])

  const handleButtonClick = () => {
    if (!supportsHover && !isActive) {
      setIsExpanded(true)
      setIsPinned(true)
      return
    }

    setIsPinned(true)
    setIsExpanded(true)
    setIsOpen(true)
  }

  return (
    <>
      <div className={floatingContainer}>
        <button
          ref={buttonRef}
          className={`${triggerButton} ${isActive ? triggerExpanded : triggerCollapsed}`}
          style={{ background: currentAccentColor }}
          type="button"
          onMouseEnter={() => {
            if (!isPinned) {
              setIsExpanded(true)
            }
          }}
          onMouseLeave={() => {
            if (!isPinned) {
              setIsExpanded(false)
            }
          }}
          onClick={handleButtonClick}
          aria-label={buttonText}
        >
          <FontAwesomeIcon icon={faComments} className={triggerIcon} />
          <span className={`${triggerLabel} ${isActive ? triggerLabelVisible : ''}`}>
            {buttonText}
          </span>
        </button>
      </div>

      <PopupModal
        url="https://calendly.com/izsk/60min"
        rootElement={rootElement}
        open={isOpen}
        onModalClose={() => setIsOpen(false)}
        pageSettings={{
          primaryColor: stripHexPrefix(currentAccentColor),
          backgroundColor: isDarkMode ? '151515' : 'fdf9ff',
          textColor: isDarkMode ? 'ffffff' : '302e4d',
        }}
      />
    </>
  )
}
