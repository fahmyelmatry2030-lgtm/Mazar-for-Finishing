import React from 'react'
import { motion } from 'framer-motion'
import { Check, ArrowLeft } from 'lucide-react'

const services = [
  { 
    id: '01', 
    title: 'التصميم المعماري والداخلي', 
    desc: 'نحول المساحات الصامتة إلى قصص تروى. فريقنا من المهندسين يصمم لك فراغات تتنفس الفخامة، مع دراسة دقيقة لحركة الضوء، وتوزيع الأثاث، واختيار الخامات التي تعكس شخصيتك.',
    points: ['مخططات تنفيذية (Shop Drawings)', 'تصور ثلاثي الأبعاد 3D Max', 'دراسة وتحليل المساحات'],
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=90'
  },
  { 
    id: '02', 
    title: 'التنفيذ والتشطيب الفاخر', 
    desc: 'لا مجال للخطأ. ننفذ أدق التفاصيل الهندسية بمهارة حرفية عالية، مع التزام صارم بالجدول الزمني والمواصفات القياسية العالمية في كافة بنود التشطيب.',
    points: ['توريد وتركيب الرخام المستورد', 'أعمال الجبس بورد والديكور', 'تأسيس شبكات ذكية (Smart Home)'],
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=90'
  },
  { 
    id: '03', 
    title: 'الإشراف وإدارة المشروعات', 
    desc: 'نحمل عنك عبء المتابعة. ندير مشروعك من الألف إلى الياء، مع تقديم تقارير دورية تضمن لك الشفافية التامة في التكاليف ومراحل الإنجاز.',
    points: ['مراقبة الجودة (QC)', 'إدارة الميزانية والمشتريات', 'استلام البنود الهندسية'],
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=90'
  }
]

const Services = () => {
  return (
    <section id="services" className="section-padding bg-bg-secondary relative">
      <div className="container">
        
        <div className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="subtitle justify-center mb-6">خبراتنا الهندسية</span>
            <h2 className="text-[3rem] md:text-[5rem] font-black">نصنع <span className="text-gold-gradient italic">الفارق</span></h2>
          </motion.div>
        </div>

        <div className="flex flex-col gap-32">
          {services.map((s, i) => (
            <div key={s.id} className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 lg:gap-24`}>
              
              {/* Image Side */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: [0.83, 0, 0.17, 1] }}
                className="w-full lg:w-1/2 relative group"
              >
                <div className="absolute inset-0 bg-accent-gold/20 translate-x-4 translate-y-4 rounded-lg -z-10 transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6" />
                <div className="overflow-hidden rounded-lg shadow-premium aspect-[4/3]">
                  <img 
                    src={s.image} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[20%]" 
                    alt={s.title} 
                  />
                </div>
                <div className="absolute top-8 right-8 text-[6rem] font-black text-white/20 leading-none pointer-events-none" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                  {s.id}
                </div>
              </motion.div>

              {/* Text Side */}
              <motion.div 
                initial={{ opacity: 0, x: i % 2 === 1 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2, ease: [0.83, 0, 0.17, 1] }}
                className="w-full lg:w-1/2"
              >
                <h3 className="text-3xl md:text-5xl font-black mb-8 leading-tight">{s.title}</h3>
                <p className="text-text-secondary text-lg md:text-xl font-medium leading-relaxed mb-10">
                  {s.desc}
                </p>
                <ul className="space-y-6 mb-12">
                  {s.points.map((p, idx) => (
                    <li key={idx} className="flex items-center gap-4 text-text-primary font-bold text-lg">
                      <div className="w-8 h-8 rounded-full border border-border-gold flex items-center justify-center text-accent-gold">
                        <Check size={16} />
                      </div>
                      {p}
                    </li>
                  ))}
                </ul>
                <button className="btn-premium py-4 px-10 rounded-sm group">
                  <span className="flex items-center gap-3">
                    اطلب استشارة مجانية
                    <ArrowLeft size={20} className="group-hover:-translate-x-2 transition-transform" />
                  </span>
                </button>
              </motion.div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Services
