import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import './ProjectsPage.css'
import CursorEffect from './CursorEffect'
import ProjectCard from './ProjectCard'
import ProjectFilters from './ProjectFilters'
import { projects, categories } from './data/projects'
import { ArrowLeft } from 'lucide-react'

const ProjectsPage = () => {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') {
      return projects
    }
    return projects.filter(project => project.category === activeCategory)
  }, [activeCategory])

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
  }

  return (
    <>
      <CursorEffect />
      <div className="projects-page">
        <button
          className="back-button"
          onClick={() => navigate('/')}
          aria-label="Back to main page"
        >
          <ArrowLeft size={20} strokeWidth={2} />
          <span>Back</span>
        </button>

        <div className="projects-container">
          <header className="projects-header">
            <h1 className="projects-title">Selected Work</h1>
            <p className="projects-subtitle">
              Impact-driven projects that solve real problems and deliver measurable results
            </p>
          </header>

          <ProjectFilters
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />

          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="no-projects">
              <p>No projects found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ProjectsPage
