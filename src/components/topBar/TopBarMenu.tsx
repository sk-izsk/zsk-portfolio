import * as styles from '@components/topBar/topBarMenu.css'
import { TopBarMenuLink } from '@components/topBar/TopBarMenuLink'
import type { TopBarItem } from '@hooks/topBar/useTopBarItems'
import { useTopBarMenuDialog } from '@hooks/topBar/useTopBarMenuDialog'
import { useTranslation } from '@localization/localize'
import { X } from 'lucide-react'
import React from 'react'

interface TopBarMenuProps {
  items: TopBarItem[]
  activeId: string
}

export const TopBarMenu: React.FC<TopBarMenuProps> = ({ items, activeId }) => {
  const { t } = useTranslation()
  const { dialogRef, close, handleDialogClick, handleDialogCancel } = useTopBarMenuDialog()

  return (
    <dialog
      ref={dialogRef}
      className={styles.menu}
      aria-label={t('topBar.toggle.open')}
      onClose={close}
      onClick={handleDialogClick}
      onCancel={handleDialogCancel}
    >
      <div className={styles.menuTop}>
        <button
          className={styles.menuClose}
          type="button"
          onClick={close}
          aria-label={t('topBar.toggle.close')}
        >
          <X size={22} />
        </button>
      </div>
      <nav className={styles.menuLinks}>
        {items.map((item, index) => (
          <TopBarMenuLink
            key={item.id}
            item={item}
            index={index}
            isActive={item.id === activeId}
            onClick={close}
          />
        ))}
      </nav>
    </dialog>
  )
}
