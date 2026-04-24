import React from 'react'

const Footer = () => {
  return (
    <footer className="py-16 bg-bg-primary border-t border-white/5 text-center md:text-right">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent-gold flex items-center justify-center rounded-sm">
              <span className="text-bg-primary font-black text-2xl">M</span>
            </div>
            <div className="text-3xl font-black text-white" style={{ fontFamily: 'Tajawal, sans-serif' }}>
              مزار <span className="text-accent-gold italic font-normal text-xl">للتشطيبات</span>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-sm font-bold tracking-widest uppercase text-text-secondary">
            <a href="#" className="hover:text-accent-gold transition-colors">Instagram</a>
            <a href="#" className="hover:text-accent-gold transition-colors">Behance</a>
            <a href="#" className="hover:text-accent-gold transition-colors">LinkedIn</a>
          </div>

          <div className="text-sm font-bold text-text-muted">
            © ٢٠٢٦ مؤسسة مزار للتصميم الداخلي والتشطيب.
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer
