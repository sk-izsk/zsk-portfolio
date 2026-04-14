import { useSound } from 'zsk-use-sound'

import { useSoundStore } from '@stores/soundStore'
import { useEffect } from 'react'

export const useSoundClick = () => {
  const isSoundEnabled = useSoundStore((state) => state.isSoundEnabled)
  const [playClick] = useSound({
    type: 'click',
    volume: 0.6,
    soundEnabled: isSoundEnabled,
  })

  useEffect(() => {
    const handleMouseDown = () => {
      playClick()
    }

    document.addEventListener('mousedown', handleMouseDown, { passive: true })

    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
    }
  }, [playClick])
}
