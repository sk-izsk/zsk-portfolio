import { lazy } from 'react'

export const Home = lazy(() => import('@screens/HomeScreen'))
export const About = lazy(() => import('@screens/AboutScreen'))
export const Services = lazy(() => import('@screens/ServiceScreen'))
export const Skills = lazy(() => import('@screens/SkillScreen'))
export const Projects = lazy(() => import('@screens/ProjectScreen'))
export const Blog = lazy(() => import('@screens/BlogScreen'))
export const Contact = lazy(() => import('@screens/ContactScreen'))
