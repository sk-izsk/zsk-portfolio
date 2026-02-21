import React, { useEffect, useRef } from "react"
import Typed from "typed.js"
import { usePortfolioData } from "../hooks/usePortfolioData"

interface HomeProps {
  isActive: boolean
}

const Home: React.FC<HomeProps> = ({ isActive }) => {
  const { loading, data, error } = usePortfolioData()
  const typingRef = useRef<HTMLSpanElement>(null)
  const typedInstance = useRef<Typed | null>(null)

  useEffect(() => {
    if (typingRef.current && !typedInstance.current && data) {
      const typingStrings = [
        "",
        "Full Stack Developer",
        "React Developer",
        "TypeScript Developer",
        "Frontend Developer",
        "Backend Developer",
        "Mobile Developer",
      ]

      typedInstance.current = new Typed(typingRef.current, {
        strings: typingStrings,
        typeSpeed: 100,
        backSpeed: 60,
        loop: true,
      })
    }

    return () => {
      if (typedInstance.current) {
        typedInstance.current.destroy()
        typedInstance.current = null
      }
    }
  }, [data])

  if (loading) {
    return (
      <section className={`home section ${isActive ? "active" : ""}`} id="home">
        <div className="container">
          <div className="loading">Loading...</div>
        </div>
      </section>
    )
  }

  if (error || !data) {
    return (
      <section className={`home section ${isActive ? "active" : ""}`} id="home">
        <div className="container">
          <div className="error">Error loading data</div>
        </div>
      </section>
    )
  }

  return (
    <section className={`home section ${isActive ? "active" : ""}`} id="home">
      <div className="container">
        <div className="row">
          <div className="home-info padd-15">
            <h3 className="hello">
              {data.personalInfo.greeting}{" "}
              <span className="name">{data.personalInfo.name}</span>
            </h3>
            <h3 className="my-profession">
              {data.personalInfo.profession}{" "}
              <span className="typing" ref={typingRef}></span>
            </h3>
            <p>{data.personalInfo.bio}</p>
            <a href="#" className="btn">
              Download CV
            </a>
          </div>
          <div className="home-img padd-15">
            <img
              src={data.personalInfo.avatar.primary}
              alt={data.personalInfo.avatar.alt}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
