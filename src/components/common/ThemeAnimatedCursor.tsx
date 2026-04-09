import React, { useEffect, useState } from 'react'
import AnimatedCursor from 'react-animated-cursor'
import { useThemeStore, type ThemeColor } from '../../stores/themeStore'

const cursorColorByTheme: Record<ThemeColor, string> = {
  'color-1': '236, 24, 57',
  'color-2': '250, 91, 15',
  'color-3': '55, 177, 130',
  'color-5': '240, 33, 178',
  'color-7': '218, 165, 32',
  'color-9': '0, 191, 255',
}

export const ThemeAnimatedCursor: React.FC = () => {
  const currentColor = useThemeStore((state) => state.currentColor)
  const cursorColor = cursorColorByTheme[currentColor]
  const [isFinePointerDevice, setIsFinePointerDevice] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    const updateDeviceType = () => {
      setIsFinePointerDevice(mediaQuery.matches)
    }

    updateDeviceType()

    mediaQuery.addEventListener('change', updateDeviceType)
    return () => {
      mediaQuery.removeEventListener('change', updateDeviceType)
    }
  }, [])

  if (!isFinePointerDevice) {
    return null
  }

  return (
    <AnimatedCursor
      key={currentColor}
      color={cursorColor}
      innerSize={8}
      outerSize={28}
      innerScale={0.9}
      outerScale={2.8}
      outerAlpha={0.25}
      trailingSpeed={10}
      showSystemCursor={false}
      innerStyle={{
        zIndex: 2001,
        pointerEvents: 'none',
      }}
      outerStyle={{
        zIndex: 2001,
        pointerEvents: 'none',
      }}
      clickables={[
        'a',
        'button',
        '[role="button"]',
        'input',
        'textarea',
        'select',
        'label[for]',
        '.cursor-pointer',
      ]}
    />
  )
}
