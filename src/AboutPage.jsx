import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './AboutPage.css'
import CursorEffect from './CursorEffect'
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
import { ArrowLeft, Code, Database, Globe, Smartphone, Palette, Zap, Rocket, Star, GitBranch, Target, GitCommit, Flame, Clock, FolderGit2, Trophy, TrendingUp, Users, Package } from 'lucide-react'

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
  const dashboardRef = useRef(null)
  const [countersAnimated, setCountersAnimated] = useState(false)
  const [heroParallax, setHeroParallax] = useState({ x: 0, y: 0 })

  // Scroll-linked timeline + dashboard count-up
  useEffect(() => {
    const animateCounters = () => {
      const cards = document.querySelectorAll('.dashboard-card .card-value')
      cards.forEach((card) => {
        const target = parseInt(card.getAttribute('data-target') || '0', 10)
        const duration = 2000
        const increment = target / (duration / 16)
        let current = 0

        const updateCounter = () => {
          current += increment
          if (current < target) {
            card.textContent = Math.floor(current).toString()
            requestAnimationFrame(updateCounter)
          } else {
            card.textContent = target.toString()
          }
        }

        updateCounter()
      })
    }

    const handleScroll = () => {
      // Animate counters when dashboard is in view
      if (dashboardRef.current && !countersAnimated) {
        const rect = dashboardRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        if (rect.top < windowHeight * 0.8) {
          setCountersAnimated(true)
          animateCounters()
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [countersAnimated])

  // Intersection Observer for staggered reveals
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal-item')
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

  const handleConstellationMouseMove = (event) => {
    const capsules = document.querySelectorAll('.stat-capsule')
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    
    capsules.forEach((capsule, index) => {
      const intensity = 0.08
      const delay = index * 0.05
      const offsetX = x * intensity * (1 + delay)
      const offsetY = y * intensity * (1 + delay)
      
      capsule.style.setProperty('--parallax-x', `${offsetX}px`)
      capsule.style.setProperty('--parallax-y', `${offsetY}px`)
    })
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

  const achievementNodes = [
    {
      id: 'contrib',
      title: 'Open Source Contributions',
      value: '1.2k',
      icon: GitCommit
    },
    {
      id: 'streak',
      title: 'Consistency Streak',
      value: '45d',
      icon: Flame
    },
    {
      id: 'hours',
      title: 'Focused Build Hours',
      value: '2.5k',
      icon: Clock
    },
    {
      id: 'repos',
      title: 'Active Repositories',
      value: '28',
      icon: FolderGit2
    },
    {
      id: 'awards',
      title: 'Podiums & Wins',
      value: '15',
      icon: Trophy
    },
    {
      id: 'impact',
      title: 'Performance Uplift',
      value: '42%',
      icon: TrendingUp
    },
    {
      id: 'mentorship',
      title: 'Mentorship & Sessions',
      value: '30+',
      icon: Users
    },
    {
      id: 'shipping',
      title: 'Shipping Velocity',
      value: '18',
      icon: Package
    }
  ]

  const skills = [
    { name: 'React', icon: Code, category: 'Frontend' },
    { name: 'Node.js', icon: Code, category: 'Backend' },
    { name: 'MongoDB', icon: Database, category: 'Database' },
    { name: 'JavaScript', icon: Code, category: 'Language' },
    { name: 'TypeScript', icon: Code, category: 'Language' },
    { name: 'Python', icon: Code, category: 'Language' },
    { name: 'HTML/CSS', icon: Globe, category: 'Frontend' },
    { name: 'React Native', icon: Smartphone, category: 'Mobile' },
    { name: 'UI/UX Design', icon: Palette, category: 'Design' },
    { name: 'Git', icon: GitBranch, category: 'Tools' },
    { name: 'Express.js', icon: Code, category: 'Backend' },
    { name: 'Firebase', icon: Database, category: 'Backend' }
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
        <section 
          className="achievements-section" 
          ref={dashboardRef}
          onMouseMove={handleConstellationMouseMove}
        >
          <div className="section-header">
            <h2 className="section-title">Contributions & Achievements</h2>
            <p className="section-subtitle">
              A curated view of milestones and metrics that define the journey.
            </p>
          </div>

          <div className="achievements-dock">
            <div className="dock-glow" />
            <div className="dock-particles" aria-hidden="true">
              {Array.from({ length: 12 }).map((_, i) => (
                <span
                  key={i}
                  style={{
                    '--x': `${(i * 8.33) % 100}%`,
                    '--d': `${10 + (i % 4) * 2}s`,
                    '--s': `${0.02 + (i % 3) * 0.01}`
                  }}
                />
              ))}
            </div>
            <div className="achievements-capsules">
              {achievementNodes.map((node, index) => {
                const IconComponent = node.icon
                return (
                  <div
                    key={node.id}
                    className="stat-capsule reveal-item"
                    style={{ '--index': index }}
                  >
                    <div className="capsule-icon">
                      <IconComponent size={18} strokeWidth={1.5} />
                    </div>
                    <div className="capsule-content">
                      <div className="capsule-value">{node.value}</div>
                      <div className="capsule-label">{node.title}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* STORY SECTION */}
        <section className="story-section">
          <div className="story-container">
            <div className="story-content">
                <div className="story-block reveal-item" style={{ '--index': 0 }}>
                <h3 className="story-heading">
                  <Zap className="story-icon" size={24} />
                  How It Started
                </h3>
                <p className="story-text">
                  My journey began with curiosity and a passion for solving problems.
                  What started as simple HTML pages evolved into complex full-stack
                  applications, each project teaching me something new.
                </p>
              </div>

                <div className="story-block reveal-item" style={{ '--index': 1 }}>
                <h3 className="story-heading">
                  <Rocket className="story-icon" size={24} />
                  How It's Going
                </h3>
                <p className="story-text">
                  Today, I lead technical teams, architect scalable solutions, and
                  design intuitive user experiences. Every day is an opportunity to
                  push boundaries and create something meaningful.
                </p>
              </div>

                <div className="story-block reveal-item" style={{ '--index': 2 }}>
                <h3 className="story-heading">
                  <Target className="story-icon" size={24} />
                  What Drives Me
                </h3>
                <p className="story-text">
                  Innovation, excellence, and impact. I'm driven by the challenge of
                  turning complex ideas into elegant solutions that make a difference
                  in people's lives.
                </p>
              </div>

                <div className="story-block reveal-item" style={{ '--index': 3 }}>
                <h3 className="story-heading">
                  <Star className="story-icon" size={24} />
                  What I'm Building Next
                </h3>
                <p className="story-text">
                  Exploring AI integration, building scalable microservices, and
                  creating immersive web experiences. The future is full of
                  possibilities, and I'm excited to be part of it.
                </p>
              </div>
            </div>

            <div className="story-divider"></div>

            <div className="story-image-container">
              <div className="story-image">
                <div className="story-image-placeholder">
                  <span>Your Photo</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS GRID */}
        <section className="skills-section">
          <h2 className="section-title">Skills & Technologies</h2>
          <div className="skills-grid">
            {skills.map((skill, index) => {
              const IconComponent = skill.icon
              return (
                <div
                  key={index}
                  className="skill-card reveal-item"
                  style={{ '--index': index }}
                >
                  <div className="skill-icon-wrapper">
                    <IconComponent className="skill-icon" size={40} strokeWidth={2} />
                  </div>
                  <div className="skill-name">{skill.name}</div>
                  <div className="skill-category">{skill.category}</div>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </>
  )
}

export default AboutPage

