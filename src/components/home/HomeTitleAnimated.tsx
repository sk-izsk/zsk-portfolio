import React, { useEffect, useRef } from 'react'
import Typed from 'typed.js'
import { useTranslation } from '@localization/localize'
import { usePersonalInfo } from '@stores/portfolioStore'
import { hello, helloName, myProfession, typing } from '@components/home/home.css'

export const HomeTitleAnimated: React.FC = () => {
  const { t } = useTranslation()
  const personalInfo = usePersonalInfo()
  const typingRef = useRef<HTMLSpanElement>(null)
  const typedInstance = useRef<Typed | null>(null)

  useEffect(() => {
    if (typingRef.current && !typedInstance.current && personalInfo) {
      const typingStrings = [
        personalInfo.title,
        t('home.roles.fullStack'),
        t('home.roles.react'),
        t('home.roles.typescript'),
        t('home.roles.frontend'),
        t('home.roles.backend'),
        t('home.roles.mobile'),
        t('home.roles.aiEngineering'),
      ]

      typedInstance.current = new Typed(typingRef.current, {
        strings: typingStrings,
        typeSpeed: 100,
        backSpeed: 60,
        loop: true,
      })
    }

    return () => {
      if (typedInstance.current) {
        typedInstance.current.destroy()
        typedInstance.current = null
      }
    }
  }, [personalInfo, t])

  if (!personalInfo) {
    return null
  }

  return (
    <>
      <h3 className={hello}>
        {personalInfo.greeting} <span className={helloName}>{personalInfo.name}</span>
      </h3>
      <h3 className={myProfession}>
        {t('home.professionPrefix')} <span className={typing} ref={typingRef}></span>
      </h3>
    </>
  )
}
