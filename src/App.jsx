import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './LandingPage'
import ContactPage from './ContactPage'
import AboutPage from './AboutPage'
import ResumePage from './ResumePage'
import ProjectsPage from './ProjectsPage'
import AchievementsPage from './AchievementsPage'
import TechBlogs from './TechBlogs'
import BlogArticle from './BlogArticle'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/blogs" element={<TechBlogs />} />
        <Route path="/blogs/:slug" element={<BlogArticle />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
