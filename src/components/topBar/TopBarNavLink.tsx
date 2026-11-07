import { HyperText } from '@components/common/hyperText/HyperText'
import * as styles from '@components/topBar/topBar.css'
import { useNavScrambleStore } from '@stores/navScrambleStore'
import { cx } from '@utils/cn'
import React from 'react'
import { Link } from 'react-router'

interface TopBarNavLinkProps {
  label: string
  path: string
  isActive: boolean
}

export const TopBarNavLink: React.FC<TopBarNavLinkProps> = ({ label, path, isActive }) => {
  const landings = useNavScrambleStore((state) => state.landings[path] ?? 0)

  return (
    <Link
      to={path}
      aria-label={label}
      aria-current={isActive ? 'page' : undefined}
      className={cx(styles.link, isActive && styles.linkActive)}
    >
      {/* A new key replays the scramble each time the frame lands here, and picks up new text. */}
      <HyperText
        key={`${label}-${landings}`}
        text={label}
        as="span"
        animateOnLoad={landings > 0}
        animateOnHover={false}
      />
    </Link>
  )
}
