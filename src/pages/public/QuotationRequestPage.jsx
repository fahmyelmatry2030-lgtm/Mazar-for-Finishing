import React from 'react'
import ProfessionalQuotationWizard from '../../components/ProfessionalQuotationWizard'
import SEO from '../../components/SEO'
import { Sparkles, ShieldCheck, Clock, Award, FileSpreadsheet } from 'lucide-react'

const QuotationRequestPage = () => {
  return (
    <div className="pt-28 pb-24 min-h-screen bg-bg-primary relative overflow-hidden">
      <SEO 
        title="طلب مقايسة تشطيبات هندسية" 
        description="احسب تكلفة تشطيب وحدتك السكنية أو التجارية بدقة هندسية عالية واحصل على مقايسة تفصيلية معتمدة من م. محمد العجيزي." 
      />

      {/* Decorative Gold Ambience */}
      <div className="absolute top-20 right-1/2 translate-x-1/2 w-[600px] h-[400px] bg-accent-gold/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container relative z-10">
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-gold/10 border border-accent-gold/30 text-accent-gold text-xs sm:text-sm font-bold mb-4 backdrop-blur-md">
            <Sparkles size={15} />
            <span>نظام إعداد المقايسات الهندسية الذكية</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            طلب مقايسة <span className="text-gold-gradient italic">تكاليف التشطيب</span>
          </h1>

          <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
            احصل على مقايسة تفصيلية دقيقة لمشروعك خلال دقائق، موزعة هندسياً على كافة بنود التأسيس والتشطيب والديكور تحت إشراف <span className="text-white font-bold">م. محمد العجيزي</span>.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-6 text-xs sm:text-sm text-text-muted font-bold">
            <div className="flex items-center gap-1.5 bg-bg-secondary px-3.5 py-1.5 rounded-xl border border-white/5">
              <Clock size={15} className="text-accent-gold" />
              <span>نتائج فورية في 3 خطوات</span>
            </div>
            <div className="flex items-center gap-1.5 bg-bg-secondary px-3.5 py-1.5 rounded-xl border border-white/5">
              <ShieldCheck size={15} className="text-accent-gold" />
              <span>إشراف وتوثيق هندسي</span>
            </div>
            <div className="flex items-center gap-1.5 bg-bg-secondary px-3.5 py-1.5 rounded-xl border border-white/5">
              <Award size={15} className="text-accent-gold" />
              <span>بنود وأسعار خامات السوق المحدثة</span>
            </div>
          </div>
        </div>

        {/* Professional Wizard Component */}
        <ProfessionalQuotationWizard />
      </div>
    </div>
  )
}

export default QuotationRequestPage
