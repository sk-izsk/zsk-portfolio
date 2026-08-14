import type { AskAiSubmitHandler } from '@app-types/askAi'
import * as styles from '@components/askAi/askAi.css'
import { useTranslation } from '@localization/localize'
import React from 'react'

interface AskAiEmptyStateProps {
  prompts: string[]
  onSubmit: AskAiSubmitHandler
}

export const AskAiEmptyState: React.FC<AskAiEmptyStateProps> = ({ prompts, onSubmit }) => {
  const { t } = useTranslation()

  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyTitle}>{t('askAi.emptyTitle')}</div>
      <p>{t('askAi.emptyBody')}</p>
      <div className={styles.promptGrid}>
        {prompts.map((prompt) => (
          <button
            key={prompt}
            className={styles.promptButton}
            type="button"
            onClick={() => void onSubmit(prompt)}
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  )
}
