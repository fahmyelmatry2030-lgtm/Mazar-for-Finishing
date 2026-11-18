import React, { useEffect, useState } from 'react'
import { Sparkles, FileSpreadsheet, ShieldCheck, Clock, MessageCircle, ExternalLink, Calculator } from 'lucide-react'

const TallyQuotationForm = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load Tally embed script dynamically
    const scriptSrc = "https://tally.so/widgets/embed.js"
    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`)

    const handleLoad = () => {
      if (window.Tally) {
        window.Tally.loadEmbeds()
      }
      setLoading(false)
    }

    if (!existingScript) {
      const script = document.createElement('script')
      script.src = scriptSrc
      script.async = true
      script.onload = handleLoad
      script.onerror = () => setLoading(false)
      document.body.appendChild(script)
    } else {
      if (window.Tally) {
        window.Tally.loadEmbeds()
      }
      setLoading(false)
    }
  }, [])

  return (
    <div className="w-full">
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-gold/10 border border-accent-gold/30 text-accent-gold text-xs sm:text-sm font-bold mb-4 backdrop-blur-md">
          <FileSpreadsheet size={15} />
          <span>النموذج الهندسي المعتمد لإعداد المقايسات</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-4">
          طلب مقايسة <span className="text-gold-gradient italic">تكاليف التشطيب</span>
        </h1>
        <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
          من فضلك املأ هذا النموذج بدقة، لنتمكن من إعداد مقايسة تكاليف تشطيب تفصيلية وسريعة تناسب احتياجك وميزانيتك بدقة متناهية تحت إشراف <span className="text-white font-bold">م. محمد العجيزي</span>.
        </p>

        {/* Badges Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-6 text-xs sm:text-sm text-text-muted font-bold">
          <div className="flex items-center gap-1.5 bg-bg-secondary px-3.5 py-1.5 rounded-xl border border-white/5">
            <Clock size={15} className="text-accent-gold" />
            <span>يستغرق أقل من 3 دقائق</span>
          </div>
          <div className="flex items-center gap-1.5 bg-bg-secondary px-3.5 py-1.5 rounded-xl border border-white/5">
            <ShieldCheck size={15} className="text-accent-gold" />
            <span>الرد خلال 24 - 48 ساعة</span>
          </div>
          <div className="flex items-center gap-1.5 bg-bg-secondary px-3.5 py-1.5 rounded-xl border border-white/5">
            <Sparkles size={15} className="text-accent-gold" />
            <span>مصر وكافة الدول العربية</span>
          </div>
        </div>
      </div>

      {/* Tally Embedded Container */}
      <div className="max-w-4xl mx-auto bg-bg-secondary/90 border border-white/10 rounded-3xl p-3 sm:p-6 md:p-8 shadow-2xl relative backdrop-blur-xl">
        {loading && (
          <div className="py-20 flex flex-col items-center justify-center gap-4 text-center">
            <div className="w-10 h-10 border-2 border-accent-gold border-t-transparent rounded-full animate-spin" />
            <p className="text-text-secondary font-bold text-sm">جاري تحميل استمارة المقايسة الهندسية...</p>
          </div>
        )}

        <iframe
          data-tally-src="https://tally.so/embed/xXEEQd?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
          loading="lazy"
          width="100%"
          height="800"
          title="طلب مقايسة تكاليف التشطيب"
          className="w-full border-0 rounded-2xl min-h-[750px]"
          onLoad={() => setLoading(false)}
        />

        {/* Fallback & Direct Contact Footer */}
        <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-secondary">
          <div className="flex items-center gap-2">
            <span>تواجه مشكلة في عرض النموذج؟</span>
            <a 
              href="https://tally.so/r/xXEEQd" 
              target="_blank" 
              rel="noreferrer"
              className="text-accent-gold font-bold inline-flex items-center gap-1 hover:underline"
            >
              <span>فتح الاستمارة في صفحة مستقلة</span>
              <ExternalLink size={13} />
            </a>
          </div>

          <a
            href="https://wa.me/201225433070?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D9%85%D9%82%D8%A7%D9%8A%D8%B3%D8%A9%20%D8%AA%D8%B4%D8%B7%D9%8A%D8%A8%20%D9%85%D8%B4%D8%B1%D9%88%D8%B9%D9%8A"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-gold/10 hover:bg-accent-gold hover:text-bg-primary text-accent-gold font-bold transition-all border border-accent-gold/30"
          >
            <MessageCircle size={15} />
            <span>تواصل مباشرة عبر واتساب: 01225433070</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default TallyQuotationForm
