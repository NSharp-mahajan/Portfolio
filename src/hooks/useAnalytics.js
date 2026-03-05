import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ANALYTICS_CONFIG, isAnalyticsEnabled } from '../config/analytics'

// Custom hook for Google Analytics tracking
export const useAnalytics = () => {
  const location = useLocation()

  useEffect(() => {
    // Only track in production
    if (!isAnalyticsEnabled()) return

    // Wait for gtag to be available
    const trackPageView = () => {
      if (window.gtag) {
        window.gtag('config', ANALYTICS_CONFIG.MEASUREMENT_ID, {
          page_title: document.title,
          page_location: window.location.href,
          send_page_view: true
        })
      }
    }

    // Track immediately if gtag is available
    if (window.gtag) {
      trackPageView()
    } else {
      // Wait for gtag to load (max 3 seconds)
      let attempts = 0
      const maxAttempts = 30
      const checkInterval = setInterval(() => {
        attempts++
        if (window.gtag || attempts >= maxAttempts) {
          clearInterval(checkInterval)
          if (window.gtag) {
            trackPageView()
          }
        }
      }, 100)
    }
  }, [location.pathname, location.search])

  // Custom event tracking function
  const trackEvent = (eventName, parameters = {}) => {
    if (!isAnalyticsEnabled()) return
    
    if (window.gtag) {
      window.gtag('event', eventName, {
        ...parameters,
        page_location: window.location.href,
        page_title: document.title
      })
    }
  }

  // Track specific event types
  const trackNavigation = (pageName) => {
    trackEvent('page_view', {
      event_category: ANALYTICS_CONFIG.EVENT_CATEGORIES.NAVIGATION,
      event_label: pageName
    })
  }

  const trackUserEngagement = (action, label) => {
    trackEvent(action, {
      event_category: ANALYTICS_CONFIG.EVENT_CATEGORIES.USER_ENGAGEMENT,
      event_label: label
    })
  }

  const trackProjectInteraction = (projectName, action) => {
    trackEvent(action, {
      event_category: ANALYTICS_CONFIG.EVENT_CATEGORIES.PROJECT_INTERACTION,
      event_label: projectName
    })
  }

  const trackSocialLink = (platform) => {
    trackEvent('social_click', {
      event_category: ANALYTICS_CONFIG.EVENT_CATEGORIES.SOCIAL_LINKS,
      event_label: platform
    })
  }

  const trackContactForm = (action) => {
    trackEvent(action, {
      event_category: ANALYTICS_CONFIG.EVENT_CATEGORIES.CONTACT_FORM,
      event_label: 'contact_form'
    })
  }

  return { 
    trackEvent, 
    trackNavigation, 
    trackUserEngagement, 
    trackProjectInteraction, 
    trackSocialLink, 
    trackContactForm 
  }
}

export default useAnalytics
