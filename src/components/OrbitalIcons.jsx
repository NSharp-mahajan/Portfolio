import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './OrbitalIcons.css'
import {
  User,
  Briefcase,
  FileText,
  BookOpen,
  Mail,
  Trophy
} from 'lucide-react'

const OrbitalIcons = () => {
  const navigate = useNavigate()
  const [hoveredIcon, setHoveredIcon] = useState(null)

  // Define 6 icons with proper SVG icons and navigation
  const icons = [
    { id: 'about', name: 'About Us', Icon: User, route: '/about' },
    { id: 'projects', name: 'Projects', Icon: Briefcase, route: '/projects' },
    { id: 'resume', name: 'Resume', Icon: FileText, route: '/resume' },
    { id: 'blogs', name: 'Blogs', Icon: BookOpen, route: '/blogs' },
    { id: 'contact', name: 'Contact Me', Icon: Mail, route: '/contact' },
    { id: 'achievements', name: 'Achievements', Icon: Trophy, route: '/achievements' }
  ]

  const handleIconClick = (route) => {
    console.log('Icon clicked, navigating to:', route)
    // Navigate directly to route
    navigate(route)
  }

  const handleMouseEnter = (iconId) => {
    console.log('Mouse entered icon:', iconId)
    setHoveredIcon(iconId)
  }

  const handleMouseLeave = () => {
    console.log('Mouse left icon')
    setHoveredIcon(null)
  }

  return (
    <div className="orbital-container">
      {/* Central Word */}
      <div className="central-word">
        <span className="word-part">THE</span>
        <span className="word-part visionary">Digital</span>
        <span className="word-part">Visionary</span>
      </div>

      {/* Orbital Icons */}
      <div className="orbital-ring rotating">
        {icons.map((icon, index) => {
          const angle = (index * 360) / icons.length
          const IconComponent = icon.Icon
          return (
            <div
              key={icon.id}
              className={`orbital-icon ${hoveredIcon === icon.id ? 'hovered' : ''}`}
              style={{
                '--angle': `${angle}deg`,
                '--index': index
              }}
              onClick={() => handleIconClick(icon.route)}
              onMouseEnter={() => handleMouseEnter(icon.id)}
              onMouseLeave={handleMouseLeave}
              role="button"
              tabIndex={0}
              aria-label={icon.name}
            >
              <div className="icon-glow">
                <IconComponent
                  className="icon-graphic"
                  strokeWidth={2}
                  size={24}
                />
                {hoveredIcon === icon.id && (
                  <div className="icon-label">{icon.name}</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default OrbitalIcons
