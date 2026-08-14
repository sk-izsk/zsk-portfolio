import * as styles from '@components/askAi/askAi.css'
import { useTranslation } from '@localization/localize'
import { Loader2 } from 'lucide-react'
import React from 'react'

export const AskAiHealthOverlay: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.healthOverlay} aria-live="assertive">
      <div className={styles.healthBox}>
        <span className={styles.healthIconTrack} aria-hidden>
          <Loader2 className={styles.healthIcon} size={28} />
        </span>
        <span>{t('askAi.healthCheck')}</span>
      </div>
    </div>
  )
}
