import { useNavigate } from 'react-router'

import { Button } from '@components/common/button/Button'
import { Screen } from '@components/Screen'
import { useTranslation } from '@localization/localize'
import React from 'react'

import {
  notFoundBanner,
  notFoundCode,
  notFoundContainer,
  notFoundDescription,
  notFoundTitle,
} from './notFound.css'

const NotFoundScreen: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleRedirect = () => {
    navigate('/')
  }

  return (
    <Screen
      sectionId="not-found"
      sectionClassName={notFoundContainer}
      title=""
      pageTitle={t('notFound.pageTitle')}
      isLoading={false}
      isError={false}
    >
      <div className={notFoundBanner}>
        <div className={notFoundCode}>404</div>
        <h2 className={notFoundTitle}>{t('notFound.title')}</h2>
        <p className={notFoundDescription}>{t('notFound.description')}</p>
        <Button variant="primary" size="large" onClick={handleRedirect}>
          {t('notFound.redirectButton')}
        </Button>
      </div>
    </Screen>
  )
}

export default NotFoundScreen
