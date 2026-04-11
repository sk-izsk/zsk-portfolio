import type { SVGProps } from 'react'
import { useId } from 'react'
import { useThemeStore } from '../../stores/themeStore'

interface DotPatternProps extends SVGProps<SVGSVGElement> {
  width?: number
  height?: number
  x?: number
  y?: number
  cx?: number
  cy?: number
  cr?: number
  className?: string
}

export const DotPattern = ({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1.5,
  className,
  ...props
}: DotPatternProps) => {
  const id = useId()
  const isDarkMode = useThemeStore((state) => state.isDarkMode)

  return (
    <svg
      className={className}
      style={{ opacity: isDarkMode ? 0.7 : 0.4, ...props.style }}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <circle id="pattern-circle" cx={cx} cy={cy} r={cr} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
    </svg>
  )
}
