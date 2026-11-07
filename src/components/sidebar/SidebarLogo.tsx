import { HyperText } from '@components/common/hyperText/HyperText'
import * as styles from '@components/sidebar/sidebar.css'
import { useLogoName } from '@hooks/useLogoName'
import React from 'react'
import { Link } from 'react-router'

interface SidebarLogoProps {
  isCollapsed: boolean
}

export const SidebarLogo: React.FC<SidebarLogoProps> = ({ isCollapsed }) => {
  const name = useLogoName()
  // Only the script initial fits the icon column.
  const text = isCollapsed ? name.charAt(0) : name

  return (
    <Link to="/" className={styles.logoLink} aria-label={name}>
      {/* A new key scrambles the name in as it changes size, and picks up the new text. */}
      <HyperText
        key={text}
        text={text}
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
