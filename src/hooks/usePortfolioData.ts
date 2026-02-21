import { useEffect, useState } from "react"
import type { DataLoadingState, PortfolioData } from "../types/portfolio"

/**
 * Custom hook to fetch and manage portfolio data
 * @returns Object containing loading state, data, and error
 */
export const usePortfolioData = (): DataLoadingState => {
  const [state, setState] = useState<DataLoadingState>({
    loading: true,
    data: null,
    error: null,
  })
  console.log("state: ", state)

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }))

        const response = await fetch("/portfolio-data.json")

        if (!response.ok) {
          throw new Error(`Failed to fetch portfolio data: ${response.status}`)
        }

        const data: PortfolioData = await response.json()

        setState({
          loading: false,
          data,
          error: null,
        })
      } catch (error) {
        console.error("Error fetching portfolio data:", error)
        setState({
          loading: false,
          data: null,
          error:
            error instanceof Error ? error.message : "Unknown error occurred",
        })
      }
    }

    fetchPortfolioData()
  }, [])

  return state
}

/**
 * Utility function to get specific section from portfolio data
 * @param data - Portfolio data object
 * @param section - Section key to extract
 * @returns Specific section data or null
 */
export const getPortfolioSection = <K extends keyof PortfolioData>(
  data: PortfolioData | null,
  section: K,
): PortfolioData[K] | null => {
  return data ? data[section] : null
}

/**
 * Utility function to filter skills by category
 * @param data - Portfolio data object
 * @param category - Skill category to filter by
 * @returns Filtered skills array
 */
export const getSkillsByCategory = (
  data: PortfolioData | null,
  category: string,
) => {
  if (!data?.skills?.technical) return []

  return data.skills.technical.filter((skill) => skill.category === category)
}

/**
 * Utility function to get current experience
 * @param data - Portfolio data object
 * @returns Current experience object or null
 */
export const getCurrentExperience = (data: PortfolioData | null) => {
  if (!data?.experience) return null

  return data.experience.find((exp) => exp.current) || null
}

/**
 * Utility function to get featured blog posts
 * @param data - Portfolio data object
 * @returns Featured blog posts array
 */
export const getFeaturedBlogPosts = (data: PortfolioData | null) => {
  if (!data?.blog) return []

  return data.blog.filter((post) => post.featured)
}

/**
 * Utility function to format date string
 * @param dateString - Date string to format
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

/**
 * Utility function to calculate years of experience
 * @param startDate - Career start date
 * @returns Years of experience
 */
export const calculateExperience = (startDate: string): number => {
  const start = new Date(startDate)
  const now = new Date()
  const years = now.getFullYear() - start.getFullYear()
  const monthDiff = now.getMonth() - start.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < start.getDate())) {
    return years - 1
  }

  return years
}
