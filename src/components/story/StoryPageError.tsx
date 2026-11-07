import { useTranslation } from '@localization/localize'
import React from 'react'

export const StoryPageError: React.FC = () => {
  const { t } = useTranslation()

  return <div className="screen-state screen-state--error">{t('common.pageLoadError')}</div>
}
