import React from 'react'
import { useNavigate } from 'react-router-dom'
import './NotFoundPage.css'

const NotFoundPage = () => {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <div className="not-found-page">
      {/* Animated Background */}
      <div className="space-background">
        <div className="stars"></div>
        <div className="planets"></div>
        <div className="nebula"></div>
      </div>

      {/* Main Content */}
      <div className="not-found-content">
        {/* 404 Animation */}
        <div className="error-code">
          <span className="digit four">4</span>
          <div className="astronaut">
            <div className="helmet"></div>
            <div className="body"></div>
            <div className="arm left"></div>
            <div className="arm right"></div>
            <div className="leg left"></div>
            <div className="leg right"></div>
          </div>
          <span className="digit four">4</span>
        </div>

        {/* Error Message */}
        <h1 className="error-title">
          Oops! This page drifted into space 🚀
        </h1>

        <p className="error-description">
          Looks like this page has floated away into the digital cosmos. 
          Let's get you back to solid ground.
        </p>

        {/* Action Button */}
        <button 
          className="home-button"
          onClick={handleGoHome}
          aria-label="Return to homepage"
        >
          <span className="button-text">Return to Earth</span>
          <div className="button-glow"></div>
        </button>

        {/* Additional Options */}
        <div className="navigation-options">
          <button 
            className="nav-link"
            onClick={() => navigate('/projects')}
          >
            View Projects
          </button>
          <button 
            className="nav-link"
            onClick={() => navigate('/about')}
          >
            About Me
          </button>
          <button 
            className="nav-link"
            onClick={() => navigate('/contact')}
          >
            Get in Touch
          </button>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="satellite"></div>
        <div className="meteor"></div>
        <div className="ufo"></div>
      </div>
    </div>
  )
}

export default NotFoundPage
