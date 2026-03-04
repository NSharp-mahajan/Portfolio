import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './TechBlogs.css'
import CursorEffect from './CursorEffect'
import { ArrowLeft, BookOpen } from 'lucide-react'
import BlogCard from './components/BlogCard'

// Replace this with the Tech Blogs background image
// import blogsBackground from './assets/images/blogs-bg.jpg'

const TechBlogs = () => {
  const navigate = useNavigate()

  // Blog data with preview and content separation
  const blogs = [
    {
      id: 1,
      slug: 'cybercop',
      title: "Building CyberCop: Turning a Personal Scam Experience into a Cybersecurity Platform",
      date: "March 2025",
      readTime: "8 min read",
      image: "/assets/blog1.png", // Replace with CyberCop project blog image
      tags: ["Cybersecurity", "AI", "Web Development", "Fraud Detection"],
      preview: "Cyber fraud is increasing every day, yet most platforms only spread awareness without actually helping victims take action. In this article, I share how a personal scam experience led me to build CyberCop — an AI-powered cybersecurity platform designed to detect scams, educate users, and help them respond quickly to digital fraud.",
      content: "Full article content would go here..."
    },
    {
      id: 2,
      slug: 'rise-of-ai-jobs',
      title: "The Rise of AI: Jobs Lost or Jobs Transformed?",
      date: "March 2025",
      readTime: "6 min read",
      image: "/assets/blog2.png", // Replace with AI blog image
      tags: ["AI", "Future", "Technology", "Careers"],
      preview: "Artificial Intelligence is becoming one of the most talked-about technologies in today's world. From smart assistants to AI tools that write code or analyze data, technology is evolving rapidly. Because of this, many people—especially students entering the job market—are wondering whether AI will replace jobs or create new opportunities.",
      content: `Artificial Intelligence is becoming one of the most talked-about technologies in today's world. From smart assistants to AI tools that write code or analyze data, technology is evolving rapidly. Because of this, many people—especially students entering the job market—are wondering whether AI will replace jobs or create new opportunities.

What Is Happening Currently
Many companies are now using AI to automate repetitive work like data entry, customer support responses, basic analysis, and content generation. This has created fear that machines might replace human workers. At the same time, companies are also actively hiring people who know how to work with AI tools, not against them.

The Real Difference Between People
The real difference is not AI vs humans—it is adaptable people vs non-adaptable people. Students and professionals who continuously learn new technologies, experiment with AI tools, and build practical skills are becoming more valuable. Those who rely only on traditional methods may find it harder to stay competitive.

The Solution for New Generation
Instead of fearing AI, the smarter approach is to learn how to use it effectively. Students should focus on problem solving, creativity, and understanding how AI can improve productivity. Combining domain knowledge with AI tools can make someone far more efficient than either humans or AI alone.

Conclusion
AI is not simply taking jobs—it is changing the nature of work. The future will favor people who adapt, learn continuously, and use technology to amplify their abilities. For students and professionals alike, the goal should not be to compete with AI, but to grow alongside it.`
    },
    {
      id: 3,
      slug: 'hackathon-hidden-challenges',
      title: "From Idea to Real Product: The Hidden Challenges No One Talks About in Hackathons",
      date: "March 2025",
      readTime: "7 min read",
      image: "/assets/blog3.png", // Replace with hackathon blog image
      tags: ["Hackathons", "Development", "Teamwork", "Problem Solving"],
      preview: "Hackathons are exciting environments where students turn ideas into working prototypes within a very short time. They encourage creativity, teamwork, and fast problem solving. While many people see the final demo or winning projects, very few talk about the real challenges teams face while building something from scratch under strict time pressure.",
      content: `From Idea to Real Product: The Hidden Challenges No One Talks About in Hackathons

Introduction
Hackathons are exciting environments where students turn ideas into working prototypes within a very short time. They encourage creativity, teamwork, and fast problem solving. While many people see the final demo or winning projects, very few talk about the real challenges teams face while building something from scratch under strict time pressure.

What Is Happening During Hackathons
In the beginning, every team starts with a strong idea and a clear vision. But as development begins, unexpected problems appear—APIs may not work as expected, integrations fail, bugs appear at the worst moments, and time runs out quickly. Teams often realize that building even a small feature can take much longer than planned.

The Real Challenges
Hackathons test much more than coding ability. They challenge teams to divide responsibilities, make quick technical decisions, and adapt when something breaks. Sometimes the biggest challenge is not writing code, but deciding what to build and what to drop within limited time.

The Solution and Learning
The most successful teams focus on building a working core product instead of trying to build everything. Prioritizing key features, using the right tools, and collaborating efficiently often matters more than writing perfect code. Hackathons teach students how real-world development works—fast, unpredictable, and full of problem solving.

Conclusion
Hackathons are more than competitions; they are intense learning experiences. They reveal the gap between ideas and execution while teaching valuable lessons about teamwork, adaptability, and product thinking. For many students, these challenges become the first step toward building real products in the future.`
    }
  ]

  const handleReadMore = (slug) => {
    navigate(`/blogs/${slug}`)
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

      <div className="tech-blogs-page">
        {/* Floating Particles Background */}
        <div className="particles-bg">
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                '--delay': `${i * 0.3}s`,
                '--duration': `${15 + (i % 8) * 2}s`,
                '--x': `${(i * 37) % 100}%`,
                '--y': `${(i * 23) % 100}%`
              }}
            />
          ))}
        </div>

        {/* HERO SECTION */}
        <section
          className="blogs-hero"
          style={{
            backgroundImage: `url('/src/assets/images/blogs-bg.jpg')`
          }}
        >
          <div className="hero-content-wrapper">
            <div className="author-header">
              <div className="author-avatar">
                <img src="/src/assets/images/image5.jpg" alt="Natansh Mahajan" />
              </div>
              <h1 className="hero-title">
                <span className="title-line">Natansh</span>
                <span className="title-line">Mahajan</span>
              </h1>
            </div>

            <p className="hero-subtitle">
              A collection of my learnings, technical breakdowns, and experiences 
              while building real-world software.
            </p>
          </div>
        </section>

        {/* MAIN BLOG CONTAINER */}
        <section className="blogs-container">
          <div className="blogs-header">
            <BookOpen className="header-icon" size={32} strokeWidth={2} />
          </div>

          {/* BLOG GRID */}
          <div className="blogs-grid">
            {blogs.map((blog, index) => (
              <BlogCard 
                key={blog.id} 
                blog={blog}
                onReadMore={handleReadMore}
                style={{ '--index': index }}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

export default TechBlogs
