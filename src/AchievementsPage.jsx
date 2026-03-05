import React from 'react'
import { useNavigate } from 'react-router-dom'
import './AchievementsPage.css'
import { Trophy, ArrowLeft } from 'lucide-react'

const AchievementsPage = () => {
  const navigate = useNavigate()

  // Achievement data - replace with your actual achievements
  const achievements = [
    {
      image: "/assets/ach1.jpg",
      title: "National Hackathon Winner",
      description: "National Hackathon Winner, Organized by HackWithIndia at Khalsa College Amritsar"
    },
    {
      image: "/assets/ach2.jpeg",
      title: "Hackground Finalist",
      description: "Among top 20 finalists of Hackground 2025 at Thoughtworks office, gurugram"
    },
    {
      image: "/assets/ach3.jpeg",
      title: "Microsoft Finalist",
      description: "Finalists at Microsoft office gurgoan organized by HackWithIndia"
    },
    {
      image: "/assets/ach4.jpg",
      title: "Technical Head",
      description: "Appointed as Technical Head at DTS, Chitkara University"
    },
    {
      image: "/assets/ach5.jpeg",
      title: "Innox Runner Up",
      description: "Runners Up at Innox 2025, Organized by Coding Ninjas - Chitkara University"
    },
    {
      image: "/assets/ach6.webp",
      title: "TechPrenuer Participant",
      description: "Among top 30 teams to display project at TechPrenuer - IIT JAMMU"
    }
  ]

  return (
    <>
      <button 
        className="back-button"
        onClick={() => navigate('/')}
        aria-label="Back to main page"
      >
        <ArrowLeft size={20} strokeWidth={2} />
        <span>Back</span>
      </button>
      
      <div className="achievements-page">
        {/* Floating Particles Background */}
        <div className="particles-container">
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                '--delay': `${i * 0.4}s`,
                '--duration': `${20 + (i % 8) * 3}s`,
                '--x': `${(i * 41) % 100}%`,
                '--y': `${(i * 27) % 100}%`
              }}
            />
          ))}
        </div>

        <div className="achievements-container">
          {/* Header Section */}
          <header className="achievements-header">
            <div className="header-content">
              <div className="title-wrapper">
                <Trophy className="trophy-icon" size={32} strokeWidth={1.5} />
                <h1 className="achievements-title">Achievements</h1>
              </div>
              <div className="accent-line"></div>
              <p className="achievements-subtitle">Milestones, Hackathons, and Recognitions</p>
            </div>
          </header>

          {/* Glassmorphism Container */}
          <div className="achievements-glass-container">
            <div className="achievements-grid">
              {achievements.map((achievement, index) => (
                <div 
                  key={index} 
                  className="achievement-card"
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {/* Achievement Content - New Layout */}
                  <div className="achievement-content">
                    {/* Achievement Image - 70% height */}
                    <div className="achievement-image-wrapper">
                      <img 
                        src={achievement.image} 
                        alt={achievement.title}
                        className="achievement-image"
                      />
                    </div>
                    
                    {/* Achievement Text - 30% height */}
                    <div className="achievement-text">
                      <h3 className="achievement-title">
                        {/* Replace title here */}
                        {achievement.title}
                      </h3>
                      <p className="achievement-description">
                        {/* Replace description here */}
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AchievementsPage
