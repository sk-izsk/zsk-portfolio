import { navA, navAActive, navAI, navLabel, navLi } from '@components/sidebar/sidebar.css'
import type { SidebarNavigationItem } from '@components/sidebar/sidebar.types'
import React from 'react'
import { Link } from 'react-router-dom'

interface SidebarNavItemProps {
  item: SidebarNavigationItem
  isActive: boolean
  onClick: (event: React.MouseEvent) => void
}

export const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ item, isActive, onClick }) => {
  const Icon = item.icon

  return (
    <li className={navLi}>
      <Link
        to={item.path}
        title={item.label}
        aria-label={item.label}
        className={`${navA} ${isActive ? navAActive : ''}`}
        onClick={onClick}
      >
        <Icon className={navAI} size={16} />
        <span className={navLabel}>{item.label}</span>
      </Link>
    </li>
  )
}
