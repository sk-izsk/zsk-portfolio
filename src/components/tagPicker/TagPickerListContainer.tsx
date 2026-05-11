import { ChevronDown } from 'lucide-react'
import React, { type RefObject } from 'react'
import * as styles from './tagMultiSelectPicker.css'
import { createCn } from '@utils/cn'

interface TagPickerListContainerProps {
  ariaLabel: string
  listboxId: string
  visibleRows: number
  viewportRef: RefObject<HTMLDivElement | null>
  contentRef: RefObject<HTMLDivElement | null>
  hasMoreBelow: boolean
  prefersReducedMotion: boolean
  onScrollCueClick: () => void
  children: React.ReactNode
}
const cn = createCn(styles)

export const TagPickerListContainer: React.FC<TagPickerListContainerProps> = ({
  ariaLabel,
  listboxId,
  visibleRows,
  viewportRef,
  contentRef,
  hasMoreBelow,
  prefersReducedMotion,
  onScrollCueClick,
  children,
}) => {
  return (
    <>
      <div
        id={listboxId}
        role="listbox"
        aria-label={ariaLabel}
        className={styles.resultsViewport}
        ref={viewportRef}
        style={{ maxHeight: `calc(${visibleRows} * var(--tag-picker-row-height))` }}
      >
        <div ref={contentRef} className={styles.resultsContent}>
          {children}
        </div>
      </div>

      <button
        type="button"
        aria-label="Scroll for more tags"
        aria-hidden={!hasMoreBelow}
        data-visible={hasMoreBelow ? 'true' : 'false'}
        className={cn('scrollCue', {
          scrollCueVisible: hasMoreBelow,
          scrollCueHidden: !hasMoreBelow,
          scrollCueReducedMotion: prefersReducedMotion,
        })}
        onClick={onScrollCueClick}
        tabIndex={hasMoreBelow ? 0 : -1}
      >
        <ChevronDown size={16} aria-hidden="true" />
      </button>
    </>
  )
}
