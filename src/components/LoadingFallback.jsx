import React from 'react'
import { useLoading } from '../contexts/LoadingContext'
import ProfessionalLoader from './ProfessionalLoader'

const LoadingFallback = () => {
  const { showLoader, hideLoader } = useLoading()
  
  React.useEffect(() => {
    showLoader()
    return () => hideLoader()
  }, [showLoader, hideLoader])

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: '#0a0a0a',
      color: '#ffffff'
    }}>
      <div>Loading...</div>
    </div>
  )
}

export default LoadingFallback
