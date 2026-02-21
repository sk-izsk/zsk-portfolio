import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { usePortfolioData } from "../hooks/usePortfolioData"

interface BlogProps {
  isActive: boolean
}

const Blog: React.FC<BlogProps> = ({ isActive }) => {
  const { loading, data, error } = usePortfolioData()

  if (loading) {
    return (
      <section className={`blog section ${isActive ? "active" : ""}`} id="blog">
        <div className="container">
          <div className="loading">Loading...</div>
        </div>
      </section>
    )
  }

  if (error || !data) {
    return (
      <section className={`blog section ${isActive ? "active" : ""}`} id="blog">
        <div className="container">
          <div className="error">Error loading data</div>
        </div>
      </section>
    )
  }

  return (
    <section className={`blog section ${isActive ? "active" : ""}`} id="blog">
      <div className="container">
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
          {data.blog.map((post) => (
            <div key={post.id} className="blog-item padd-15">
              <div className="blog-item-inner">
                <div className="image">
                  <img src={post.image} alt={post.title} />
                </div>
                <div className="blog-info">
                  <div className="category">
                    <a href="#">
                      <p>
                        <FontAwesomeIcon icon="book-open-reader" />{" "}
                        {post.category}
                      </p>
                    </a>
                  </div>
                  <div className="date">
                    <p>
                      <FontAwesomeIcon icon="calendar-days" />{" "}
                      {new Date(post.publishDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <a href="#">
                  <h4>{post.title}</h4>
                </a>
                <p>{post.excerpt}</p>
                <a href="#">Read More...</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Blog
