import { HyperText } from '@components/common/hyperText/HyperText'
import * as styles from '@components/topBar/topBar.css'
import { useLogoName } from '@hooks/useLogoName'
import React from 'react'
import { Link } from 'react-router'

export const TopBarLogo: React.FC = () => {
  const name = useLogoName()

  return (
    <Link to="/" className={styles.logo}>
      <HyperText
        text={name}
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
