import React from 'react'
import './ProjectCard.css'

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <div className="project-image">
        <img 
          src={project.image} 
          alt={project.title}
          onError={(e) => {
            e.target.src = '/assets/images/image1.jpg'
          }}
        />
      </div>
      
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        
        <div className="tech-stack">
          {project.techStack.map((tech, index) => (
            <span key={index} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>
        
        <div className="project-actions">
          <a 
            href={project.projectUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="action-button primary"
          >
            View Project
          </a>
          <a 
            href={project.codeUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="action-button secondary"
          >
            Code
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
