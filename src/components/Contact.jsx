import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Send, MessageCircle } from 'lucide-react'
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
        await new Promise(r => setTimeout(r, 800))
      }
      
      toast.success('تم إرسال رسالتك بنجاح! سيتواصل معك فريقنا الهندسي قريباً.', {
        style: { background: '#181818', color: '#fff', border: '1px solid rgba(212,175,55,0.3)' },
        iconTheme: { primary: '#D4AF37', secondary: '#181818' }
      })
      e.target.reset()
    } catch (error) {
      toast.error('حدث خطأ أثناء الإرسال. يرجى المحاولة لاحقاً أو الاتصال بنا مباشرة.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="section-padding bg-bg-secondary relative overflow-hidden">
      {/* Decorative Accent Lines */}
      <div className="absolute top-0 right-0 w-1/3 h-px bg-gradient-to-l from-accent-gold/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-px bg-gradient-to-r from-accent-gold/40 to-transparent pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-center">
          
          {/* Left / Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="subtitle mb-3 sm:mb-5">تواصل مباشر</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-4 sm:mb-6 text-white">
              ابدأ خطوتك <span className="text-gold-gradient italic">المعمارية القادمة</span>
            </h2>
            <p className="text-text-secondary text-sm sm:text-base md:text-lg font-medium mb-8 sm:mb-12 max-w-xl leading-relaxed">
              نحن نختار مشاريعنا بعناية لضمان تقديم أعلى مستوى من الجودة والاهتمام بكل التفاصيل. تفضل بالتواصل معنا لمناقشة أفكار مساحتك.
            </p>
            
            {/* Contact Details List */}
            <div className="space-y-4 sm:space-y-6">
              
              <a 
                href="tel:201234567890" 
                className="flex items-center gap-4 p-4 rounded-xl bg-bg-primary/60 border border-white/5 hover:border-accent-gold/40 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-accent-gold/10 border border-accent-gold/30 flex items-center justify-center text-accent-gold group-hover:bg-accent-gold group-hover:text-bg-primary transition-colors flex-shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="text-xs text-text-muted font-bold uppercase tracking-wider mb-0.5">اتصال مباشر / هاتف</div>
                  <div className="text-base sm:text-lg font-black text-white group-hover:text-accent-gold transition-colors" dir="ltr">
                    +20 123 456 7890
                  </div>
                </div>
              </a>

              <a 
                href="https://wa.me/201234567890" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-bg-primary/60 border border-white/5 hover:border-emerald-500/40 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-bg-primary transition-colors flex-shrink-0">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <div className="text-xs text-text-muted font-bold uppercase tracking-wider mb-0.5">محادثة واتساب</div>
                  <div className="text-base sm:text-lg font-black text-white group-hover:text-emerald-400 transition-colors">
                    تواصل فوري عبر تطبيق واتساب
                  </div>
                </div>
              </a>

              <a 
                href="mailto:projects@mazar.design" 
                className="flex items-center gap-4 p-4 rounded-xl bg-bg-primary/60 border border-white/5 hover:border-accent-gold/40 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-accent-gold/10 border border-accent-gold/30 flex items-center justify-center text-accent-gold group-hover:bg-accent-gold group-hover:text-bg-primary transition-colors flex-shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-xs text-text-muted font-bold uppercase tracking-wider mb-0.5">البريد الإلكتروني</div>
                  <div className="text-base sm:text-lg font-black text-white group-hover:text-accent-gold transition-colors" dir="ltr">
                    projects@mazar.design
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-bg-primary/60 border border-white/5">
                <div className="w-12 h-12 rounded-xl bg-accent-gold/10 border border-accent-gold/30 flex items-center justify-center text-accent-gold flex-shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="text-xs text-text-muted font-bold uppercase tracking-wider mb-0.5">مقر الشركة</div>
                  <div className="text-sm sm:text-base font-black text-white">
                    التجمع الخامس، التسعين الشمالي، القاهرة الجديدة
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right / Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-panel p-6 sm:p-10 rounded-2xl sm:rounded-3xl border border-white/10 shadow-premium"
          >
            <h3 className="text-xl sm:text-2xl font-black mb-2 text-white">أرسل استفسارك</h3>
            <p className="text-text-secondary text-xs sm:text-sm font-medium mb-6">املأ البيانات وسيقوم مهندس المشروعات بالرد عليك مباشرة.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-text-secondary mb-1.5">الاسم بالكامل</label>
                  <input 
                    name="user_name" 
                    type="text" 
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-base focus:border-accent-gold outline-none font-bold transition-colors text-white placeholder-text-muted" 
                    placeholder="محمد أحمد" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-secondary mb-1.5">رقم الهاتف</label>
                  <input 
                    name="user_phone" 
                    type="tel" 
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-base focus:border-accent-gold outline-none font-bold transition-colors text-white placeholder-text-muted" 
                    placeholder="01xxxxxxxxx" 
                    required 
                    dir="ltr" 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-text-secondary mb-1.5">البريد الإلكتروني (اختياري)</label>
                <input 
                  name="user_email" 
                  type="email" 
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-base focus:border-accent-gold outline-none font-bold transition-colors text-white placeholder-text-muted" 
                  placeholder="example@email.com" 
                  dir="ltr" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-text-secondary mb-1.5">تفاصيل المشروع أو الاستفسار</label>
                <textarea 
                  name="message" 
                  rows="4" 
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-base focus:border-accent-gold outline-none font-bold transition-colors text-white placeholder-text-muted resize-none" 
                  placeholder="اكتب نوع العقار، المساحة، والمواصفات المرغوبة..." 
                  required
                />
              </div>

              <button 
                type="submit" 
                disabled={loading} 
                className="btn-premium w-full rounded-xl py-4 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed font-black"
              >
                <span>{loading ? 'جاري الإرسال...' : 'إرسال الرسالة الآن'}</span>
                <Send size={18} className="group-hover:-translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default Contact
