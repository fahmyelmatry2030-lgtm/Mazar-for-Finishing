import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone, MessageCircle, ArrowLeft, UserCheck, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close drawer on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  const navLinks = [
    { title: 'الرئيسية', to: '/' },
    { title: 'سابقة الأعمال', to: '/portfolio' },
    { title: 'حجز استشارة', to: '/consultation' },
    { title: 'طلب تصميم', to: '/request-design' },
    { title: 'مقايسة تشطيب', to: '/quotation' },
    { title: 'متابعة مشروعي', to: '/client-portal', highlight: true },
  ]

  return (
    <>
      <nav 
        className={`fixed top-0 right-0 w-full z-[100] transition-all duration-500 ${
          isScrolled 
            ? 'glass-panel py-3.5 shadow-lg border-b border-white/10' 
            : 'bg-gradient-to-b from-black/85 via-black/45 to-transparent py-4 sm:py-6'
        }`}
      >
        <div className="container flex justify-between items-center">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-accent-gold flex items-center justify-center rounded-lg shadow-[0_0_20px_rgba(212,175,55,0.35)] group-hover:scale-105 transition-transform duration-300">
              <span className="text-bg-primary font-black text-xl">M</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white leading-none" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                مزار
              </span>
              <span className="text-[10px] sm:text-xs text-accent-gold font-bold tracking-widest uppercase">
                للتشطيبات الفاخرة
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map(link => {
              const isActive = location.pathname === link.to
              if (link.highlight) {
                return (
                  <Link 
                    key={link.title} 
                    to={link.to} 
                    className={`text-xs font-bold px-3.5 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${
                      isActive 
                        ? 'border-accent-gold bg-accent-gold text-bg-primary shadow-gold' 
                        : 'border-accent-gold/40 bg-accent-gold/10 text-accent-gold hover:bg-accent-gold hover:text-bg-primary'
                    }`}
                  >
                    <UserCheck size={14} />
                    <span>{link.title}</span>
                  </Link>
                )
              }
              return (
                <Link 
                  key={link.title} 
                  to={link.to} 
                  className={`text-xs xl:text-sm font-bold transition-all relative py-1 ${
                    isActive 
                      ? 'text-accent-gold' 
                      : 'text-text-secondary hover:text-white'
                  }`}
                >
                  {link.title}
                  {isActive && (
                    <motion.span 
                      layoutId="activeNavIndicator" 
                      className="absolute bottom-0 right-0 left-0 h-[2px] bg-accent-gold rounded-full" 
                    />
                  )}
                </Link>
              )
            })}
            
            <div className="w-[1px] h-5 bg-white/15" />

            <a 
              href="tel:201225433070" 
              className="btn-premium py-2 px-4 text-xs font-bold flex items-center gap-1.5 rounded-xl"
            >
              <Phone size={14} />
              <span dir="ltr">01234567890</span>
            </a>
          </div>

          {/* Mobile Right Controls: Client Portal Shortcut + Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <Link 
              to="/client-portal"
              className="px-2.5 py-1.5 rounded-lg bg-accent-gold/15 border border-accent-gold/30 text-accent-gold text-xs font-bold flex items-center gap-1"
            >
              <UserCheck size={14} />
              <span>مشروعي</span>
            </Link>

            <button 
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-white hover:text-accent-gold transition-colors" 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="القائمة"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar & Backdrop Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Dimmer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[1000] lg:hidden"
            />

            {/* Sliding Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-bg-secondary border-l border-white/10 z-[1001] p-6 flex flex-col justify-between shadow-2xl lg:hidden overflow-y-auto"
            >
              {/* Header inside Drawer */}
              <div>
                <div className="flex justify-between items-center pb-5 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent-gold flex items-center justify-center rounded-lg">
                      <span className="text-bg-primary font-black text-lg">M</span>
                    </div>
                    <div>
                      <div className="text-lg font-black text-white" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                        مزار للتشطيبات
                      </div>
                      <div className="text-[10px] text-accent-gold font-bold">
                        الهندسة والديكور الفاخر
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg bg-white/5 text-text-secondary hover:text-white"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Client Portal Highlight Button */}
                <Link
                  to="/client-portal"
                  onClick={() => setIsOpen(false)}
                  className="mb-4 p-3.5 rounded-xl bg-accent-gold/15 border border-accent-gold/40 flex items-center justify-between text-accent-gold font-black text-sm"
                >
                  <div className="flex items-center gap-2">
                    <UserCheck size={18} />
                    <span>بوابة متابعة مشروعي ومستنداتي</span>
                  </div>
                  <ArrowLeft size={16} />
                </Link>

                {/* Nav Links */}
                <div className="flex flex-col gap-2">
                  {navLinks.filter(l => !l.highlight).map((link) => {
                    const isActive = location.pathname === link.to
                    return (
                      <Link 
                        key={link.title} 
                        to={link.to} 
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center justify-between p-3 rounded-xl text-sm font-bold transition-all ${
                          isActive 
                            ? 'bg-accent-gold/15 text-accent-gold border border-accent-gold/30' 
                            : 'text-text-primary hover:bg-white/5'
                        }`}
                      >
                        <span>{link.title}</span>
                        <ArrowLeft size={14} className={isActive ? 'text-accent-gold' : 'text-text-muted'} />
                      </Link>
                    )
                  })}

                  <Link 
                    to="/contact" 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl text-sm font-bold text-text-secondary hover:bg-white/5 hover:text-white transition-all border border-white/5 mt-1"
                  >
                    <span>اتصل بنا واستفسر</span>
                    <ArrowLeft size={14} className="text-text-muted" />
                  </Link>

                  <Link 
                    to="/dashboard" 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-xl text-xs font-bold text-text-muted hover:bg-white/5 hover:text-accent-gold transition-all mt-2"
                  >
                    <span>لوحة تحكم المهندسين</span>
                    <ArrowLeft size={12} />
                  </Link>
                </div>
              </div>

              {/* Bottom Quick Contact in Drawer */}
              <div className="pt-5 border-t border-white/10 mt-6 space-y-2.5">
                <a 
                  href="tel:201225433070" 
                  className="btn-premium w-full py-3 flex items-center justify-center gap-2 text-center text-xs sm:text-sm font-bold rounded-xl"
                >
                  <Phone size={15} />
                  <span>اتصال مباشر: 01234567890</span>
                </a>
                
                <a 
                  href="https://wa.me/201225433070" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle size={16} />
                  <span>محادثة واتساب سريعة</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar

