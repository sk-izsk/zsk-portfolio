import * as styles from '@components/askAi/askAi.css'
import { useTranslation } from '@localization/localize'
import { formatResetTime } from '@utils/askAi'
import { Loader2, Sparkles } from 'lucide-react'
import type { PropsWithChildren } from 'react'
import React from 'react'

interface AskAiHeroProps extends PropsWithChildren {
  remaining: number | undefined
  resetInSeconds: number
  isLoading: boolean
}

export const AskAiHero: React.FC<AskAiHeroProps> = ({
  remaining,
  resetInSeconds,
  isLoading,
  children,
}) => {
  const { t } = useTranslation()

  return (
    <header className={styles.hero}>
      <span className={styles.eyebrow}>
        <Sparkles size={16} aria-hidden />
        {t('askAi.heroEyebrow')}
      </span>
      <span className={styles.meter} aria-live="polite">
        {t('askAi.remaining')}
        <strong className={styles.meterValue}>
          {isLoading ? (
            <Loader2
              className={styles.meterSpinner}
              size={13}
              aria-label={t('askAi.checkingUsage')}
            />
          ) : (
            (remaining ?? '–')
          )}
        </strong>
        {remaining === 0 && resetInSeconds > 0 ? (
          <span className={styles.meterReset}>
            · {t('askAi.resetsIn', { time: formatResetTime(resetInSeconds) })}
          </span>
        ) : null}
      </span>
      {children}
      <h3 className={styles.heroTitle}>{t('askAi.heroTitle')}</h3>
      <p className={styles.heroBody}>{t('askAi.heroBody')}</p>
    </header>
  )
}
