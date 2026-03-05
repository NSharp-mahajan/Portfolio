import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { LoadingProvider } from './contexts/LoadingContext'
import PageTransition from './components/PageTransition'
import LoadingFallback from './components/LoadingFallback'
import LandingPage from './LandingPage'
import NotFoundPage from './NotFoundPage'

// Lazy load components for better performance
const ContactPage = lazy(() => import('./ContactPage'))
const AboutPage = lazy(() => import('./AboutPage'))
const ResumePage = lazy(() => import('./ResumePage'))
const ProjectsPage = lazy(() => import('./ProjectsPage'))
const AchievementsPage = lazy(() => import('./AchievementsPage'))
const TechBlogs = lazy(() => import('./TechBlogs'))
const BlogArticle = lazy(() => import('./BlogArticle'))

function App() {
  return (
    <LoadingProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/contact" element={
            <Suspense fallback={<LoadingFallback />}>
              <PageTransition>
                <ContactPage />
              </PageTransition>
            </Suspense>
          } />
          <Route path="/about" element={
            <Suspense fallback={<LoadingFallback />}>
              <PageTransition>
                <AboutPage />
              </PageTransition>
            </Suspense>
          } />
          <Route path="/resume" element={
            <Suspense fallback={<LoadingFallback />}>
              <PageTransition>
                <ResumePage />
              </PageTransition>
            </Suspense>
          } />
          <Route path="/projects" element={
            <Suspense fallback={<LoadingFallback />}>
              <PageTransition>
                <ProjectsPage />
              </PageTransition>
            </Suspense>
          } />
          <Route path="/achievements" element={
            <Suspense fallback={<LoadingFallback />}>
              <PageTransition>
                <AchievementsPage />
              </PageTransition>
            </Suspense>
          } />
          <Route path="/blogs" element={
            <Suspense fallback={<LoadingFallback />}>
              <PageTransition>
                <TechBlogs />
              </PageTransition>
            </Suspense>
          } />
          <Route path="/blogs/:slug" element={
            <Suspense fallback={<LoadingFallback />}>
              <PageTransition>
                <BlogArticle />
              </PageTransition>
            </Suspense>
          } />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </LoadingProvider>
  )
}

export default App
