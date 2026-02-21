import React, { useState, useEffect, useRef } from 'react'
import { Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import './ProjectCard.css'

const ProjectCard = ({ project }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const autoSlideRef = useRef(null)

  // Auto-slide functionality
  useEffect(() => {
    if (isHovered && project.images && project.images.length > 1) {
      autoSlideRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => 
          prev === project.images.length - 1 ? 0 : prev + 1
        )
      }, 3000)
    } else {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current)
      }
    }

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current)
      }
    }
  }, [isHovered, project.images])

  const handlePrevImage = (e) => {
    e.preventDefault()
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.images.length - 1 : prev - 1
    )
  }

  const handleNextImage = (e) => {
    e.preventDefault()
    setCurrentImageIndex((prev) => 
      prev === project.images.length - 1 ? 0 : prev + 1
    )
  }

  const currentImage = project.images && project.images.length > 0 
    ? project.images[currentImageIndex] 
    : project.image

  return (
    <div 
      className="project-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="project-visual">
        <div className="image-slider">
          <img 
            src={currentImage} 
            alt={project.title}
            className="project-image"
            onError={(e) => {
              e.target.src = '/assets/images/image1.jpg'
            }}
          />
          
          {project.images && project.images.length > 1 && (
            <>
              <button 
                className="slider-nav prev"
                onClick={handlePrevImage}
                aria-label="Previous image"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                className="slider-nav next"
                onClick={handleNextImage}
                aria-label="Next image"
              >
                <ChevronRight size={16} />
              </button>
              <div className="slider-dots">
                {project.images.map((_, index) => (
                  <div 
                    key={index}
                    className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        
        <div className="tech-stack">
          {project.techStack.slice(0, 4).map((tech, index) => (
            <span key={index} className="tech-tag">
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="tech-tag more">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>
        
        <div className="project-actions">
          <a 
            href={project.projectUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="action-icon"
            aria-label="View live project"
          >
            <ExternalLink size={18} />
          </a>
          <a 
            href={project.codeUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="action-icon"
            aria-label="View source code"
          >
            <Github size={18} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
