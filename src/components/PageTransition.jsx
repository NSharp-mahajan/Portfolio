import React from 'react'
import { useLoading } from '../contexts/LoadingContext'
import ProfessionalLoader from './ProfessionalLoader'

const PageTransition = ({ children }) => {
  const { isLoading } = useLoading()

  return (
    <>
      {isLoading && <ProfessionalLoader />}
      <div style={{ 
        opacity: isLoading ? 0.3 : 1,
        transition: 'opacity 0.3s ease-in-out',
        pointerEvents: isLoading ? 'none' : 'auto'
      }}>
        {children}
      </div>
    </>
  )
}

export default PageTransition
