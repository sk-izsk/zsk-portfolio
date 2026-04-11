import { Volume2, VolumeX } from 'lucide-react'
import React from 'react'
import { dayNightIcon, s_icon, soundToggle } from './styleSwitcher.css'

interface StyleSwitcherToggleSoundProps {
  isSoundEnabled: boolean
  onToggleSound: () => void
}

export const StyleSwitcherToggleSound: React.FC<StyleSwitcherToggleSoundProps> = ({
  isSoundEnabled,
  onToggleSound,
}) => {
  const SoundIcon = isSoundEnabled ? Volume2 : VolumeX

  return (
    <div className={soundToggle} onClick={onToggleSound}>
      <SoundIcon className={`${s_icon} ${dayNightIcon}`} size={16} />
    </div>
  )
}
