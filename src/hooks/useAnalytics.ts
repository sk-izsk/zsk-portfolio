import { getReactGA, initAnalytics } from '@utils/analytics'
import { StoryContext } from '@components/story/storyContext'
import { useContext, useEffect } from 'react'
import { useLocation } from 'react-router'

export const useAnalytics = () => {
  const location = useLocation()
  const isInStory = useContext(StoryContext)

  useEffect(() => {
    // The story reports its own page views, otherwise each stacked page would count every one.
    if (isInStory || !import.meta.env.VITE_GA_MEASUREMENT_ID) {
      return
    }

    void initAnalytics(
      import.meta.env.VITE_GA_MEASUREMENT_ID,
      import.meta.env.VITE_MIXPANEL_PROJECT_TOKEN,
      import.meta.env.DEV,
    ).then(() =>
      getReactGA().then((reactGa) => {
        reactGa.send({ hitType: 'pageview', page: location.pathname })
      }),
    )
  }, [isInStory, location.pathname])
}
