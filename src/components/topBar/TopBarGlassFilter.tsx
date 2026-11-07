import * as styles from '@components/topBar/topBar.css'
import React, { type RefObject } from 'react'

interface TopBarGlassFilterProps {
  mapRef: RefObject<SVGFEImageElement | null>
}

export const TopBarGlassFilter: React.FC<TopBarGlassFilterProps> = ({ mapRef }) => (
  <svg className={styles.glassFilter} aria-hidden="true">
    <filter
      id={styles.GLASS_FILTER_ID}
      x="0"
      y="0"
      width="100%"
      height="100%"
      colorInterpolationFilters="sRGB"
    >
      <feImage ref={mapRef} x="0" y="0" preserveAspectRatio="none" result="map" />
      <feDisplacementMap
        in="SourceGraphic"
        in2="map"
        scale="18"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  </svg>
)
