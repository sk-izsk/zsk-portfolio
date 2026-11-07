import { StyleSwitcher } from '@components/styleSwitcher/StyleSwitcher'
import * as styles from '@components/topBar/topBar.css'
import { TopBarCurrentPage } from '@components/topBar/TopBarCurrentPage'
import { TopBarLogo } from '@components/topBar/TopBarLogo'
import { TopBarMenu } from '@components/topBar/TopBarMenu'
import { useNavItems } from '@hooks/useNavItems'
import { useTranslation } from '@localization/localize'
import { useNavMenuStore } from '@stores/navMenuStore'
import { Menu } from 'lucide-react'
import React from 'react'

// The phone and tablet bar, with the current page in the middle and the pages in a menu.
export const TopBar: React.FC = () => {
  const { t } = useTranslation()
  const toggleMenu = useNavMenuStore((state) => state.toggle)
  const { items, activeId, activeLabel } = useNavItems()

  return (
    <>
      <header className={styles.bar}>
        <TopBarLogo />
        <TopBarCurrentPage label={activeLabel} />
        <div className={styles.controls}>
          <StyleSwitcher />
          <button
            className={styles.roundButton}
            type="button"
            onClick={toggleMenu}
            aria-label={t('topBar.toggle.open')}
          >
            <Menu size={22} />
          </button>
        </div>
      </header>
      <TopBarMenu items={items} activeId={activeId} />
    </>
  )
}
