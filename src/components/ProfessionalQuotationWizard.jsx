import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Building2, 
  Home, 
  Briefcase, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Calculator, 
  FileText, 
  Printer, 
  MessageCircle, 
  ShieldCheck, 
  Clock, 
  Layers, 
  Phone, 
  User, 
  MapPin, 
  ChevronRight,
  Plus,
  Minus,
  RefreshCw,
  BadgeCheck
} from 'lucide-react'
import { useStore } from '../store/useStore'
import toast from 'react-hot-toast'

// Property types
const PROPERTY_TYPES = [
  { id: 'residential', label: 'شقة سكنية', icon: Home, hint: 'سكن عائلي راقي' },
  { id: 'villa', label: 'فيلا / دوبلكس', icon: Building2, hint: 'مساحات مفتوحة وحدائق' },
  { id: 'office', label: 'مقر إداري', icon: Briefcase, hint: 'بيئة عمل عصرية' },
  { id: 'commercial', label: 'تجاري / عيادة', icon: Sparkles, hint: 'معايير تجارية معتمدة' }
]

// Finishing tiers
const FINISHING_TIERS = [
  { 
    id: 'economic', 
    title: 'اقتصادي (Economic)', 
    pricePerSqm: 6500,
    badge: 'عملي ومضمون',
    desc: 'خامات محلية فرز أول مع تأسيس هندسي سليم وموثق وضمان على الأعمال.'
  },
  { 
    id: 'standard', 
    title: 'متوسط (Standard)', 
    pricePerSqm: 9500,
    badge: 'الأكثر طلباً',
    popular: true,
    desc: 'تشطيب عصري، بورسلين مستورد، أطقم صحية معلقة، وإضاءات ليد مخفية.'
  },
  { 
    id: 'luxury', 
    title: 'فاخر (Luxury)', 
    pricePerSqm: 14500,
    badge: 'أعلى رفاهية',
    desc: 'رخام طبيعي، سمارت هوم، أبواب خشبية مدرعة، وبانوهات جدارية إيطالية.'
  }
]

// Current state
const UNIT_STATES = [
  { id: 'red_brick', label: 'طوب أحمر', factor: 1.05, desc: 'تأسيس كامل من الصفر' },
  { id: 'plaster', label: 'محارة', factor: 1.0, desc: 'جاهز لأعمال التأسيس والتشطيب' },
  { id: 'semi_finished', label: 'نصف تشطيب', factor: 0.92, desc: 'تأسيس جزئي سابق' }
]

const ProfessionalQuotationWizard = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const addQuote = useStore(state => state.addQuote)
  const quotePrintRef = useRef(null)

  // Step 1: Unit & Finishing Info
  const [propertyType, setPropertyType] = useState('residential')
  const [area, setArea] = useState(150)
  const [finishingTier, setFinishingTier] = useState('standard')
  const [unitState, setUnitState] = useState('plaster')

  // Step 2: Internal Spaces (Counters)
  const [rooms, setRooms] = useState(3)
  const [reception, setReception] = useState(2)
  const [bathrooms, setBathrooms] = useState(2)
  const [kitchens, setKitchens] = useState(1)
  const [balconies, setBalconies] = useState(1)

  // Step 3: Client Details
  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [city, setCity] = useState('القاهرة')
  const [floor, setFloor] = useState('الدور الثالث')

  // Result state
  const [quoteCode, setQuoteCode] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Calculations
  const selectedTier = FINISHING_TIERS.find(t => t.id === finishingTier) || FINISHING_TIERS[1]
  const selectedState = UNIT_STATES.find(s => s.id === unitState) || UNIT_STATES[1]
  
  // Total Estimated Cost
  const baseCost = area * selectedTier.pricePerSqm * selectedState.factor
  const roundedTotal = Math.round(baseCost / 1000) * 1000

  // Engineering Itemized Breakdown (standard architectural ratios)
  const breakdown = [
    { name: 'أعمال الكهرباء والإضاءة الحديثة (تأسيس وتشطيب)', pct: 18, amount: Math.round(roundedTotal * 0.18) },
    { name: 'أعمال السباكة وتغذية وصرف الأطقم الصحية', pct: 17, amount: Math.round(roundedTotal * 0.17) },
    { name: 'أعمال المحارة والجبسوم بورد والأسقف المعلقة', pct: 18, amount: Math.round(roundedTotal * 0.18) },
    { name: 'أعمال الأرضيات (بورسلين / رخام / سيراميك فرز أول)', pct: 22, amount: Math.round(roundedTotal * 0.22) },
    { name: 'أعمال الدهانات والديكورات والبانوهات الجدارية', pct: 15, amount: Math.round(roundedTotal * 0.15) },
    { name: 'أعمال الأبواب والنجارة والألوميتال وقطاعات الزجاج', pct: 10, amount: Math.round(roundedTotal * 0.10) },
  ]

  const handleNext = () => {
    if (currentStep === 1) {
      if (area < 30 || area > 5000) {
        toast.error('يرجى إدخال مساحة صحيحة بالمتر المربع (من 30 إلى 5000 م²)')
        return
      }
      setCurrentStep(2)
    } else if (currentStep === 2) {
      setCurrentStep(3)
    } else if (currentStep === 3) {
      if (!clientName.trim() || clientName.length < 3) {
        toast.error('يرجى كتابة الاسم الكامل')
        return
      }
      if (!clientPhone.trim() || clientPhone.length < 8) {
        toast.error('يرجى كتابة رقم هاتف صحيح للتواصل')
        return
      }
      generateQuote()
    }
  }

  const generateQuote = () => {
    setIsSubmitting(true)
    const code = `MZR-${Math.floor(1000 + Math.random() * 9000)}`
    setQuoteCode(code)

    try {
      // Save to store
      addQuote({
        client: clientName,
        phone: clientPhone,
        type: `${PROPERTY_TYPES.find(p => p.id === propertyType)?.label} - ${area}م² (${selectedTier.title})`,
        date: new Date().toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' }),
        value: `${roundedTotal.toLocaleString('ar-EG')} ج.م`,
        status: 'pending'
      })

      toast.success('تم إعداد المقايسة الهندسية بنجاح!', {
        style: { background: '#181818', color: '#fff', border: '1px solid rgba(212,175,55,0.4)' },
        iconTheme: { primary: '#D4AF37', secondary: '#181818' }
      })
      setCurrentStep(4)
    } catch {
      setCurrentStep(4)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleSendWhatsApp = () => {
    const propertyLabel = PROPERTY_TYPES.find(p => p.id === propertyType)?.label
    const message = `🏛️ *طلب مقايسة تشطيب هندسية - مزار للمقاولات والديكور*
👤 *العميل:* ${clientName}
📱 *الهاتف:* ${clientPhone}
📍 *الموقع:* ${city} (${floor})
📐 *نوع ومساحة الوحدة:* ${propertyLabel} بمساحة ${area} م²
⭐ *مستوى التشطيب:* ${selectedTier.title}
🧱 *الحالة الراهنة:* ${selectedState.label}
🔲 *التقسيم:* ${rooms} غرف نوم | ${reception} قطع ريسبشن | ${bathrooms} حمام | ${kitchens} مطبخ | ${balconies} بلكونة
💰 *التكلفة التقديرية الإجمالية:* ${roundedTotal.toLocaleString('ar-EG')} ج.م
🏷️ *كود المقايسة:* ${quoteCode}

مرحباً م. محمد العجيزي، أود مناقشة تفاصيل هذه المقايسة وتحديد موعد للمعاينة الهندسية.`

    window.open(`https://wa.me/201225433070?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Step Tracker Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative max-w-xl mx-auto px-4">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2 z-0" />
          <div 
            className="absolute top-1/2 right-0 h-0.5 bg-accent-gold -translate-y-1/2 z-0 transition-all duration-500"
            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
          />

          {[
            { num: 1, label: 'بيانات الوحدة' },
            { num: 2, label: 'التقسيم والمساحات' },
            { num: 3, label: 'بيانات التواصل' },
            { num: 4, label: 'تقرير المقايسة' }
          ].map((s) => (
            <div key={s.num} className="relative z-10 flex flex-col items-center">
              <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-black text-xs sm:text-sm transition-all duration-300 ${
                currentStep === s.num
                  ? 'bg-accent-gold text-bg-primary shadow-[0_0_20px_rgba(212,175,55,0.6)] scale-110'
                  : currentStep > s.num
                  ? 'bg-accent-gold/20 border-2 border-accent-gold text-accent-gold'
                  : 'bg-bg-tertiary border border-white/10 text-text-muted'
              }`}>
                {currentStep > s.num ? <Check size={16} /> : s.num}
              </div>
              <span className={`text-[11px] sm:text-xs font-bold mt-2 whitespace-nowrap ${
                currentStep >= s.num ? 'text-white' : 'text-text-muted'
              }`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Glass Panel */}
      <div className="bg-bg-secondary/95 border border-white/10 rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        
        {/* Step 1: Unit & Level */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-2">١. اختر نوع الوحدة العقارية</h3>
              <p className="text-text-secondary text-xs sm:text-sm">حدد نوع المكان المراد تنفيذ أعمال التشطيب والديكور له.</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-4">
                {PROPERTY_TYPES.map((t) => {
                  const Icon = t.icon
                  const isSelected = propertyType === t.id
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setPropertyType(t.id)}
                      className={`p-4 rounded-2xl border text-right transition-all flex flex-col justify-between cursor-pointer ${
                        isSelected
                          ? 'border-accent-gold bg-accent-gold/15 shadow-[0_0_20px_rgba(212,175,55,0.25)] ring-1 ring-accent-gold'
                          : 'border-white/10 bg-bg-tertiary/60 hover:border-white/20'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                        isSelected ? 'bg-accent-gold text-bg-primary' : 'bg-white/5 text-accent-gold'
                      }`}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <div className="font-black text-sm text-white mb-0.5">{t.label}</div>
                        <div className="text-[10px] text-text-muted font-medium">{t.hint}</div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Area Slider & Quick Presets */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm sm:text-base font-black text-white">٢. المساحة الإجمالية بالمتر المربع</label>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-accent-gold/15 border border-accent-gold/30 text-accent-gold font-black text-sm">
                  <span>{area}</span>
                  <span className="text-xs">م²</span>
                </div>
              </div>

              <div className="space-y-3">
                <input 
                  type="range"
                  min="40"
                  max="1000"
                  step="5"
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full accent-accent-gold cursor-pointer"
                />

                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-text-muted font-bold ml-2">مساحات شائعة:</span>
                  {[90, 130, 160, 200, 260, 350, 500].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setArea(val)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                        area === val
                          ? 'bg-accent-gold text-bg-primary border-accent-gold'
                          : 'bg-white/5 border-white/10 text-text-secondary hover:text-white'
                      }`}
                    >
                      {val} م²
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Finishing Level Cards */}
            <div>
              <h3 className="text-base sm:text-lg font-black text-white mb-2">٣. مستوى التشطيب والمواصفات المطلوبة</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                {FINISHING_TIERS.map((tier) => {
                  const isSelected = finishingTier === tier.id
                  return (
                    <div
                      key={tier.id}
                      onClick={() => setFinishingTier(tier.id)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                        isSelected
                          ? 'border-accent-gold bg-accent-gold/10 shadow-[0_0_20px_rgba(212,175,55,0.2)] ring-1 ring-accent-gold'
                          : 'border-white/10 bg-bg-tertiary/50 hover:border-white/20'
                      }`}
                    >
                      {tier.popular && (
                        <span className="absolute -top-2.5 left-4 px-2.5 py-0.5 rounded-full bg-accent-gold text-bg-primary text-[10px] font-black">
                          {tier.badge}
                        </span>
                      )}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-black text-sm text-white">{tier.title}</h4>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-accent-gold bg-accent-gold text-bg-primary' : 'border-white/30'
                          }`}>
                            {isSelected && <Check size={12} />}
                          </div>
                        </div>
                        <p className="text-text-secondary text-xs leading-relaxed mb-4">{tier.desc}</p>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-baseline justify-between">
                        <span className="text-[11px] text-text-muted font-bold">متوسط السعر:</span>
                        <div className="text-accent-gold font-black text-sm">
                          {tier.pricePerSqm.toLocaleString('ar-EG')} <span className="text-[10px]">ج.م/م²</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Unit State */}
            <div>
              <h3 className="text-base sm:text-lg font-black text-white mb-2">٤. الحالة الحالية للوحدة</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {UNIT_STATES.map((st) => {
                  const isSelected = unitState === st.id
                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setUnitState(st.id)}
                      className={`p-3.5 rounded-xl border text-right transition-all cursor-pointer flex items-center justify-between ${
                        isSelected 
                          ? 'border-accent-gold bg-accent-gold/15 text-white' 
                          : 'border-white/10 bg-bg-tertiary/40 text-text-secondary hover:border-white/20'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-sm text-white">{st.label}</div>
                        <div className="text-[10px] text-text-muted">{st.desc}</div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-accent-gold bg-accent-gold' : 'border-white/30'
                      }`}>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-bg-primary" />}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Internal Spaces */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-2">تقسيم المساحات والمحتويات</h3>
              <p className="text-text-secondary text-xs sm:text-sm">حدد أعداد الغرف والمرافق لحساب تكاليف التأسيس والتوزيع الهندسي بدقة.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'عدد غرف النوم', value: rooms, setValue: setRooms, max: 6, min: 1, hint: 'ماستر وغرف أطفال' },
                { label: 'قطع الريسبشن والصالون', value: reception, setValue: setReception, max: 4, min: 1, hint: 'صالون وسفرة ومعيشة' },
                { label: 'عدد الحمامات', value: bathrooms, setValue: setBathrooms, max: 4, min: 1, hint: 'رئيسي، ماستر، ضيوف' },
                { label: 'عدد المطابخ', value: kitchens, setValue: setKitchens, max: 2, min: 1, hint: 'مطبخ أمريكي أو مغلق' },
                { label: 'عدد البلكونات والتراس', value: balconies, setValue: setBalconies, max: 4, min: 0, hint: 'شرفة خارجية ومناور' }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-2xl bg-bg-tertiary/60 border border-white/10 flex items-center justify-between"
                >
                  <div>
                    <div className="font-black text-sm text-white mb-0.5">{item.label}</div>
                    <div className="text-[11px] text-text-muted">{item.hint}</div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={item.value <= item.min}
                      onClick={() => item.setValue(Math.max(item.min, item.value - 1))}
                      className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-accent-gold/50 text-white flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-black text-lg text-accent-gold w-6 text-center">
                      {item.value}
                    </span>
                    <button
                      type="button"
                      disabled={item.value >= item.max}
                      onClick={() => item.setValue(Math.min(item.max, item.value + 1))}
                      className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-accent-gold/50 text-white flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Live Calculation Preview Banner */}
            <div className="p-4 rounded-2xl bg-accent-gold/10 border border-accent-gold/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent-gold text-bg-primary flex items-center justify-center flex-shrink-0">
                  <Calculator size={20} />
                </div>
                <div>
                  <div className="text-xs text-text-muted font-bold">التقدير المبدئي للتكلفة:</div>
                  <div className="text-base sm:text-lg font-black text-white">
                    {roundedTotal.toLocaleString('ar-EG')} ج.م
                  </div>
                </div>
              </div>
              <span className="text-[11px] text-accent-gold font-bold">بمعدل ~ {Math.round(roundedTotal / area).toLocaleString('ar-EG')} ج/م²</span>
            </div>
          </motion.div>
        )}

        {/* Step 3: Contact & Location Details */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-2">بيانات العميل ومعاينة المشروع</h3>
              <p className="text-text-secondary text-xs sm:text-sm">سجل بياناتك لإصدار المقايسة الرسمية باسمك وتجهيز ملف المعاينة.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-text-secondary mb-2">الاسم الكامل *</label>
                <div className="relative">
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="مثال: أحمد عبد الله"
                    className="w-full bg-bg-tertiary border border-white/10 rounded-xl py-3 px-4 text-sm text-white font-bold outline-none focus:border-accent-gold transition-colors pl-10"
                  />
                  <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-text-secondary mb-2">رقم الهاتف / واتساب *</label>
                <div className="relative">
                  <input
                    type="tel"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="01xxxxxxxxx"
                    dir="ltr"
                    className="w-full bg-bg-tertiary border border-white/10 rounded-xl py-3 px-4 text-sm text-white font-bold outline-none focus:border-accent-gold transition-colors pl-10 text-right"
                  />
                  <Phone size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-text-secondary mb-2">المدينة / المحافظة</label>
                <div className="relative">
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="مثال: القاهرة الجديدة / التجمع"
                    className="w-full bg-bg-tertiary border border-white/10 rounded-xl py-3 px-4 text-sm text-white font-bold outline-none focus:border-accent-gold transition-colors pl-10"
                  />
                  <MapPin size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-text-secondary mb-2">الدور / الطابق</label>
                <select
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}
                  className="w-full bg-bg-tertiary border border-white/10 rounded-xl py-3 px-4 text-sm text-white font-bold outline-none focus:border-accent-gold transition-colors cursor-pointer"
                >
                  <option value="أرضي / جاردن">أرضي / جاردن</option>
                  <option value="الدور الأول">الدور الأول</option>
                  <option value="الدور الثاني">الدور الثاني</option>
                  <option value="الدور الثالث">الدور الثالث</option>
                  <option value="الدور الرابع">الدور الرابع</option>
                  <option value="الدور الخامس فما فوق">الدور الخامس فما فوق</option>
                  <option value="رووف / فيلا مستقلة">رووف / فيلا مستقلة</option>
                </select>
              </div>
            </div>

            {/* Engineer Supervision Guarantee */}
            <div className="p-4 rounded-2xl bg-bg-primary/80 border border-white/10 flex items-start gap-3.5">
              <ShieldCheck size={22} className="text-accent-gold flex-shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed text-text-secondary">
                <span className="font-bold text-white block mb-0.5">ضمان الدقة الهندسية والإشراف المعتمد:</span>
                تخضع المقايسة للمراجعة المباشرة من قِبل <span className="text-accent-gold font-bold">م. محمد العجيزي</span> وفريق المكتب الفني لضمان مطابقة المواصفات الهندسية وميزانية العميل.
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 4: The Final Professional Quotation Output */}
        {currentStep === 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
            ref={quotePrintRef}
          >
            {/* Quotation Header Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-accent-gold/20 via-bg-tertiary to-bg-tertiary border border-accent-gold/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <BadgeCheck size={18} className="text-accent-gold" />
                  <span className="text-xs text-accent-gold font-bold uppercase tracking-wider">مقايسة معتمدة مبدئية</span>
                  <span className="px-2 py-0.5 rounded-md bg-white/10 text-white font-mono text-xs">{quoteCode}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  مقايسة تشطيب: {clientName}
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
                  {city} · مساحة {area} م² · مستوى {selectedTier.title}
                </p>
              </div>

              <div className="text-left sm:text-right w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-white/10">
                <span className="text-xs text-text-muted font-bold block">إجمالي التكلفة التقديرية</span>
                <span className="text-2xl sm:text-3xl font-black text-gold-gradient">
                  {roundedTotal.toLocaleString('ar-EG')} <span className="text-sm text-white">ج.م</span>
                </span>
              </div>
            </div>

            {/* Engineering Itemized Breakdown Table */}
            <div>
              <h4 className="text-sm font-black text-white mb-3 flex items-center gap-2">
                <Layers size={16} className="text-accent-gold" />
                <span>التوزيع الهندسي لبنود الأعمال التقديرية (BOQ Breakdown):</span>
              </h4>

              <div className="divide-y divide-white/5 border border-white/10 rounded-2xl overflow-hidden bg-bg-tertiary/40">
                {breakdown.map((b, i) => (
                  <div key={i} className="p-3.5 sm:p-4 flex items-center justify-between hover:bg-white/5 transition-colors text-xs sm:text-sm">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-accent-gold/15 text-accent-gold font-bold text-xs flex items-center justify-center flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="font-bold text-white">{b.name}</span>
                    </div>

                    <div className="flex items-center gap-4 flex-shrink-0">
                      <span className="text-text-muted text-xs font-mono hidden sm:inline-block">({b.pct}%)</span>
                      <span className="font-black text-white">
                        {b.amount.toLocaleString('ar-EG')} ج.م
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Specs Summary Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-text-muted block text-[11px] mb-0.5">الغرف والريسبشن</span>
                <span className="font-bold text-white">{rooms} غرف + {reception} ريسبشن</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-text-muted block text-[11px] mb-0.5">الحمامات والمطبخ</span>
                <span className="font-bold text-white">{bathrooms} حمام + {kitchens} مطبخ</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-text-muted block text-[11px] mb-0.5">الحالة الراهنة</span>
                <span className="font-bold text-white">{selectedState.label}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-text-muted block text-[11px] mb-0.5">مدة التنفيذ المقدرة</span>
                <span className="font-bold text-accent-gold">٦٠ - ٩٠ يوماً</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={handleSendWhatsApp}
                className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition-all cursor-pointer"
              >
                <MessageCircle size={18} />
                <span>إرسال المقايسة للمهندس محمد العجيزي عبر واتساب</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-bg-tertiary border border-white/10 hover:border-accent-gold text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Printer size={16} />
                <span>طباعة / حفظ PDF</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="w-full sm:w-auto py-3.5 px-4 rounded-xl bg-white/5 text-text-muted hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <RefreshCw size={14} />
                <span>حساب مقايسة جديدة</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Navigation Buttons (Steps 1 to 3) */}
        {currentStep < 4 && (
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer"
              >
                <ArrowRight size={16} />
                <span>السابق</span>
              </button>
            ) : <div />}

            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleNext}
              className="btn-premium inline-flex items-center gap-2 px-7 py-3 text-sm cursor-pointer"
            >
              <span>{currentStep === 3 ? 'إصدار تقرير المقايسة النهائي' : 'الخطوة التالية'}</span>
              <ArrowLeft size={16} />
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default ProfessionalQuotationWizard
