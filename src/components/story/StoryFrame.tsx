import * as styles from '@components/story/storyFrame.css'
import React, { type RefObject } from 'react'

interface StoryFrameProps {
  frameRef: RefObject<HTMLDivElement | null>
}

export const StoryFrame: React.FC<StoryFrameProps> = ({ frameRef }) => (
  <div ref={frameRef} className={styles.storyFrame} aria-hidden="true">
    <span className={styles.storyBracketStart} />
    <span className={styles.storyBracketEnd} />
  </div>
)
