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
    <section id="stats" className="relative z-20 py-10 sm:py-16 md:py-20 bg-bg-primary overflow-hidden">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6 }}
          className="glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 shadow-premium border border-white/10"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
            {stats.map((s, i) => (
              <div 
                key={i}
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
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Stats
