import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './LandingPage'
import ContactPage from './ContactPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
