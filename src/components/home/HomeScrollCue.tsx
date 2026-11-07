import React from 'react'
import { Link } from 'react-router'
import { homeScrollCue, homeScrollCueIcon } from '@components/home/home.css'
import { useTranslation } from '@localization/localize'
import { ChevronDown } from 'lucide-react'

export const HomeScrollCue: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Link to="/about" className={homeScrollCue}>
      {t('home.scrollCue')}
      <ChevronDown className={homeScrollCueIcon} size={16} aria-hidden="true" />
    </Link>
  )
}
