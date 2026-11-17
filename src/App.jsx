import React, { useEffect, useState, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { MessageCircle, ArrowUp } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { useStore } from './store/useStore'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BottomNav from './components/BottomNav'

const DashboardLayout = lazy(() => import('./components/DashboardLayout'))
const Overview = lazy(() => import('./pages/Overview'))
const Projects = lazy(() => import('./pages/Projects'))
const Clients = lazy(() => import('./pages/Clients'))
const Financials = lazy(() => import('./pages/Financials'))
const Settings = lazy(() => import('./pages/Settings'))
const Quotations = lazy(() => import('./pages/Quotations'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const CMS = lazy(() => import('./pages/CMS'))

import Home from './pages/public/Home'
import ServicesPage from './pages/public/ServicesPage'
import PortfolioPage from './pages/public/PortfolioPage'
import ContactPage from './pages/public/ContactPage'
import ConsultationPage from './pages/public/ConsultationPage'
import DesignRequestPage from './pages/public/DesignRequestPage'
import QuotationRequestPage from './pages/public/QuotationRequestPage'
import ClientPortalPage from './pages/public/ClientPortalPage'

function App() {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Firebase auth state (null = checking, false = not logged in, object = logged in)
  const [firebaseUser, setFirebaseUser] = useState(undefined)
  const [appLoading, setAppLoading] = useState(true)
  
  const initializeData = useStore(state => state.initializeData)
  const dataLoading = useStore(state => state.loading)

  // Listen to Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user)
      if (user) {
        // User is logged in — load Firestore data
        initializeData()
      } else {
        setAppLoading(false)
      }
    })
    return () => unsubscribe()
  }, [])

  // Once Firebase resolves AND data is loaded, stop loading
  useEffect(() => {
    if (firebaseUser !== undefined && !dataLoading) {
      setAppLoading(false)
    }
    if (firebaseUser === null) {
      setAppLoading(false)
    }
  }, [firebaseUser, dataLoading])

  // Protected Route: requires Firebase auth
  const ProtectedRoute = ({ children }) => {
    if (firebaseUser === undefined) return null // still checking
    if (!firebaseUser) return <Navigate to="/login" replace />
    return children
  }

  // Public route: redirect logged-in users away from /login
  const PublicRoute = ({ children }) => {
    if (firebaseUser) return <Navigate to="/dashboard" replace />
    return children
  }

  // Global loading screen
  if (appLoading) {
    return (
      <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center gap-6" dir="rtl">
        <div className="w-16 h-16 bg-accent-gold flex items-center justify-center rounded-2xl shadow-[0_0_30px_rgba(212,175,55,0.4)]">
          <span className="text-bg-primary font-black text-2xl">M</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-accent-gold animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2.5 h-2.5 rounded-full bg-accent-gold animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2.5 h-2.5 rounded-full bg-accent-gold animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
        <p className="text-text-secondary font-bold text-sm tracking-widest uppercase">مزار · جاري التحميل</p>
      </div>
    )
  }

  // Public page layout wrapper
  const PublicLayout = ({ children }) => (
    <>
      <Navbar />
      {children}
      <Footer />
      <BottomNav />
      <a href="https://wa.me/201234567890" target="_blank" rel="noreferrer" className="whatsapp-float" aria-label="تواصل عبر واتساب">
        <MessageCircle size={26} />
      </a>
      {showBackToTop && (
        <button onClick={scrollToTop} className="back-to-top" aria-label="العودة للأعلى">
          <ArrowUp size={20} />
        </button>
      )}
    </>
  )

  return (
    <Router>
      <div className="app-container">
        <Toaster position="top-center" reverseOrder={false} toastOptions={{ duration: 3000 }} />
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/services" element={<PublicLayout><ServicesPage /></PublicLayout>} />
          <Route path="/portfolio" element={<PublicLayout><PortfolioPage /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
          <Route path="/consultation" element={<PublicLayout><ConsultationPage /></PublicLayout>} />
          <Route path="/request-design" element={<PublicLayout><DesignRequestPage /></PublicLayout>} />
          <Route path="/quotation" element={<PublicLayout><QuotationRequestPage /></PublicLayout>} />
          <Route path="/client-portal" element={<PublicLayout><ClientPortalPage /></PublicLayout>} />

          {/* Auth */}
          <Route path="/login" element={
            <PublicRoute>
              <Suspense fallback={<div className="min-h-screen bg-bg-primary flex items-center justify-center"><div className="w-8 h-8 border-2 border-accent-gold border-t-transparent rounded-full animate-spin" /></div>}>
                <Login />
              </Suspense>
            </PublicRoute>
          } />

          <Route path="/register" element={
            <PublicRoute>
              <Suspense fallback={<div className="min-h-screen bg-bg-primary flex items-center justify-center"><div className="w-8 h-8 border-2 border-accent-gold border-t-transparent rounded-full animate-spin" /></div>}>
                <Register />
              </Suspense>
            </PublicRoute>
          } />

          {/* Dashboard — Protected */}
          <Route path="/dashboard/*" element={
            <ProtectedRoute>
              <Suspense fallback={
                <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center gap-6" dir="rtl">
                  <div className="w-16 h-16 bg-accent-gold flex items-center justify-center rounded-2xl shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                    <span className="text-bg-primary font-black text-2xl">M</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-accent-gold animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2.5 h-2.5 rounded-full bg-accent-gold animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2.5 h-2.5 rounded-full bg-accent-gold animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <p className="text-text-secondary font-bold text-sm tracking-widest uppercase">جاري تحميل مساحة العمل...</p>
                </div>
              }>
                <DashboardLayout>
                <Routes>
                  <Route path="/"            element={<Overview />} />
                  <Route path="/projects"    element={<Projects />} />
                  <Route path="/clients"     element={<Clients />} />
                  <Route path="/quotations"  element={<Quotations />} />
                  <Route path="/finance"     element={<Financials />} />
                  <Route path="/settings"    element={<Settings />} />
                  <Route path="/cms"         element={<CMS />} />
                </Routes>
              </DashboardLayout>
              </Suspense>
            </ProtectedRoute>
          } />

          {/* 404 Catch All */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
