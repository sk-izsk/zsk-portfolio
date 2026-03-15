import React from "react"

interface ScreenProps {
  isLoading: boolean
  isError: boolean
  loadingMessage?: string
  errorMessage?: string
  children: React.ReactNode
}

const Screen: React.FC<ScreenProps> = ({
  isLoading,
  isError,
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

  return <>{children}</>
}

export default Screen
