// How far in from the edge the glass bends what is behind it.
const LENS_EDGE = 14
const LENS_SOFTNESS = 6
// Middle of the red and green channels, which a displacement filter reads as "do not move".
const NEUTRAL = '#808000'

/**
 * A displacement map for a pill of glass. Red steers pixels sideways and green up and down, so
 * two gradients bend everything towards the rim, and a soft neutral center leaves the middle
 * of the glass perfectly clear. That clear middle and bent rim are what make it read as glass.
 */
export const getLensMapUrl = (width: number, height: number) => {
  const radius = Math.max(height / 2 - LENS_EDGE, 0)
  const size = `width="${width}" height="${height}"`
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" ${size}>
    <defs>
      <linearGradient id="x" x1="0" x2="1"><stop stop-color="#000"/><stop offset="1" stop-color="#f00"/></linearGradient>
      <linearGradient id="y" x1="0" x2="0" y1="0" y2="1"><stop stop-color="#000"/><stop offset="1" stop-color="#0f0"/></linearGradient>
    </defs>
    <rect ${size} fill="url(#x)"/>
    <rect ${size} fill="url(#y)" style="mix-blend-mode:screen"/>
    <rect x="${LENS_EDGE}" y="${LENS_EDGE}" width="${width - LENS_EDGE * 2}" height="${height - LENS_EDGE * 2}" rx="${radius}" fill="${NEUTRAL}" style="filter:blur(${LENS_SOFTNESS}px)"/>
  </svg>`

  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}
