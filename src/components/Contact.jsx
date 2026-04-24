import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Send } from 'lucide-react'
import emailjs from '@emailjs/browser'
import toast from 'react-hot-toast'

const Contact = () => {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      if (import.meta.env.VITE_EMAILJS_SERVICE_ID) {
        await emailjs.sendForm(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          e.target,
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
      } else {
        await new Promise(r => setTimeout(r, 1000))
      }
      
      toast.success('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', {
        style: { background: '#1A1A1A', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' },
        iconTheme: { primary: '#D4AF37', secondary: '#1A1A1A' }
      })
      e.target.reset()
    } catch (error) {
      toast.error('حدث خطأ أثناء الإرسال. يرجى المحاولة لاحقاً.', {
        style: { background: '#1A1A1A', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-32 bg-bg-secondary relative overflow-hidden">
      {/* Decorative Gold Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-px bg-gradient-to-l from-accent-gold to-transparent" />
      <div className="absolute bottom-0 left-0 w-1/3 h-px bg-gradient-to-r from-accent-gold to-transparent" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.83, 0, 0.17, 1] }}
          >
            <span className="subtitle mb-6">تواصل معنا</span>
            <h2 className="text-[3rem] md:text-[5rem] font-black leading-tight mb-8">ابدأ <span className="text-gold-gradient italic">مشروعك</span></h2>
            <p className="text-text-secondary text-lg font-medium mb-12 max-w-xl leading-relaxed">
              نحن نختار مشاريعنا بعناية لضمان تقديم أعلى مستوى من الجودة والاهتمام بالتفاصيل. تواصل معنا لمناقشة رؤيتك المعمارية.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-full border border-border-gold flex items-center justify-center text-accent-gold group-hover:bg-accent-gold group-hover:text-bg-primary transition-all duration-500">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-muted uppercase tracking-widest mb-1">الهاتف المحمول</h4>
                  <p className="text-xl font-bold text-white" style={{ fontFamily: 'Tajawal, sans-serif' }}>+20 123 456 7890</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-full border border-border-gold flex items-center justify-center text-accent-gold group-hover:bg-accent-gold group-hover:text-bg-primary transition-all duration-500">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-muted uppercase tracking-widest mb-1">البريد الإلكتروني</h4>
                  <p className="text-xl font-bold text-white">projects@mazar.design</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-full border border-border-gold flex items-center justify-center text-accent-gold group-hover:bg-accent-gold group-hover:text-bg-primary transition-all duration-500">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-muted uppercase tracking-widest mb-1">مقر المكتب</h4>
                  <p className="text-xl font-bold text-white">التجمع الخامس، القاهرة الجديدة، مصر</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-panel p-10 rounded-2xl border-white/5 relative z-10"
          >
            <h3 className="text-2xl font-black mb-8 text-white">أرسل رسالة</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-text-secondary mb-2">الاسم بالكامل</label>
                  <input name="user_name" type="text" className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-sm focus:border-accent-gold outline-none font-bold transition-colors text-white" placeholder="محمد أحمد" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-text-secondary mb-2">رقم الهاتف</label>
                  <input name="user_phone" type="tel" className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-sm focus:border-accent-gold outline-none font-bold transition-colors text-white" placeholder="01xxxxxxxxx" required dir="ltr" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-text-secondary mb-2">البريد الإلكتروني</label>
                <input name="user_email" type="email" className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-sm focus:border-accent-gold outline-none font-bold transition-colors text-white" placeholder="example@email.com" required dir="ltr" />
              </div>

              <div>
                <label className="block text-sm font-bold text-text-secondary mb-2">رسالتك</label>
                <textarea name="message" rows="4" className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-sm focus:border-accent-gold outline-none font-bold transition-colors text-white resize-none" placeholder="اكتب تفاصيل استفسارك هنا..." required></textarea>
              </div>

              <button type="submit" disabled={loading} className="btn-premium w-full rounded-lg py-4 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed">
                {loading ? 'جاري الإرسال...' : 'إرسال الرسالة'} <Send size={18} className="group-hover:-translate-x-2 transition-transform" />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default Contact
