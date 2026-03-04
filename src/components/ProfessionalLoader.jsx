import React from 'react'
import './ProfessionalLoader.css'

const ProfessionalLoader = () => {
  return (
    <div className="professional-loader-overlay">
      <div className="professional-loader">
        <div className="loader-ring">
          <div className="loader-ring-inner"></div>
        </div>
        <div className="loader-dots">
          <div className="dot dot-1"></div>
          <div className="dot dot-2"></div>
          <div className="dot dot-3"></div>
        </div>
        <div className="loader-text">
          <span className="loading-letter">L</span>
          <span className="loading-letter">o</span>
          <span className="loading-letter">a</span>
          <span className="loading-letter">d</span>
          <span className="loading-letter">i</span>
          <span className="loading-letter">n</span>
          <span className="loading-letter">g</span>
        </div>
      </div>
    </div>
  )
}

export default ProfessionalLoader
