import { useTitle } from "ahooks"
import React from "react"

interface ScreenProps {
  isLoading: boolean
  isError: boolean
  title?: string
  pageTitle?: string
  loadingMessage?: string
  errorMessage?: string
  children: React.ReactNode
}

export const Screen: React.FC<ScreenProps> = ({
  isLoading,
  isError,
  title,
  pageTitle,
  loadingMessage = "Loading...",
  errorMessage = "Error loading data",
  children,
}) => {
  const resolvedPageTitle = pageTitle ?? title

  useTitle(resolvedPageTitle ?? "")

  if (isLoading) {
    return <div className="loading">{loadingMessage}</div>
  }

  if (isError) {
    return <div className="error">{errorMessage}</div>
  }

  return (
    <>
      {title && (
        <div className="row">
          <div className="section-title padd-15">
            <h2>{title}</h2>
          </div>
        </div>
      )}
      {children}
    </>
  )
}
