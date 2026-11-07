import { Suspense } from 'react'
import { Route, Routes } from 'react-router'

import { PageLoader } from '@components/PageLoader'
import { AskAi, Blog, NotFound, Story } from '@routes/lazyScreens'
import { STORY_PATHS } from '@utils/storyScroll'

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
        <Route path="/ask-ai" element={<AskAi />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}
