import { HyperText } from '@components/common/hyperText/HyperText'
import * as styles from '@components/topBar/topBar.css'
import { useMediaQuery } from '@hooks/useMediaQuery'
import { MOTION_QUERY } from '@utils/motion'
import React from 'react'

interface TopBarCurrentPageProps {
  label: string
}

export const TopBarCurrentPage: React.FC<TopBarCurrentPageProps> = ({ label }) => {
  const canAnimate = useMediaQuery(MOTION_QUERY)

  return (
    <span className={styles.currentPage} aria-hidden="true">
      <HyperText
        key={label}
        text={label}
        as="span"
        animateOnLoad={canAnimate}
        animateOnHover={false}
      />
    </span>
  )
}
