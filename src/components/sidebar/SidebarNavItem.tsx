import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'
import { navA, navAActive, navAI, navLi } from './sidebar.css'
import type { SidebarNavigationItem } from './sidebar.types'

interface SidebarNavItemProps {
  item: SidebarNavigationItem
  isActive: boolean
  onClick: (event: React.MouseEvent) => void
}

export const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ item, isActive, onClick }) => {
  return (
    <li className={navLi}>
      <Link href={item.path} className={`${navA} ${isActive ? navAActive : ''}`} onClick={onClick}>
        <FontAwesomeIcon className={navAI} icon={item.icon} /> {item.label}
      </Link>
    </li>
  )
}
