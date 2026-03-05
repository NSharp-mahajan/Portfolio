// Google Analytics Configuration
export const ANALYTICS_CONFIG = {
  // Google Analytics Measurement ID - Use environment variable for security
  MEASUREMENT_ID: import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-8YCFHMGTQ8',
  
  // Production domains
  PRODUCTION_DOMAINS: [
    'natanshmahajan.in',
    'www.natanshmahajan.in'
  ],
  
  // Analytics settings
  SETTINGS: {
    send_page_view: true,
    page_title: document.title,
    page_location: window.location.href
  },
  
  // Custom event categories
  EVENT_CATEGORIES: {
    NAVIGATION: 'navigation',
    USER_ENGAGEMENT: 'user_engagement',
    PROJECT_INTERACTION: 'project_interaction',
    SOCIAL_LINKS: 'social_links',
    CONTACT_FORM: 'contact_form',
    DOWNLOAD: 'download'
  },
  
  // Custom event actions
  EVENT_ACTIONS: {
    CLICK: 'click',
    VIEW: 'view',
    SUBMIT: 'submit',
    DOWNLOAD: 'download',
    SHARE: 'share',
    COPY: 'copy'
  }
}

// Check if analytics should be enabled
export const isAnalyticsEnabled = () => {
  return ANALYTICS_CONFIG.PRODUCTION_DOMAINS.includes(window.location.hostname)
}

// Initialize Google Analytics
export const initializeAnalytics = () => {
  if (!isAnalyticsEnabled()) return
  
  // Load gtag script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.MEASUREMENT_ID}`
  document.head.appendChild(script)
  
  script.onload = () => {
    window.dataLayer = window.dataLayer || []
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag
    
    // Initialize tracking
    gtag('js', new Date())
    gtag('config', ANALYTICS_CONFIG.MEASUREMENT_ID, ANALYTICS_CONFIG.SETTINGS)
  }
}

export default ANALYTICS_CONFIG
