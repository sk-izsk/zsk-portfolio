import {
  faBookOpenReader,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import type { BlogPost } from "../../types/portfolio"
import { Tag } from "../tag/Tag"
import {
  blogContent,
  blogInfo,
  blogInfoIcon,
  blogInfoP,
  blogItem,
  blogItemInner,
  blogLink,
  blogTags,
  blogTitle,
} from "./projects.css"

interface ProjectCardProps {
  project: BlogPost
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const projectHref = project.url || "#"
  const isExternal = projectHref.startsWith("http")

  return (
    <div className={blogItem}>
      <div className={blogItemInner}>
        <div className={blogInfo}>
          <div className="category">
            <a
              href={projectHref}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
            >
              <p className={blogInfoP}>
                <FontAwesomeIcon icon={faBookOpenReader} />
                <i className={`fa fa-book-open-reader ${blogInfoIcon}`} />
                {project.category}
              </p>
            </a>
          </div>
          <div className="date">
            <p className={blogInfoP}>
              <FontAwesomeIcon icon={faCalendarDays} />
              <i className={`fa fa-calendar-days ${blogInfoIcon}`} />
              {new Date(project.publishDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        <a
          href={projectHref}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          <h4 className={blogTitle}>{project.title}</h4>
        </a>

        <p className={blogContent}>{project.excerpt}</p>

        {project.tags?.length > 0 && (
          <div className={blogTags}>
            {project.tags.map((value) => (
              <Tag key={`${project.id}-${value}`} label={value} />
            ))}
          </div>
        )}

        <a
          href={projectHref}
          className={blogLink}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          Read More...
        </a>
      </div>
    </div>
  )
}
