import React, { useState, useEffect } from 'react'
import './LandingPage.css'

// Import your local images
import image1 from './assets/images/image1.jpg'
import image2 from './assets/images/image2.jpg'
import image3 from './assets/images/image3.jpg'
import image4 from './assets/images/image4.jpg'
import image5 from './assets/images/image5.jpg'
import image6 from './assets/images/image6.jpg'
import backgroundImage from './assets/images/Background.png'

const collageImages = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6
]

const LandingPage = () => {
  const [showLoading, setShowLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showNextPage, setShowNextPage] = useState(false)

  useEffect(() => {
    // Show loading bar after landing page is visible (500ms delay)
    const loadingTimer = setTimeout(() => {
      setShowLoading(true)
    }, 500)

    return () => clearTimeout(loadingTimer)
  }, [])

  useEffect(() => {
    // Start progress when loading bar appears
    if (showLoading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setTimeout(() => {
              setShowNextPage(true)
            }, 300)
            return 100
          }
          return prev + 2.5
        })
      }, 100)

      return () => clearInterval(interval)
    }
  }, [showLoading])

  // Show next page
  if (showNextPage) {
    return (
      <div 
        className="next-page"
        style={{
          backgroundImage: `url(${backgroundImage})`
        }}
      >
        <div className="next-page-overlay"></div>
        {/* Blank page - ready for you to build one by one */}
      </div>
    )
  }

  return (
    <div className="landing-page">
      {/* Loading bar appears on the landing page */}
      {showLoading && (
        <div className="loading-bar-container">
          <div className="loading-bar" style={{ width: `${progress}%` }}></div>
        </div>
      )}

      <section className="hero" aria-labelledby="portfolio-title">
        <div className="hero-background" aria-hidden="true">
          <div className="collage">
            {collageImages.map((url, index) => (
              <div
                key={url + index}
                className="collage-tile"
                style={{ backgroundImage: `url(${url})` }}
              />
            ))}
          </div>
          <div className="hero-overlay" />
        </div>

        <div className="hero-content">
          <h1 id="portfolio-title" className="hero-title">
            Natansh Mahajan
          </h1>
          <p className="hero-subtitle">
            Welcome to my portfolio
          </p>
          <div className="scroll-indicator" aria-hidden="true">
            <span />
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
