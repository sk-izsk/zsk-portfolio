import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useTitle } from "ahooks"
import React from "react"
import { usePortfolioStore, useSkills } from "../../stores/portfolioStore"
import {
  progress,
  progressIn,
  skillPercent,
  skillsItem,
  skillsItemH5,
  title,
} from "../About/about.css"
import {
  categoryBadge,
  skillCategoryContainer,
  skillCategoryTitle,
  skillsContainer,
  skillsList,
  skillsSection,
} from "./skills.css"

const Skills: React.FC = () => {
  const skillsData = useSkills()
  const loading = usePortfolioStore((state) => state.loading)
  const error = usePortfolioStore((state) => state.error)

  useTitle("Skills - ZSK Portfolio")

  if (loading) {
    return (
      <section className="portfolio section active" id="portfolio">
        <div className={`container ${skillsContainer}`}>
          <div className="loading">Loading...</div>
        </div>
      </section>
    )
  }

  if (error || !skillsData) {
    return (
      <section className="portfolio section active" id="portfolio">
        <div className={`container ${skillsContainer}`}>
          <div className="error">Error loading data</div>
        </div>
      </section>
    )
  }

  const skillCategories = [
    {
      title: "Frontend Development",
      key: "frontend" as const,
      icon: "fa-laptop-code",
    },
    {
      title: "Backend Development",
      key: "backend" as const,
      icon: "fa-server",
    },
    {
      title: "Programming Languages",
      key: "languages" as const,
      icon: "fa-code",
    },
    {
      title: "Development Tools",
      key: "tools" as const,
      icon: "fa-cog",
    },
    {
      title: "Testing Frameworks",
      key: "testing" as const,
      icon: "fa-vial",
    },
    {
      title: "Currently Learning",
      key: "learning" as const,
      icon: "fa-graduation-cap",
    },
  ]

  return (
    <section className="portfolio section active" id="portfolio">
      <div className={`container ${skillsContainer}`}>
        <div className="row">
          <div className="section-title padd-15">
            <h2>Skills</h2>
          </div>
        </div>

        {/* Frontend and Backend Skills */}
        <div className="row">
          <div className={`${skillsSection} padd-15`}>
            <h3 className={title}>
              <FontAwesomeIcon
                icon="fa-laptop-code"
                style={{ marginRight: "8px" }}
              />
              Frontend Skills
            </h3>
            <div className="row">
              {skillsData.technical
                ?.filter((skill) => skill.category === "frontend")
                .map((skill, index) => (
                  <div key={index} className={`${skillsItem} padd-15`}>
                    <h5 className={skillsItemH5}>{skill.name}</h5>
                    <div className={progress}>
                      <div
                        className={progressIn}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                      <div className={skillPercent}>{skill.level}%</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className={`${skillsSection} padd-15`}>
            <h3 className={title}>
              <FontAwesomeIcon
                icon="fa-server"
                style={{ marginRight: "8px" }}
              />
              Backend Skills
            </h3>
            <div className="row">
              {skillsData.technical
                ?.filter((skill) => skill.category === "backend")
                .map((skill, index) => (
                  <div key={index} className={`${skillsItem} padd-15`}>
                    <h5 className={skillsItemH5}>{skill.name}</h5>
                    <div className={progress}>
                      <div
                        className={progressIn}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                      <div className={skillPercent}>{skill.level}%</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Languages and Tools Skills */}
        <div className="row">
          <div className={`${skillsSection} padd-15`}>
            <h3 className={title}>
              <FontAwesomeIcon icon="fa-code" style={{ marginRight: "8px" }} />
              Programming Languages
            </h3>
            <div className="row">
              {skillsData.technical
                ?.filter((skill) => skill.category === "language")
                .map((skill, index) => (
                  <div key={index} className={`${skillsItem} padd-15`}>
                    <h5 className={skillsItemH5}>{skill.name}</h5>
                    <div className={progress}>
                      <div
                        className={progressIn}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                      <div className={skillPercent}>{skill.level}%</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className={`${skillsSection} padd-15`}>
            <h3 className={title}>
              <FontAwesomeIcon icon="fa-cog" style={{ marginRight: "8px" }} />
              Development Tools
            </h3>
            <div className="row">
              {skillsData.technical
                ?.filter((skill) => skill.category === "tools")
                .map((skill, index) => (
                  <div key={index} className={`${skillsItem} padd-15`}>
                    <h5 className={skillsItemH5}>{skill.name}</h5>
                    <div className={progress}>
                      <div
                        className={progressIn}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                      <div className={skillPercent}>{skill.level}%</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Skill Categories */}
        {skillCategories.map((category, categoryIndex) => {
          const categorySkills = skillsData.categories?.[category.key] || []
          if (categorySkills.length === 0) return null

          return (
            <div key={categoryIndex} className="row">
              <div className={`${skillCategoryContainer} padd-15`}>
                <h3 className={skillCategoryTitle}>
                  <FontAwesomeIcon
                    icon={category.icon as any}
                    style={{ marginRight: "10px" }}
                  />
                  {category.title}
                </h3>
                <div className={skillsList}>
                  {categorySkills.map((skillName, skillIndex) => (
                    <span key={skillIndex} className={categoryBadge}>
                      {skillName}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Skills
