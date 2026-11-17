import React from 'react'
import { motion } from 'framer-motion'
import { Compass, Box, Hammer, Key } from 'lucide-react'

const steps = [
  { 
    id: '٠١', 
    title: 'الرؤية وجلسة التخطيط', 
    icon: Compass,
    desc: 'جلسة استشارية معمقة لفهم ذوقك وميزانيتك ومتطلبات أسرتك أو عملك بدقة.' 
  },
  { 
    id: '٠٢', 
    title: 'التصميم الثلاثي الأبعاد 3D', 
    icon: Box,
    desc: 'محاكاة واقعية تشاهد فيها منزلك قبل بدء أي أعمال تكسير أو شراء خامات.' 
  },
  { 
    id: '٠٣', 
    title: 'التنفيذ والإشراف الهندسي', 
    icon: Hammer,
    desc: 'فريق متخصص من المهندسين والحرفيين المهرة يلتزم بالجدول والمواصفات القياسية.' 
  },
  { 
    id: '٠٤', 
    title: 'التسليم الفاخر والضمان', 
    icon: Key,
    desc: 'تسليم متكامل على المفتاح مع شهادات ضمان رسمية على كافة البنود والأنظمة.' 
  },
]

const Process = () => {
  return (
    <section id="process" className="section-padding bg-bg-primary relative border-t border-white/5 overflow-hidden">
      <div className="container">
        
        {/* Section Header */}
        <div className="text-center mb-14 sm:mb-20">
          <span className="subtitle justify-center mb-4 sm:mb-6">منهجية العمل</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white">
            رحلة التنفيذ في <span className="text-gold-gradient italic">مزار</span>
          </h2>
        </div>

        {/* Process Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {steps.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative group bg-bg-secondary p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-accent-gold/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-accent-gold/10 border border-accent-gold/30 flex items-center justify-center text-accent-gold group-hover:bg-accent-gold group-hover:text-bg-primary transition-colors duration-300">
                    <s.icon size={22} />
                  </div>
                  <span 
                    className="text-3xl sm:text-4xl font-black text-white/20 group-hover:text-accent-gold/40 transition-colors"
                    style={{ fontFamily: 'Tajawal, sans-serif' }}
                  >
                    {s.id}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-black mb-3 text-white group-hover:text-accent-gold transition-colors">
                  {s.title}
                </h3>
                
                <p className="text-text-secondary text-sm font-medium leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-gold/40 group-hover:bg-accent-gold transition-colors" />
                <span className="text-xs text-text-muted font-bold">المرحلة {s.id}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Process
