import { HyperText } from '@components/common/hyperText/HyperText'
import { getLabelDelayStyle } from '@components/sidebar/labelDelay'
import * as styles from '@components/sidebar/sidebar.css'
import type { NavItem } from '@hooks/useNavItems'
import { useNavScrambleStore } from '@stores/navScrambleStore'
import { createCn } from '@utils/cn'
import React from 'react'
import { Link } from 'react-router'

const cn = createCn(styles)

interface SidebarNavLinkProps {
  item: NavItem
  index: number
  isActive: boolean
}

export const SidebarNavLink: React.FC<SidebarNavLinkProps> = ({ item, index, isActive }) => {
  const landings = useNavScrambleStore((state) => state.landings[item.path] ?? 0)
  const Icon = item.icon

  return (
    <li>
      <Link
        to={item.path}
        data-story-link={item.path}
        aria-label={item.label}
        aria-current={isActive ? 'page' : undefined}
        className={cn('navLink', { navLinkActive: isActive })}
      >
        <Icon className={styles.navIcon} size={16} aria-hidden="true" />
        <span className={styles.navLabel} style={getLabelDelayStyle(index)}>
          {/* A new key replays the scramble each time the frame lands here, and picks up new text. */}
          <HyperText
            key={`${item.label}-${landings}`}
            text={item.label}
            as="span"
            animateOnLoad={landings > 0}
            animateOnHover={false}
          />
        </span>
      </Link>
    </li>
  )
}
