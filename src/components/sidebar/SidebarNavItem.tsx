import * as styles from '@components/sidebar/sidebar.css'
import type { SidebarNavigationItem } from '@components/sidebar/sidebar.types'
import React from 'react'
import { Link } from 'react-router'
import { createCn } from '@utils/cn'

interface SidebarNavItemProps {
  item: SidebarNavigationItem
  isActive: boolean
  onClick: (event: React.MouseEvent) => void
}
const cn = createCn(styles)

export const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ item, isActive, onClick }) => {
  const Icon = item.icon

  return (
    <li className={styles.navLi}>
      <Link
        to={item.path}
        title={item.label}
        aria-label={item.label}
        className={cn('navA', { navAActive: isActive })}
        onClick={onClick}
      >
        <Icon className={styles.navAI} size={16} />
        <span className={styles.navLabel}>{item.label}</span>
      </Link>
    </li>
  )
}
