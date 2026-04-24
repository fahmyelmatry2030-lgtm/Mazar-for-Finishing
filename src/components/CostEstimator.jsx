import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, Home, Building2, Briefcase, ArrowLeft, Send } from 'lucide-react'
import { useStore } from '../store/useStore'
import toast from 'react-hot-toast'

const CostEstimator = () => {
  const [step, setStep] = useState(1)
  const [propertyType, setPropertyType] = useState('شقة')
  const [area, setArea] = useState(150)
  const [finishingLevel, setFinishingLevel] = useState('Luxury')
  const [contactName, setContactName] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  
  const addQuote = useStore(state => state.addQuote)

  const levels = {
    'Premium': { pricePerSqm: 8000, desc: 'تشطيب ممتاز بخامات عالية الجودة' },
    'Luxury': { pricePerSqm: 12000, desc: 'تشطيب فاخر مع ديكورات وتفاصيل ذكية' },
    'Ultra Luxury': { pricePerSqm: 18000, desc: 'أعلى مستويات الفخامة بخامات مستوردة ونظام ذكي كامل' }
  }

  const types = [
    { id: 'شقة', icon: Home, label: 'شقة سكنية' },
    { id: 'فيلا', icon: Building2, label: 'فيلا' },
    { id: 'مقر إداري', icon: Briefcase, label: 'مقر إداري' }
  ]

  const estimatedTotal = area * levels[finishingLevel].pricePerSqm

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Submit lead to Zustand store
    addQuote({
      client: contactName,
      type: `${propertyType} - ${area}م² - ${finishingLevel}`,
      date: new Date().toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' }),
      value: `${estimatedTotal.toLocaleString('ar-EG')} ج.م`,
      status: 'pending'
    })

    toast.success('تم إرسال طلبك بنجاح! سيقوم فريق المبيعات بالتواصل معك.', {
      style: { background: '#1A1A1A', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' },
      iconTheme: { primary: '#D4AF37', secondary: '#1A1A1A' }
    })

    setStep(1)
    setContactName('')
    setContactPhone('')
  }

  return (
    <section className="section-padding bg-bg-secondary relative overflow-hidden" id="estimator">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-gold/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <span className="subtitle justify-center mb-6">حاسبة التكلفة المبدئية</span>
          <h2 className="text-[3rem] md:text-[4rem] font-black leading-tight mb-4">احسب تكلفة <span className="text-gold-gradient italic">مشروعك</span></h2>
          <p className="text-text-secondary font-medium max-w-2xl mx-auto">احصل على تقدير مبدئي لتكلفة التشطيب في خطوات بسيطة، مع خيارات تناسب طموحاتك.</p>
        </div>

        <div className="max-w-3xl mx-auto glass-panel p-8 md:p-12 rounded-3xl shadow-premium border-white/5">
          <div className="flex justify-between items-center mb-12">
            {[1, 2, 3, 4].map(num => (
              <div key={num} className="flex flex-col items-center gap-2 relative z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ${step >= num ? 'bg-accent-gold text-bg-primary shadow-[0_0_15px_rgba(212,175,55,0.5)]' : 'bg-white/5 text-text-secondary'}`}>
                  {num}
                </div>
                {num < 4 && (
                  <div className={`absolute top-5 right-10 w-[calc(100vw/6)] sm:w-[120px] md:w-[180px] h-[2px] -z-10 transition-all duration-1000 ${step > num ? 'bg-accent-gold' : 'bg-white/5'}`} />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="text-2xl font-black mb-8 text-center">حدد نوع العقار</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {types.map(t => (
                    <button 
                      key={t.id}
                      onClick={() => setPropertyType(t.id)}
                      className={`p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-4 ${propertyType === t.id ? 'border-accent-gold bg-accent-gold/10' : 'border-white/5 hover:border-white/20 bg-white/5'}`}
                    >
                      <t.icon size={40} className={propertyType === t.id ? 'text-accent-gold' : 'text-text-secondary'} />
                      <span className="font-bold">{t.label}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-12 flex justify-end">
                  <button onClick={() => setStep(2)} className="btn-premium py-3 px-8 rounded-lg flex items-center gap-2">التالي <ArrowLeft size={18} /></button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="text-2xl font-black mb-8 text-center">المساحة التقريبية (م²)</h3>
                <div className="py-10">
                  <div className="text-6xl font-black text-center text-accent-gold mb-8" dir="ltr">{area} m²</div>
                  <input 
                    type="range" 
                    min="50" 
                    max="1000" 
                    step="10"
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent-gold"
                  />
                </div>
                <div className="mt-12 flex justify-between">
                  <button onClick={() => setStep(1)} className="px-8 py-3 rounded-lg text-text-secondary hover:text-white font-bold transition-colors">السابق</button>
                  <button onClick={() => setStep(3)} className="btn-premium py-3 px-8 rounded-lg flex items-center gap-2">التالي <ArrowLeft size={18} /></button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="text-2xl font-black mb-8 text-center">مستوى التشطيب</h3>
                <div className="space-y-4">
                  {Object.keys(levels).map(level => (
                    <button 
                      key={level}
                      onClick={() => setFinishingLevel(level)}
                      className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 text-right ${finishingLevel === level ? 'border-accent-gold bg-accent-gold/10' : 'border-white/5 hover:border-white/20 bg-white/5'}`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-black text-xl uppercase tracking-wider">{level}</span>
                        <span className="font-bold text-accent-gold">{levels[level].pricePerSqm.toLocaleString('ar-EG')} ج.م / م²</span>
                      </div>
                      <p className="text-text-secondary text-sm font-medium">{levels[level].desc}</p>
                    </button>
                  ))}
                </div>
                <div className="mt-12 flex justify-between">
                  <button onClick={() => setStep(2)} className="px-8 py-3 rounded-lg text-text-secondary hover:text-white font-bold transition-colors">السابق</button>
                  <button onClick={() => setStep(4)} className="btn-premium py-3 px-8 rounded-lg flex items-center gap-2">عرض النتيجة <Calculator size={18} /></button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="text-center mb-10">
                  <p className="text-text-secondary font-bold mb-2">التكلفة التقديرية لمشروعك</p>
                  <h3 className="text-5xl md:text-7xl font-black text-accent-gold mb-4" dir="ltr">
                    {estimatedTotal.toLocaleString()} <span className="text-2xl">EGP</span>
                  </h3>
                  <p className="text-xs text-text-secondary">* هذا التقدير مبدئي وقابل للتغيير بعد المعاينة الدقيقة للموقع.</p>
                </div>

                <div className="bg-bg-primary p-8 rounded-2xl border border-white/5 mb-10">
                  <h4 className="font-bold mb-6 text-center">أرسل التقدير للإدارة لطلب المعاينة</h4>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="الاسم الكامل" required value={contactName} onChange={e => setContactName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg p-4 font-bold outline-none focus:border-accent-gold" />
                    <input type="tel" placeholder="رقم الهاتف" required value={contactPhone} onChange={e => setContactPhone(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg p-4 font-bold outline-none focus:border-accent-gold" />
                    <button type="submit" className="w-full btn-premium py-4 rounded-lg flex justify-center items-center gap-2">
                      إرسال الطلب للوحة التحكم <Send size={18} />
                    </button>
                  </form>
                </div>

                <div className="flex justify-center">
                  <button onClick={() => setStep(3)} className="px-8 py-3 rounded-lg text-text-secondary hover:text-white font-bold transition-colors">تعديل الخيارات</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default CostEstimator
