import React from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const steps = [
  { id: '٠١', title: 'الرؤية والاتفاق', desc: 'عقد جلسات استشارية مطولة للوقوف على أدق تفاصيل رغباتك وتطلعاتك لتصميم المساحة.' },
  { id: '٠٢', title: 'التصميم الثلاثي الأبعاد', desc: 'تقديم تصور مرئي كامل يحاكي الواقع، لضمان تطابق الرؤية مع النتيجة النهائية قبل البدء.' },
  { id: '٠٣', title: 'التنفيذ الهندسي', desc: 'إطلاق ورش العمل تحت إشراف نخبة من المهندسين مع الالتزام الصارم بالجدول الزمني.' },
  { id: '٠٤', title: 'التسليم الفاخر', desc: 'مرحلة وضع اللمسات النهائية والتسليم النهائي للمشروع ليكون جاهزاً بالكامل لاستقبالك.' },
]

const Process = () => {
  return (
    <section id="process" className="py-32 bg-bg-primary relative border-t border-white/5">
      <div className="container">
        
        <div className="text-center mb-24">
          <span className="subtitle justify-center mb-6">رحلة الإبداع</span>
          <h2 className="text-[3rem] md:text-[5rem] font-black leading-tight">كيف نعمل في <span className="text-gold-gradient italic">مزار</span></h2>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-white/10 -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2, ease: [0.83, 0, 0.17, 1] }}
                className="relative group bg-bg-secondary p-10 rounded-2xl border border-white/5 hover:border-accent-gold/30 transition-colors duration-500"
              >
                <div className="text-6xl text-accent-gold/10 font-black mb-6 group-hover:text-accent-gold/20 transition-colors" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                  {s.id}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-accent-gold transition-colors">{s.title}</h3>
                <p className="text-text-secondary font-medium leading-relaxed">
                  {s.desc}
                </p>
                
                {/* Node for line */}
                <div className="hidden lg:flex absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-bg-primary border-2 border-accent-gold z-10" />
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default Process
