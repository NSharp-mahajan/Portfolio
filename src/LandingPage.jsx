import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './LandingPage.css'
import CursorEffect from './CursorEffect'
import OrbitalIcons from './components/OrbitalIcons'

import image1 from './assets/images/image1.jpg'
import image2 from './assets/images/image2.jpg'
import image3 from './assets/images/image3.jpg'
import image4 from './assets/images/image4.jpg'
import image5 from './assets/images/image5.jpg'
import image6 from './assets/images/image6.jpg'
import image7 from './assets/images/image7.jpg'
import image8 from './assets/images/image8.jpg'
import backgroundImage from './assets/images/Background.png'

const collageImages = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8
]

const LandingPage = () => {
  const navigate = useNavigate()
  const [showLoading, setShowLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showNextPage, setShowNextPage] = useState(false)

  useEffect(() => {
    // Check if user has seen splash screen in this session
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash')
    
    // Debug logging
    console.log('🔍 Loading Debug:')
    console.log('hasSeenSplash:', hasSeenSplash)
    console.log('shouldShowLoading:', !hasSeenSplash)
    
    // Show loading only if user hasn't seen splash screen in this session
    const shouldShowLoading = !hasSeenSplash
    
    if (shouldShowLoading) {
      console.log('✅ Showing loading grid...')
      // Show loading bar after landing page is visible (500ms delay)
      const loadingTimer = setTimeout(() => {
        setShowLoading(true)
      }, 500)

      return () => clearTimeout(loadingTimer)
    } else {
      console.log('⏭️ Skipping loading, going to next page...')
      // Skip loading and go directly to next page
      setShowNextPage(true)
    }
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
              // Mark splash screen as seen for this session
              sessionStorage.setItem('hasSeenSplash', 'true')
            }, 300)
            return 100
          }
          return prev + 2.5
        })
      }, 100)

      return () => clearInterval(interval)
    }
  }, [showLoading])

  // Render full content with icons for next page
  const renderHeroContent = () => (
    <OrbitalIcons />
  )

  // Show next page
  if (showNextPage) {
    return (
      <>
        <CursorEffect />
        <div 
          className="next-page"
          style={{
            backgroundImage: `url(${backgroundImage})`
          }}
        >
          <div className="next-page-overlay"></div>
          <div className="next-page-content">
            {renderHeroContent()}
          </div>
          
          <div className="profile-badge">
            <div className="profile-badge-ring">
              <span>NM</span>
            </div>
            <div className="profile-tooltip">Natansh Mahajan</div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <CursorEffect />
      <div className="landing-page">
      {/* Loading bar appears on the landing page */}
      {showLoading && (
        <div className="loading-bar-container">
          <div className="loading-bar" style={{ width: `${progress}%` }}></div>
        </div>
      )}

      <section className="hero">
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
        <div className="hero-veil" aria-hidden="true" />
        
        {/* Name Display in Center */}
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="name-full" data-text="Natansh Mahajan">Natansh Mahajan</span>
          </h1>
        </div>
      </section>

      <div className="profile-badge">
        <div className="profile-badge-ring">
          <span>NM</span>
        </div>
        <div className="profile-tooltip">Natansh Mahajan</div>
      </div>
    </div>
    </>
  )
}

export default LandingPage
