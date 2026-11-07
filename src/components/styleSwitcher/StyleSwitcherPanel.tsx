import * as styles from '@components/styleSwitcher/styleSwitcher.css'
import { StyleSwitcherLanguages } from '@components/styleSwitcher/StyleSwitcherLanguages'
import { StyleSwitcherThemeColors } from '@components/styleSwitcher/StyleSwitcherThemeColors'
import { StyleSwitcherToggles } from '@components/styleSwitcher/StyleSwitcherToggles'
import { useTranslation } from '@localization/localize'
import { useThemeStore } from '@stores/themeStore'
import React, { type RefObject } from 'react'
import { createPortal } from 'react-dom'

interface StyleSwitcherPanelProps {
  panelRef: RefObject<HTMLDivElement | null>
  isOpen: boolean
}

export const StyleSwitcherPanel: React.FC<StyleSwitcherPanelProps> = ({ panelRef, isOpen }) => {
  const { t } = useTranslation()
  const currentColor = useThemeStore((state) => state.currentColor)
  const setCurrentColor = useThemeStore((state) => state.setCurrentColor)

  return createPortal(
    <div
      ref={panelRef}
      className={styles.styleSwitcherPanel}
      data-open={isOpen || undefined}
      tabIndex={-1}
    >
      <p className={styles.panelEyebrow}>{t('common.controls.appearance')}</p>
      <h3 className={styles.panelHeading}>{t('common.controls.personalize')}</h3>
      <StyleSwitcherThemeColors currentColor={currentColor} onChangeColor={setCurrentColor} />
      <StyleSwitcherLanguages />
      <StyleSwitcherToggles />
    </div>,
    document.body,
  )
}
