import * as styles from '@components/styleSwitcher/styleSwitcher.css'
import { StyleSwitcherPanel } from '@components/styleSwitcher/StyleSwitcherPanel'
import { useStyleSwitcherPanel } from '@hooks/styleSwitcher/useStyleSwitcherPanel'
import { useTranslation } from '@localization/localize'
import { Settings } from 'lucide-react'
import React from 'react'

export const StyleSwitcher: React.FC = () => {
  const { t } = useTranslation()
  const { isOpen, toggle, containerRef, triggerRef, panelRef } = useStyleSwitcherPanel()

  return (
    <div ref={containerRef} className={styles.styleSwitcher}>
      <button
        ref={triggerRef}
        className={styles.styleSwitcherTrigger}
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-label={t('common.controls.openAppearance')}
      >
        <Settings className={styles.styleSwitcherSpinIcon} size={22} />
      </button>
      <StyleSwitcherPanel panelRef={panelRef} isOpen={isOpen} />
    </div>
  )
}
