import { HyperText } from '@components/common/hyperText/HyperText'
import * as styles from '@components/topBar/topBar.css'
import React from 'react'

interface TopBarCurrentPageProps {
  label: string
}

export const TopBarCurrentPage: React.FC<TopBarCurrentPageProps> = ({ label }) => (
  <span className={styles.currentPage} aria-hidden="true">
    <HyperText key={label} text={label} as="span" animateOnHover={false} />
  </span>
)
