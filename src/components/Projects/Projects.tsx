import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useTitle } from "ahooks"
import React from "react"
import {
  usePortfolioError,
  usePortfolioLoading,
  useProjects,
} from "../../stores/portfolioStore"
import Screen from "../Screen/Screen"
import {
  blogContainer,
  blogContent,
  blogGrid,
  blogHeading,
  blogHeadingH2,
  blogInfo,
  blogInfoIcon,
  blogInfoP,
  blogItem,
  blogItemInner,
  blogLink,
  blogTag,
  blogTags,
  blogTitle,
} from "./projects.css"

const Projects: React.FC = () => {
  const projects = useProjects()
  const loading = usePortfolioLoading()
  const error = usePortfolioError()

  useTitle("Projects - ZSK Portfolio")

  const hasError = Boolean(error || !projects)

  return (
    <section className="blog section active" id="projects">
      <div className={`container ${blogContainer}`}>
        <Screen isLoading={loading} isError={hasError}>
          {projects && (
            <>
              <div className="row">
                <div className="section-title padd-15">
                  <h2>Projects</h2>
                </div>
              </div>
              <div className="row">
                <div className={`${blogHeading} padd-15`}>
                  <h2 className={blogHeadingH2}>My Recent Projects :</h2>
                </div>
              </div>
              <div className={`${blogGrid} padd-15`}>
                {projects.map((project) => {
                  const projectHref = project.url || "#"
                  const isExternal = projectHref.startsWith("http")

                  return (
                    <div key={project.id} className={blogItem}>
                      <div className={blogItemInner}>
                        <div className={blogInfo}>
                          <div className="category">
                            <a
                              href={projectHref}
                              target={isExternal ? "_blank" : undefined}
                              rel={
                                isExternal ? "noopener noreferrer" : undefined
                              }
                            >
                              <p className={blogInfoP}>
                                <FontAwesomeIcon icon="book-open-reader" />{" "}
                                <i
                                  className={`fa fa-book-open-reader ${blogInfoIcon}`}
                                />
                                {project.category}
                              </p>
                            </a>
                          </div>
                          <div className="date">
                            <p className={blogInfoP}>
                              <FontAwesomeIcon icon="calendar-days" />{" "}
                              <i
                                className={`fa fa-calendar-days ${blogInfoIcon}`}
                              />
                              {new Date(
                                project.publishDate,
                              ).toLocaleDateString()}
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
                            {project.tags.map((tag) => (
                              <span key={tag} className={blogTag}>
                                {tag}
                              </span>
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
                })}
              </div>
            </>
          )}
        </Screen>
      </div>
    </section>
  )
}

export default Projects
