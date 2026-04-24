import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, Mail, ArrowRight } from 'lucide-react'
import { useStore } from '../store/useStore'
import toast from 'react-hot-toast'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const login = useStore(state => state.login)
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    if (login(email, password)) {
      toast.success('تم تسجيل الدخول بنجاح!', {
        style: {
          background: '#1A1A1A',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.1)'
        },
        iconTheme: {
          primary: '#D4AF37',
          secondary: '#1A1A1A',
        },
      })
      navigate('/dashboard')
    } else {
      toast.error('بيانات الدخول غير صحيحة', {
        style: {
          background: '#1A1A1A',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.1)'
        }
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-bg-primary">
      {/* Background Gradients */}
      <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-accent-gold/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] bg-accent-gold/5 blur-[150px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass-panel w-full max-w-md p-10 rounded-2xl relative z-10 border-white/5"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-accent-gold/10 text-accent-gold flex items-center justify-center rounded-2xl mx-auto mb-6">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-black mb-2">تسجيل <span className="text-gold-gradient">الدخول</span></h1>
          <p className="text-sm font-bold text-text-secondary">مرحباً بك في لوحة تحكم مزار للتشطيبات</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-text-secondary mb-2">البريد الإلكتروني</label>
            <div className="relative">
              <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@mazar.com"
                className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pr-12 pl-4 text-sm focus:border-accent-gold outline-none font-bold transition-colors"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-text-secondary mb-2">كلمة المرور</label>
            <div className="relative">
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pr-12 pl-4 text-sm focus:border-accent-gold outline-none font-bold transition-colors"
                required
              />
            </div>
          </div>

          <button type="submit" className="w-full btn-premium py-4 rounded-lg flex items-center justify-center gap-2 group">
            الدخول للوحة التحكم
            <ArrowRight size={18} className="group-hover:-translate-x-2 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs font-bold text-text-secondary">Demo Credentials:</p>
          <p className="text-xs font-bold text-accent-gold mt-1" dir="ltr">admin@mazar.com / admin123</p>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
