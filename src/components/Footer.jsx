import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="py-12 sm:py-16 bg-bg-primary border-t border-white/10 text-center sm:text-right">
      <div className="container">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col items-center sm:items-start">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-accent-gold flex items-center justify-center rounded-lg shadow-gold">
                <span className="text-bg-primary font-black text-xl">M</span>
              </div>
              <div className="text-2xl font-black text-white" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                مزار <span className="text-accent-gold italic font-normal text-lg">للتشطيبات الفاخرة</span>
              </div>
            </Link>
            <p className="text-text-secondary text-sm max-w-sm font-medium leading-relaxed mb-6">
              نصيغ تجربة معمارية فاخرة تعكس أسلوب حياتك الراقي، بفضل نخبة من أفضل المهندسين والحرفيين وباستخدام أعلى معايير الجودة العالمية.
            </p>
            <div className="flex items-center gap-3 text-text-secondary">
              <a 
                href="#" 
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent-gold hover:text-bg-primary hover:border-accent-gold transition-all"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent-gold hover:text-bg-primary hover:border-accent-gold transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 flex flex-col items-center sm:items-start">
            <h4 className="text-sm font-bold text-accent-gold uppercase tracking-widest mb-4">
              روابط سريعة
            </h4>
            <ul className="space-y-2.5 text-sm font-bold text-text-secondary">
              <li>
                <Link to="/" className="hover:text-white transition-colors">الرئيسية</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">خدماتنا الهندسية</Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-white transition-colors">سابقة المشروعات</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">تواصل معنا</Link>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="md:col-span-4 flex flex-col items-center sm:items-start text-sm">
            <h4 className="text-sm font-bold text-accent-gold uppercase tracking-widest mb-4">
              بيانات التواصل
            </h4>
            <div className="space-y-3 font-bold text-text-secondary">
              <div className="flex items-center gap-2.5">
                <Phone size={16} className="text-accent-gold" />
                <span dir="ltr">+20 123 456 7890</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={16} className="text-accent-gold" />
                <span>projects@mazar.design</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin size={16} className="text-accent-gold" />
                <span>التجمع الخامس، القاهرة الجديدة</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Rights */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-bold text-text-muted">
          <div>
            © {new Date().getFullYear()} مؤسسة مزار للتصميم الداخلي والتشطيب المعماري. كافة الحقوق محفوظة.
          </div>
          <div className="flex gap-4">
            <Link to="/login" className="hover:text-accent-gold transition-colors">دخول المهندسين</Link>
            <span>·</span>
            <span>تصميم وتنفيذ بأعلى معايير الإتقان</span>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
