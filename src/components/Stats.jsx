import React from 'react'
import { motion } from 'framer-motion'

const Stats = () => {
  const stats = [
    { number: '١٥٠+', label: 'مشروع تسليم مفتاح' },
    { number: '١٢', label: 'عاماً من التميز' },
    { number: '٩٩٪', label: 'معدل رضا العملاء' },
    { number: '٥٠+', label: 'خبير ومهندس' },
  ]

  return (
    <section className="relative z-30 -mt-24 md:-mt-32 pb-24">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.83, 0, 0.17, 1] }}
          className="glass-panel rounded-2xl p-10 md:p-16 shadow-premium"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 divide-x divide-x-reverse divide-white/10">
            {stats.map((s, i) => (
              <div key={i} className="text-center px-4">
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 + (i * 0.1), ease: "easeOut" }}
                  className="text-5xl md:text-7xl font-black text-gold-gradient mb-4 inline-block"
                  style={{ fontFamily: 'Tajawal, sans-serif' }}
                >
                  {s.number}
                </motion.div>
                <div className="text-sm md:text-base font-bold text-text-secondary uppercase tracking-[0.1em]">
                  {s.label}
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
