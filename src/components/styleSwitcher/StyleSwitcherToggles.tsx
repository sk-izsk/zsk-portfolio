import * as styles from '@components/styleSwitcher/styleSwitcher.css'
import { StyleSwitcherToggle } from '@components/styleSwitcher/StyleSwitcherToggle'
import { useTranslation } from '@localization/localize'
import { useSoundStore } from '@stores/soundStore'
import { useThemeStore } from '@stores/themeStore'
import { Moon, Sun, Volume2, VolumeX } from 'lucide-react'
import React from 'react'

export const StyleSwitcherToggles: React.FC = () => {
  const { t } = useTranslation()
  const isDarkMode = useThemeStore((state) => state.isDarkMode)
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode)
  const isSoundEnabled = useSoundStore((state) => state.isSoundEnabled)
  const toggleSound = useSoundStore((state) => state.toggleSound)

  return (
    <div className={styles.toggleGrid}>
      <StyleSwitcherToggle
        isActive={isDarkMode}
        label={isDarkMode ? t('common.controls.lightMode') : t('common.controls.darkMode')}
        icon={isDarkMode ? Sun : Moon}
        onClick={toggleDarkMode}
      />
      <StyleSwitcherToggle
        isActive={isSoundEnabled}
        label={isSoundEnabled ? t('common.controls.soundOn') : t('common.controls.soundOff')}
        icon={isSoundEnabled ? Volume2 : VolumeX}
        onClick={toggleSound}
      />
    </div>
  )
}
