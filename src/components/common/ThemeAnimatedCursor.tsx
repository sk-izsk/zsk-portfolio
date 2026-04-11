import React from 'react'
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
