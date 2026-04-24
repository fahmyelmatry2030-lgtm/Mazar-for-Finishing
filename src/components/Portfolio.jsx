import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpLeft } from 'lucide-react'

const categories = [
  { id: 'all', label: 'كافة الأعمال' },
  { id: 'res', label: 'قصور وفيلات' },
  { id: 'com', label: 'مقرات تجارية' },
  { id: 'ext', label: 'واجهات ولاندسكيب' },
]

const projects = [
  { id: 1, cat: 'res', title: 'فيلا أوبسيديان', location: 'التجمع الخامس', size: 'large', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=90' },
  { id: 2, cat: 'com', title: 'مقر إيدج كورب', location: 'العاصمة الإدارية', size: 'small', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' },
  { id: 3, cat: 'res', title: 'شقة سيمفوني', location: 'الشيخ زايد', size: 'small', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80' },
  { id: 4, cat: 'ext', title: 'قصر المرجان', location: 'الساحل الشمالي', size: 'large', image: 'https://images.unsplash.com/photo-1600607687940-c52af0424236?auto=format&fit=crop&w=1600&q=90' },
]

const Portfolio = () => {
  const [active, setActive] = useState('all')
  const filtered = active === 'all' ? projects : projects.filter(p => p.cat === active)

  return (
    <section id="portfolio" className="section-padding bg-bg-primary border-t border-white/5">
      <div className="container">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-12">
          <div className="max-w-2xl">
            <span className="subtitle mb-6">سجل الإنجازات</span>
            <h2 className="text-[3rem] md:text-[5rem] font-black leading-tight">مشاريع <br /> <span className="text-gold-gradient italic">أيقونية</span></h2>
          </div>
          
          <div className="flex flex-wrap gap-4 md:gap-8 justify-end w-full md:w-auto">
            {categories.map(c => (
              <button 
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`text-sm font-bold uppercase tracking-widest px-6 py-3 rounded-full border transition-all ${
                  active === c.id 
                    ? 'border-accent-gold bg-accent-gold/10 text-accent-gold' 
                    : 'border-white/10 text-text-secondary hover:border-accent-gold/50 hover:text-white'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.83, 0, 0.17, 1] }}
                className={`group relative cursor-pointer overflow-hidden rounded-xl ${
                  p.size === 'large' ? 'md:col-span-8 aspect-[16/10]' : 'md:col-span-4 aspect-[4/5] md:aspect-[3/4]'
                }`}
              >
                <img 
                  src={p.image} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  alt={p.title} 
                />
                
                {/* Premium Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500"
                  >
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-accent-gold font-bold text-sm tracking-widest uppercase mb-2 block">{p.location}</span>
                        <h3 className="text-3xl font-black text-white">{p.title}</h3>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-accent-gold flex items-center justify-center text-black -rotate-45 group-hover:rotate-0 transition-transform duration-700">
                        <ArrowUpLeft size={24} />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-20 text-center">
          <button className="btn-outline-premium">
            عرض كافة المشاريع
          </button>
        </div>

      </div>
    </section>
  )
}

export default Portfolio
