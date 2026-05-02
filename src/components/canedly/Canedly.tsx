import { MessageCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from '@localization/localize'
import { useThemeStore } from '@stores/themeStore'
import {
  floatingContainer,
  modalLoadingState,
  triggerButton,
  triggerColor1,
  triggerColor2,
  triggerColor3,
  triggerColor5,
  triggerColor7,
  triggerColor9,
  triggerIcon,
  triggerLabelDesktop,
} from '@components/canedly/canedly.css'
import { trackGaEvent, trackMixpanelEvent } from '@utils/analytics'

const colorThemes = {
  'color-1': '#ec1839',
  'color-2': '#fa5b0f',
  'color-3': '#37b182',
  'color-5': '#f021b2',
  'color-7': '#daa520',
  'color-9': '#00bfff',
} as const

const stripHexPrefix = (value: string) => value.replace(/^#/, '')

const triggerColorClassByTheme = {
  'color-1': triggerColor1,
  'color-2': triggerColor2,
  'color-3': triggerColor3,
  'color-5': triggerColor5,
  'color-7': triggerColor7,
  'color-9': triggerColor9,
} as const

type PopupModalComponent = typeof import('react-calendly').PopupModal

export const Canedly = () => {
  const { t } = useTranslation()
  const isDarkMode = useThemeStore((state) => state.isDarkMode)
  const currentColor = useThemeStore((state) => state.currentColor)
  const [isOpen, setIsOpen] = useState(false)
  const [PopupModalComponent, setPopupModalComponent] = useState<PopupModalComponent | null>(null)

  const currentAccentColor =
    colorThemes[currentColor as keyof typeof colorThemes] ?? colorThemes['color-1']
  const triggerColorClass =
    triggerColorClassByTheme[currentColor as keyof typeof triggerColorClassByTheme] ?? triggerColor1
  const rootElement = document.getElementById('root') ?? document.body
  const desktopText = t('common.calendly.cta')

  useEffect(() => {
    if (!isOpen || PopupModalComponent) {
      return
    }

    void import('react-calendly').then((module) => {
      setPopupModalComponent(() => module.PopupModal)
    })
  }, [PopupModalComponent, isOpen])

  return (
    <>
      <div className={floatingContainer}>
        <button
          className={`${triggerButton} ${triggerColorClass}`}
          type="button"
          onClick={() => {
            trackGaEvent('Calendly', 'book_meeting_click', 'Want to book a meeting')
            trackMixpanelEvent('book_meeting_click', 'Calendly', 'Want to book a meeting')
            setIsOpen(true)
          }}
          aria-label={desktopText}
        >
          <MessageCircle className={triggerIcon} size={18} />
          <span className={triggerLabelDesktop}>{desktopText}</span>
        </button>
      </div>

      {isOpen && !PopupModalComponent ? <div className={modalLoadingState}>Loading scheduler...</div> : null}
      {PopupModalComponent ? (
        <PopupModalComponent
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
      ) : null}
    </>
  )
}
