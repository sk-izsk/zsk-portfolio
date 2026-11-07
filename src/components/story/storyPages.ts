import HomeScreen from '@screens/HomeScreen'
import { lazy } from 'react'

export const pageLoaders = [
  () => import('@screens/AboutScreen'),
  () => import('@screens/ServiceScreen'),
  () => import('@screens/SkillScreen'),
  () => import('@screens/ProjectScreen'),
  () => import('@screens/BlogScreen'),
  () => import('@screens/ContactScreen'),
]

// In the order of STORY_PATHS. Home is part of the first paint, the rest load after it.
export const storyPages = [HomeScreen, ...pageLoaders.map((loader) => lazy(loader))]
