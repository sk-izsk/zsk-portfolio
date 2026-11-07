export const MOTION_QUERY = '(prefers-reduced-motion: no-preference)'

export const canAnimate = () => window.matchMedia(MOTION_QUERY).matches
