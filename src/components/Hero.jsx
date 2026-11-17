import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowLeft, ChevronDown, Sparkles, ShieldCheck, Clock, Award } from 'lucide-react'

const Hero = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  // Parallax effects
  const yText = useTransform(scrollYProgress, [0, 1], [0, 100])
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const opacityOverlay = useTransform(scrollYProgress, [0, 1], [0.85, 0.98])

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section 
      ref={ref} 
      className="relative min-h-[100dvh] h-[100dvh] w-full flex flex-col justify-end overflow-hidden bg-bg-primary"
    >
      {/* Cinematic Background Image */}
      <motion.div 
        style={{ scale: scaleImage }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <img 
          src="/mazar_hero.png" 
          onError={(e) => {
            // Fallback to luxury architectural photo if local asset fails
            e.currentTarget.src = "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=100"
          }}
          className="w-full h-full object-cover object-center brightness-[0.85]" 
          alt="مزار للتشطيبات المعمارية والديكور الداخلي"
        />
      </motion.div>

      {/* Atmospheric Luxury Gradient Overlays */}
      <motion.div 
        style={{ opacity: opacityOverlay }}
        className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/80 via-45% to-black/35 z-10 pointer-events-none" 
      />

      {/* Radial Gold Ambient Glow behind Bottom Content */}
      <div 
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent-gold/10 blur-[140px] rounded-full pointer-events-none z-10" 
      />

      {/* Bottom-Aligned Content */}
      <div className="container relative z-20 pb-20 sm:pb-16 md:pb-20 pt-24 sm:pt-28 flex flex-col justify-end">
        <motion.div 
          style={{ y: yText }}
          className="max-w-4xl"
        >
          {/* Luxury Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 sm:mb-5"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-gold/10 border border-accent-gold/30 text-accent-gold text-xs sm:text-sm font-bold backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-accent-gold animate-pulse" />
              <span>التميز المعماري الحديث · مزار للتشطيبات الفاخرة</span>
            </div>
          </motion.div>

          {/* Main Title - Responsive & Impactful */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.12] mb-3 sm:mb-5 text-white drop-shadow-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              نصمم الفخامة
            </motion.span>
            {' '}
            <motion.span 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="text-gold-gradient italic pr-2 sm:pr-4 inline-block"
            >
              بأدق التفاصيل
            </motion.span>
          </h1>

          {/* Subtitle / Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="text-text-secondary text-sm sm:text-base md:text-xl max-w-2xl mb-6 sm:mb-8 font-medium leading-relaxed"
          >
            نحول رؤيتك إلى واقع معماري استثنائي. تصميم داخلي وتنفيذ هندسي متكامل للمساحات السكنية والتجارية الراقية، نلتزم فيها بأعلى معايير الإتقان والدقة.
          </motion.p>

          {/* Action Buttons - Fully responsive touch targets */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-10"
          >
            <button 
              onClick={() => scrollToSection('estimator')}
              className="btn-premium group flex items-center justify-center gap-2.5 text-center"
            >
              <span>ابدأ مشروعك واحسب التكلفة</span>
              <ArrowLeft className="group-hover:-translate-x-1.5 transition-transform duration-300" size={18} />
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="btn-outline-premium text-center"
            >
              استكشف سابقة الأعمال
            </button>
          </motion.div>

          {/* Trust Highlights - Mobile & Desktop Friendly */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="grid grid-cols-3 gap-2 sm:gap-6 pt-4 border-t border-white/10 max-w-2xl text-[11px] sm:text-xs md:text-sm"
          >
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
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.button
        onClick={() => scrollToSection('stats')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="hidden md:flex absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-1 text-text-muted hover:text-accent-gold transition-colors cursor-pointer"
        aria-label="الانتقال للأسفل"
      >
        <span className="text-[10px] font-bold tracking-widest uppercase">اكتشف المزيد</span>
        <ChevronDown size={18} className="animate-bounce text-accent-gold" />
      </motion.button>
    </section>
  )
}

export default Hero
