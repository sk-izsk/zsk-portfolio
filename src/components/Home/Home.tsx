import { useTitle } from "ahooks"
import React, { useEffect, useRef } from "react"
import Typed from "typed.js"
import {
  usePersonalInfo,
  usePortfolioError,
  usePortfolioLoading,
} from "../../stores/portfolioStore"
import {
  hello,
  helloName,
  home,
  homeImg,
  homeImgImg,
  homeInfo,
  homeInfoP,
  homeRow,
  myProfession,
  typing,
} from "./home.css"

const Home: React.FC = () => {
  const personalInfo = usePersonalInfo()
  const loading = usePortfolioLoading()
  const error = usePortfolioError()
  const typingRef = useRef<HTMLSpanElement>(null)
  const typedInstance = useRef<Typed | null>(null)

  // Update page title
  useTitle("Home - ZSK Portfolio")

  useEffect(() => {
    if (typingRef.current && !typedInstance.current && personalInfo) {
      const typingStrings = [
        personalInfo.title,
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
  }, [personalInfo])

  if (loading) {
    return (
      <section className={`${home} section active`} id="home">
        <div className="container">
          <div className="loading">Loading...</div>
        </div>
      </section>
    )
  }

  if (error || !personalInfo) {
    return (
      <section className={`${home} section active`} id="home">
        <div className="container">
          <div className="error">Error loading data</div>
        </div>
      </section>
    )
  }

  return (
    <section className={`${home} section active`} id="home">
      <div className="container">
        <div className={`row ${homeRow}`}>
          <div className={`${homeInfo} padd-15`}>
            <h3 className={hello}>
              {personalInfo.greeting}{" "}
              <span className={helloName}>{personalInfo.name}</span>
            </h3>
            <h3 className={myProfession}>
              I'm a <span className={typing} ref={typingRef}></span>
            </h3>
            <p className={homeInfoP}>{personalInfo.bio}</p>
            <a
              href={personalInfo.resume_link}
              className="btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download CV
            </a>
          </div>
          <div className={`${homeImg} padd-15`}>
            <img
              className={homeImgImg}
              src={personalInfo.avatar.primary}
              alt={personalInfo.avatar.alt}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
