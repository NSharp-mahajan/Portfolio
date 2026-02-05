import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './LandingPage.css'
import CursorEffect from './CursorEffect'
import {
  UserRound,
  Mail,
  Folder,
  BriefcaseBusiness,
  Trophy,
  Sparkles,
  FileText
} from 'lucide-react'

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

const floatingIcons = [
  { id: 'contact', label: 'Contact', Icon: Mail },
  { id: 'projects', label: 'Projects', Icon: Folder },
  { id: 'freelance', label: 'Freelance Service', Icon: BriefcaseBusiness },
  { id: 'achievements', label: 'Achievements', Icon: Trophy },
  { id: 'resume', label: 'Resume', Icon: FileText },
  { id: 'about', label: 'About Me', Icon: UserRound }
]

const floatDurations = ['4s', '5s', '6s', '4.5s', '5.5s', '4.2s', '5.2s']

const LandingPage = () => {
  const navigate = useNavigate()
  const [showLoading, setShowLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showNextPage, setShowNextPage] = useState(false)

  useEffect(() => {
    // Check if user has seen splash screen before
    const hasSeenSplash = localStorage.getItem('hasSeenSplash')
    
    if (!hasSeenSplash) {
      // Show loading bar after landing page is visible (500ms delay)
      const loadingTimer = setTimeout(() => {
        setShowLoading(true)
      }, 500)

      return () => clearTimeout(loadingTimer)
    } else {
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
              // Mark splash screen as seen
              localStorage.setItem('hasSeenSplash', 'true')
            }, 300)
            return 100
          }
          return prev + 2.5
        })
      }, 100)

      return () => clearInterval(interval)
    }
  }, [showLoading])

  const handleIconClick = (iconId) => {
    if (iconId === 'contact') {
      navigate('/contact')
    } else if (iconId === 'about') {
      navigate('/about')
    } else if (iconId === 'resume') {
      navigate('/resume')
    } else if (iconId === 'freelance') {
      navigate('/freelance')
    }
    // Add other page navigations here as you create them
    // else if (iconId === 'projects') {
    //   navigate('/projects')
    // }
  }

  // Render full content with icons for next page
  const renderHeroContent = () => (
    <div className="hero-content">
      <div className="hero-title" id="portfolio-title">
        <span className="hero-title-line">THE</span>
        <span className="hero-title-line">DIGITAL</span>
        <span className="hero-title-line">VISIONARY</span>
      </div>

      <div className="floating-icons">
        <div className="floating-icons-inner">
          {floatingIcons.map((icon, index) => {
            const IconGraphic = icon.Icon
            const angle = index * (360 / floatingIcons.length)
            const duration = floatDurations[index % floatDurations.length]
            return (
              <div
                key={icon.id}
                className="floating-icon"
                style={{
                  '--angle': `${angle}deg`,
                  '--float-duration': duration
                }}
                aria-label={icon.label}
                onClick={() => handleIconClick(icon.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleIconClick(icon.id)
                  }
                }}
              >
                <div className="icon-symbol">
                  <IconGraphic
                    className="icon-graphic"
                    strokeWidth={2.5}
                    color="#ffffff"
                    size={32}
                  />
                </div>
                <span className="icon-label">{icon.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
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
          
          {/* Blank page - ready for you to build one by one */}
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
