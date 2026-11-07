import { bookMeetingButton, modalLoadingState } from '@components/canedly/canedly.css'
import { Button } from '@components/common/button/Button'
import { useTranslation } from '@localization/localize'
import { useThemeStore } from '@stores/themeStore'
import { trackGaEvent, trackMixpanelEvent } from '@utils/analytics'
import { CalendarDays } from 'lucide-react'
import { useEffect, useState } from 'react'

const colorThemes = {
  'color-1': '#ec1839',
  'color-2': '#fa5b0f',
  'color-3': '#37b182',
  'color-5': '#f021b2',
  'color-7': '#daa520',
  'color-9': '#00bfff',
} as const

const stripHexPrefix = (value: string) => value.replace(/^#/, '')

type PopupModalComponent = typeof import('react-calendly').PopupModal

export const Canedly = () => {
  const { t } = useTranslation()
  const isDarkMode = useThemeStore((state) => state.isDarkMode)
  const currentColor = useThemeStore((state) => state.currentColor)
  const [isOpen, setIsOpen] = useState(false)
  const [PopupModalComponent, setPopupModalComponent] = useState<PopupModalComponent | null>(null)

  const currentAccentColor =
    colorThemes[currentColor as keyof typeof colorThemes] ?? colorThemes['color-1']
  const rootElement = document.getElementById('root') ?? document.body

  useEffect(() => {
    if (!isOpen || PopupModalComponent) {
      return
    }

    void import('react-calendly').then((module) => {
      setPopupModalComponent(() => module.PopupModal)
    })
  }, [PopupModalComponent, isOpen])

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflowY = 'hidden'
      document.body.style.overflowY = 'hidden'
    } else {
      document.documentElement.style.overflowY = ''
      document.body.style.overflowY = ''
    }
    return () => {
      document.documentElement.style.overflowY = ''
      document.body.style.overflowY = ''
    }
  }, [isOpen])

  return (
    <>
      <Button
        variant="secondary"
        size="large"
        className={bookMeetingButton}
        onClick={() => {
          trackGaEvent('Calendly', 'book_meeting_click', 'Book a meeting')
          trackMixpanelEvent('book_meeting_click', 'Calendly', 'Book a meeting')
          setIsOpen(true)
        }}
      >
        <CalendarDays size={18} aria-hidden="true" />
        {t('common.calendly.cta')}
      </Button>

      {isOpen && !PopupModalComponent ? (
        <div className={modalLoadingState}>Loading scheduler...</div>
      ) : null}
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
