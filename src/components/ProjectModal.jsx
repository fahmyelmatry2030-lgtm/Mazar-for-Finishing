import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, Calendar, CheckCircle2, Ruler, Sparkles, ArrowLeft, Layers, ShieldCheck } from 'lucide-react'

const ProjectModal = ({ project, onClose, onRequestSimilar }) => {
  if (!project) return null

  // Sample gallery images for the project
  const gallery = project.gallery || [
    project.image,
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
  ]

  const [activeImageIndex, setActiveImageIndex] = useState(0)

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[2000] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-bg-secondary border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl z-10 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-white/10 flex justify-between items-center bg-bg-primary/50">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent-gold/10 border border-accent-gold/30 flex items-center justify-center text-accent-gold">
                <Sparkles size={16} />
              </div>
              <div>
                <h3 className="text-lg sm:text-2xl font-black text-white" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-accent-gold font-bold">
                  <MapPin size={12} />
                  <span>{project.location || 'القاهرة الجديدة'}</span>
                </div>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white transition-colors"
              aria-label="إغلاق"
            >
              <X size={20} />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {/* Main Showcase Image */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 bg-bg-primary">
              <img 
                src={gallery[activeImageIndex]} 
                alt={project.title}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-white">
                صورة {activeImageIndex + 1} من {gallery.length}
              </div>
            </div>

            {/* Thumbnail Carousel */}
            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                    activeImageIndex === idx ? 'border-accent-gold scale-105' : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Project Specifications Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center">
                <Ruler className="mx-auto mb-1 text-accent-gold" size={18} />
                <div className="text-[11px] text-text-muted font-bold">المساحة الإجمالية</div>
                <div className="text-sm sm:text-base font-black text-white">{project.area || '380 م²'}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center">
                <Layers className="mx-auto mb-1 text-accent-gold" size={18} />
                <div className="text-[11px] text-text-muted font-bold">الطراز المعماري</div>
                <div className="text-sm sm:text-base font-black text-white">{project.style || 'مودرن لاكجري'}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center">
                <Calendar className="mx-auto mb-1 text-accent-gold" size={18} />
                <div className="text-[11px] text-text-muted font-bold">مدة التنفيذ</div>
                <div className="text-sm sm:text-base font-black text-white">{project.duration || '75 يوماً'}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center">
                <ShieldCheck className="mx-auto mb-1 text-accent-gold" size={18} />
                <div className="text-[11px] text-text-muted font-bold">فترة الضمان</div>
                <div className="text-sm sm:text-base font-black text-white">10 سنوات شامل</div>
              </div>
            </div>

            {/* Project Story & Materials */}
            <div className="bg-bg-primary/60 p-4 sm:p-5 rounded-xl border border-white/5 space-y-3">
              <h4 className="font-bold text-sm sm:text-base text-white">تفاصيل ومواصفات التنفيذ:</h4>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {project.description || 'تم تنفيذ هذا المشروع وفق أعلى المعايير الهندسية مع استخدام رخام كرارا إيطالي مستورد، وأعمال جبس بورد معمارية فريدة، بالإضافة إلى دمج أنظمة الإضاءة الذكية والتحكم الصوتي بالكامل.'}
              </p>
              
              <div className="flex flex-wrap gap-2 pt-2">
                {['رخام إيطالي مستورد', 'سمارت هوم KNX', 'أبواب أرو ماسيف', 'تكييف مركزي مخفي VRF', 'عزل صوتي كامل'].map((tag, i) => (
                  <span key={i} className="text-xs font-bold px-2.5 py-1 rounded-md bg-accent-gold/10 text-accent-gold border border-accent-gold/20 flex items-center gap-1">
                    <CheckCircle2 size={12} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Footer CTA */}
          <div className="p-4 sm:p-6 border-t border-white/10 bg-bg-primary/80 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="text-xs text-text-muted text-center sm:text-right">
              هل نال هذا الطراز إعجابك؟ تواصل معنا لتنفيذ مساحة مماثلة.
            </div>
            <button 
              onClick={() => {
                onClose()
                if (onRequestSimilar) onRequestSimilar(project)
              }}
              className="btn-premium w-full sm:w-auto py-3 px-6 text-sm font-bold flex items-center justify-center gap-2 rounded-xl"
            >
              <span>طلب تصميم وتشطيب مماثل</span>
              <ArrowLeft size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default ProjectModal
