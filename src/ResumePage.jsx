import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './ResumePage.css'
import CursorEffect from './CursorEffect'
import { ArrowLeft, Download, Loader2 } from 'lucide-react'

const ResumePage = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [pdfError, setPdfError] = useState(false)

  useEffect(() => {
    // Simulate loading time for smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/assets/resume.pdf'
    link.download = 'Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handlePdfLoad = () => {
    setIsLoading(false)
    setPdfError(false)
  }

  const handlePdfError = () => {
    setIsLoading(false)
    setPdfError(true)
  }

  return (
    <>
      <CursorEffect />
      <button
        className="resume-back-button"
        onClick={() => navigate('/')}
        aria-label="Back to main page"
      >
        <ArrowLeft size={20} strokeWidth={2} />
        <span>Back</span>
      </button>

      <div className="resume-page">
        {/* Floating Particles Background */}
        <div className="resume-particles-bg">
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className="resume-particle"
              style={{
                '--delay': `${i * 0.2}s`,
                '--duration': `${15 + (i % 10) * 2}s`,
                '--x': `${(i * 37) % 100}%`,
                '--y': `${(i * 23) % 100}%`
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="resume-container">
          {/* Contextual Section */}
          <div className="resume-context-section">
            <h2 className="resume-context-title">Professional Resume</h2>
            <p className="resume-context-description">
              A comprehensive overview of my engineering, projects, and professional achievements.
            </p>
          </div>

          {/* PDF Viewer Container */}
          <div className="resume-viewer-wrapper">
            {isLoading && (
              <div className="resume-loading">
                <Loader2 className="loading-spinner" size={48} strokeWidth={2} />
                <p>Loading resume...</p>
              </div>
            )}

            {pdfError && (
              <div className="resume-error">
                <p>Unable to load resume PDF.</p>
                <p className="resume-error-hint">
                  Please ensure resume.pdf is located at /public/assets/resume.pdf
                </p>
              </div>
            )}

            <div className={`resume-viewer-glass ${isLoading ? 'loading' : ''} ${pdfError ? 'error' : ''}`}>
              <div className={`resume-viewer ${isLoading ? 'loading' : ''} ${pdfError ? 'error' : ''}`}>
                <iframe
                  src="/assets/resume.pdf#toolbar=1&navpanes=0&scrollbar=1"
                  title="Resume PDF Viewer"
                  className="resume-iframe"
                  onLoad={handlePdfLoad}
                  onError={handlePdfError}
                  style={{ display: pdfError ? 'none' : 'block' }}
                />
              </div>
            </div>
          </div>

          {/* Download Button - Sticky */}
          <div className="resume-download-container">
            <button
              className="resume-download-button"
              onClick={handleDownload}
              aria-label="Download Resume"
            >
              <Download className="download-icon" size={22} strokeWidth={2.5} />
              <span>Download Resume</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResumePage

