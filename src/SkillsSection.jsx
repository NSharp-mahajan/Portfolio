import React from 'react'
import {
  // Frontend
  SiReact,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  // Backend
  SiNodedotjs,
  SiExpress,
  SiFirebase,
  // Databases
  SiMongodb,
  SiPostgresql,
  // Languages
  SiJavascript,
  SiTypescript,
  SiPython,
  // AI/ML
  SiLangchain,
  SiOpenai,
  // Tools
  SiGit,
  SiGithub,
  SiDocker
} from 'react-icons/si'

const SkillsSection = () => {
  const getTechIcon = (skillName) => {
    const iconMap = {
      // Frontend
      'React': SiReact,
      'HTML': SiHtml5,
      'CSS': SiCss3,
      'Tailwind CSS': SiTailwindcss,
      // Backend
      'Node.js': SiNodedotjs,
      'Express.js': SiExpress,
      'Firebase': SiFirebase,
      // Databases
      'MongoDB': SiMongodb,
      'PostgreSQL': SiPostgresql,
      // Languages
      'JavaScript': SiJavascript,
      'TypeScript': SiTypescript,
      'Python': SiPython,
      // AI/ML
      'LangChain': SiLangchain,
      'RAG': SiOpenai, // Using OpenAI icon as placeholder
      // Tools
      'Git': SiGit,
      'GitHub': SiGithub
    }
    return iconMap[skillName] || SiJavascript
  }

  const skills = [
    // Frontend
    { name: 'React', category: 'Frontend', color: '#61DAFB' },
    { name: 'HTML', category: 'Frontend', color: '#E34C26' },
    { name: 'CSS', category: 'Frontend', color: '#1572B6' },
    { name: 'Tailwind CSS', category: 'Frontend', color: '#06B6D4' },
    
    // Backend
    { name: 'Node.js', category: 'Backend', color: '#339933' },
    { name: 'Express.js', category: 'Backend', color: '#000000' },
    { name: 'Firebase', category: 'Backend', color: '#FFCA28' },
    
    // Databases
    { name: 'MongoDB', category: 'Database', color: '#47A248' },
    { name: 'PostgreSQL', category: 'Database', color: '#336791' },
    
    // Languages
    { name: 'JavaScript', category: 'Language', color: '#F7DF1E' },
    { name: 'TypeScript', category: 'Language', color: '#3178C6' },
    { name: 'Python', category: 'Language', color: '#3776AB' },
    
    // AI / ML
    { name: 'LangChain', category: 'AI/ML', color: '#22C55E' },
    { name: 'RAG', category: 'AI/ML', color: '#434343' },
    
    // Tools
    { name: 'Git', category: 'Tools', color: '#F05032' },
    { name: 'GitHub', category: 'Tools', color: '#181717' }
  ]

  return (
    <section className="skills-section">
      <h2 className="skills-title">Skills & Technologies</h2>
      <div className="skills-grid">
        {skills.map((skill, index) => {
          const IconComponent = getTechIcon(skill.name)
          return (
            <div
              key={index}
              className="skill-card"
              style={{ '--index': index }}
            >
              <div className="skill-icon" style={{ color: skill.color }}>
                <IconComponent />
              </div>
              <div className="skill-info">
                <div className="skill-name">{skill.name}</div>
                <div className="skill-category">{skill.category}</div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default SkillsSection
