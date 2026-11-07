import { lazy } from 'react'

export const Story = lazy(() => import('@screens/StoryScreen'))
export const AskAi = lazy(() => import('@screens/AskAiScreen'))
export const Blog = lazy(() => import('@screens/BlogScreen'))
export const NotFound = lazy(() => import('@/components/notFoundScreen/NotFoundScreen'))
