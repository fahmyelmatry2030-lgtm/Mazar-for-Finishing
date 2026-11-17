import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ChevronDown, Sparkles, ShieldCheck, Clock, Award } from 'lucide-react'

const Hero = () => {
  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section 
      className="relative min-h-[100dvh] w-full flex flex-col justify-end bg-bg-primary overflow-hidden"
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <div className="w-full h-full scale-105 transition-transform duration-1000 ease-out">
          <img 
            src="/mazar_hero.png" 
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=100"
            }}
            className="w-full h-full object-cover object-center brightness-[0.85]" 
            alt="مزار للتشطيبات المعمارية والديكور الداخلي"
          />
        </div>
      </div>

      {/* Atmospheric Luxury Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/80 via-45% to-black/35 z-10 pointer-events-none" />

      {/* Radial Gold Ambient Glow behind Bottom Content */}
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-accent-gold/10 blur-[140px] rounded-full pointer-events-none z-10" />

      {/* Smooth Seamless Bottom Blend into Stats Section */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-bg-primary via-bg-primary/95 to-transparent z-15 pointer-events-none" />

      {/* Bottom-Aligned Content */}
      <div className="container relative z-20 pb-16 sm:pb-20 pt-28 sm:pt-36 flex flex-col justify-end">
        <div className="max-w-4xl">
          {/* Luxury Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-3 sm:mb-5"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-gold/10 border border-accent-gold/30 text-accent-gold text-xs sm:text-sm font-bold backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-accent-gold animate-pulse" />
              <span>التميز المعماري الحديث · مزار للتشطيبات الفاخرة</span>
            </div>
          </motion.div>

          {/* Main Title - Responsive & Impactful */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.15] mb-3 sm:mb-5 text-white drop-shadow-2xl"
          >
            <span className="inline-block">نصمم الفخامة</span>
            {' '}
            <span className="text-gold-gradient italic pr-2 sm:pr-4 inline-block">بأدق التفاصيل</span>
          </motion.h1>

          {/* Subtitle / Description */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-text-secondary text-sm sm:text-base md:text-xl max-w-2xl mb-6 sm:mb-8 font-medium leading-relaxed"
          >
            نحول رؤيتك إلى واقع معماري استثنائي. تصميم داخلي وتنفيذ هندسي متكامل للمساحات السكنية والتجارية الراقية، نلتزم فيها بأعلى معايير الإتقان والدقة.
          </motion.p>

          {/* Action Buttons - Fully responsive touch targets */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-10"
          >
            <button 
              onClick={() => scrollToSection('estimator')}
              className="btn-premium group flex items-center justify-center gap-2.5 text-center cursor-pointer"
            >
              <span>ابدأ مشروعك واحسب التكلفة</span>
              <ArrowLeft className="group-hover:-translate-x-1.5 transition-transform duration-300" size={18} />
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="btn-outline-premium text-center cursor-pointer"
            >
              استكشف سابقة الأعمال
            </button>
          </motion.div>

          {/* Trust Highlights */}
          <div className="grid grid-cols-3 gap-2 sm:gap-6 pt-4 border-t border-white/10 max-w-2xl text-[11px] sm:text-xs md:text-sm">
            <div className="flex items-center gap-1.5 sm:gap-2 text-text-secondary font-bold">
              <Award className="text-accent-gold flex-shrink-0" size={15} />
              <span>تسليم مفتاح متكامل</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-text-secondary font-bold">
              <ShieldCheck className="text-accent-gold flex-shrink-0" size={15} />
              <span>إشراف هندسي معتمد</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-text-secondary font-bold">
              <Clock className="text-accent-gold flex-shrink-0" size={15} />
              <span>التزام بالجدول الزمني</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <button
        onClick={() => scrollToSection('stats')}
        className="hidden md:flex absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-1 text-text-muted hover:text-accent-gold transition-colors cursor-pointer"
        aria-label="الانتقال للأسفل"
      >
        <span className="text-[10px] font-bold tracking-widest uppercase">اكتشف المزيد</span>
        <ChevronDown size={18} className="animate-bounce text-accent-gold" />
      </button>
    </section>
  )
}

export default Hero
