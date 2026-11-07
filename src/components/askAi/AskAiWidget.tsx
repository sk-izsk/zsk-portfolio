import { AskAiContent } from '@components/askAi/AskAiContent'
import { AskAiTrigger } from '@components/askAi/AskAiTrigger'
import * as styles from '@components/askAi/askAiWidget.css'
import { useAskAiButtonMotion } from '@hooks/askAi/useAskAiButtonMotion'
import { useAskAiPanelFocus } from '@hooks/askAi/useAskAiPanelFocus'
import { useAskAiPhoneModal } from '@hooks/askAi/useAskAiPhoneModal'
import { useTranslation } from '@localization/localize'
import { useAskAiWidgetStore } from '@stores/askAiWidgetStore'
import { trackGaEvent, trackMixpanelEvent } from '@utils/analytics'
import React, { useRef } from 'react'

export const AskAiWidget: React.FC = () => {
  const { t } = useTranslation()
  const isOpen = useAskAiWidgetStore((state) => state.isOpen)
  const toggle = useAskAiWidgetStore((state) => state.toggle)
  const close = useAskAiWidgetStore((state) => state.close)
  const panelRef = useRef<HTMLElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const { isCloseShape, playPop } = useAskAiButtonMotion(panelRef, triggerRef, isOpen)

  useAskAiPanelFocus(panelRef, triggerRef, isOpen, isCloseShape, close)
  useAskAiPhoneModal(panelRef, isOpen)

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
      <AskAiTrigger
        triggerRef={triggerRef}
        isCloseShape={isCloseShape}
        onClick={handleTriggerClick}
      />
    </>
  )
}
