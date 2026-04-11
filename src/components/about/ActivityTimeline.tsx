import { Calendar } from 'lucide-react'
import type { PropsWithChildren } from 'react'
import React from 'react'
import {
  circleDot,
  timeline,
  timelineBox,
  timelineDate,
  timelineDateIcon,
  timelineItem,
  timelineText,
  timelineTitle,
  title,
} from '@components/about/about.css'

interface ActivityTimelineProps extends PropsWithChildren {
  heading: string
  containerClassName: string
}

type ActivityTimelineItemRootProps = PropsWithChildren

type ActivityTimelineItemTimeSpanProps = PropsWithChildren

type ActivityTimelineItemTitleProps = PropsWithChildren

type ActivityTimelineItemBodyProps = PropsWithChildren

type ActivityTimelineItemCompound = React.FC<ActivityTimelineItemRootProps> & {
  TimeSpan: React.FC<ActivityTimelineItemTimeSpanProps>
  Title: React.FC<ActivityTimelineItemTitleProps>
  Body: React.FC<ActivityTimelineItemBodyProps>
}

const ActivityTimelineItemRoot: React.FC<ActivityTimelineItemRootProps> = ({ children }) => {
  return (
    <div className={timelineItem}>
      <div className={circleDot}></div>
      {children}
    </div>
  )
}

const ActivityTimelineItemTimeSpan: React.FC<ActivityTimelineItemTimeSpanProps> = ({
  children,
}) => {
  return (
    <h3 className={timelineDate}>
      <Calendar className={timelineDateIcon} size={14} />
      {children}
    </h3>
  )
}

const ActivityTimelineItemTitle: React.FC<ActivityTimelineItemTitleProps> = ({ children }) => {
  return <h4 className={timelineTitle}>{children}</h4>
}

const ActivityTimelineItemBody: React.FC<ActivityTimelineItemBodyProps> = ({ children }) => {
  return <p className={timelineText}>{children}</p>
}

const ActivityTimelineItem: ActivityTimelineItemCompound = Object.assign(ActivityTimelineItemRoot, {
  TimeSpan: ActivityTimelineItemTimeSpan,
  Title: ActivityTimelineItemTitle,
  Body: ActivityTimelineItemBody,
})

const ActivityTimelineRoot: React.FC<ActivityTimelineProps> = ({
  heading,
  containerClassName,
  children,
}) => {
  return (
    <div className={containerClassName}>
      <h3 className={title}>{heading}</h3>
      <div className="row">
        <div className={`${timelineBox} padd-15`}>
          <div className={`${timeline} shadow-dark`}>{children}</div>
        </div>
      </div>
    </div>
  )
}

export const ActivityTimeline = Object.assign(ActivityTimelineRoot, {
  Item: ActivityTimelineItem,
})
