import React, { useState } from 'react'
import TallyQuotationForm from '../../components/TallyQuotationForm'
import CostEstimator from '../../components/CostEstimator'
import SEO from '../../components/SEO'
import { FileSpreadsheet, Calculator } from 'lucide-react'

const QuotationRequestPage = () => {
  const [activeTab, setActiveTab] = useState('detailed') // 'detailed' | 'quick'

  return (
    <div className="pt-28 pb-20 min-h-screen bg-bg-primary">
      <SEO 
        title="طلب مقايسة تكاليف التشطيب" 
        description="املأ نموذج مقايسة تكاليف التشطيب المعتمد من م. محمد العجيزي للحصول على مقايسة دقيقة لمشروعك السكني أو التجاري." 
      />

      <div className="container">
        {/* Switcher Tabs */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-bg-secondary border border-white/10 shadow-xl">
            <button
              onClick={() => setActiveTab('detailed')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                activeTab === 'detailed'
                  ? 'bg-accent-gold text-bg-primary shadow-lg shadow-accent-gold/20'
                  : 'text-text-secondary hover:text-white'
              }`}
            >
              <FileSpreadsheet size={16} />
              <span>المقايسة الهندسية التفصيلية (نموذج مزار)</span>
            </button>

            <button
              onClick={() => setActiveTab('quick')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                activeTab === 'quick'
                  ? 'bg-accent-gold text-bg-primary shadow-lg shadow-accent-gold/20'
                  : 'text-text-secondary hover:text-white'
              }`}
            >
              <Calculator size={16} />
              <span>الحاسبة السريعة والتقدير الفوري</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'detailed' ? (
          <TallyQuotationForm />
        ) : (
          <div className="max-w-4xl mx-auto">
            <CostEstimator />
          </div>
        )}
      </div>
    </div>
  )
}

export default QuotationRequestPage
