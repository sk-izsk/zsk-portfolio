import * as styles from '@components/sidebar/sidebar.css'
import { SidebarCollapseButton } from '@components/sidebar/SidebarCollapseButton'
import { SidebarLanguages } from '@components/sidebar/SidebarLanguages'
import { SidebarLogo } from '@components/sidebar/SidebarLogo'
import { SidebarNavLink } from '@components/sidebar/SidebarNavLink'
import { useNavItems } from '@hooks/useNavItems'
import { useTranslation } from '@localization/localize'
import { useSidebarStore } from '@stores/sidebarStore'
import React from 'react'

export const Sidebar: React.FC = () => {
  const { t } = useTranslation()
  const isCollapsed = useSidebarStore((state) => state.isCollapsed)
  const { items, activeId } = useNavItems()

  return (
    // data-story-nav lets the traveling frame follow the links while they move.
    <div className={styles.aside} data-collapsed={isCollapsed || undefined} data-story-nav="">
      <div className={styles.logo}>
        <SidebarLogo isCollapsed={isCollapsed} />
        <SidebarLanguages />
      </div>
      <nav aria-label={t('sidebar.label')}>
        <ul className={styles.nav}>
          {items.map((item, index) => (
            <SidebarNavLink
              key={item.id}
              item={item}
              index={index}
              isActive={item.id === activeId}
            />
          ))}
        </ul>
      </nav>
      <SidebarCollapseButton />
    </div>
  )
}
