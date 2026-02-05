import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './AboutPage.css'
import './GithubMetricsSection.css'
import './SkillsSection.css'
import CursorEffect from './CursorEffect'
import GithubMetricsSection from './GithubMetricsSection'
import SkillsSection from './SkillsSection'
import aboutBackground from './assets/images/About.png'
import profileImage from './assets/images/image5.jpg'
import image6 from './assets/images/image6.jpg'
import schoolImage from './assets/images/School.jpg'
import chitkaraImage from './assets/images/chitkara.jpeg'
import imageOne from './assets/images/image1.jpg'
import appleCommunityImage from './assets/images/image4.jpg'
import cybercopImage from './assets/images/cybercop.png'
import hackathonsImage from './assets/images/image2.jpg'
import projectImage from './assets/images/project.png'
import msFinaleImage from './assets/images/off.jpeg'
import techHeadImage from './assets/images/image7.jpg'
import moreMilestonesImage from './assets/images/image8.jpg'
import { ArrowLeft, Code, Database, Globe, Smartphone, Palette, Zap, Rocket, Star, Target, GitBranch } from 'lucide-react'

const ZigZagJourney = ({ items }) => {
  const rows = []
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2))
  }

  return (
    <div className="zigzag-wrapper">
      {/* Enhanced Background Layers */}
      <div className="zigzag-overlay" />
      <div className="zigzag-particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="zigzag-particle"
            style={{
              '--delay': `${i * 0.3}s`,
              '--duration': `${15 + (i % 8) * 2}s`,
              '--x': `${(i * 47) % 100}%`,
              '--y': `${(i * 31) % 100}%`
            }}
          />
        ))}
      </div>
      <div className="zigzag-vignette" />

      <div className="journey-rows">
        {rows.map((pair, rowIdx) => {
          const isEvenRow = rowIdx % 2 === 0
          const [first, second] = pair
          const leftItem = isEvenRow ? first : second
          const rightItem = isEvenRow ? second : first
          const hasRight = Boolean(rightItem)
          const isLastRow = rowIdx === rows.length - 1

          return (
            <React.Fragment key={rowIdx}>
              <div className={`journey-row ${isEvenRow ? 'row-even' : 'row-odd'}`}>
                <JourneyCard item={leftItem} index={rowIdx * 2} />

                <div
                  className={`journey-arrow-horizontal ${hasRight ? '' : 'arrow-hidden'} ${
                    isEvenRow ? 'arrow-right' : 'arrow-left'
                  }`}
                >
                  <div className="arrow-line" />
                  <div className="arrow-head" />
                </div>

                {hasRight ? <JourneyCard item={rightItem} index={rowIdx * 2 + 1} /> : <div className="journey-placeholder" />}
              </div>

              {!isLastRow && (
                <div className="journey-arrow-down">
                  <div className="arrow-line-vertical" />
                  <div className="arrow-head-down" />
                </div>
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

const JourneyCard = ({ item, index }) => {
  if (!item) return null
  const fallbackLetter = item.title ? item.title.charAt(0) : '•'
  const imgSrc = item.image || profileImage
  return (
    <div className="journey-item milestone-node reveal-item" style={{ '--index': index }}>
      <div className="journey-node">
        <div className="journey-image-wrapper">
          <div
            className="journey-image"
            style={{
              backgroundImage: `url(${imgSrc})`,
              backgroundSize: item.imageFit || 'cover'
            }}
            aria-hidden="true"
          >
            {!item.image && <span className="journey-initial">{fallbackLetter}</span>}
          </div>
        </div>
        <div className="journey-text">
          <div className="journey-title">{item.title}</div>
          {item.date && <div className="journey-date">{item.date}</div>}
          <div className="journey-description">{item.description}</div>
        </div>
      </div>
    </div>
  )
}

const AboutPage = () => {
  const navigate = useNavigate()
  const [heroParallax, setHeroParallax] = useState({ x: 0, y: 0 })

  // Intersection Observer for staggered reveals
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal-item, .skill-card')
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '150px 0px' }
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // Intersection Observer for milestone glow activation
  useEffect(() => {
    const nodes = document.querySelectorAll('.milestone-node')
    if (!nodes.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '180px 0px' }
    )

    nodes.forEach((node) => observer.observe(node))

    return () => observer.disconnect()
  }, [])

  const handleHeroMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    setHeroParallax({ x, y })
  }

  const journeyMilestones = [
    {
      id: 'school',
      title: 'Little Flower Convent School, Dhariwal',
      date: 'School Years',
      description: 'Built the foundation of discipline and curiosity.',
      image: schoolImage
    },
    {
      id: 'chitkara',
      title: 'Joined Chitkara University (CSE — AI & ML)',
      date: '2024',
      description: 'Started my technical and coding journey.',
      image: chitkaraImage
    },
    {
      id: 'first-hackathon',
      title: 'First Hackathon — 2nd Semester',
      date: 'Early University',
      description: 'Discovered innovation and collaboration.',
      image: imageOne
    },
    {
      id: 'apple-community',
      title: 'Apple Student Community',
      date: 'Sep 2024 – Feb 2025',
      description: 'Content creator and storyteller.',
      image: appleCommunityImage
    },
    {
      id: 'national-hackathon',
      title: 'National Hackathon Winner',
      date: 'HackWithIndia — 3rd Semester',
      description: 'Won a national-level hackathon.',
      image: profileImage
    },
    {
      id: 'multi-projects',
      title: 'Projects in Web, AI & Design',
      date: 'Ongoing',
      description: 'Built multiple projects to sharpen my skills.',
      image: cybercopImage,
      imageFit: 'contain'
    },
    {
      id: 'first-freelance',
      title: 'First Freelancing Project',
      date: '2nd Year',
      description: 'Delivered my first paid project.',
      image: projectImage
    },
    {
      id: 'ten-hackathons',
      title: '10+ Hackathons Across India',
      date: 'University Journey',
      description: 'learned, and collaborated nationwide.',
      image: hackathonsImage
    },
    {
      id: 'ms-finalist',
      title: 'Microsoft Hackathon Finalist',
      date: 'Gurgaon',
      description: 'Reached the finals at a major tech hackathon.',
      image: msFinaleImage
    },
    {
      id: 'tech-head',
      title: 'Technical Head — Design Thinking Society',
      date: 'Leadership',
      description: 'Guiding teams and shaping innovative ideas.',
      image: techHeadImage
    },
    {
      id: 'more-coming',
      title: 'More milestones loading…',
      date: '',
      description: 'This is just the beginning of the journey.',
      image: moreMilestonesImage,
      isFinal: true
    }
  ]

  return (
    <>
      <CursorEffect />
      <button
        className="back-button"
        onClick={() => navigate('/')}
        aria-label="Back to main page"
      >
        <ArrowLeft size={20} strokeWidth={2} />
        <span>Back</span>
      </button>

      <div className="about-page">
        {/* Floating Particles Background */}
        <div className="particles-bg">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                '--delay': `${i * 0.2}s`,
                '--duration': `${15 + (i % 10) * 2}s`,
                '--x': `${(i * 37) % 100}%`,
                '--y': `${(i * 23) % 100}%`
              }}
            />
          ))}
        </div>

        {/* HERO SECTION */}
        <section
          className="about-hero"
          onMouseMove={handleHeroMouseMove}
          style={{
            backgroundImage: `url(${aboutBackground})`
          }}
        >
          <div className="hero-content-wrapper">
            <div className="profile-image-container">
              <div
                className="profile-image"
                style={{ backgroundImage: `url(${profileImage})` }}
              ></div>
            </div>

            <h1 className="hero-name">
              <span className="name-text">Natansh</span>
              <span className="name-text">Mahajan</span>
            </h1>

            <p className="hero-subtitle">
              Tech Lead • Full-Stack Developer • UI/UX Designer
            </p>

            <p className="hero-intro">
              Crafting digital experiences with precision and innovation.
              <br />
              Building the future, one line of code at a time.
            </p>
          </div>
        </section>

        {/* JOURNEY TIMELINE – THE GOLDEN PATHWAY */}
        <section className="timeline-section">
          <h2 className="section-title">The Golden Pathway</h2>
          <ZigZagJourney items={journeyMilestones} />
        </section>

        {/* CONTRIBUTIONS & ACHIEVEMENTS */}
        <GithubMetricsSection />

        {/* SKILLS & TECHNOLOGIES */}
        <SkillsSection />
      </div>
    </>
  )
}

export default AboutPage

