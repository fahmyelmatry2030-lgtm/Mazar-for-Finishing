import React from 'react'
import { motion } from 'framer-motion'
import { Check, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const services = [
  { 
    id: '01', 
    title: 'التصميم المعماري والداخلي', 
    desc: 'نحول المساحات الصامتة إلى قصص تروى. فريقنا من المهندسين يصمم لك فراغات تتنفس الفخامة، مع دراسة دقيقة لحركة الضوء، وتوزيع الأثاث، واختيار الخامات التي تعكس شخصيتك.',
    points: ['مخططات تنفيذية (Shop Drawings)', 'تصور ثلاثي الأبعاد 3D Max واقعي', 'دراسة وتحليل المساحات والإضاءة'],
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=90'
  },
  { 
    id: '02', 
    title: 'التنفيذ والتشطيب الفاخر', 
    desc: 'لا مجال للصدفة أو الخطأ. ننفذ أدق التفاصيل الهندسية بمهارة حرفية استثنائية، مع التزام صارم بالجدول الزمني والمواصفات القياسية العالمية في كافة بنود التشطيب.',
    points: ['توريد وتركيب الرخام المستورد والباركيه', 'أعمال الجبس بورد والديكورات الخاصة', 'تأسيس شبكات ذكية متكاملة (Smart Home)'],
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=90'
  },
  { 
    id: '03', 
    title: 'الإشراف وإدارة المشروعات', 
    desc: 'نحمل عنك عناء المتابعة اليومية. ندير مشروعك باحترافية كاملة، مع تقديم تقارير دورية تضمن لك الشفافية التامة في التكاليف ومراحل الإنجاز ومطابقة المواصفات.',
    points: ['مراقبة ومطابقة الجودة الهندسية (QC)', 'إدارة الميزانية والمشتريات بشفافية', 'استلام البنود الهندسية بمحاضر رسمية'],
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=90'
  }
]

const Services = () => {
  return (
    <section id="services" className="section-padding bg-bg-secondary relative overflow-hidden">
      <div className="container">
        
        {/* Section Header */}
        <div className="text-center mb-14 sm:mb-20 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="subtitle justify-center mb-4 sm:mb-6">خبراتنا الهندسية</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black">
              نصنع <span className="text-gold-gradient italic">الفارق في كل تفصيلة</span>
            </h2>
          </motion.div>
        </div>

        {/* Services List */}
        <div className="flex flex-col gap-16 sm:gap-24 lg:gap-32">
          {services.map((s, i) => (
            <div 
              key={s.id} 
              className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10 sm:gap-14 lg:gap-20`}
            >
              
              {/* Image Side */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="w-full lg:w-1/2 relative group"
              >
                {/* Decorative border */}
                <div className="absolute inset-0 bg-accent-gold/15 translate-x-2 translate-y-2 sm:translate-x-3 sm:translate-y-3 rounded-2xl -z-10 transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4" />
                
                <div className="overflow-hidden rounded-2xl shadow-premium aspect-[4/3] bg-bg-tertiary">
                  <img 
                    src={s.image} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    alt={s.title} 
                    loading="lazy"
                  />
                </div>
                
                <div 
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 text-4xl sm:text-6xl font-black text-white/30 backdrop-blur-sm px-3 py-1 rounded-xl bg-black/40 leading-none pointer-events-none" 
                  style={{ fontFamily: 'Tajawal, sans-serif' }}
                >
                  {s.id}
                </div>
              </motion.div>

              {/* Text Side */}
              <motion.div 
                initial={{ opacity: 0, x: i % 2 === 1 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="w-full lg:w-1/2"
              >
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6 leading-tight text-white">
                  {s.title}
                </h3>
                <p className="text-text-secondary text-sm sm:text-base md:text-lg font-medium leading-relaxed mb-6 sm:mb-8">
                  {s.desc}
                </p>
                
                <ul className="space-y-3.5 sm:space-y-4 mb-8 sm:mb-10">
                  {s.points.map((p, idx) => (
                    <li key={idx} className="flex items-center gap-3 sm:gap-4 text-text-primary font-bold text-sm sm:text-base">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-accent-gold/15 border border-accent-gold/40 flex items-center justify-center text-accent-gold flex-shrink-0">
                        <Check size={14} />
                      </div>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                
                <a 
                  href="#contact" 
                  className="btn-premium group inline-flex items-center gap-2.5 text-sm sm:text-base"
                >
                  <span>اطلب استشارة مجانية</span>
                  <ArrowLeft size={18} className="group-hover:-translate-x-1.5 transition-transform" />
                </a>
              </motion.div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Services
