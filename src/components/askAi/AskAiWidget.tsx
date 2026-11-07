import { messages } from '@components/askAi/askAi.css'
import { AskAiContent } from '@components/askAi/AskAiContent'
import { AskAiTeaser } from '@components/askAi/AskAiTeaser'
import * as styles from '@components/askAi/askAiWidget.css'
import { useGenie } from '@hooks/useGenie'
import { useTranslation } from '@localization/localize'
import { useAskAiWidgetStore } from '@stores/askAiWidgetStore'
import { trackGaEvent, trackMixpanelEvent } from '@utils/analytics'
import { Sparkles, X } from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'

const MESSAGES_SELECTOR = `.${messages}`
const POP_MS = 500

export const AskAiWidget: React.FC = () => {
  const { t } = useTranslation()
  const isOpen = useAskAiWidgetStore((state) => state.isOpen)
  const toggle = useAskAiWidgetStore((state) => state.toggle)
  const close = useAskAiWidgetStore((state) => state.close)
  const hasOpened = useAskAiWidgetStore((state) => state.hasOpened)
  const panelRef = useRef<HTMLElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  // The button keeps its close shape until the chat has fully poured back into it.
  const [isCloseShape, setIsCloseShape] = useState(isOpen)

  const playPop = useCallback(() => {
    if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
      triggerRef.current?.animate(
        [
          { transform: 'scale(1)' },
          { transform: 'scale(0.86)' },
          { transform: 'scale(1.1)' },
          { transform: 'scale(0.97)' },
          { transform: 'scale(1)' },
        ],
        { duration: POP_MS, easing: 'ease-out' },
      )
    }
  }, [])

  const handleGenieSettled = useCallback(
    (nowOpen: boolean) => {
      setIsCloseShape(nowOpen)
      playPop()
    },
    [playPop],
  )

  useGenie(panelRef, triggerRef, isOpen, handleGenieSettled, MESSAGES_SELECTOR)

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
      playPop()
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
      <div className={styles.triggerWrap} data-open={isCloseShape || undefined}>
        {hasOpened ? null : (
          <AskAiTeaser
            questions={[t('askAi.prompts.aiProjects'), t('askAi.prompts.reactNative')]}
            onOpen={handleTriggerClick}
          />
        )}
        <span className={styles.glow} aria-hidden="true" />
        <span className={styles.shadowPill} aria-hidden="true" />
        <span className={styles.shadowCircle} aria-hidden="true" />
        <button
          ref={triggerRef}
          className={styles.trigger}
          data-open={isCloseShape || undefined}
          type="button"
          onClick={handleTriggerClick}
          aria-expanded={isOpen}
          aria-label={isOpen ? t('askAi.closeChat') : t('askAi.openChat')}
        >
          <span className={styles.ring} aria-hidden="true" />
          <span className={styles.fill} aria-hidden="true" />
          <Sparkles className={styles.triggerIcon} size={20} aria-hidden="true" />
          <span className={styles.triggerLabel}>{t('askAi.triggerLabel')}</span>
          <X className={styles.triggerClose} size={22} aria-hidden="true" />
        </button>
      </div>
    </>
  )
}
