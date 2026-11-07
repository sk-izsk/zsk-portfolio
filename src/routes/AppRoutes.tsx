import { Suspense, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router'

import { PageLoader } from '@components/PageLoader'
import { NotFound, Story } from '@routes/lazyScreens'
import { useAskAiWidgetStore } from '@stores/askAiWidgetStore'
import { STORY_PATHS } from '@utils/storyScroll'

// Ask AI is a chat bubble now. Its old link stays alive by opening the chat over the home page.
const AskAiRedirect = () => {
  useEffect(() => {
    useAskAiWidgetStore.getState().open()
  }, [])

  return <Navigate to="/" replace />
}

export const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* One layout route, so the stacked page stays mounted as its links change. */}
        <Route element={<Story />}>
          {[...STORY_PATHS, '/home'].map((path) => (
            <Route key={path} path={path} element={null} />
          ))}
        </Route>
        <Route path="/ask-ai" element={<AskAiRedirect />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}
