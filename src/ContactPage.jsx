import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ContactPage.css'
import CursorEffect from './CursorEffect'
import { Mail, Github, Linkedin, Send, ArrowLeft } from 'lucide-react'

const ContactPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({ name: '', email: '', message: '' })
  }

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
      <div className="contact-page">
      {/* Cinematic Background Scene */}
      <div className="scene-background">
        {/* Futuristic City Skyline */}
        <div className="city-skyline">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={`building-${i}`}
              className="building"
              style={{
                '--building-height': `${30 + (i % 5) * 15}%`,
                '--building-width': `${4 + (i % 3) * 2}%`,
                '--building-left': `${i * 6.5}%`,
                '--building-delay': `${i * 0.1}s`
              }}
            />
          ))}
        </div>

        {/* Glass Window with Reflection */}
        <div className="window-pane"></div>

        {/* Desk Surface */}
        <div className="desk-surface"></div>

        {/* Laptop Screen with Code Glow */}
        <div className="laptop-container">
          <div className="laptop-screen">
            <div className="code-lines">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={`line-${i}`}
                  className="code-line"
                  style={{
                    '--line-width': `${60 + (i % 4) * 15}%`,
                    '--line-delay': `${i * 0.2}s`
                  }}
                />
              ))}
            </div>
            <div className="screen-glow"></div>
          </div>
          <div className="laptop-base"></div>
        </div>

        {/* Holographic Floating Screen */}
        <div className="hologram-screen">
          <div className="hologram-content">
            <div className="hologram-grid"></div>
            <div className="hologram-particles">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={`holo-${i}`}
                  className="holo-particle"
                  style={{
                    '--holo-delay': `${i * 0.3}s`,
                    '--holo-x': `${(i * 25) % 100}%`,
                    '--holo-y': `${(i * 30) % 100}%`
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Ambient Neon Accents */}
        <div className="neon-accent neon-accent-1"></div>
        <div className="neon-accent neon-accent-2"></div>
        <div className="neon-accent neon-accent-3"></div>

        {/* Depth of Field Blur Layers */}
        <div className="dof-layer dof-far"></div>
        <div className="dof-layer dof-mid"></div>
      </div>

      {/* Floating Particles */}
      <div className="particles-container">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              '--delay': `${i * 0.3}s`,
              '--duration': `${15 + (i % 10) * 2}s`,
              '--x': `${(i * 37) % 100}%`,
              '--y': `${(i * 23) % 100}%`
            }}
          />
        ))}
      </div>

      <div className="contact-container">
        {/* LEFT SECTION */}
        <div className="contact-left">
          <div className="tech-icon-wrapper">
            <div className="tech-icon-glow"></div>
            <div className="tech-icon">
              <Mail size={48} strokeWidth={1.5} color="#facc15" />
            </div>
          </div>

          <h1 className="contact-heading">
            Let's Connect with <span className="highlight">Natansh</span>
          </h1>

          <p className="contact-subtext">
            Have a question, project, or idea? I'd love to hear from you.
          </p>

          <div className="social-links">
            <a
              href="https://github.com/NSharp-mahajan"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="GitHub"
            >
              <Github size={20} strokeWidth={2} />
            </a>
            <a
              href="https://www.linkedin.com/in/natansh-mahajan-287b19316/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} strokeWidth={2} />
            </a>
            <a
              href="mailto:mahajannatansh@gmail.com"
              className="social-link"
              aria-label="Email"
            >
              <Mail size={20} strokeWidth={2} />
            </a>
          </div>
        </div>

        {/* RIGHT SECTION - FORM */}
        <div className="contact-right">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project or idea..."
                rows="6"
                required
              />
            </div>

            <button type="submit" className="submit-button">
              <span>Send Message</span>
              <Send size={18} strokeWidth={2} />
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default ContactPage

