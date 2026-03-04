import React, { useState, useEffect } from 'react'
import { GitCommit, Star, GitBranch, Users, Package, Clock, User, GitPullRequest } from 'lucide-react'

const GithubMetricsSection = () => {
  const [metrics, setMetrics] = useState({
    totalContributions: null,
    publicRepos: null,
    totalStars: null,
    topLanguages: null,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Use environment variables
        const username = import.meta.env.VITE_GITHUB_USERNAME || 'NSharp-mahajan'
        const token = import.meta.env.VITE_GITHUB_TOKEN
        
        // Set up headers with authentication token
        const headers = {
          'Accept': 'application/vnd.github.v3+json',
          'X-GitHub-Api-Version': '2022-11-28'
        }
        
        if (token) {
          headers['Authorization'] = `token ${token}`
        }
        
        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${username}`, { headers })
        if (!userResponse.ok) throw new Error('Failed to fetch user data')
        const userData = await userResponse.json()
        
        // Fetch repositories data
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, { headers })
        if (!reposResponse.ok) throw new Error('Failed to fetch repositories')
        const reposData = await reposResponse.json()
        
        // Calculate metrics
        const totalStars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0)
        
        // Calculate programming languages (excluding HTML)
        const languageMap = new Map()
        reposData.forEach(repo => {
          if (repo.language && repo.language !== 'HTML' && repo.language !== 'html') {
            languageMap.set(repo.language, (languageMap.get(repo.language) || 0) + 1)
          }
        })
        
        // Get top 5 languages
        const topLanguages = Array.from(languageMap.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([lang, count]) => ({
            language: lang,
            count: count,
            percentage: ((count / reposData.length) * 100).toFixed(1)
          }))
        
        // Fetch contribution count using GraphQL API for accuracy
        const contributionQuery = `
          query {
            user(login: "${username}") {
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                }
              }
            }
          }
        `
        
        const contributionResponse = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            'Authorization': `bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query: contributionQuery })
        })
        
        let totalContributions = 0
        if (contributionResponse.ok) {
          const contributionData = await contributionResponse.json()
          totalContributions = contributionData.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions || 0
        }
        
        // Fetch pull requests using search API (more reliable)
       
        
        setMetrics({
          totalContributions,
          publicRepos: userData.public_repos,
          totalStars,
          topLanguages,
        })
        
      } catch (err) {
        console.error('Error fetching GitHub data:', err)
        setError('Unable to fetch GitHub data')
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [])

  const metricCards = [
    {
      id: 'contributions',
      value: metrics.totalContributions,
      label: 'Total Contributions',
      icon: GitCommit,
      helper: 'Live from GitHub'
    },
    {
      id: 'repos',
      value: metrics.publicRepos,
      label: 'Public Repositories',
      icon: Package,
      helper: 'Live from GitHub'
    },
    {
      id: 'stars',
      value: metrics.totalStars,
      label: 'Total Stars',
      icon: Star,
      helper: 'Across all repos'
    },
    {
      id: 'top-language',
      value: metrics.topLanguages?.[0]?.language || 'N/A',
      label: 'Top Language',
      icon: GitBranch,
      helper: 'Most used language'
    },
  ]

  const achievements = [
    {
      id: 'hackathons',
      value: '15+',
      label: 'Hackathons Participated',
      icon: '🚀'
    },
    {
      id: 'winner',
      value: '2X',
      label: 'Hackathon Winner',
      icon: '🏆'
    },
    {
      id: 'tech-head',
      value: 'Lead',
      label: 'Technical Head - Design Thinking Society',
      icon: '👨‍💼'
    }
  ]

  if (loading) {
    return (
      <section className="github-metrics-section">
        <div className="metrics-header">
          <h2 className="metrics-title">Contributions & Achievements</h2>
          <p className="metrics-subtitle">Loading GitHub data...</p>
        </div>
        <div className="metrics-container">
          <div className="metrics-section">
            <h3 className="section-subtitle skeleton-shimmer">Detailed Metrics</h3>
            <div className="metrics-grid">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="metric-card skeleton">
                  <div className="metric-icon skeleton-shimmer"></div>
                  <div className="metric-content">
                    <div className="metric-value skeleton-shimmer"></div>
                    <div className="metric-label skeleton-shimmer"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="metrics-section">
            <h3 className="section-subtitle skeleton-shimmer">Programming Languages</h3>
            <div className="languages-grid">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="language-card skeleton">
                  <div className="skeleton-shimmer"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="github-metrics-section">
        <div className="metrics-header">
          <h2 className="metrics-title">Contributions & Achievements</h2>
          <p className="metrics-subtitle">Unable to load live data</p>
        </div>
        <div className="error-message">
          {error}
        </div>
      </section>
    )
  }

  return (
    <section className="github-metrics-section">
      <div className="metrics-header">
        <h2 className="metrics-title">Contributions & Achievements</h2>
        <p className="metrics-subtitle">
          Real-time metrics fetched from GitHub API
        </p>
      </div>
      
      <div className="metrics-container">
        <div className="metrics-section">
          <h3 className="section-subtitle">Detailed Metrics</h3>
          <div className="metrics-grid">
            {metricCards.map((card) => {
              const IconComponent = card.icon
              return (
                <div key={card.id} className="metric-card">
                  <div className="metric-icon">
                    <IconComponent size={20} strokeWidth={1.5} />
                  </div>
                  <div className="metric-content">
                    <div className="metric-value">
                      {card.value !== null ? card.value.toLocaleString() : 'N/A'}
                    </div>
                    <div className="metric-label">{card.label}</div>
                    <div className="metric-helper">{card.helper}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="languages-section">
          <h3 className="section-subtitle">Programming Languages</h3>
          <div className="languages-grid">
            {metrics.topLanguages?.map((lang, index) => (
              <div key={index} className="language-card">
                <div className="language-info">
                  <div className="language-name">{lang.language}</div>
                  <div className="language-stats">
                    <div className="language-count">{lang.count} repos</div>
                    <div className="language-percentage">{lang.percentage}%</div>
                  </div>
                </div>
                <div className="language-bar">
                  <div 
                    className="language-fill" 
                    style={{ width: `${lang.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="achievements-section">
          <h3 className="section-subtitle">Achievements</h3>
          <div className="achievements-grid">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="achievement-card">
                <div className="achievement-icon">
                  {achievement.icon}
                </div>
                <div className="achievement-content">
                  <div className="achievement-value">{achievement.value}</div>
                  <div className="achievement-label">{achievement.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default GithubMetricsSection
