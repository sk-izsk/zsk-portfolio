import React from 'react'
import { useTranslation } from '@localization/localize'
import type { ThemeColor } from '@stores/themeStore'
import { colorItem, colors, heading } from '@components/styleSwitcher/styleSwitcher.css'
import { cx } from '@utils/cn'

interface StyleSwitcherThemeColorsProps {
  currentColor: string
  onChangeColor: (color: ThemeColor) => void
}

const colorOptions = [
  { name: 'color-1', color: '#ec1839' },
  { name: 'color-2', color: '#fa5b0f' },
  { name: 'color-3', color: '#37b182' },
  { name: 'color-5', color: '#f021b2' },
  { name: 'color-7', color: '#daa520' },
  { name: 'color-9', color: '#00bfff' },
] as const

export const StyleSwitcherThemeColors: React.FC<StyleSwitcherThemeColorsProps> = ({
  currentColor,
  onChangeColor,
}) => {
  const { t } = useTranslation()

  return (
    <>
      <h4 className={heading}>{t('common.controls.themeColors')}</h4>
      <div className={colors}>
        {colorOptions.map((color) => (
          <button
            key={color.name}
            type="button"
            className={cx(colorItem, color.name, currentColor === color.name && 'active')}
            onClick={() => onChangeColor(color.name)}
            aria-label={color.name}
            title={color.color}
          />
        ))}
      </div>
    </>
  )
}
