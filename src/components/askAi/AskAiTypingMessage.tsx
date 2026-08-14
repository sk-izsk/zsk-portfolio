import * as styles from '@components/askAi/askAi.css'
import { useTranslation } from '@localization/localize'
import { createCn } from '@utils/cn'
import { Bot } from 'lucide-react'
import React from 'react'

const cn = createCn(styles)

export const AskAiTypingMessage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.messageRow}>
      <span className={styles.avatar} aria-hidden>
        <Bot size={18} />
      </span>
      <div className={styles.bubble}>
        <div className={styles.messageMeta}>{t('askAi.assistantName')}</div>
        <div className={styles.typing} aria-label="Assistant is typing">
          <span className={styles.typingDot} />
          <span className={cn('typingDot', 'typingDotDelayOne')} />
          <span className={cn('typingDot', 'typingDotDelayTwo')} />
        </div>
      </div>
    </div>
  )
}
