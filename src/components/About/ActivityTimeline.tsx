import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import {
  circleDot,
  timeline,
  timelineBox,
  timelineDate,
  timelineItem,
  timelineText,
  timelineTitle,
  title,
} from "./about.css"

interface ActivityItem {
  id: string
  duration: string
  heading: string
  description: string
}

interface ActivityTimelineProps {
  heading: string
  containerClassName: string
  items: ActivityItem[]
}

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({
  heading,
  containerClassName,
  items,
}) => {
  return (
    <div className={containerClassName}>
      <h3 className={title}>{heading}</h3>
      <div className="row">
        <div className={`${timelineBox} padd-15`}>
          <div className={`${timeline} shadow-dark`}>
            {items.map((item) => (
              <div key={item.id} className={timelineItem}>
                <div className={circleDot}></div>
                <h3 className={timelineDate}>
                  <FontAwesomeIcon icon="calendar" /> {item.duration}
                </h3>
                <h4 className={timelineTitle}>{item.heading}</h4>
                <p className={timelineText}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
