import React from "react"

interface ScreenProps {
  isLoading: boolean
  isError: boolean
  title?: string
  loadingMessage?: string
  errorMessage?: string
  children: React.ReactNode
}

export const Screen: React.FC<ScreenProps> = ({
  isLoading,
  isError,
  title,
  loadingMessage = "Loading...",
  errorMessage = "Error loading data",
  children,
}) => {
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
