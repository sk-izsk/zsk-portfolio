import { AskAiContent } from '@components/askAi/AskAiContent'
import * as styles from '@components/askAi/askAiWidget.css'
import { useTranslation } from '@localization/localize'
import { useAskAiWidgetStore } from '@stores/askAiWidgetStore'
import { trackGaEvent, trackMixpanelEvent } from '@utils/analytics'
import { Sparkles, X } from 'lucide-react'
import React, { useEffect, useRef } from 'react'

export const AskAiWidget: React.FC = () => {
  const { t } = useTranslation()
  const isOpen = useAskAiWidgetStore((state) => state.isOpen)
  const toggle = useAskAiWidgetStore((state) => state.toggle)
  const close = useAskAiWidgetStore((state) => state.close)
  const hasOpened = useAskAiWidgetStore((state) => state.hasOpened)
  const panelRef = useRef<HTMLElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const panel = panelRef.current

    if (isOpen) {
      panel?.focus({ preventScroll: true })
      return
    }

    // Closing hides what had focus, so keyboard users continue from the button that opened it.
    if (panel?.contains(document.activeElement)) {
      triggerRef.current?.focus({ preventScroll: true })
    }
  }, [isOpen])

  // Listens on the window because focus leaves the panel when a clicked suggestion disappears.
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close()
      }
    }

    window.addEventListener('keydown', closeOnEscape)

    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isOpen, close])

  const handleTriggerClick = () => {
    if (!isOpen) {
      trackGaEvent('AskAi', 'chat_open_click', 'Open chat')
      trackMixpanelEvent('chat_open_click', 'AskAi', 'Open chat')
    }

    toggle()
  }

  return (
    <>
      {/* Stays mounted while closed, which keeps the chat history until the page is reloaded. */}
      <section
        ref={panelRef}
        className={styles.panel}
        data-open={isOpen || undefined}
        data-content-protected
        aria-label={t('askAi.title')}
        tabIndex={-1}
        inert={!isOpen}
      >
        <AskAiContent onClose={close} />
      </section>
      <div className={styles.triggerWrap} data-open={isOpen || undefined}>
        {hasOpened ? null : (
          <span className={styles.hint} aria-hidden="true">
            {t('askAi.openChat')}
          </span>
        )}
        <button
          ref={triggerRef}
          className={styles.trigger}
          data-open={isOpen || undefined}
          data-opened-before={hasOpened || undefined}
          type="button"
          onClick={handleTriggerClick}
          aria-expanded={isOpen}
          aria-label={isOpen ? t('askAi.closeChat') : t('askAi.openChat')}
        >
          <Sparkles className={styles.triggerIconOpen} size={22} aria-hidden="true" />
          <X className={styles.triggerIconClose} size={22} aria-hidden="true" />
        </button>
      </div>
    </>
  )
}
