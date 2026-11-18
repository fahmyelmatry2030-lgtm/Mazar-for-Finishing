import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Video, Building, MapPin, Clock, CheckCircle2, User, Phone, Send, ArrowLeft, Shield } from 'lucide-react'
import toast from 'react-hot-toast'
import { useStore } from '../store/useStore'

const consultationTypes = [
  {
    id: 'online',
    icon: Video,
    title: 'استشارة هندسية أونلاين',
    subtitle: 'عبر Zoom أو Google Meet',
    duration: '45 دقيقة',
    fee: 'مجانية لفترة محدودة',
    desc: 'مناقشة أفكار التصميم، توزيع الفراغات، واقتراح الطراز والبدائل الهندسية المناسبة لميزانيتك من راحة منزلك.'
  },
  {
    id: 'office',
    icon: Building,
    title: 'جلسة استشارية بمقر الشركة',
    subtitle: 'التجمع الخامس - التسعين الشمالي',
    duration: '60 دقيقة',
    fee: 'مجانية بالكامل',
    desc: 'جلسة مطولة مع استشاري الديكور لرؤية عينات الخامات، الكتالوجات، والكتل اللونية، ومناقشة مخططاتك على شاشات العرض.'
  },
  {
    id: 'site',
    icon: MapPin,
    title: 'معاينة ميدانية للموقع',
    subtitle: 'زيارة موقع العقار ورفع المقاسات',
    duration: 'معاينة هندسية شاملة',
    fee: 'تخصم من قيمة التعاقد',
    desc: 'حضور مهندس معماري متخصص لموقعك لرفع الأبعاد بدقة، وفحص شبكات التغذية والصرف، ومطابقة الواقع مع المخطط.'
  }
]

const timeSlots = [
  { id: 'm1', time: '11:00 صباحاً - 01:00 ظهراً', label: 'الفترة الصباحية' },
  { id: 'm2', time: '02:00 ظهراً - 04:00 عصراً', label: 'فترة الظهيرة' },
  { id: 'e1', time: '05:00 مساءً - 07:00 مساءً', label: 'الفترة المسائية الأولى' },
  { id: 'e2', time: '07:30 مساءً - 09:30 مساءً', label: 'الفترة المسائية الثانية' },
]

const ConsultationBooking = ({ onOpenPayment }) => {
  const [selectedType, setSelectedType] = useState('online')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedSlot, setSelectedSlot] = useState('e1')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    area: '',
    notes: '',
    propertyStage: 'على المحارة'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const addQuote = useStore(state => state.addQuote)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedDate) {
      toast.error('يرجى اختيار التاريخ المفضل للاستشارة')
      return
    }

    setIsSubmitting(true)

    try {
      const typeObj = consultationTypes.find(t => t.id === selectedType)
      const slotObj = timeSlots.find(s => s.id === selectedSlot)

      // Save consultation to Zustand store
      addQuote({
        client: formData.name,
        phone: formData.phone,
        type: `حجز استشارة (${typeObj.title}) - موعد: ${selectedDate} (${slotObj?.time})`,
        date: new Date().toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' }),
        value: typeObj.fee,
        status: 'pending'
      })

      toast.success('تم تسجيل طلب حجز الاستشارة بنجاح! سيتم التواصل معك لتأكيد الموعد.', {
        style: { background: '#181818', color: '#fff', border: '1px solid rgba(212,175,55,0.3)' },
        iconTheme: { primary: '#D4AF37', secondary: '#181818' }
      })

      setIsSuccess(true)
    } catch (err) {
      toast.error('حدث خطأ أثناء إرسال الطلب، يرجى المحاولة لاحقاً.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get tomorrow's date string as min date
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  return (
    <section id="consultation" className="section-padding bg-bg-secondary relative overflow-hidden">
      <div className="container relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="subtitle justify-center mb-4 sm:mb-6">خدمة العملاء والاستشارات</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-3">
            احجز <span className="text-gold-gradient italic">استشارتك الهندسية</span>
          </h2>
          <p className="text-text-secondary text-sm sm:text-base font-medium max-w-2xl mx-auto">
            تحدث مباشرة مع نخبة من كبار مهندسي الديكور والتنفيذ في مزار لتوجيه مساحتك نحو أفضل الحلول المعمارية.
          </p>
        </div>

        {isSuccess ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto glass-panel p-8 sm:p-12 rounded-3xl border border-accent-gold/40 text-center shadow-2xl"
          >
            <div className="w-16 h-16 rounded-full bg-accent-gold/20 border border-accent-gold flex items-center justify-center text-accent-gold mx-auto mb-6">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-2xl font-black text-white mb-2" style={{ fontFamily: 'Tajawal, sans-serif' }}>
              تم تأكيد تسجيل موعدك بنجاح!
            </h3>
            <p className="text-text-secondary text-sm mb-6 leading-relaxed">
              شكراً لاختيارك مزار. تم إرسال تفاصيل موعد الاستشارة إلى فريقنا الهندسي، وسنقوم بالتواصل معك عبر الهاتف والواتساب لتأكيد الرابط أو عنوان المعاينة.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a 
                href={`https://wa.me/201225433070?text=${encodeURIComponent(`مرحباً، قمت بحجز استشارة هندسية باسم: ${formData.name} لموعد: ${selectedDate}`)}`}
                target="_blank"
                rel="noreferrer"
                className="btn-premium py-3 px-6 text-sm font-bold flex items-center justify-center gap-2"
              >
                <span>تأكيد الموعد عبر واتساب فوراً</span>
                <ArrowLeft size={16} />
              </a>
              <button 
                onClick={() => setIsSuccess(false)}
                className="btn-outline-premium py-3 px-6 text-sm font-bold"
              >
                حجز موعد آخر
              </button>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8">
            
            {/* Step 1: Select Consultation Type */}
            <div className="glass-panel p-5 sm:p-8 rounded-2xl border border-white/10">
              <h3 className="text-lg sm:text-xl font-black text-white mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-accent-gold text-bg-primary flex items-center justify-center text-sm font-black">١</span>
                <span>اختر نوع الاستشارة المطلوبة</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {consultationTypes.map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedType(t.id)}
                    className={`p-5 rounded-2xl border-2 transition-all duration-200 text-right flex flex-col justify-between active:scale-98 ${
                      selectedType === t.id 
                        ? 'border-accent-gold bg-accent-gold/15 shadow-[0_0_20px_rgba(212,175,55,0.2)]' 
                        : 'border-white/10 hover:border-white/20 bg-white/5'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <div className={`p-2.5 rounded-xl ${selectedType === t.id ? 'bg-accent-gold text-bg-primary' : 'bg-white/10 text-accent-gold'}`}>
                          <t.icon size={22} />
                        </div>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-accent-gold">
                          {t.duration}
                        </span>
                      </div>
                      <h4 className="font-black text-base text-white mb-1">{t.title}</h4>
                      <p className="text-xs text-text-secondary leading-relaxed mb-3">{t.desc}</p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex justify-between items-center text-xs font-bold">
                      <span className="text-text-muted">الرسوم:</span>
                      <span className="text-accent-gold font-black">{t.fee}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Date & Slot Selection */}
            <div className="glass-panel p-5 sm:p-8 rounded-2xl border border-white/10">
              <h3 className="text-lg sm:text-xl font-black text-white mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-accent-gold text-bg-primary flex items-center justify-center text-sm font-black">٢</span>
                <span>حدد اليوم والوقت المناسب لك</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-bold text-text-secondary mb-2">تاريخ الاستشارة المفضل</label>
                  <div className="relative">
                    <input 
                      type="date" 
                      min={minDate}
                      required
                      value={selectedDate}
                      onChange={e => setSelectedDate(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm sm:text-base text-white font-bold outline-none focus:border-accent-gold transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-text-secondary mb-2">حالة العقار الحالية</label>
                  <select 
                    value={formData.propertyStage}
                    onChange={e => setFormData({ ...formData, propertyStage: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm sm:text-base text-white font-bold outline-none focus:border-accent-gold transition-colors"
                  >
                    <option value="على المحارة" className="bg-bg-secondary">على المحارة (نصف تشطيب)</option>
                    <option value="طوب أحمر" className="bg-bg-secondary">طوب أحمر (هيكل خرساني)</option>
                    <option value="إعادة تجديد" className="bg-bg-secondary">إعادة تجديد وديكور كامل</option>
                    <option value="تحت الإنشاء" className="bg-bg-secondary">تحت الإنشاء (مرحلة المخططات)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-text-secondary mb-2">الفترة الزمنية المفضلة</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {timeSlots.map(slot => (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => setSelectedSlot(slot.id)}
                      className={`p-3.5 rounded-xl border text-right transition-all flex items-center justify-between ${
                        selectedSlot === slot.id 
                          ? 'border-accent-gold bg-accent-gold/15 text-white' 
                          : 'border-white/10 hover:border-white/20 bg-white/5 text-text-secondary'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-white">{slot.time}</div>
                        <div className="text-[11px] text-text-muted">{slot.label}</div>
                      </div>
                      <Clock size={16} className={selectedSlot === slot.id ? 'text-accent-gold' : 'text-text-muted'} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 3: Client Details */}
            <div className="glass-panel p-5 sm:p-8 rounded-2xl border border-white/10">
              <h3 className="text-lg sm:text-xl font-black text-white mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-accent-gold text-bg-primary flex items-center justify-center text-sm font-black">٣</span>
                <span>بيانات التواصل وحجز الموعد</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold text-text-secondary mb-1.5">الاسم بالكامل</label>
                  <input 
                    type="text" 
                    required
                    placeholder="م. أحمد محمد"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-base text-white placeholder-text-muted font-bold outline-none focus:border-accent-gold transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-secondary mb-1.5">رقم الهاتف / الواتساب</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="01xxxxxxxxx"
                    dir="ltr"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-base text-white placeholder-text-muted font-bold outline-none focus:border-accent-gold transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-text-secondary mb-1.5">ملاحظات أو أسئلة خاصة للمهندس (اختياري)</label>
                <textarea 
                  rows="3"
                  placeholder="مثال: أرغب في استشارة حول إمكانية فتح المطبخ على الريسبشن وعمل جزيرة وسطية..."
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder-text-muted font-bold outline-none focus:border-accent-gold transition-colors resize-none"
                />
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-premium w-full py-4 text-base font-black flex items-center justify-center gap-2 rounded-xl"
                >
                  {isSubmitting ? (
                    <span>جاري تسجيل الموعد...</span>
                  ) : (
                    <>
                      <span>تأكيد حجز الاستشارة الهندسية</span>
                      <Send size={18} />
                    </>
                  )}
                </button>
              </div>

            </div>

          </form>
        )}

      </div>
    </section>
  )
}

export default ConsultationBooking

