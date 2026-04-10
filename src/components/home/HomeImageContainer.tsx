import Image from 'next/image'
import React from 'react'
import { usePersonalInfo } from '../../stores/portfolioStore'
import { homeImg, homeImgImg } from './home.css'

export const HomeImageContainer: React.FC = () => {
  const personalInfo = usePersonalInfo()

  if (!personalInfo) {
    return null
  }

  let avatarSrc = personalInfo.avatar.primary

  // Normalize Netlify image-transform URLs back to local public paths when possible.
  try {
    const parsed = new URL(personalInfo.avatar.primary)
    if (parsed.pathname === '/.netlify/images') {
      const sourcePath = parsed.searchParams.get('url')
      if (sourcePath?.startsWith('/')) {
        avatarSrc = sourcePath
      }
    }
  } catch {
    // Keep original source when the value is already a relative URL.
  }

  return (
    <div className={`${homeImg} padd-15`}>
      <Image
        className={homeImgImg}
        src={avatarSrc}
        alt={personalInfo.avatar.alt}
        fill
        priority
        sizes="(max-width: 991px) 100vw, 40vw"
      />
    </div>
  )
}
