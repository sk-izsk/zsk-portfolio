import * as styles from '@components/sidebar/sidebar.css'
import { useTranslation } from '@localization/localize'
import { useSidebarStore } from '@stores/sidebarStore'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import React from 'react'

export const SidebarCollapseButton: React.FC = () => {
  const { t } = useTranslation()
  const isCollapsed = useSidebarStore((state) => state.isCollapsed)
  const toggleCollapsed = useSidebarStore((state) => state.toggleCollapsed)
  const Icon = isCollapsed ? PanelLeftOpen : PanelLeftClose

  return (
    <button
      className={styles.collapseButton}
      type="button"
      onClick={toggleCollapsed}
      aria-expanded={!isCollapsed}
      aria-label={
        isCollapsed ? t('sidebar.toggle.expandSidebar') : t('sidebar.toggle.collapseSidebar')
      }
    >
      <Icon className={styles.navIcon} size={16} aria-hidden="true" />
    </button>
  )
}
