import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue, useMotionValueEvent } from 'framer-motion'
import './FreelanceServicesPage.css'
import CursorEffect from './CursorEffect'
import { ArrowLeft, Code, Zap, Rocket, Target, TrendingUp, Users, Clock, CheckCircle2, Star, Quote, ArrowRight, Sparkles, Play } from 'lucide-react'

const FreelanceServicesPage = () => {
  const navigate = useNavigate()
  const [hoveredService, setHoveredService] = useState(null)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const servicesRef = useRef(null)
  const workSectionRef = useRef(null)
  const constellationRef = useRef(null)

  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  
  // Parallax transforms
  const heroY = useTransform(smoothProgress, [0, 0.5], ['0%', '-20%'])
  const servicesY = useTransform(smoothProgress, [0.2, 0.6], ['0%', '-15%'])
  const statsY = useTransform(smoothProgress, [0.4, 0.8], ['0%', '-10%'])

  // Mouse tracking for constellation
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Auto-scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Horizontal scroll for "How I Work"
  useEffect(() => {
    const handleWheel = (e) => {
      if (workSectionRef.current) {
        e.preventDefault()
        workSectionRef.current.scrollLeft += e.deltaY * 0.8
      }
    }
    const section = workSectionRef.current
    if (section) {
      section.addEventListener('wheel', handleWheel, { passive: false })
      return () => section.removeEventListener('wheel', handleWheel)
    }
  }, [])

  const services = [
    {
      id: 1,
      title: 'Full-Stack Development',
      description: 'End-to-end web applications with modern tech stacks',
      icon: Code,
      tech: ['React', 'Node.js', 'MongoDB', 'PostgreSQL']
    },
    {
      id: 2,
      title: 'AI Integration',
      description: 'Intelligent features powered by cutting-edge AI',
      icon: Sparkles,
      tech: ['OpenAI', 'Gemini', 'LangChain', 'Vector DB']
    },
    {
      id: 3,
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive interfaces that convert',
      icon: Zap,
      tech: ['Figma', 'Framer', 'Design Systems', 'Prototyping']
    },
    {
      id: 4,
      title: 'Performance Optimization',
      description: 'Lightning-fast applications that scale',
      icon: Rocket,
      tech: ['CDN', 'Caching', 'Code Splitting', 'Lazy Loading']
    },
    {
      id: 5,
      title: 'Technical Consulting',
      description: 'Strategic guidance for your tech decisions',
      icon: Target,
      tech: ['Architecture', 'Scalability', 'Security', 'DevOps']
    }
  ]

  const workSteps = [
    {
      step: '01',
      title: 'Discovery',
      description: 'Understanding your vision, goals, and challenges',
      duration: '1-2 days'
    },
    {
      step: '02',
      title: 'Strategy',
      description: 'Crafting a roadmap tailored to your needs',
      duration: '2-3 days'
    },
    {
      step: '03',
      title: 'Execution',
      description: 'Building with precision, speed, and quality',
      duration: 'Ongoing'
    },
    {
      step: '04',
      title: 'Launch',
      description: 'Deploying with confidence and ongoing support',
      duration: '1 day'
    },
    {
      step: '05',
      title: 'Optimize',
      description: 'Continuous improvement and scaling',
      duration: 'Ongoing'
    }
  ]

  const stats = [
    { value: 50, suffix: '+', label: 'Projects Delivered', icon: Rocket, subtext: 'Across industries' },
    { value: 98, suffix: '%', label: 'Client Satisfaction', icon: Star, subtext: '5-star average' },
    { value: 24, suffix: '/7', label: 'Support Available', icon: Clock, subtext: 'Always responsive' },
    { value: 5, suffix: 'x', label: 'Faster Delivery', icon: TrendingUp, subtext: 'Than industry avg' }
  ]

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Founder, TechStart',
      text: 'Exceeded expectations. Delivered a complex platform in record time with zero compromises on quality.',
      rating: 5,
      project: 'SaaS Platform'
    },
    {
      name: 'Michael Rodriguez',
      role: 'CEO, InnovateLab',
      text: 'The attention to detail and strategic thinking transformed our product. Highly recommend.',
      rating: 5,
      project: 'E-commerce Solution'
    },
    {
      name: 'Emily Watson',
      role: 'Product Lead, ScaleUp',
      text: 'Professional, responsive, and incredibly talented. Our best investment this year.',
      rating: 5,
      project: 'AI Integration'
    }
  ]

  const engagementModels = [
    {
      title: 'Project-Based',
      description: 'Fixed scope, fixed timeline, fixed price',
      price: 'From $5K',
      features: ['Clear deliverables', 'Defined timeline', 'Transparent pricing', 'Milestone-based payments'],
      highlight: false
    },
    {
      title: 'Retainer',
      description: 'Ongoing partnership for continuous development',
      price: 'From $3K/mo',
      features: ['Priority support', 'Flexible scope', 'Monthly allocation', 'Long-term strategy'],
      highlight: true
    },
    {
      title: 'Hourly',
      description: 'Pay-as-you-go for flexible needs',
      price: '$75-150/hr',
      features: ['Full transparency', 'Flexible engagement', 'Real-time tracking', 'No commitments'],
      highlight: false
    }
  ]

  return (
    <>
      <CursorEffect />
      <button
        className="freelance-back-button"
        onClick={() => navigate('/')}
        aria-label="Back to main page"
      >
        <ArrowLeft size={20} strokeWidth={2} />
        <span>Back</span>
      </button>

      <div className="freelance-page">
        {/* Animated Background with Parallax */}
        <motion.div
          className="freelance-bg-gradient"
          style={{ y: heroY }}
        />

        {/* Floating Particles */}
        <div className="freelance-particles">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="freelance-particle"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.6, 0],
                x: [0, Math.random() * 200 - 100],
                y: [0, Math.random() * 200 - 100]
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

        {/* Hero Section */}
        <section className="freelance-hero">
          <motion.div
            className="freelance-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="freelance-hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Build Your Vision,
              <br />
              <span className="freelance-hero-accent">Not Just Code</span>
            </motion.h1>
            <motion.p
              className="freelance-hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Premium development services for ambitious founders and innovative teams.
            </motion.p>
            <motion.div
              className="freelance-hero-cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.button
                className="freelance-cta-primary"
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(250, 204, 21, 0.6)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/contact')}
              >
                <span>Start a Project</span>
                <ArrowRight size={20} className="cta-arrow" />
                <motion.div
                  className="cta-glow"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(250, 204, 21, 0.4)',
                      '0 0 40px rgba(250, 204, 21, 0.6)',
                      '0 0 20px rgba(250, 204, 21, 0.4)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.button>
              <motion.button
                className="freelance-cta-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/resume')}
              >
                View Resume
              </motion.button>
            </motion.div>
          </motion.div>
        </section>

        {/* SIGNATURE: Floating 3D Service Constellation */}
        <section className="freelance-constellation-section" ref={constellationRef}>
          <motion.h2
            className="freelance-section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            What I Build
          </motion.h2>
          <div className="freelance-constellation-container">
            {(() => {
              const radius = 280
              return (
                <>
                  {services.map((service, index) => {
                    const IconComponent = service.icon
                    const angle = (index * 360) / services.length
                    const baseX = Math.cos((angle * Math.PI) / 180) * radius
                    const baseY = Math.sin((angle * Math.PI) / 180) * radius
                    
                    return (
                      <FloatingServiceNode
                        key={service.id}
                        service={service}
                        baseX={baseX}
                        baseY={baseY}
                        index={index}
                        mousePosition={mousePosition}
                        scrollProgress={smoothProgress}
                        isHovered={hoveredService === service.id}
                        onHover={() => setHoveredService(service.id)}
                        onLeave={() => setHoveredService(null)}
                      />
                    )
                  })}
                  {/* Connecting lines */}
                  <svg className="freelance-constellation-lines" viewBox="-400 -400 800 800">
                    {services.map((_, i) => {
                      const nextIndex = (i + 1) % services.length
                      const angle1 = (i * 360) / services.length
                      const angle2 = (nextIndex * 360) / services.length
                      const x1 = Math.cos((angle1 * Math.PI) / 180) * radius
                      const y1 = Math.sin((angle1 * Math.PI) / 180) * radius
                      const x2 = Math.cos((angle2 * Math.PI) / 180) * radius
                      const y2 = Math.sin((angle2 * Math.PI) / 180) * radius
                return (
                  <motion.line
                    key={`line-${i}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="rgba(250, 204, 21, 0.2)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                  />
                )
              })}
            </svg>
                </>
              )
            })()}
          </div>
        </section>

        {/* How I Work - Horizontal Scroll */}
        <section className="freelance-work-section" ref={workSectionRef}>
          <motion.h2
            className="freelance-section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            How I Work
          </motion.h2>
          <div className="freelance-work-steps">
            {workSteps.map((step, index) => (
              <motion.div
                key={step.step}
                className="freelance-work-step"
                initial={{ opacity: 0, scale: 0.8, x: 50 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ scale: 1.05, y: -10, z: 20 }}
              >
                <div className="freelance-work-step-number">{step.step}</div>
                <h3 className="freelance-work-step-title">{step.title}</h3>
                <p className="freelance-work-step-description">{step.description}</p>
                <span className="freelance-work-step-duration">{step.duration}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="freelance-stats-section">
          <motion.h2
            className="freelance-section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            By The Numbers
          </motion.h2>
          <motion.div
            className="freelance-stats-grid"
            style={{ y: statsY }}
          >
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  className="freelance-stat-card"
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ scale: 1.05, y: -8, z: 20 }}
                >
                  <div className="freelance-stat-icon">
                    <IconComponent size={36} strokeWidth={2} />
                  </div>
                  <CountUpNumber target={stat.value} suffix={stat.suffix} />
                  <p className="freelance-stat-label">{stat.label}</p>
                  <p className="freelance-stat-subtext">{stat.subtext}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </section>

        {/* Testimonials */}
        <section className="freelance-testimonials-section">
          <motion.h2
            className="freelance-section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            Client Stories
          </motion.h2>
          <div className="freelance-testimonials-container">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className={`freelance-testimonial ${index === currentTestimonial ? 'active' : ''}`}
                initial={{ opacity: 0, rotateY: 90, scale: 0.8 }}
                animate={{
                  opacity: index === currentTestimonial ? 1 : 0.25,
                  rotateY: index === currentTestimonial ? 0 : 90,
                  scale: index === currentTestimonial ? 1 : 0.85,
                  z: index === currentTestimonial ? 50 : 0
                }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                whileHover={{ scale: 1.08, z: 80 }}
              >
                <Quote className="freelance-testimonial-quote" size={32} />
                <p className="freelance-testimonial-text">"{testimonial.text}"</p>
                <div className="freelance-testimonial-rating">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="#facc15" color="#facc15" />
                  ))}
                </div>
                <div className="freelance-testimonial-author">
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                  <span className="freelance-testimonial-project">{testimonial.project}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Engagement Models */}
        <section className="freelance-engagement-section">
          <motion.h2
            className="freelance-section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            Engagement Models
          </motion.h2>
          <div className="freelance-engagement-grid">
            {engagementModels.map((model, index) => (
              <motion.div
                key={model.title}
                className={`freelance-engagement-card ${model.highlight ? 'highlighted' : ''}`}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ scale: 1.03, y: -10, z: 20 }}
              >
                {model.highlight && <div className="freelance-engagement-badge">Popular</div>}
                <h3 className="freelance-engagement-title">{model.title}</h3>
                <p className="freelance-engagement-price">{model.price}</p>
                <p className="freelance-engagement-description">{model.description}</p>
                <ul className="freelance-engagement-features">
                  {model.features.map((feature, i) => (
                    <li key={i}>
                      <CheckCircle2 size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  className="freelance-engagement-cta"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(250, 204, 21, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/contact')}
                >
                  Get Started
                  <ArrowRight size={18} />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="freelance-final-cta">
          <motion.div
            className="freelance-final-cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="freelance-final-cta-title">Ready to Build Something Extraordinary?</h2>
            <p className="freelance-final-cta-subtitle">
              Let's turn your vision into reality. Get in touch and let's discuss your project.
            </p>
            <motion.button
              className="freelance-cta-primary"
              whileHover={{ scale: 1.08, boxShadow: '0 0 50px rgba(250, 204, 21, 0.7)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/contact')}
            >
              <span>Start Your Project</span>
              <ArrowRight size={20} className="cta-arrow" />
              <motion.div
                className="cta-glow"
                animate={{
                  boxShadow: [
                    '0 0 30px rgba(250, 204, 21, 0.5)',
                    '0 0 60px rgba(250, 204, 21, 0.8)',
                    '0 0 30px rgba(250, 204, 21, 0.5)'
                  ]
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
            </motion.button>
          </motion.div>
        </section>
      </div>
    </>
  )
}

// Floating 3D Service Node Component (SIGNATURE INTERACTION)
const FloatingServiceNode = ({ service, baseX, baseY, index, mousePosition, scrollProgress, isHovered, onHover, onLeave }) => {
  const IconComponent = service.icon
  const nodeRef = useRef(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const scrollY = useTransform(scrollProgress, [0, 1], [0, -50])
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (nodeRef.current) {
        const rect = nodeRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        mouseX.set((e.clientX - centerX) * 0.1)
        mouseY.set((e.clientY - centerY) * 0.1)
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])
  
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 })
  
  // Combine base position with mouse offset
  const x = useTransform(smoothMouseX, (mx) => baseX + mx)
  
  // Create a combined Y motion value - simpler approach
  const y = useMotionValue(baseY)
  
  // Update Y position when mouse or scroll changes
  useEffect(() => {
    const updateY = () => {
      const my = smoothMouseY.get()
      const sy = scrollY.get()
      y.set(baseY + my + sy)
    }
    
    const unsubscribeMouse = smoothMouseY.on('change', updateY)
    const unsubscribeScroll = scrollY.on('change', updateY)
    
    // Initial update
    updateY()
    
    return () => {
      unsubscribeMouse()
      unsubscribeScroll()
    }
  }, [smoothMouseY, scrollY, baseY, y])
  
  // Rotation based on mouse position
  const rotateX = useTransform(smoothMouseY, (my) => Math.max(-15, Math.min(15, my * 0.15)))
  const rotateY = useTransform(smoothMouseX, (mx) => Math.max(-15, Math.min(15, mx * -0.15)))
  
  // Scale based on scroll progress
  const scale = useTransform(scrollProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.9])
  
  return (
    <motion.div
      ref={nodeRef}
      className={`freelance-service-node ${isHovered ? 'hovered' : ''}`}
      style={{
        x,
        y,
        rotateX,
        rotateY,
        scale,
        z: isHovered ? 100 : 0
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.15, z: 150 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="freelance-service-node-glow" />
      <div className="freelance-service-node-content">
        <div className="freelance-service-node-icon">
          <IconComponent size={28} strokeWidth={2} />
        </div>
        <h3 className="freelance-service-node-title">{service.title}</h3>
        <p className="freelance-service-node-description">{service.description}</p>
        <div className="freelance-service-node-tech">
          {service.tech.map((tech, i) => (
            <span key={i} className="freelance-service-node-tech-tag">{tech}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// Count-up animation component
const CountUpNumber = ({ target, suffix }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!isInView) return

    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [target, isInView])

  return (
    <div ref={ref} className="freelance-stat-value">
      {count}{suffix}
    </div>
  )
}

export default FreelanceServicesPage
