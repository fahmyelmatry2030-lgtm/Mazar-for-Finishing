import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { motion } from 'framer-motion'
import { Lock, Mail, ArrowRight, Eye, EyeOff, User, ShieldCheck } from 'lucide-react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import toast from 'react-hot-toast'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    if (password !== confirmPass) {
      return toast.error('كلمات المرور غير متطابقة', {
        style: { background: '#1A1A1A', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
      })
    }
    
    setLoading(true)
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      toast.success('تم إنشاء حساب المدير بنجاح!', {
        style: { background: '#1A1A1A', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' },
        iconTheme: { primary: '#D4AF37', secondary: '#1A1A1A' },
      })
      navigate('/dashboard')
    } catch (err) {
      console.error(err)
      const messages = {
        'auth/email-already-in-use': 'هذا البريد الإلكتروني مستخدم بالفعل.',
        'auth/weak-password': 'كلمة المرور ضعيفة جداً.',
        'auth/invalid-email': 'البريد الإلكتروني غير صالح.',
      }
      toast.error(messages[err.code] || `حدث خطأ: ${err.message}`, {
        style: { background: '#1A1A1A', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-bg-primary">
      <SEO 
        title="إنشاء حساب مدير" 
        description="إنشاء حساب جديد للتحكم في منصة مزار للتشطيبات." 
      />
      
      {/* Abstract Backgrounds */}
      <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-accent-gold/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] bg-accent-gold/5 blur-[150px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass-panel w-full max-w-lg p-10 rounded-2xl relative z-10 border-white/5 mx-4"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-accent-gold/10 text-accent-gold flex items-center justify-center rounded-2xl mx-auto mb-6">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-3xl font-black mb-2">إنشاء <span className="text-gold-gradient">حساب جديد</span></h1>
          <p className="text-sm font-bold text-text-secondary">انضم لفريق إدارة مزار للتشطيبات</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-text-secondary mb-2">اسم المدير</label>
              <div className="relative">
                <User className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="الاسم بالكامل"
                  className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pr-12 pl-4 text-sm focus:border-accent-gold outline-none font-bold transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-text-secondary mb-2">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="mazar@example.com"
                  className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pr-12 pl-4 text-sm focus:border-accent-gold outline-none font-bold transition-colors"
                  required
                  dir="ltr"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-text-secondary mb-2">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pr-12 pl-4 text-sm focus:border-accent-gold outline-none font-bold transition-colors"
                  required
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-text-secondary mb-2">تأكيد كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pr-12 pl-4 text-sm focus:border-accent-gold outline-none font-bold transition-colors"
                  required
                  dir="ltr"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-white transition-colors">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-premium py-4 rounded-lg flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-bg-primary/30 border-t-bg-primary rounded-full animate-spin" />
                جاري الإنشاء...
              </>
            ) : (
              <>
                إنشاء الحساب والبدء
                <ArrowRight size={18} className="group-hover:-translate-x-2 transition-transform" />
              </>
            )}
          </button>

          <div className="text-center pt-4">
            <p className="text-sm text-text-secondary font-bold">
              لديك حساب بالفعل؟{' '}
              <Link to="/login" className="text-accent-gold hover:underline">تسجيل الدخول</Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default Register
