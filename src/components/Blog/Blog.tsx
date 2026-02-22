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
  blogImage,
  blogImageImg,
  blogImageImgHover,
  blogInfo,
  blogInfoIcon,
  blogInfoP,
  blogItem,
  blogItemInner,
  blogLink,
  blogTitle,
} from "./blog.css"

const Blog: React.FC = () => {
  const blog = useBlog()
  const loading = usePortfolioLoading()
  const error = usePortfolioError()

  useTitle("Blog - ZSK Portfolio")

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
            <h2>Blog</h2>
          </div>
        </div>
        <div className="row">
          <div className="blog-heading padd-15">
            <h2>My Recent Blogs :</h2>
          </div>
        </div>
        <div className="row">
          {blog?.map((post) => (
            <div key={post.id} className={`${blogItem} padd-15`}>
              <div className={blogItemInner}>
                <div className={blogImage}>
                  <img
                    src={post.image}
                    alt={post.title}
                    className={`${blogImageImg} ${blogImageImgHover}`}
                  />
                </div>
                <div className={blogInfo}>
                  <div className="category">
                    <a href="#">
                      <p className={blogInfoP}>
                        <i
                          className={`fa fa-book-open-reader ${blogInfoIcon}`}
                        />
                        {post.category}
                      </p>
                    </a>
                  </div>
                  <div className="date">
                    <p className={blogInfoP}>
                      <i className={`fa fa-calendar-days ${blogInfoIcon}`} />
                      {new Date(post.publishDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <a href="#">
                  <h4 className={blogTitle}>{post.title}</h4>
                </a>
                <p className={blogContent}>{post.excerpt}</p>
                <a href="#" className={blogLink}>
                  Read More...
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Blog
