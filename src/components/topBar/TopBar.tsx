import { StyleSwitcher } from '@components/styleSwitcher/StyleSwitcher'
import * as styles from '@components/topBar/topBar.css'
import { TopBarCurrentPage } from '@components/topBar/TopBarCurrentPage'
import { TopBarGlassFilter } from '@components/topBar/TopBarGlassFilter'
import { TopBarLogo } from '@components/topBar/TopBarLogo'
import { TopBarMenu } from '@components/topBar/TopBarMenu'
import { TopBarNavLink } from '@components/topBar/TopBarNavLink'
import { useGlassLens } from '@hooks/topBar/useGlassLens'
import { useTopBarItems } from '@hooks/topBar/useTopBarItems'
import { useTranslation } from '@localization/localize'
import { useNavMenuStore } from '@stores/navMenuStore'
import { Menu } from 'lucide-react'
import React, { useRef } from 'react'

export const TopBar: React.FC = () => {
  const { t } = useTranslation()
  const toggleMenu = useNavMenuStore((state) => state.toggle)
  const { items, activeId, activeLabel } = useTopBarItems()
  const barRef = useRef<HTMLElement>(null)
  const lensMapRef = useRef<SVGFEImageElement>(null)

  useGlassLens(barRef, lensMapRef)

  return (
    <>
      <TopBarGlassFilter mapRef={lensMapRef} />
      <header ref={barRef} className={styles.bar}>
        <TopBarLogo />
        <nav className={styles.links}>
          {items.map((item) => (
            <TopBarNavLink
              key={item.id}
              label={item.label}
              path={item.path}
              isActive={item.id === activeId}
            />
          ))}
        </nav>
        <TopBarCurrentPage label={activeLabel} />
        <div className={styles.controls}>
          <StyleSwitcher />
          <button
            className={styles.menuButton}
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
