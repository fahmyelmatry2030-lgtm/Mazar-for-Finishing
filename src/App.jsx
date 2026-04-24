import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { MessageCircle, ArrowUp } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import { useStore } from './store/useStore'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import DashboardLayout from './components/DashboardLayout'
import Overview from './pages/Overview'
import Projects from './pages/Projects'
import Clients from './pages/Clients'
import Financials from './pages/Financials'
import Settings from './pages/Settings'
import Quotations from './pages/Quotations'
import Login from './pages/Login'
import CMS from './pages/CMS'

import Home from './pages/public/Home'
import ServicesPage from './pages/public/ServicesPage'
import PortfolioPage from './pages/public/PortfolioPage'
import ContactPage from './pages/public/ContactPage'

function App() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const isAuthenticated = useStore(state => state.isAuthenticated)

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />
    }
    return children
  }

  return (
    <Router>
      <div className="app-container">
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <Home />
              <Footer />
              
              {/* Floating Elements */}
              <a 
                href="https://wa.me/201234567890" 
                target="_blank" 
                rel="noreferrer" 
                className="whatsapp-float"
              >
                <MessageCircle size={32} />
              </a>
              <button onClick={scrollToTop} className="back-to-top">
                <ArrowUp size={24} />
              </button>
            </>
          } />
          
          <Route path="/services" element={<><Navbar /><ServicesPage /><Footer /></>} />
          <Route path="/portfolio" element={<><Navbar /><PortfolioPage /><Footer /></>} />
          <Route path="/contact" element={<><Navbar /><ContactPage /><Footer /></>} />
          
          <Route path="/login" element={<Login />} />

          <Route path="/dashboard/*" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/quotations" element={<Quotations />} />
                <Route path="/finance" element={<Financials />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/cms" element={<CMS />} />
              </Routes>
              </DashboardLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
