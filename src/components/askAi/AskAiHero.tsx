import * as styles from '@components/askAi/askAi.css'
import { useTranslation } from '@localization/localize'
import { formatResetTime } from '@utils/askAi'
import { Sparkles } from 'lucide-react'
import React from 'react'

interface AskAiHeroProps {
  remaining: number | null
  resetInSeconds: number
}

export const AskAiHero: React.FC<AskAiHeroProps> = ({ remaining, resetInSeconds }) => {
  const { t } = useTranslation()

  return (
    <header className={styles.hero}>
      <div>
        <span className={styles.eyebrow}>
          <Sparkles size={16} aria-hidden />
          {t('askAi.heroEyebrow')}
        </span>
        <h3 className={styles.heroTitle}>{t('askAi.heroTitle')}</h3>
        <p className={styles.heroBody}>{t('askAi.heroBody')}</p>
      </div>
      <div className={styles.meter} aria-live="polite">
        <span className={styles.meterLabel}>{t('askAi.remaining')}</span>
        <span className={styles.meterValue}>{remaining ?? 3}</span>
        {remaining === 0 && resetInSeconds > 0 ? (
          <span className={styles.meterReset}>
            {t('askAi.resetsIn', { time: formatResetTime(resetInSeconds) })}
          </span>
        ) : null}
      </div>
    </header>
  )
}
