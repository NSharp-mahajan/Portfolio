import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './AboutPage.css'
import CursorEffect from './CursorEffect'
import {
  ArrowLeft,
  Code,
  Database,
  Globe,
  Smartphone,
  Palette,
  Zap,
  Github,
  Award,
  Target,
  Rocket,
  TrendingUp,
  Calendar,
  Clock,
  GitBranch,
  Star,
  Trophy
} from 'lucide-react'

const AboutPage = () => {
  const navigate = useNavigate()
  const timelineRef = useRef(null)
  const dashboardRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)
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
      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect()
        const scrollTop = window.scrollY || document.documentElement.scrollTop
        const elementTop = rect.top + scrollTop
        const elementHeight = rect.height
        const windowHeight = window.innerHeight
        const progress = Math.max(
          0,
          Math.min(1, (scrollTop + windowHeight - elementTop) / elementHeight)
        )
        setScrollProgress(progress)
      }

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

    window.addEventListener('scroll', handleScroll)
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
      { threshold: 0.2 }
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
      { threshold: 0.3 }
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

  const milestones = [
    {
      year: '2018',
      title: '10th Completed',
      description: 'Completed 10th standard with excellence',
      position: { left: '5%', top: '10%' },
      icon: Star
    },
    {
      year: '2020',
      title: '12th Completed (93%)',
      description: 'Achieved 93% in 12th standard',
      position: { left: '15%', top: '25%' },
      icon: Award
    },
    {
      year: '2020',
      title: 'Started Coding',
      description: 'Began my coding journey',
      position: { left: '25%', top: '40%' },
      icon: Code
    },
    {
      year: '2021',
      title: 'First Project',
      description: 'Built my first web application',
      position: { left: '35%', top: '55%' },
      icon: GitBranch
    },
    {
      year: '2021',
      title: 'First Hackathon',
      description: 'Participated in my first hackathon',
      position: { left: '45%', top: '70%' },
      icon: Trophy
    },
    {
      year: '2022',
      title: 'Joined Chitkara University',
      description: 'Started my engineering journey',
      position: { left: '55%', top: '85%' }
    },
    {
      year: '2023',
      title: 'Technical Team Lead',
      description: 'Became Technical Team Lead',
      position: { left: '70%', top: '75%' },
      icon: Target
    },
    {
      year: '2024',
      title: 'Major Projects',
      description: 'PathPilot, Internomics, LumaOS',
      position: { left: '85%', top: '60%' },
      icon: Rocket
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
        <section className="about-hero" onMouseMove={handleHeroMouseMove}>
          <div className="hero-content-wrapper">
            <div className="profile-image-container">
              <div
                className="hero-orbit-rings"
                style={{
                  '--parallax-x': heroParallax.x,
                  '--parallax-y': heroParallax.y
                }}
              >
                <div className="hero-ring" />
                <div className="hero-ring" />
                <div className="hero-ring" />
              </div>
              <div className="profile-glow"></div>
              <div className="profile-image">
                <div className="profile-placeholder">
                  <span>NM</span>
                </div>
              </div>
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

        {/* JOURNEY TIMELINE */}
        <section className="timeline-section" ref={timelineRef}>
          <h2 className="section-title">My Journey</h2>
          <div className="timeline-container">
            <svg className="timeline-path" viewBox="0 0 1000 800" preserveAspectRatio="none">
              <path
                className="timeline-line"
                d="M 50 80 Q 150 200, 250 320 T 450 440 T 650 560 T 850 480"
                fill="none"
                stroke="url(#goldenGradient)"
                strokeWidth="4"
                style={{
                  strokeDasharray: 2000,
                  strokeDashoffset: 2000 * (1 - scrollProgress)
                }}
              />
              <defs>
                <linearGradient id="goldenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#facc15" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#facc15" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#facc15" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>

            <div className="milestones-container">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="milestone-node"
                  style={{
                    left: milestone.position.left,
                    top: milestone.position.top
                  }}
                >
                  <div className="milestone-dot"></div>
                  <div className="milestone-popup">
                    <div className="popup-year">{milestone.year}</div>
                    <div className="popup-title">{milestone.title}</div>
                    <div className="popup-description">{milestone.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTRIBUTION DASHBOARD */}
        <section className="dashboard-section" ref={dashboardRef}>
          <h2 className="section-title">Contributions & Achievements</h2>
          <div className="dashboard-grid">
            <div className="dashboard-card reveal-item" style={{ '--index': 0 }}>
              <div className="card-icon">
                <Github size={32} strokeWidth={2} />
              </div>
              <div className="card-value" data-target="1250">0</div>
              <div className="card-label">Total Contributions</div>
            </div>

            <div className="dashboard-card reveal-item" style={{ '--index': 1 }}>
              <div className="card-icon">
                <TrendingUp size={32} strokeWidth={2} />
              </div>
              <div className="card-value" data-target="45">0</div>
              <div className="card-label">Current Streak</div>
            </div>

            <div className="dashboard-card reveal-item" style={{ '--index': 2 }}>
              <div className="card-icon">
                <Calendar size={32} strokeWidth={2} />
              </div>
              <div className="card-value" data-target="120">0</div>
              <div className="card-label">Longest Streak</div>
            </div>

            <div className="dashboard-card reveal-item" style={{ '--index': 3 }}>
              <div className="card-icon">
                <Clock size={32} strokeWidth={2} />
              </div>
              <div className="card-value" data-target="2500">0</div>
              <div className="card-label">Coding Hours</div>
            </div>

            <div className="dashboard-card reveal-item" style={{ '--index': 4 }}>
              <div className="card-icon">
                <GitBranch size={32} strokeWidth={2} />
              </div>
              <div className="card-value" data-target="28">0</div>
              <div className="card-label">Repositories</div>
            </div>

            <div className="dashboard-card reveal-item" style={{ '--index': 5 }}>
              <div className="card-icon">
                <Award size={32} strokeWidth={2} />
              </div>
              <div className="card-value" data-target="15">0</div>
              <div className="card-label">Achievements</div>
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

