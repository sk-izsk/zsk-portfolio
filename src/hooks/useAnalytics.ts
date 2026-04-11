import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getReactGA } from '../utils/analytics'

export const useAnalytics = () => {
  const location = useLocation()

  useEffect(() => {
    void getReactGA().then((reactGa) => {
      reactGa.send({ hitType: 'pageview', page: location.pathname })
    })
  }, [location.pathname])
}
