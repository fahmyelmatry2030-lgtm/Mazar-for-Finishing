import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

const Hero = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  // Parallax effects
  const yText = useTransform(scrollYProgress, [0, 1], [0, 200])
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const opacityOverlay = useTransform(scrollYProgress, [0, 1], [0.6, 0.9])

  return (
    <section ref={ref} className="relative h-screen w-full flex items-center overflow-hidden bg-bg-primary">
      
      {/* Cinematic Background */}
      <motion.div 
        style={{ scale: scaleImage }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=100" 
          className="w-full h-full object-cover grayscale-[30%]" 
          alt="Luxury Interior Design"
        />
      </motion.div>

      {/* Dark Overlay Gradient */}
      <motion.div 
        style={{ opacity: opacityOverlay }}
        className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/50 to-transparent z-10" 
      />

      {/* Content */}
      <div className="container relative z-20 h-full flex flex-col justify-center">
        <motion.div 
          style={{ y: yText }}
          className="max-w-5xl"
        >
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.83, 0, 0.17, 1] }}
          >
            <span className="subtitle mb-8">التميز المعماري الحديث</span>
          </motion.div>

          <h1 className="text-[4rem] md:text-[6rem] lg:text-[8rem] leading-[1.1] mb-10 text-text-primary drop-shadow-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.83, 0, 0.17, 1] }}
              className="block"
            >
              نصمم الفخامة
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.83, 0, 0.17, 1] }}
              className="block text-gold-gradient italic pr-4 md:pr-12"
            >
              بأدق التفاصيل
            </motion.span>
          </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="text-text-secondary text-lg md:text-2xl max-w-2xl mb-14 font-medium leading-relaxed"
          >
            مؤسسة مزار للتشطيبات والديكور. نقدم حلولاً هندسية متكاملة لتحويل المساحات إلى تحف معمارية تعكس أسلوب حياتك الراقي.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="flex flex-wrap gap-6"
          >
            <button className="btn-premium">
              ابدأ مشروعك <ArrowLeft className="mr-3" size={20} />
            </button>
            <button className="btn-outline-premium">
              استكشف أعمالنا
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
