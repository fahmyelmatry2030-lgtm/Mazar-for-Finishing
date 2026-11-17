import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, Home, Building2, Briefcase, ArrowLeft, ArrowRight, Send, Check } from 'lucide-react'
import { useStore } from '../store/useStore'
import emailjs from '@emailjs/browser'
import toast from 'react-hot-toast'

const CostEstimator = () => {
  const [step, setStep] = useState(1)
  const [propertyType, setPropertyType] = useState('شقة')
  const [area, setArea] = useState(150)
  const [finishingLevel, setFinishingLevel] = useState('Luxury')
  const [contactName, setContactName] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const addQuote = useStore(state => state.addQuote)

  const levels = {
    'Premium': { pricePerSqm: 8000, title: 'بريميوم فاخر', desc: 'تشطيب هندسي عالي الجودة بخامات محلية ومستوردة ممتازة' },
    'Luxury': { pricePerSqm: 12000, title: 'لاكجري راقي', desc: 'تصميم وتشطيب متقدم بديكورات جدارية ذكية ورخام وإضاءات مخفية' },
    'Ultra Luxury': { pricePerSqm: 18000, title: 'ألترا لاكجري ملكي', desc: 'أعلى مواصفات الرفاهية بخامات عالمية وأنظمة سمارت هوم متكاملة' }
  }

  const types = [
    { id: 'شقة', icon: Home, label: 'شقة سكنية' },
    { id: 'فيلا', icon: Building2, label: 'فيلا / تاون هاوس' },
    { id: 'مقر إداري', icon: Briefcase, label: 'مقر إداري / تجاري' }
  ]

  const areaPresets = [100, 150, 220, 350, 500]

  const estimatedTotal = area * levels[finishingLevel].pricePerSqm

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // 1. Add to Zustand store
      addQuote({
        client: contactName,
        phone: contactPhone,
        type: `${propertyType} - ${area}م² - ${levels[finishingLevel].title}`,
        date: new Date().toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' }),
        value: `${estimatedTotal.toLocaleString('ar-EG')} ج.م`,
        status: 'pending'
      })

      // 2. Send Email via EmailJS if configured
      if (import.meta.env.VITE_EMAILJS_SERVICE_ID) {
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            user_name: contactName,
            user_phone: contactPhone,
            property_type: propertyType,
            area: area,
            level: finishingLevel,
            estimated_value: `${estimatedTotal.toLocaleString('ar-EG')} ج.م`
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
      }

      toast.success('تم إرسال تقدير مشروعك بنجاح! سيتواصل معك أحد مهندسينا خلال ساعات.', {
        style: { background: '#181818', color: '#fff', border: '1px solid rgba(212,175,55,0.3)' },
        iconTheme: { primary: '#D4AF37', secondary: '#181818' }
      })

      setStep(1)
      setContactName('')
      setContactPhone('')
    } catch (err) {
      toast.error('تم تسجيل طلبك في النظام، شكراً لتواصلك!')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="section-padding bg-bg-secondary relative overflow-hidden" id="estimator">
      {/* Decorative Blur Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-accent-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="subtitle justify-center mb-4 sm:mb-6">حاسبة التكلفة الهندسية</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-4 text-white">
            احسب تكلفة <span className="text-gold-gradient italic">مشروعك بدقة</span>
          </h2>
          <p className="text-text-secondary text-sm sm:text-base font-medium max-w-xl mx-auto">
            احصل على تقدير مبدئي فوري لتكلفة التشطيب في خطوات معدودة بناءً على مواصفات مساحتك وطموحاتك.
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-2xl mx-auto glass-panel p-6 sm:p-10 md:p-12 rounded-2xl sm:rounded-3xl shadow-premium border border-white/10">
          
          {/* Stepper Header */}
          <div className="flex justify-between items-center mb-8 sm:mb-12 relative px-2">
            {[1, 2, 3, 4].map(num => (
              <div key={num} className="flex flex-col items-center gap-1.5 z-10">
                <div 
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-black text-sm transition-all duration-300 ${
                    step >= num 
                      ? 'bg-accent-gold text-bg-primary shadow-[0_0_15px_rgba(212,175,55,0.4)]' 
                      : 'bg-white/5 border border-white/10 text-text-muted'
                  }`}
                >
                  {step > num ? <Check size={16} /> : num}
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-text-secondary hidden sm:block">
                  {num === 1 && 'النوع'}
                  {num === 2 && 'المساحة'}
                  {num === 3 && 'المستوى'}
                  {num === 4 && 'التقدير'}
                </span>
              </div>
            ))}
            {/* Connector Line behind steps */}
            <div className="absolute top-4 sm:top-5 inset-x-8 h-[2px] bg-white/10 -z-0">
              <div 
                className="h-full bg-accent-gold transition-all duration-500"
                style={{ width: `${((step - 1) / 3) * 100}%` }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1: Property Type */}
            {step === 1 && (
              <motion.div 
                key="step1" 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl sm:text-2xl font-black mb-6 text-center text-white">اختر نوع المساحة أو العقار</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {types.map(t => (
                    <button 
                      key={t.id}
                      type="button"
                      onClick={() => setPropertyType(t.id)}
                      className={`p-5 rounded-xl sm:rounded-2xl border-2 transition-all duration-200 flex flex-col items-center justify-center gap-3 active:scale-98 ${
                        propertyType === t.id 
                          ? 'border-accent-gold bg-accent-gold/15 text-white shadow-[0_0_15px_rgba(212,175,55,0.2)]' 
                          : 'border-white/10 hover:border-white/20 bg-white/5 text-text-secondary'
                      }`}
                    >
                      <t.icon size={32} className={propertyType === t.id ? 'text-accent-gold' : 'text-text-muted'} />
                      <span className="font-bold text-sm sm:text-base text-white">{t.label}</span>
                    </button>
                  ))}
                </div>
                
                <div className="mt-8 sm:mt-10 flex justify-end">
                  <button 
                    type="button"
                    onClick={() => setStep(2)} 
                    className="btn-premium py-3 px-6 text-sm sm:text-base flex items-center gap-2"
                  >
                    <span>المتابعة للمساحة</span>
                    <ArrowLeft size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Area in SQM */}
            {step === 2 && (
              <motion.div 
                key="step2" 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl sm:text-2xl font-black mb-6 text-center text-white">المساحة الإجمالية بالمتر المربع</h3>
                
                <div className="py-6 sm:py-8 text-center">
                  <div className="text-5xl sm:text-6xl font-black text-accent-gold mb-4 leading-none" dir="ltr">
                    {area} <span className="text-2xl sm:text-3xl font-bold text-white">م²</span>
                  </div>
                  
                  {/* Slider */}
                  <input 
                    type="range" 
                    min="50" 
                    max="800" 
                    step="10"
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full h-2.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent-gold my-6"
                  />

                  {/* Preset Pills */}
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                    <span className="text-xs text-text-muted ml-2">مساحات شائعة:</span>
                    {areaPresets.map(preset => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setArea(preset)}
                        className={`text-xs font-bold py-1.5 px-3 rounded-lg border transition-all ${
                          area === preset 
                            ? 'bg-accent-gold text-bg-primary border-accent-gold' 
                            : 'bg-white/5 border-white/10 text-text-secondary hover:text-white'
                        }`}
                      >
                        {preset} م²
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-8 sm:mt-10 flex justify-between items-center">
                  <button 
                    type="button"
                    onClick={() => setStep(1)} 
                    className="px-5 py-2.5 rounded-lg text-text-secondary hover:text-white font-bold text-sm transition-colors flex items-center gap-1.5"
                  >
                    <ArrowRight size={16} />
                    <span>السابق</span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => setStep(3)} 
                    className="btn-premium py-3 px-6 text-sm sm:text-base flex items-center gap-2"
                  >
                    <span>المتابعة للباقة</span>
                    <ArrowLeft size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Finishing Level */}
            {step === 3 && (
              <motion.div 
                key="step3" 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl sm:text-2xl font-black mb-6 text-center text-white">اختر باقة ومستوى التشطيب</h3>
                
                <div className="space-y-3 sm:space-y-4">
                  {Object.keys(levels).map(levelKey => {
                    const l = levels[levelKey]
                    const isSelected = finishingLevel === levelKey
                    return (
                      <button 
                        key={levelKey}
                        type="button"
                        onClick={() => setFinishingLevel(levelKey)}
                        className={`w-full p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 transition-all duration-200 text-right ${
                          isSelected 
                            ? 'border-accent-gold bg-accent-gold/15 shadow-[0_0_15px_rgba(212,175,55,0.15)]' 
                            : 'border-white/10 hover:border-white/20 bg-white/5'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="font-black text-base sm:text-lg text-white">{l.title}</span>
                          <span className="font-black text-accent-gold text-sm sm:text-base" dir="ltr">
                            {l.pricePerSqm.toLocaleString()} EGP / م²
                          </span>
                        </div>
                        <p className="text-text-secondary text-xs sm:text-sm font-medium">{l.desc}</p>
                      </button>
                    )
                  })}
                </div>

                <div className="mt-8 sm:mt-10 flex justify-between items-center">
                  <button 
                    type="button"
                    onClick={() => setStep(2)} 
                    className="px-5 py-2.5 rounded-lg text-text-secondary hover:text-white font-bold text-sm transition-colors flex items-center gap-1.5"
                  >
                    <ArrowRight size={16} />
                    <span>السابق</span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => setStep(4)} 
                    className="btn-premium py-3 px-6 text-sm sm:text-base flex items-center gap-2"
                  >
                    <span>عرض المقايسة</span>
                    <Calculator size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Estimation Result & Quick Submit */}
            {step === 4 && (
              <motion.div 
                key="step4" 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  <span className="text-xs sm:text-sm text-text-muted font-bold block mb-1">
                    التكلفة التقديرية لمشروعك ({propertyType} · {area} م² · {levels[finishingLevel].title})
                  </span>
                  <div className="text-4xl sm:text-6xl font-black text-accent-gold my-3 tracking-tight" dir="ltr">
                    {estimatedTotal.toLocaleString()} <span className="text-xl sm:text-2xl text-white font-bold">ج.م</span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-text-muted">
                    * هذا التقدير تقريبي ويتم تدقيقه في المقايسة النهائية بعد المعاينة الميدانية ورفع الأبعاد.
                  </p>
                </div>

                {/* Consultation Form */}
                <div className="bg-bg-primary/80 p-5 sm:p-7 rounded-2xl border border-white/10 mb-6">
                  <h4 className="font-bold text-sm sm:text-base mb-4 text-center text-white">
                    احجز موعد معاينة هندسية مجانية
                  </h4>
                  
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div>
                      <input 
                        name="user_name" 
                        type="text" 
                        placeholder="الاسم الكريم" 
                        required 
                        value={contactName} 
                        onChange={e => setContactName(e.target.value)} 
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-sm sm:text-base text-white placeholder-text-muted font-bold outline-none focus:border-accent-gold transition-colors" 
                      />
                    </div>
                    <div>
                      <input 
                        name="user_phone" 
                        type="tel" 
                        placeholder="رقم الهاتف للتواصل" 
                        required 
                        value={contactPhone} 
                        onChange={e => setContactPhone(e.target.value)} 
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-sm sm:text-base text-white placeholder-text-muted font-bold outline-none focus:border-accent-gold transition-colors" 
                        dir="ltr"
                      />
                    </div>
                    
                    <button 
                      type="submit" 
                      disabled={isSubmitting} 
                      className="w-full btn-premium py-3.5 rounded-xl flex justify-center items-center gap-2 text-sm sm:text-base font-black disabled:opacity-70"
                    >
                      {isSubmitting ? 'جاري إرسال الطلب...' : 'تأكيد وحجز المعاينة الهندسية'} 
                      <Send size={16} />
                    </button>
                  </form>
                </div>

                <div className="flex justify-center">
                  <button 
                    type="button"
                    onClick={() => setStep(3)} 
                    className="text-xs sm:text-sm text-text-muted hover:text-accent-gold font-bold transition-colors underline"
                  >
                    تعديل خيارات الحساب
                  </button>
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
