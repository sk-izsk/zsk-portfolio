import { STORY_BRACKET_SIZE } from '@components/story/storyFrame.css'
import type { FrameSpot } from '@utils/storyFrame'
import gsap from 'gsap'

const FOLLOW_SECONDS = 0.45

// Returns a function that eases the two brackets of the frame to a spot.
export const createFrameMover = (frame: HTMLElement, start: Element, end: Element) => {
  const follow = (target: Element, property: 'x' | 'y' | 'scaleX' | 'scaleY') =>
    gsap.quickTo(target, property, { duration: FOLLOW_SECONDS, ease: 'power3.out' })
  const moves = [
    { x: follow(start, 'x'), y: follow(start, 'y'), corner: 'start' },
    { x: follow(end, 'x'), y: follow(end, 'y'), corner: 'end' },
  ] as const
  const scales = [
    follow(start, 'scaleX'),
    follow(start, 'scaleY'),
    follow(end, 'scaleX'),
    follow(end, 'scaleY'),
  ]
  let isPlaced = false

  return (spot: FrameSpot) => {
    // The first placement jumps there, so the frame does not fly in from the page's corner.
    const go = (move: (value: number, from?: number) => unknown, value: number) => {
      move(value, isPlaced ? undefined : value)
    }

    moves.forEach(({ x, y, corner }) => {
      go(x, corner === 'start' ? spot.left : spot.right - spot.size)
      go(y, corner === 'start' ? spot.top : spot.bottom - spot.size)
    })
    scales.forEach((scale) => go(scale, spot.size / STORY_BRACKET_SIZE))

    if (!isPlaced) {
      isPlaced = true
      frame.style.opacity = '1'
    }
  }
}
