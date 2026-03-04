import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import './ProjectsPage.css'
import ProjectGrid from './ProjectGrid'
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
            <h1 className="projects-title">Projects</h1>
          </header>

          {/* Category Filter Section */}
          <div className="category-filter">
            <div className="category-buttons">
              {categories.map((category) => {
                const count = category === 'All' 
                  ? projects.length 
                  : projects.filter(project => project.category === category).length
                
                return (
                  <button
                    key={category}
                    className={`category-button ${activeCategory === category ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                    <span className="category-count">({count})</span>
                  </button>
                )
              })}
            </div>
          </div>

          <ProjectGrid projects={filteredProjects} />

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
