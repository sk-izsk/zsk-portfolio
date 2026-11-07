import * as styles from '@components/topBar/topBarMenu.css'
import type { NavItem } from '@hooks/useNavItems'
import { cx } from '@utils/cn'
import React from 'react'
import { Link } from 'react-router'

const LINK_STEP_MS = 60
const LINK_SEQUENCE_CAP_MS = 400

interface TopBarMenuLinkProps {
  item: NavItem
  index: number
  isActive: boolean
  onClick: () => void
}

export const TopBarMenuLink: React.FC<TopBarMenuLinkProps> = ({
  item,
  index,
  isActive,
  onClick,
}) => {
  const Icon = item.icon

  return (
    <Link
      to={item.path}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      className={cx(styles.menuLink, isActive && styles.menuLinkActive)}
      style={{
        animationDelay: `${Math.min(index * LINK_STEP_MS, LINK_SEQUENCE_CAP_MS)}ms`,
      }}
    >
      <Icon size={22} aria-hidden="true" />
      {item.label}
    </Link>
  )
}
