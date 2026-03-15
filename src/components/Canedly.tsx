import { faComments } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { PopupModal } from 'react-calendly'
import { useTranslation } from 'react-i18next'
import { useThemeStore } from '../stores/themeStore'
import { floatingContainer, triggerButton, triggerIcon, triggerLabelDesktop } from './canedly.css'

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
  const [isOpen, setIsOpen] = useState(false)

  const currentAccentColor =
    colorThemes[currentColor as keyof typeof colorThemes] ?? colorThemes['color-1']
  const rootElement = document.getElementById('root') ?? document.body
  const desktopText = t('common.calendly.cta')

  return (
    <>
      <div className={floatingContainer}>
        <button
          className={triggerButton}
          style={{ background: currentAccentColor }}
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={desktopText}
        >
          <FontAwesomeIcon icon={faComments} className={triggerIcon} />
          <span className={triggerLabelDesktop}>{desktopText}</span>
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
