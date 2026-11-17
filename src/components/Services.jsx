import React from 'react'
import { motion } from 'framer-motion'
import { Check, ArrowLeft } from 'lucide-react'

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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.6 }}
          >
            <span className="subtitle justify-center mb-4 sm:mb-6">خبراتنا الهندسية</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
              نصنع <span className="text-gold-gradient italic">الفارق في كل تفصيلة</span>
            </h2>
          </motion.div>
        </div>

        {/* Services List */}
        <div className="flex flex-col gap-14 sm:gap-20 lg:gap-28">
          {services.map((s, i) => (
            <div 
              key={s.id} 
              className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 sm:gap-12 lg:gap-20`}
            >
              
              {/* Image Side */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.6 }}
                className="w-full lg:w-1/2 relative group"
              >
                <div className="overflow-hidden rounded-2xl shadow-premium aspect-[4/3] bg-bg-tertiary border border-white/10 group-hover:border-accent-gold/40 transition-colors">
                  <img 
                    src={s.image} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    alt={s.title} 
                    loading="lazy"
                  />
                </div>
                
                <div 
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 text-3xl sm:text-5xl font-black text-white/40 backdrop-blur-md px-3 py-1 rounded-xl bg-black/50 leading-none pointer-events-none border border-white/10" 
                  style={{ fontFamily: 'Tajawal, sans-serif' }}
                >
                  {s.id}
                </div>
              </motion.div>

              {/* Text Side */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="w-full lg:w-1/2"
              >
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-5 leading-tight text-white">
                  {s.title}
                </h3>
                <p className="text-text-secondary text-sm sm:text-base md:text-lg font-medium leading-relaxed mb-6 sm:mb-8">
                  {s.desc}
                </p>
                
                <ul className="space-y-3 sm:space-y-3.5 mb-8 sm:mb-10">
                  {s.points.map((p, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-text-primary font-bold text-sm sm:text-base">
                      <div className="w-6 h-6 rounded-full bg-accent-gold/15 border border-accent-gold/40 flex items-center justify-center text-accent-gold flex-shrink-0">
                        <Check size={14} />
                      </div>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                
                <a 
                  href="#contact" 
                  className="btn-premium group inline-flex items-center gap-2.5 text-sm sm:text-base cursor-pointer"
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
