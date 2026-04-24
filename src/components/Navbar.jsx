import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { title: 'الرئيسية', to: '/' },
    { title: 'خدماتنا', to: '/services' },
    { title: 'سابقة الأعمال', to: '/portfolio' },
    { title: 'اتصل بنا', to: '/contact' },
  ]

  return (
    <nav className={`fixed top-0 right-0 w-full z-[1000] transition-all duration-700 ${isScrolled ? 'glass-panel py-4' : 'bg-transparent py-8'}`}>
      <div className="container flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-4 group">
          <div className="w-10 h-10 bg-accent-gold flex items-center justify-center rounded-sm group-hover:rotate-45 transition-transform duration-500">
            <span className="text-bg-primary font-black text-xl -rotate-45 group-hover:rotate-0 transition-transform duration-500">M</span>
          </div>
          <div className="text-2xl font-black tracking-tighter text-white" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            مزار <span className="text-accent-gold italic font-normal text-xl">للتشطيبات</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-12">
          {navLinks.map(link => (
            <Link 
              key={link.title} 
              to={link.to} 
              className="text-sm font-bold text-white hover:text-accent-gold transition-colors relative group"
            >
              {link.title}
              <span className="absolute -bottom-2 right-0 w-0 h-[2px] bg-accent-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <div className="w-[1px] h-6 bg-white/20" />
          <Link to="/dashboard" className="text-sm font-bold text-text-secondary hover:text-white transition-colors">
            لوحة التحكم
          </Link>
          <a href="tel:201234567890" className="btn-premium py-3 px-8 text-sm">
            <Phone size={16} className="ml-2" /> 01234567890
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-bg-secondary/95 backdrop-blur-xl z-[2000] p-10 flex flex-col gap-10 border-r border-white/10 w-4/5 h-screen shadow-premium">
          <div className="flex justify-between items-center mb-10">
            <div className="text-2xl font-black text-white" style={{ fontFamily: 'Tajawal, sans-serif' }}>مزار</div>
            <button onClick={() => setIsOpen(false)}><X size={32} className="text-white" /></button>
          </div>
          <div className="flex flex-col gap-8">
            {navLinks.map(link => (
              <Link key={link.title} to={link.to} onClick={() => setIsOpen(false)} className="text-2xl font-bold text-white hover:text-accent-gold transition-all border-b border-white/10 pb-4">
                {link.title}
              </Link>
            ))}
            <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-xl font-bold text-text-secondary hover:text-white transition-all border-b border-white/10 pb-4">
              لوحة التحكم
            </Link>
          </div>
          <a href="tel:201234567890" className="btn-premium text-center py-4 mt-auto">
             تواصل هاتفياً
          </a>
        </div>
      )}
    </nav>
  )
}

export default Navbar
