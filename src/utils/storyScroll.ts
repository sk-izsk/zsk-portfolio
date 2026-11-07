// The pages that stack into the one continuous scroll, in order.
export const STORY_PATHS = [
  '/',
  '/about',
  '/services',
  '/portfolio',
  '/projects',
  '/blog',
  '/contact',
]

export const getStoryIndex = (pathname: string) => Math.max(STORY_PATHS.indexOf(pathname), 0)

// Sticky pages report their stuck position, so natural tops come from the heights above them.
export const getPageTops = (start: number, heights: number[]) => {
  let top = start

  return heights.map((height) => {
    const pageTop = top
    top += height
    return pageTop
  })
}

export const findActiveIndex = (tops: number[], line: number) =>
  tops.reduce((active, top, index) => (top <= line ? index : active), 0)
