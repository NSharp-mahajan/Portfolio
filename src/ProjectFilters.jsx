import React from 'react'
import './ProjectFilters.css'

const ProjectFilters = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="project-filters">
      <div className="filter-container">
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-button ${activeCategory === category ? 'active' : ''}`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProjectFilters
