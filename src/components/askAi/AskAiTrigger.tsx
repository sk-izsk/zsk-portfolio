import { AskAiTeaser } from '@components/askAi/AskAiTeaser'
import * as styles from '@components/askAi/askAiTrigger.css'
import { useTranslation } from '@localization/localize'
import { useAskAiWidgetStore } from '@stores/askAiWidgetStore'
import { Sparkles, X } from 'lucide-react'
import React, { type RefObject } from 'react'

interface AskAiTriggerProps {
  triggerRef: RefObject<HTMLButtonElement | null>
  isCloseShape: boolean
  onClick: () => void
}

export const AskAiTrigger: React.FC<AskAiTriggerProps> = ({
  triggerRef,
  isCloseShape,
  onClick,
}) => {
  const { t } = useTranslation()
  const isOpen = useAskAiWidgetStore((state) => state.isOpen)
  const hasOpened = useAskAiWidgetStore((state) => state.hasOpened)

  return (
    <div className={styles.triggerWrap} data-open={isCloseShape || undefined}>
      {hasOpened ? null : (
        <AskAiTeaser
          questions={[t('askAi.prompts.aiProjects'), t('askAi.prompts.reactNative')]}
          onOpen={onClick}
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
        onClick={onClick}
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
  )
}
