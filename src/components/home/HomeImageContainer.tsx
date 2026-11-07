import React from 'react'
import { usePersonalInfo } from '@stores/portfolioStore'
import {
  homeBracket,
  homeBracketEnd,
  homeBracketStart,
  homeImg,
  homeImgImg,
} from '@components/home/home.css'
import { cx } from '@utils/cn'

export const HomeImageContainer: React.FC = () => {
  const personalInfo = usePersonalInfo()

  if (!personalInfo) {
    return null
  }

  return (
    <div className={cx(homeImg, 'padd-15')}>
      <span className={cx(homeBracket, homeBracketStart)} aria-hidden="true" />
      <img className={homeImgImg} src={personalInfo.avatar.primary} alt={personalInfo.avatar.alt} />
      <span className={cx(homeBracket, homeBracketEnd)} aria-hidden="true" />
    </div>
  )
}
