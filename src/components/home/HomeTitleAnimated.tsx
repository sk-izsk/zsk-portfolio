import React, { useEffect, useRef } from "react"
import Typed from "typed.js"
import { usePersonalInfo } from "../../stores/portfolioStore"
import { hello, helloName, myProfession, typing } from "./home.css"

export const HomeTitleAnimated: React.FC = () => {
  const personalInfo = usePersonalInfo()
  const typingRef = useRef<HTMLSpanElement>(null)
  const typedInstance = useRef<Typed | null>(null)

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

  if (!personalInfo) {
    return null
  }

  return (
    <>
      <h3 className={hello}>
        {personalInfo.greeting} <span className={helloName}>{personalInfo.name}</span>
      </h3>
      <h3 className={myProfession}>
        I'm a <span className={typing} ref={typingRef}></span>
      </h3>
    </>
  )
}