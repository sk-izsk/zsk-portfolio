import { HyperText } from '@components/common/hyperText/HyperText'
import * as styles from '@components/topBar/topBar.css'
import { usePersonalInfo, usePortfolioLoading } from '@stores/portfolioStore'
import React from 'react'
import { Link } from 'react-router'

export const TopBarLogo: React.FC = () => {
  const personalInfo = usePersonalInfo()
  const loading = usePortfolioLoading()
  const firstName = (loading ? undefined : personalInfo?.name.split(' ')[1]) ?? 'Zeeshan'
  const logoText = `${firstName.charAt(0).toUpperCase()}${firstName.slice(1).toLowerCase()}`

  return (
    <Link to="/" className={styles.logo}>
      <HyperText
        text={logoText}
        as="span"
        animateOnLoad={true}
        animateOnHover={true}
        renderCharacter={(char, index) =>
          index === 0 ? <span className={styles.logoInitial}>{char}</span> : char
        }
      />
    </Link>
  )
}
