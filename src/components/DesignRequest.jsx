import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Palette, Compass, Building, Trees, Upload, FileText, CheckCircle2, ArrowLeft, Send, Sparkles, DollarSign } from 'lucide-react'
import toast from 'react-hot-toast'
import { useStore } from '../store/useStore'

const designTypes = [
  { id: 'interior', icon: Palette, title: 'تصميم داخلي 3D شامل', desc: 'توزيع أثاث، لوحات ألوان، إضاءات، ومخططات تنفيذية لكافة الفراغات.' },
  { id: 'architectural', icon: Compass, title: 'تصميم معماري وتوزيع فراغات', desc: 'تعديل حوائط وتوزيع الفراغات المعمارية هندسياً مع رسومات Shop Drawings.' },
  { id: 'exterior', icon: Building, title: 'تصميم واجهات خارجية', desc: 'تصميم واجهات مودرن أو كلاسيك بخامات حجرية ودهانات وزجاج عاكس.' },
  { id: 'landscape', icon: Trees, title: 'لاندسكيب وحدائق وحمامات سباحة', desc: 'تنسيق الحدائق، الجلسات الخارجية، أنظمة الري، وتصميم حمامات السباحة.' }
]

const styles = [
  { id: 'modern', title: 'مودرن معاصر', badge: 'الأكثر طلباً' },
  { id: 'neoclassic', title: 'نيو كلاسيك فخم', badge: 'أناقة خالدة' },
  { id: 'classic', title: 'كلاسيك ملكي', badge: 'فخامة مطلقة' },
  { id: 'minimalist', title: 'مينيماليزم هادئ', badge: 'بساطة وعصرية' },
  { id: 'industrial', title: 'صناعي راقي (Industrial)', badge: 'عصري جريء' }
]

const DesignRequest = () => {
  const [selectedType, setSelectedType] = useState('interior')
  const [selectedStyle, setSelectedStyle] = useState('modern')
  const [area, setArea] = useState(180)
  const [rooms, setRooms] = useState('3 غرف وريسبشن')
  const [budgetRange, setBudgetRange] = useState('فاخر (Luxury)')
  const [files, setFiles] = useState([])
  const [clientData, setClientData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    specialRequests: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successCode, setSuccessCode] = useState(null)

  const addQuote = useStore(state => state.addQuote)

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files)
    if (uploadedFiles.length > 0) {
      setFiles(prev => [...prev, ...uploadedFiles.map(f => ({ name: f.name, size: `${(f.size / (1024 * 1024)).toFixed(2)} MB` }))])
      toast.success(`تم إرفاق ${uploadedFiles.length} ملف بنجاح`)
    }
  }

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const refCode = `MZR-DSG-${Math.floor(1000 + Math.random() * 9000)}`
      const typeObj = designTypes.find(t => t.id === selectedType)
      const styleObj = styles.find(s => s.id === selectedStyle)

      // Store into Zustand
      addQuote({
        client: clientData.name,
        phone: clientData.phone,
        type: `طلب تصميم: ${typeObj.title} - طراز: ${styleObj.title} (${area} م²) [كود: ${refCode}]`,
        date: new Date().toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' }),
        value: `ميزانية تقديرية: ${budgetRange}`,
        status: 'pending'
      })

      setSuccessCode(refCode)
      toast.success('تم إرسال طلب التصميم بنجاح! تم توليد كود متابعة لمشروعك.', {
        style: { background: '#181818', color: '#fff', border: '1px solid rgba(212,175,55,0.3)' },
        iconTheme: { primary: '#D4AF37', secondary: '#181818' }
      })
    } catch (err) {
      toast.error('حدث خطأ أثناء إرسال الطلب، يرجى المحاولة لاحقاً.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="design-request" className="section-padding bg-bg-primary relative overflow-hidden">
      <div className="container relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="subtitle justify-center mb-4 sm:mb-6">خدمة التصميم المعماري والداخلي</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-3">
            طلب عمل <span className="text-gold-gradient italic">تصميم هندسي مخصص</span>
          </h2>
          <p className="text-text-secondary text-sm sm:text-base font-medium max-w-2xl mx-auto">
            أرسل لنا متطلبات مساحتك ومخططك، وسيتولى فريق التصميم في مزار صياغة لوحات 3D ومخططات تنفيذية تفصيلية.
          </p>
        </div>

        {successCode ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto glass-panel p-8 sm:p-12 rounded-3xl border border-accent-gold/40 text-center shadow-2xl"
          >
            <div className="w-16 h-16 rounded-full bg-accent-gold/20 border border-accent-gold flex items-center justify-center text-accent-gold mx-auto mb-6">
              <CheckCircle2 size={36} />
            </div>
            
            <span className="text-xs font-bold text-accent-gold tracking-widest uppercase mb-1 block">
              رقم متابعة الطلب
            </span>
            <div className="text-3xl font-black text-white bg-white/5 py-3 px-6 rounded-2xl border border-white/10 mb-6 inline-block tracking-wider" dir="ltr">
              {successCode}
            </div>

            <h3 className="text-xl font-black text-white mb-3">
              تم استلام طلب التصميم بنجاح!
            </h3>
            <p className="text-text-secondary text-xs sm:text-sm mb-6 leading-relaxed">
              يقوم استشاري التصميم حالياً بمراجعة أبعاد المساحة والمخطط المرفق، وسيتواصل معك خلال ٢٤ ساعة لمناقشة التفاصيل وتقديم عرض السعر الفني والمالي.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a 
                href={`https://wa.me/201225433070?text=${encodeURIComponent(`مرحباً مزار، قمت بطلب تصميم باسم: ${clientData.name}، كود الطلب: ${successCode}`)}`}
                target="_blank"
                rel="noreferrer"
                className="btn-premium py-3 px-6 text-sm font-bold flex items-center justify-center gap-2"
              >
                <span>متابعة الطلب عبر واتساب</span>
                <ArrowLeft size={16} />
              </a>
              <button 
                onClick={() => setSuccessCode(null)}
                className="btn-outline-premium py-3 px-6 text-sm font-bold"
              >
                طلب تصميم آخر
              </button>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">
            
            {/* Step 1: Design Type */}
            <div className="glass-panel p-5 sm:p-8 rounded-2xl border border-white/10">
              <h3 className="text-base sm:text-lg font-black text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-accent-gold text-bg-primary flex items-center justify-center text-xs font-black">١</span>
                <span>اختر مجال ونوع التصميم</span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {designTypes.map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedType(t.id)}
                    className={`p-4 rounded-xl border-2 text-right transition-all flex items-start gap-3.5 ${
                      selectedType === t.id 
                        ? 'border-accent-gold bg-accent-gold/15 text-white shadow-[0_0_15px_rgba(212,175,55,0.2)]' 
                        : 'border-white/10 hover:border-white/20 bg-white/5 text-text-secondary'
                    }`}
                  >
                    <div className={`p-2 rounded-lg flex-shrink-0 ${selectedType === t.id ? 'bg-accent-gold text-bg-primary' : 'bg-white/10 text-accent-gold'}`}>
                      <t.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white mb-1">{t.title}</h4>
                      <p className="text-xs text-text-muted leading-relaxed">{t.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Preferred Style */}
            <div className="glass-panel p-5 sm:p-8 rounded-2xl border border-white/10">
              <h3 className="text-base sm:text-lg font-black text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-accent-gold text-bg-primary flex items-center justify-center text-xs font-black">٢</span>
                <span>اختر الطراز المعماري المفضل لديك</span>
              </h3>

              <div className="flex flex-wrap gap-2.5">
                {styles.map(s => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedStyle(s.id)}
                    className={`px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                      selectedStyle === s.id 
                        ? 'border-accent-gold bg-accent-gold text-bg-primary shadow-gold' 
                        : 'border-white/10 hover:border-white/20 bg-white/5 text-text-secondary'
                    }`}
                  >
                    <span>{s.title}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${selectedStyle === s.id ? 'bg-black/20 text-bg-primary' : 'bg-white/10 text-accent-gold'}`}>
                      {s.badge}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Space Specs & Budget */}
            <div className="glass-panel p-5 sm:p-8 rounded-2xl border border-white/10">
              <h3 className="text-base sm:text-lg font-black text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-accent-gold text-bg-primary flex items-center justify-center text-xs font-black">٣</span>
                <span>تفاصيل المساحة والميزانية المستهدفة</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold text-text-secondary mb-1.5">المساحة التقريبية (م²)</label>
                  <input 
                    type="number"
                    min="20"
                    max="5000"
                    value={area}
                    onChange={e => setArea(Number(e.target.value))}
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-base text-white font-bold outline-none focus:border-accent-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-text-secondary mb-1.5">تقسيم المساحة (الغرف/الفراغات)</label>
                  <input 
                    type="text"
                    placeholder="مثال: 3 غرف نوم + صالونين"
                    value={rooms}
                    onChange={e => setRooms(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm sm:text-base text-white font-bold outline-none focus:border-accent-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-text-secondary mb-1.5">مستوى الخامات المستهدف</label>
                  <select 
                    value={budgetRange}
                    onChange={e => setBudgetRange(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm sm:text-base text-white font-bold outline-none focus:border-accent-gold"
                  >
                    <option value="بريميوم (Premium)" className="bg-bg-secondary">بريميوم اقتصادي مدروس</option>
                    <option value="فاخر (Luxury)" className="bg-bg-secondary">فاخر (Luxury خامات عالية)</option>
                    <option value="ألترا لاكجري (Ultra Luxury)" className="bg-bg-secondary">ألترا لاكجري (قصور ورخام مستورد)</option>
                  </select>
                </div>
              </div>

              {/* File Attachment / Blueprint upload */}
              <div className="mt-4 pt-4 border-t border-white/5">
                <label className="block text-xs font-bold text-text-secondary mb-2">إرفاق مخطط أو كروكي أو صور الموقع (PDF, DWG, JPG)</label>
                
                <div className="border-2 border-dashed border-white/10 hover:border-accent-gold/40 rounded-2xl p-6 text-center cursor-pointer transition-colors relative bg-white/[0.02]">
                  <input 
                    type="file" 
                    multiple
                    accept=".pdf,.dwg,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <Upload className="mx-auto text-accent-gold mb-2" size={28} />
                  <div className="text-xs sm:text-sm font-bold text-white mb-1">
                    اسحب وأفلت المخطط هنا أو انقر للتصفح من جهازك
                  </div>
                  <div className="text-[11px] text-text-muted">
                    يدعم مخططات الأوتوكاد، ملفات PDF الهندسية، والصور الحية
                  </div>
                </div>

                {/* Display uploaded files */}
                {files.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {files.map((file, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2.5 rounded-lg bg-white/5 border border-white/10 text-xs">
                        <div className="flex items-center gap-2 text-white font-bold">
                          <FileText size={16} className="text-accent-gold" />
                          <span>{file.name}</span>
                          <span className="text-text-muted text-[10px]">({file.size})</span>
                        </div>
                        <button 
                          type="button" 
                          onClick={() => removeFile(idx)} 
                          className="text-red-400 hover:text-red-300 font-bold"
                        >
                          حذف
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Step 4: Contact info */}
            <div className="glass-panel p-5 sm:p-8 rounded-2xl border border-white/10">
              <h3 className="text-base sm:text-lg font-black text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-accent-gold text-bg-primary flex items-center justify-center text-xs font-black">٤</span>
                <span>بيانات صاحب المشروع</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold text-text-secondary mb-1.5">الاسم الكريم</label>
                  <input 
                    type="text" 
                    required
                    placeholder="م. كريم عبد الله"
                    value={clientData.name}
                    onChange={e => setClientData({ ...clientData, name: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-base text-white placeholder-text-muted font-bold outline-none focus:border-accent-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-secondary mb-1.5">رقم الهاتف / الواتساب</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="01xxxxxxxxx"
                    dir="ltr"
                    value={clientData.phone}
                    onChange={e => setClientData({ ...clientData, phone: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-base text-white placeholder-text-muted font-bold outline-none focus:border-accent-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-text-secondary mb-1.5">موقع العقار (المدينة / الكمبوند)</label>
                <input 
                  type="text"
                  placeholder="مثال: التجمع الخامس - كمبوند ميفيدا"
                  value={clientData.location}
                  onChange={e => setClientData({ ...clientData, location: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm sm:text-base text-white placeholder-text-muted font-bold outline-none focus:border-accent-gold"
                />
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-premium w-full py-4 text-base font-black flex items-center justify-center gap-2 rounded-xl"
                >
                  {isSubmitting ? (
                    <span>جاري إرسال المخططات والطلب...</span>
                  ) : (
                    <>
                      <span>إرسال طلب التصميم واستلام كود المتابعة</span>
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

export default DesignRequest

