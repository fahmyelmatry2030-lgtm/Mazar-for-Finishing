import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Pencil, Plus, Trash2, Save, Image, Type, Layout, Check, X } from 'lucide-react'
import { useStore } from '../store/useStore'
import toast from 'react-hot-toast'

const SectionTab = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 px-5 py-3 rounded-xl text-sm font-bold transition-all ${
      active ? 'bg-accent-gold text-bg-primary shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
    }`}
  >
    <Icon size={18} />
    {label}
  </button>
)

const CMS = () => {
  const webContent = useStore(state => state.webContent)
  const updateHero = useStore(state => state.updateHero)
  const addPortfolioItem = useStore(state => state.addPortfolioItem)

  const [activeTab, setActiveTab] = useState('hero')
  const [heroForm, setHeroForm] = useState({ ...webContent.hero })
  const [newPortfolio, setNewPortfolio] = useState({ title: '', category: '', image: '', description: '' })
  const [showAddPortfolio, setShowAddPortfolio] = useState(false)

  const handleSaveHero = () => {
    updateHero(heroForm)
    toast.success('تم حفظ محتوى الصفحة الرئيسية بنجاح!', {
      style: { background: '#1A1A1A', color: '#fff', border: '1px solid rgba(0,0,0,0.1)' },
      iconTheme: { primary: '#D4AF37', secondary: '#1A1A1A' }
    })
  }

  const handleAddPortfolio = (e) => {
    e.preventDefault()
    if (!newPortfolio.title || !newPortfolio.image) {
      toast.error('يرجى ملء اسم المشروع ورابط الصورة على الأقل.')
      return
    }
    addPortfolioItem(newPortfolio)
    toast.success('تم إضافة المشروع لمعرض الأعمال!', {
      style: { background: '#1A1A1A', color: '#fff', border: '1px solid rgba(0,0,0,0.1)' },
      iconTheme: { primary: '#D4AF37', secondary: '#1A1A1A' }
    })
    setNewPortfolio({ title: '', category: '', image: '', description: '' })
    setShowAddPortfolio(false)
  }

  const inputClass = "w-full bg-gray-50 border border-gray-300 rounded-xl py-3 px-4 font-bold text-sm focus:border-accent-gold outline-none transition-colors placeholder:text-gray-500"

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-black mb-2">إدارة <span className="text-gold-gradient">الموقع</span></h1>
        <p className="text-gray-500 font-medium">تحكم في محتوى موقعك العام مباشرةً بدون مبرمج.</p>
      </header>

      {/* Live Preview Badge */}
      <div className="flex items-center gap-3 px-5 py-3 bg-white shadow-sm border border-gray-200 rounded-xl border-accent-gold/20 border w-fit">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <Globe size={16} className="text-accent-gold" />
        <span className="text-sm font-bold text-accent-gold">التغييرات تظهر مباشرة على الموقع</span>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 flex-wrap">
        <SectionTab icon={Type} label="الصفحة الرئيسية (Hero)" active={activeTab === 'hero'} onClick={() => setActiveTab('hero')} />
        <SectionTab icon={Layout} label="معرض الأعمال" active={activeTab === 'portfolio'} onClick={() => setActiveTab('portfolio')} />
        <SectionTab icon={Globe} label="الخدمات" active={activeTab === 'services'} onClick={() => setActiveTab('services')} />
      </div>

      <AnimatePresence mode="wait">

        {/* HERO TAB */}
        {activeTab === 'hero' && (
          <motion.div key="hero" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-8 space-y-6">
              <h3 className="text-lg font-black flex items-center gap-2"><Pencil size={18} className="text-accent-gold" /> تعديل محتوى الصفحة الرئيسية</h3>
              
              <div>
                <label className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2 block">العنوان الفرعي (Subtitle)</label>
                <input className={inputClass} value={heroForm.subtitle} onChange={e => setHeroForm({ ...heroForm, subtitle: e.target.value })} placeholder="مثال: مزار للتشطيبات المعمارية" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2 block">الكلمة الذهبية (Highlight)</label>
                  <input className={inputClass} value={heroForm.titleHighlight} onChange={e => setHeroForm({ ...heroForm, titleHighlight: e.target.value })} placeholder="مثال: رؤيتك" />
                </div>
                <div>
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2 block">باقي العنوان</label>
                  <input className={inputClass} value={heroForm.titleNormal} onChange={e => setHeroForm({ ...heroForm, titleNormal: e.target.value })} placeholder="مثال: تتجسد في مساحات استثنائية" />
                </div>
              </div>
              <div>
                <label className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2 block">وصف الشركة</label>
                <textarea rows={4} className={inputClass} value={heroForm.description} onChange={e => setHeroForm({ ...heroForm, description: e.target.value })} placeholder="اكتب وصف جذاب للشركة..." />
              </div>

              {/* Live Preview */}
              <div className="p-6 rounded-xl bg-gray-50 border border-gray-200">
                <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">معاينة مباشرة</p>
                <p className="text-xs font-bold text-accent-gold mb-2">{heroForm.subtitle}</p>
                <h2 className="text-3xl font-black leading-tight mb-3">
                  <span className="text-gold-gradient">{heroForm.titleHighlight} </span>
                  {heroForm.titleNormal}
                </h2>
                <p className="text-sm text-gray-500 font-medium">{heroForm.description}</p>
              </div>

              <button onClick={handleSaveHero} className="btn-premium py-3 px-8 rounded-lg flex items-center gap-2">
                <Save size={18} /> حفظ التغييرات
              </button>
            </div>
          </motion.div>
        )}

        {/* PORTFOLIO TAB */}
        {activeTab === 'portfolio' && (
          <motion.div key="portfolio" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-black">مشاريع معرض الأعمال ({webContent.portfolio.length})</h3>
              <button onClick={() => setShowAddPortfolio(true)} className="btn-premium py-2 px-5 rounded-lg text-sm flex items-center gap-2">
                <Plus size={16} /> إضافة مشروع
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {webContent.portfolio.map((item) => (
                <div key={item.id} className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden border border-gray-200 group">
                  <div className="relative h-48 overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onError={e => { e.target.src = 'https://placehold.co/400x300/1a1a1a/D4AF37?text=مزار' }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-4 right-4 left-4">
                      <p className="text-xs font-black text-accent-gold uppercase tracking-wider">{item.category}</p>
                      <h4 className="font-black text-gray-900">{item.title}</h4>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-gray-500 font-medium">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Portfolio Modal */}
            <AnimatePresence>
              {showAddPortfolio && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[3000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                >
                  <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
                    className="bg-white shadow-sm border border-gray-200 w-full max-w-lg rounded-2xl overflow-hidden"
                  >
                    <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-white">
                      <h3 className="font-black text-lg">إضافة مشروع لمعرض الأعمال</h3>
                      <button onClick={() => setShowAddPortfolio(false)} className="p-2 text-gray-500 hover:text-red-500 rounded-lg transition-colors"><X size={20} /></button>
                    </div>
                    <form onSubmit={handleAddPortfolio} className="p-6 space-y-4 bg-gray-50">
                      <div>
                        <label className="text-xs font-black text-gray-500 mb-1 block">اسم المشروع *</label>
                        <input className={inputClass} value={newPortfolio.title} onChange={e => setNewPortfolio({ ...newPortfolio, title: e.target.value })} placeholder="فيلا أونيكس" required />
                      </div>
                      <div>
                        <label className="text-xs font-black text-gray-500 mb-1 block">التصنيف</label>
                        <input className={inputClass} value={newPortfolio.category} onChange={e => setNewPortfolio({ ...newPortfolio, category: e.target.value })} placeholder="تشطيب كامل، تصميم داخلي..." />
                      </div>
                      <div>
                        <label className="text-xs font-black text-gray-500 mb-1 block flex items-center gap-1"><Image size={12} /> رابط الصورة (URL) *</label>
                        <input className={inputClass} value={newPortfolio.image} onChange={e => setNewPortfolio({ ...newPortfolio, image: e.target.value })} placeholder="https://..." required />
                      </div>
                      <div>
                        <label className="text-xs font-black text-gray-500 mb-1 block">وصف المشروع</label>
                        <textarea rows={3} className={inputClass} value={newPortfolio.description} onChange={e => setNewPortfolio({ ...newPortfolio, description: e.target.value })} placeholder="وصف مختصر للمشروع..." />
                      </div>
                      <div className="flex gap-3 pt-2">
                        <button type="submit" className="flex-1 btn-premium py-3 rounded-lg flex items-center justify-center gap-2">
                          <Check size={18} /> إضافة للمعرض
                        </button>
                        <button type="button" onClick={() => setShowAddPortfolio(false)} className="px-6 py-3 border border-gray-300 rounded-lg font-bold text-gray-500 hover:text-gray-900 transition-colors">
                          إلغاء
                        </button>
                      </div>
                    </form>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* SERVICES TAB */}
        {activeTab === 'services' && (
          <motion.div key="services" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-8 space-y-6">
              <h3 className="text-lg font-black">الخدمات الحالية</h3>
              <div className="space-y-4">
                {webContent.services.map((service) => (
                  <div key={service.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="w-10 h-10 rounded-lg bg-accent-gold/10 text-accent-gold flex items-center justify-center font-black text-lg">{service.id}</div>
                    <div className="flex-1">
                      <p className="font-bold">{service.title}</p>
                      <p className="text-xs text-gray-500 font-medium mt-0.5">{service.desc}</p>
                    </div>
                    <button className="p-2 text-gray-500 hover:text-accent-gold transition-colors"><Pencil size={16} /></button>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 font-bold text-center py-4 border border-gray-200 rounded-xl">
                ✦ تعديل الخدمات بشكل مفصل قادم في التحديث القادم
              </p>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}

export default CMS
