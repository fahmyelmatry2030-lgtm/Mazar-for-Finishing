import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, MapPin, Phone, Mail } from 'lucide-react'
import { useStore } from '../store/useStore'
import toast from 'react-hot-toast'

const Contact = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [details, setDetails] = useState('')
  const addQuote = useStore(state => state.addQuote)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Create new Quote
    addQuote({
      client: name,
      type: 'طلب استشارة جديد',
      date: new Date().toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' }),
      value: 'يتم التقييم',
      status: 'pending'
    })

    toast.success('تم إرسال طلبك بنجاح! سنتواصل معك قريباً.', {
      style: { background: '#1A1A1A', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' },
      iconTheme: { primary: '#D4AF37', secondary: '#1A1A1A' }
    })

    setName('')
    setPhone('')
    setDetails('')
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

          <motion.form 
            onSubmit={handleSubmit}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.83, 0, 0.17, 1] }}
            className="glass-panel p-12 md:p-16 rounded-2xl shadow-premium"
          >
            <h3 className="text-2xl font-black mb-10 text-white">نموذج الاستشارة</h3>
            <div className="space-y-8">
              <div className="relative group">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-transparent border-b border-border-light py-4 focus:border-accent-gold outline-none transition-all font-medium text-white text-lg peer" placeholder=" " required />
                <label className="absolute right-0 top-4 text-text-muted transition-all peer-focus:-top-6 peer-focus:text-sm peer-focus:text-accent-gold peer-valid:-top-6 peer-valid:text-sm">الاسم الكامل</label>
              </div>
              <div className="relative group">
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-transparent border-b border-border-light py-4 focus:border-accent-gold outline-none transition-all font-medium text-white text-lg peer" placeholder=" " required />
                <label className="absolute right-0 top-4 text-text-muted transition-all peer-focus:-top-6 peer-focus:text-sm peer-focus:text-accent-gold peer-valid:-top-6 peer-valid:text-sm">رقم الهاتف</label>
              </div>
              <div className="relative group">
                <textarea rows="4" value={details} onChange={(e) => setDetails(e.target.value)} className="w-full bg-transparent border-b border-border-light py-4 focus:border-accent-gold outline-none transition-all font-medium text-white text-lg peer resize-none" placeholder=" " required></textarea>
                <label className="absolute right-0 top-4 text-text-muted transition-all peer-focus:-top-6 peer-focus:text-sm peer-focus:text-accent-gold peer-valid:-top-6 peer-valid:text-sm">نبذة عن المشروع</label>
              </div>
              <button type="submit" className="btn-premium w-full mt-4">
                إرسال الطلب <Send size={20} className="mr-3 rotate-180" />
              </button>
            </div>
          </motion.form>

        </div>
      </div>
    </section>
  )
}

export default Contact
