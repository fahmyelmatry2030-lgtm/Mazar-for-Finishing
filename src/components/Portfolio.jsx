import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpLeft, MapPin } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import ProjectModal from './ProjectModal'

const categories = [
  { id: 'all', label: 'كافة الأعمال' },
  { id: 'res', label: 'قصور وفيلات' },
  { id: 'com', label: 'مقرات تجارية' },
  { id: 'ext', label: 'واجهات ولاندسكيب' },
]

const projects = [
  { 
    id: 1, 
    cat: 'res', 
    title: 'فيلا أوبسيديان الملكية', 
    location: 'التجمع الخامس - ديار المخابرات', 
    size: 'large', 
    area: '620 م²',
    style: 'مودرن لاكجري',
    duration: '90 يوماً',
    description: 'تصميم وتنفيذ كامل لفيلا فاخرة بمساحة 620 متر مربع تشمل ريسبشن مفتوح مع باركيه طبيعي ورخام إسباني مستورد، وجناح نوم رئيسي بنظام فندقي، مع أحدث أنظمة الإضاءة الذكية والتحكم عن بعد.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=90' 
  },
  { 
    id: 2, 
    cat: 'com', 
    title: 'مقر إيدج كورب الإداري', 
    location: 'العاصمة الإدارية الجديدة', 
    size: 'small', 
    area: '240 م²',
    style: 'بيزنس مودرن',
    duration: '45 يوماً',
    description: 'تصميم مساحات عمل مفتوحة وغرف اجتماعات معزولة صوتياً بالكامل، مع ديكورات خشبية هندسية مبتكرة تمنح بيئة عمل ملهمة للموظفين والعملاء.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    id: 3, 
    cat: 'res', 
    title: 'شقة سيمفوني الفاخرة', 
    location: 'الشيخ زايد - بيفرلي هيلز', 
    size: 'small', 
    area: '190 م²',
    style: 'نيو كلاسيك',
    duration: '60 يوماً',
    description: 'تشطيب شقة راقية بطابع نيو كلاسيك فرنسي يجمع بين بانوهات الجدران الأنيقة وتوزيع الإضاءة الدافئة والمخفية مع أرضيات رخامية فخمة.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    id: 4, 
    cat: 'ext', 
    title: 'قصر المرجان واللاندسكيب', 
    location: 'الساحل الشمالي - مراسي', 
    size: 'large', 
    area: '850 م²',
    style: 'ريزورت لاكجري',
    duration: '110 يوماً',
    description: 'تصميم معماري وتنفيذ واجهات حجر هاشمي مع لاندسكيب كامل يشمل إنفينيتي بول وجلسات خارجية مغطاة ببرجولات خشب التيك المعالج ضد الرطوبة.',
    image: 'https://images.unsplash.com/photo-1600607687940-c52af0424236?auto=format&fit=crop&w=1600&q=90' 
  },
]

const Portfolio = () => {
  const [active, setActive] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const navigate = useNavigate()

  const filtered = active === 'all' ? projects : projects.filter(p => p.cat === active)

  const handleRequestSimilar = (project) => {
    navigate('/request-design', { state: { projectTitle: project.title, style: project.style } })
  }

  return (
    <section id="portfolio" className="section-padding bg-bg-primary border-t border-white/5 relative">
      <div className="container">
        
        {/* Header & Category Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-16 gap-6 md:gap-12">
          <div className="max-w-2xl">
            <span className="subtitle mb-3 sm:mb-5">سجل الإنجازات وسابقة الأعمال</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white">
              مشاريع <span className="text-gold-gradient italic">أيقونية ونماذج تنفيذية</span>
            </h2>
            <p className="text-text-secondary text-xs sm:text-sm font-medium mt-2">
              انقر على أي مشروع لاستعراض معرض الصور الكامل، المواصفات الفنية، وبنود الخامات المستخدمة.
            </p>
          </div>
          
          {/* Scrollable Filters on Mobile */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 sm:pb-0 w-full md:w-auto scrollbar-none">
            {categories.map(c => (
              <button 
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`text-xs sm:text-sm font-bold uppercase tracking-wider px-4 sm:px-6 py-2.5 rounded-full border transition-all whitespace-nowrap flex-shrink-0 cursor-pointer ${
                  active === c.id 
                    ? 'border-accent-gold bg-accent-gold/15 text-accent-gold shadow-[0_0_15px_rgba(212,175,55,0.2)]' 
                    : 'border-white/10 text-text-secondary hover:border-accent-gold/40 hover:text-white bg-white/5'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.div
                key={p.id}
                layout
                onClick={() => setSelectedProject(p)}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative overflow-hidden rounded-2xl bg-bg-secondary border border-white/10 cursor-pointer ${
                  p.size === 'large' 
                    ? 'md:col-span-8 aspect-[16/11] sm:aspect-[16/10]' 
                    : 'md:col-span-4 aspect-[4/5] md:aspect-[3/4]'
                }`}
              >
                <img 
                  src={p.image} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  alt={p.title} 
                  loading="lazy"
                />
                
                {/* Permanent subtle gradient for mobile readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent sm:opacity-90 sm:group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5 sm:p-8" />

                {/* Card Content */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 flex items-end justify-between z-10">
                  <div>
                    <div className="flex items-center gap-1.5 text-accent-gold font-bold text-xs uppercase tracking-wider mb-1.5">
                      <MapPin size={13} />
                      <span>{p.location}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-accent-gold transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs text-text-muted mt-1 hidden sm:block">
                      {p.style} · {p.area}
                    </p>
                  </div>

                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent-gold/90 flex items-center justify-center text-bg-primary -rotate-45 group-hover:rotate-0 transition-transform duration-500 shadow-lg flex-shrink-0">
                    <ArrowUpLeft size={20} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer Link */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link to="/portfolio" className="btn-outline-premium inline-flex items-center gap-2">
            <span>استعراض كافة الأعمال السابقة</span>
            <ArrowUpLeft size={18} />
          </Link>
        </div>

      </div>

      {/* Full Project Modal & Lightbox */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
          onRequestSimilar={handleRequestSimilar}
        />
      )}
    </section>
  )
}

export default Portfolio
