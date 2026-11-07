import React, { useRef } from 'react'
import {
  homeInfo,
  homeQuoteShelf,
  homeRow,
  homeScene,
  homeShelfQuote,
  homeStage,
} from '@components/home/home.css'
import { HomeActions } from '@components/home/HomeActions'
import { HomeDetailBio } from '@components/home/HomeDetailBio'
import { HomeHeadline } from '@components/home/HomeHeadline'
import { HomeImageContainer } from '@components/home/HomeImageContainer'
import { HomeQuotePlacements } from '@components/home/HomeQuotePlacements'
import { HomeScrollCue } from '@components/home/HomeScrollCue'
import { HomeTagline } from '@components/home/HomeTagline'
import { useHomeScrollScene } from '@hooks/useHomeScrollScene'
import { useTranslation } from '@localization/localize'
import { usePersonalInfo } from '@stores/portfolioStore'
import { cx } from '@utils/cn'

export const HomeScene: React.FC = () => {
  const { t } = useTranslation()
  const personalInfo = usePersonalInfo()
  const sceneRef = useRef<HTMLDivElement>(null)

  useHomeScrollScene(sceneRef, personalInfo ? t('home.headline') : null)

  return (
    <div ref={sceneRef} className={homeScene}>
      <div className={homeStage}>
        <div className={cx('row', homeRow)}>
          <div className={cx(homeInfo, 'padd-15')}>
            <HomeHeadline />
            <HomeDetailBio />
            <HomeActions />
          </div>
          <HomeImageContainer />
        </div>
        <div className={homeQuoteShelf}>
          <HomeTagline />
          <div className={homeShelfQuote}>
            <HomeQuotePlacements />
          </div>
        </div>
        <HomeScrollCue />
      </div>
    </div>
  )
}
