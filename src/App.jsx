import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import LandingPage from './LandingPage'

// Lazy load components for better performance
const ContactPage = lazy(() => import('./ContactPage'))
const AboutPage = lazy(() => import('./AboutPage'))
const ResumePage = lazy(() => import('./ResumePage'))
const ProjectsPage = lazy(() => import('./ProjectsPage'))
const AchievementsPage = lazy(() => import('./AchievementsPage'))
const TechBlogs = lazy(() => import('./TechBlogs'))
const BlogArticle = lazy(() => import('./BlogArticle'))

// Loading fallback component
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#0a0a0a',
    color: '#ffffff'
  }}>
    <div>Loading...</div>
  </div>
)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact" element={
          <Suspense fallback={<LoadingFallback />}>
            <ContactPage />
          </Suspense>
        } />
        <Route path="/about" element={
          <Suspense fallback={<LoadingFallback />}>
            <AboutPage />
          </Suspense>
        } />
        <Route path="/resume" element={
          <Suspense fallback={<LoadingFallback />}>
            <ResumePage />
          </Suspense>
        } />
        <Route path="/projects" element={
          <Suspense fallback={<LoadingFallback />}>
            <ProjectsPage />
          </Suspense>
        } />
        <Route path="/achievements" element={
          <Suspense fallback={<LoadingFallback />}>
            <AchievementsPage />
          </Suspense>
        } />
        <Route path="/blogs" element={
          <Suspense fallback={<LoadingFallback />}>
            <TechBlogs />
          </Suspense>
        } />
        <Route path="/blogs/:slug" element={
          <Suspense fallback={<LoadingFallback />}>
            <BlogArticle />
          </Suspense>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
