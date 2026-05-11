import React from 'react'
import { usePersonalInfo } from '@stores/portfolioStore'
import { homeImg, homeImgImg } from '@components/home/home.css'
import { cx } from '@utils/cn'

export const HomeImageContainer: React.FC = () => {
  const personalInfo = usePersonalInfo()

  if (!personalInfo) {
    return null
  }

  return (
    <div className={cx(homeImg, 'padd-15')}>
      <img className={homeImgImg} src={personalInfo.avatar.primary} alt={personalInfo.avatar.alt} />
    </div>
  )
}
