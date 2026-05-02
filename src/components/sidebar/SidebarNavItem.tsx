import React from 'react'
import { Link } from 'react-router-dom'
import {
  navA,
  navAActive,
  navACompact,
  navAI,
  navLabel,
  navLabelHidden,
  navLi,
} from '@components/sidebar/sidebar.css'
import type { SidebarNavigationItem } from '@components/sidebar/sidebar.types'

interface SidebarNavItemProps {
  item: SidebarNavigationItem
  isActive: boolean
  isCollapsed: boolean
  onClick: (event: React.MouseEvent) => void
}

export const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  item,
  isActive,
  isCollapsed,
  onClick,
}) => {
  const Icon = item.icon

  return (
    <li className={navLi}>
      <Link
        to={item.path}
        title={item.label}
        aria-label={item.label}
        className={`${navA} ${isActive ? navAActive : ''} ${isCollapsed ? navACompact : ''}`}
        onClick={onClick}
      >
        <Icon className={navAI} size={16} />
        <span className={`${navLabel} ${isCollapsed ? navLabelHidden : ''}`}>{item.label}</span>
      </Link>
    </li>
  )
}
