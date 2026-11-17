import React from 'react'
import { motion } from 'framer-motion'

const Stats = () => {
  const stats = [
    { number: '+١٥٠', label: 'مشروع تسليم مفتاح', hint: 'فلل وقصور ومقرات' },
    { number: '١٢', label: 'عاماً من التميز', hint: 'خبرة معمارية رائدة' },
    { number: '٪٩٩', label: 'معدل رضا العملاء', hint: 'تقييمات موثقة' },
    { number: '+٥٠', label: 'خبير ومهندس', hint: 'فريق عمل متكامل' },
  ]

  return (
    <section id="stats" className="relative z-20 py-10 sm:py-16 md:py-20 bg-bg-primary">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 shadow-premium border border-white/10"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
            {stats.map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * i }}
                className="glass-card-gold p-4 sm:p-6 rounded-xl sm:rounded-2xl text-center group"
              >
                <div 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gold-gradient mb-1 sm:mb-2 leading-none"
                  style={{ fontFamily: 'Tajawal, sans-serif' }}
                >
                  {s.number}
                </div>
                <div className="text-xs sm:text-sm md:text-base font-bold text-white mb-1">
                  {s.label}
                </div>
                <div className="text-[11px] sm:text-xs text-text-muted font-medium hidden sm:block">
                  {s.hint}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Stats
