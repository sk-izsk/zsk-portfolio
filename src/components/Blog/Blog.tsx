import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useTitle } from "ahooks"
import React from "react"
import {
  useBlog,
  usePortfolioError,
  usePortfolioLoading,
} from "../../stores/portfolioStore"
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
} from "./blog.css"

const Blog: React.FC = () => {
  const blog = useBlog()
  const loading = usePortfolioLoading()
  const error = usePortfolioError()

  useTitle("Portfolio - ZSK Portfolio")

  if (loading) {
    return (
      <section className="blog section active" id="blog">
        <div className={`container ${blogContainer}`}>
          <div className="loading">Loading...</div>
        </div>
      </section>
    )
  }

  if (error || !blog) {
    return (
      <section className="blog section active" id="blog">
        <div className={`container ${blogContainer}`}>
          <div className="error">Error loading data</div>
        </div>
      </section>
    )
  }

  return (
    <section className="blog section active" id="blog">
      <div className={`container ${blogContainer}`}>
        <div className="row">
          <div className="section-title padd-15">
            <h2>Portfolio</h2>
          </div>
        </div>
        <div className="row">
          <div className={`${blogHeading} padd-15`}>
            <h2 className={blogHeadingH2}>My Recent Portfolios :</h2>
          </div>
        </div>
        <div className={`${blogGrid} padd-15`}>
          {blog?.map((post) => {
            const postHref = post.url || "#"
            const isExternal = postHref.startsWith("http")

            return (
              <div key={post.id} className={blogItem}>
                <div className={blogItemInner}>
                  <div className={blogInfo}>
                    <div className="category">
                      <a
                        href={postHref}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                      >
                        <p className={blogInfoP}>
                          <FontAwesomeIcon icon="book-open-reader" />{" "}
                          <i
                            className={`fa fa-book-open-reader ${blogInfoIcon}`}
                          />
                          {post.category}
                        </p>
                      </a>
                    </div>
                    <div className="date">
                      <p className={blogInfoP}>
                        <FontAwesomeIcon icon="calendar-days" />{" "}
                        <i className={`fa fa-calendar-days ${blogInfoIcon}`} />
                        {new Date(post.publishDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <a
                    href={postHref}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                  >
                    <h4 className={blogTitle}>{post.title}</h4>
                  </a>
                  <p className={blogContent}>{post.excerpt}</p>
                  {post.tags?.length > 0 && (
                    <div className={blogTags}>
                      {post.tags.map((tag) => (
                        <span key={tag} className={blogTag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <a
                    href={postHref}
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
      </div>
    </section>
  )
}

export default Blog
