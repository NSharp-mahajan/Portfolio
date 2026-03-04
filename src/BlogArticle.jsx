import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './BlogArticle.css'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'

const BlogArticle = () => {
  const navigate = useNavigate()
  const { slug } = useParams()

  // Blog articles data
  const blogArticles = {
    cybercop: {
      title: "Building CyberCop: Turning a Personal Scam Experience into a Cybersecurity Platform",
      date: "March 2025",
      readTime: "8 min read",
      image: "/assets/blog1.png",
      content: {
        introduction: `Cybercrime has evolved rapidly over the past few years. From phishing messages to fake payment requests, digital fraud has become more sophisticated and harder to detect for the average user.

Ironically, the idea for CyberCop began when I personally became a victim of a small scam while working on a freelancing project.

One day, I received a message claiming that I had been selected for a project. The person asked me to scan a QR code to receive an advance payment. Instead of receiving money, ₹2000 was instantly deducted from my Google Pay account.

What shocked me more than the scam itself was how difficult it was to report and respond to it effectively.

Some platforms only provided awareness articles. Some government portals required long processes. Others didn't provide real-time help or analysis tools.

That experience made me realize something important:

People don't just need awareness.  
They need actionable tools.

And that is how the idea for CyberCop was born.`,
        
        problem: `Most existing cybersecurity awareness platforms focus only on education. While awareness is important, victims often need immediate assistance when they encounter suspicious messages, URLs, or calls.

Some major gaps I noticed:

• Lack of real-time scam analysis tools  
• No easy way to verify suspicious links or messages  
• Complex reporting processes  
• Limited educational resources for non-technical users  

I wanted to build something that combined:

Awareness + Detection + Action`,
        
        vision: `CyberCop was designed to be more than just a website.

The goal was to create a platform where users could:

• Analyze suspicious messages and links  
• Detect potential phishing attempts  
• Learn about common scam techniques  
• Report scams easily  
• Access cybersecurity awareness resources  
• Use AI-powered tools to evaluate digital threats

Instead of just telling users about cybercrime, CyberCop empowers them to actively defend themselves.`,
        
        features: `Some of the major tools implemented in the platform include:

Fraud Message Analyzer  
Users can paste suspicious messages and the system evaluates whether they resemble known scam patterns.

URL Scanner  
Analyzes links and detects potential phishing or malicious websites.

Document Fraud Scanner  
Allows users to upload suspicious documents for analysis.

Voice Scam Analyzer  
Helps detect suspicious patterns in recorded calls.

Scam Reporting System  
Users can submit scam reports to help build community awareness.

Security Awareness Library  
Educational content explaining common cyber threats and prevention strategies.`,
        
        challenges: `Building CyberCop was not straightforward. Several challenges had to be addressed during development.

API Selection  
Choosing reliable APIs for threat detection and analysis required careful evaluation. The system needed tools capable of analyzing URLs, messages, and patterns without exposing sensitive data.

User Trust  
Cybersecurity platforms must earn user trust. This meant designing the platform with transparency and clear communication about how user data is handled.

Privacy Protection  
Some features required analyzing user-provided content such as messages or URLs. To maintain privacy and safety:

• No sensitive user data is stored permanently  
• Input data is processed temporarily for analysis  
• The platform avoids collecting unnecessary personal information  
• Security-focused APIs are used for threat analysis

Balancing Functionality and Safety  
Certain cybersecurity tools can be risky if misused. The system had to ensure that features were designed for awareness and protection rather than exploitation.`,
        
        learned: `Working on CyberCop helped me develop practical skills across multiple areas including:

• AI-assisted threat analysis  
• Cybersecurity awareness systems  
• Backend architecture design  
• Building privacy-conscious tools  
• Designing real-world problem-solving applications

More importantly, it reinforced an important lesson:

The best projects often come from real problems.`,
        
        conclusion: `Cybercrime will continue evolving, and awareness alone is not enough. People need tools that help them detect threats and respond quickly.

CyberCop was my attempt to bridge that gap.

What started as a frustrating personal experience turned into a platform aimed at helping people navigate the digital world more safely.

And this journey showed me how technology can be used not just to build products, but to solve real-world problems.`
      }
    },
    'hackathon-hidden-challenges': {
      title: "From Idea to Real Product: The Hidden Challenges No One Talks About in Hackathons",
      date: "March 2025",
      readTime: "7 min read",
      image: "/assets/blog3.png",
      content: {
        introduction: `Hackathons are exciting environments where students turn ideas into working prototypes within a very short time. They encourage creativity, teamwork, and fast problem solving. While many people see the final demo or winning projects, very few talk about the real challenges teams face while building something from scratch under strict time pressure.`,
        
        problem: `What Is Happening During Hackathons
In the beginning, every team starts with a strong idea and a clear vision. But as development begins, unexpected problems appear—APIs may not work as expected, integrations fail, bugs appear at the worst moments, and time runs out quickly. Teams often realize that building even a small feature can take much longer than planned.`,
        
        vision: `The Real Challenges
Hackathons test much more than coding ability. They challenge teams to divide responsibilities, make quick technical decisions, and adapt when something breaks. Sometimes the biggest challenge is not writing code, but deciding what to build and what to drop within limited time.`,
        
        features: `The Solution and Learning
The most successful teams focus on building a working core product instead of trying to build everything. Prioritizing key features, using the right tools, and collaborating efficiently often matters more than writing perfect code. Hackathons teach students how real-world development works—fast, unpredictable, and full of problem solving.`,
        
        challenges: `The pressure of time constraints reveals hidden gaps in planning and execution that teams don't face in regular development cycles.`,
        
        learned: `Hackathons teach valuable lessons about rapid prototyping, team coordination under pressure, and making tough decisions with incomplete information.`,
        
        conclusion: `Hackathons are more than competitions; they are intense learning experiences. They reveal the gap between ideas and execution while teaching valuable lessons about teamwork, adaptability, and product thinking. For many students, these challenges become the first step toward building real products in the future.`
      }
    }
  }

  const article = blogArticles[slug]

  useEffect(() => {
    // Fade-in animation when article loads
    const timer = setTimeout(() => {
      document.querySelector('.article-container')?.classList.add('fade-in')
    }, 100)
    return () => clearTimeout(timer)
  }, [slug])

  if (!article) {
    return (
      <div className="article-not-found">
        <h1>Article not found</h1>
        <button onClick={() => navigate('/blogs')}>Back to Blogs</button>
      </div>
    )
  }

  return (
    <>
      <button
        className="back-button"
        onClick={() => navigate('/blogs')}
        aria-label="Back to blogs"
      >
        <ArrowLeft size={20} strokeWidth={2} />
        <span>Back</span>
      </button>

      <div className="article-page">
        {/* HERO SECTION */}
        <section className="article-hero">
          <div
            className="article-hero-image"
            style={{
              backgroundImage: `url(${article.image})`
            }}
          />
          <div className="article-hero-overlay" />
          <div className="article-hero-content">
            <h1 className="article-title">{article.title}</h1>
            <div className="article-meta">
              <div className="meta-item">
                <Calendar size={16} strokeWidth={2} />
                <span>{article.date}</span>
              </div>
              <div className="meta-item">
                <Clock size={16} strokeWidth={2} />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ARTICLE CONTENT */}
        <section className="article-container">
          <div className="article-content">
            <div className="article-section">
              <h2 className="section-heading">Introduction</h2>
              <div className="section-content">
                {article.content.introduction.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="article-section">
              <h2 className="section-heading">The Problem</h2>
              <div className="section-content">
                {article.content.problem.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="article-section">
              <h2 className="section-heading">The Vision Behind CyberCop</h2>
              <div className="section-content">
                {article.content.vision.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="article-section">
              <h2 className="section-heading">Key Features of CyberCop</h2>
              <div className="section-content">
                {article.content.features.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="article-section">
              <h2 className="section-heading">Technical Challenges During Development</h2>
              <div className="section-content">
                {article.content.challenges.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="article-section">
              <h2 className="section-heading">What I Learned From Building CyberCop</h2>
              <div className="section-content">
                {article.content.learned.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="article-section">
              <h2 className="section-heading">Conclusion</h2>
              <div className="section-content">
                {article.content.conclusion.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default BlogArticle
