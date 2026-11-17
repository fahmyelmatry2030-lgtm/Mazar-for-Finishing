import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Briefcase, Calendar, Calculator, UserCheck } from 'lucide-react'
import { motion } from 'framer-motion'

const navItems = [
  { id: 'home', label: 'الرئيسية', to: '/', icon: Home },
  { id: 'portfolio', label: 'الأعمال', to: '/portfolio', icon: Briefcase },
  { id: 'consultation', label: 'استشارة', to: '/consultation', icon: Calendar },
  { id: 'quotation', label: 'المقايسة', to: '/quotation', icon: Calculator },
  { id: 'portal', label: 'مشروعي', to: '/client-portal', icon: UserCheck, isSpecial: true },
]

const BottomNav = () => {
  const location = useLocation()

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-[950] pointer-events-auto">
      {/* Ambient Top Glow */}
      <div className="absolute -top-3 inset-x-0 h-3 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

      {/* Main Glass Bottom Bar */}
      <nav className="bg-bg-secondary/95 backdrop-blur-xl border-t border-white/10 px-2 pt-2 pb-safe-or-3 shadow-[0_-10px_30px_rgba(0,0,0,0.6)]">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to
            const Icon = item.icon

            if (item.isSpecial) {
              return (
                <Link
                  key={item.id}
                  to={item.to}
                  className="flex flex-col items-center relative py-1 px-2.5 transition-all group"
                >
                  <div className={`w-10 h-10 -mt-5 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 ${
                    isActive 
                      ? 'bg-accent-gold text-bg-primary shadow-[0_0_20px_rgba(212,175,55,0.5)] scale-110' 
                      : 'bg-bg-tertiary border border-accent-gold/40 text-accent-gold group-hover:scale-105'
                  }`}>
                    <Icon size={20} />
                  </div>
                  <span className={`text-[10px] font-black mt-1 ${
                    isActive ? 'text-accent-gold' : 'text-text-secondary'
                  }`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div 
                      layoutId="bottomNavDot"
                      className="w-1 h-1 rounded-full bg-accent-gold mt-0.5" 
                    />
                  )}
                </Link>
              )
            }

            return (
              <Link
                key={item.id}
                to={item.to}
                className="flex flex-col items-center py-1 px-2.5 relative transition-all"
              >
                <div className={`p-1.5 rounded-xl transition-all ${
                  isActive 
                    ? 'text-accent-gold bg-accent-gold/15' 
                    : 'text-text-muted hover:text-text-secondary'
                }`}>
                  <Icon size={20} />
                </div>
                <span className={`text-[10px] font-bold mt-0.5 ${
                  isActive ? 'text-accent-gold font-black' : 'text-text-muted'
                }`}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div 
                    layoutId="bottomNavDot"
                    className="w-1 h-1 rounded-full bg-accent-gold mt-0.5" 
                  />
                )}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

export default BottomNav
