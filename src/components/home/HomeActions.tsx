import React from 'react'
import { Link } from 'react-router'
import { button, large, link } from '@components/common/button/button.css'
import { homeActions, homeAskAi } from '@components/home/home.css'
import { HomeDownloadCv } from '@components/home/HomeDownloadCv'
import { useTranslation } from '@localization/localize'
import { trackGaEvent, trackMixpanelEvent } from '@utils/analytics'
import { cx } from '@utils/cn'

export const HomeActions: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className={homeActions}>
      <HomeDownloadCv />
      <Link
        to="/ask-ai"
        className={cx(button, large, link, homeAskAi)}
        onClick={() => {
          trackGaEvent('Home', 'ask_ai_click', 'Ask AI')
          trackMixpanelEvent('ask_ai_click', 'Home', 'Ask AI')
        }}
      >
        {t('home.askAi')}
      </Link>
    </div>
  )
}
