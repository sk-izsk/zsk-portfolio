import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import { PageLoader } from '../components/PageLoader'
import { About, Contact, Home, Projects, Services, Skills } from './lazyScreens'

export const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Suspense>
  )
}
