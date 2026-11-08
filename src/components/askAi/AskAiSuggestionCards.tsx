import type { AskAiSubmitHandler } from '@app-types/askAi'
import * as styles from '@components/askAi/askAi.css'
import { useTranslation } from '@localization/localize'
import React from 'react'

interface AskAiSuggestionCardsProps {
  prompts: string[]
  disabled: boolean
  onSubmit: AskAiSubmitHandler
}

export const AskAiSuggestionCards: React.FC<AskAiSuggestionCardsProps> = ({
  prompts,
  disabled,
  onSubmit,
}) => {
  const { t } = useTranslation()

  return (
    <div className={styles.activeSuggestions} aria-label={t('askAi.suggestions')}>
      <span className={styles.suggestionLabel}>{t('askAi.suggestions')}</span>
      {prompts.map((prompt) => (
        <button
          key={prompt}
          className={styles.suggestionChip}
          type="button"
          disabled={disabled}
          onClick={() => void onSubmit(prompt)}
        >
          {prompt}
        </button>
      ))}
    </div>
  )
}
